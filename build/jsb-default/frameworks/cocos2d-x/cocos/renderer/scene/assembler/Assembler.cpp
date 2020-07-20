/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#include "Assembler.hpp"

#include "../NodeProxy.hpp"
#include "../ModelBatcher.hpp"
#include "../MeshBuffer.hpp"
#include "../../renderer/Scene.h"
#include "math/CCMath.h"
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "cocos/scripting/js-bindings/manual/jsb_conversions.hpp"
#include "cocos/scripting/js-bindings/auto/jsb_renderer_auto.hpp"
#include "../RenderFlow.hpp"

RENDERER_BEGIN

Assembler::IARenderData::IARenderData()
{
    
}

Assembler::IARenderData::IARenderData(const IARenderData& o)
{
    meshIndex = o.meshIndex;
    verticesStart = o.verticesStart;
    verticesCount = o.verticesCount;
    indicesStart = o.indicesStart;
    indicesCount = o.indicesCount;
    setEffect(o.getEffect());
}

Assembler::IARenderData::~IARenderData()
{
    CC_SAFE_RELEASE(_effect);
}

void Assembler::IARenderData::setEffect(EffectVariant* effect)
{
    if (effect == _effect) return;
    CC_SAFE_RELEASE(_effect);
    _effect = effect;
    CC_SAFE_RETAIN(_effect);
}

EffectVariant* Assembler::IARenderData::getEffect() const
{
    return _effect;
}

Assembler::Assembler()
{
    
}

Assembler::~Assembler()
{
    CC_SAFE_RELEASE_NULL(_datas);
    CC_SAFE_RELEASE(_vfmt);
}

void Assembler::updateMeshIndex(std::size_t iaIndex, int meshIndex)
{
    if (iaIndex >= _iaDatas.size())
    {
        _iaDatas.resize(iaIndex + 1);
    }
    IARenderData& ia = _iaDatas[iaIndex];
    ia.meshIndex = meshIndex;
}

void Assembler::updateIndicesRange(std::size_t iaIndex, int start, int count)
{
    if (iaIndex >= _iaDatas.size())
    {
        _iaDatas.resize(iaIndex + 1);
    }
    IARenderData& ia = _iaDatas[iaIndex];
    ia.indicesStart = start;
    ia.indicesCount = count;
}

void Assembler::updateVerticesRange(std::size_t iaIndex, int start, int count)
{
    if (iaIndex >= _iaDatas.size())
    {
        _iaDatas.resize(iaIndex + 1);
    }
    IARenderData& ia = _iaDatas[iaIndex];
    ia.verticesStart = start;
    ia.verticesCount = count;
    
    enableDirty(AssemblerBase::VERTICES_OPACITY_CHANGED);
}

void Assembler::updateEffect(std::size_t iaIndex, EffectVariant* effect)
{
    if (iaIndex >= _iaDatas.size())
    {
        _iaDatas.resize(iaIndex + 1);
    }
    IARenderData& ia = _iaDatas[iaIndex];
    ia.setEffect(effect);
}

void Assembler::reset()
{
    _iaDatas.clear();
}

void Assembler::handle(NodeProxy *node, ModelBatcher* batcher, Scene* scene)
{
    batcher->commit(node, this, node->getCullingMask());
}

void Assembler::fillBuffers(NodeProxy* node, ModelBatcher* batcher, std::size_t index)
{
    if(!_datas || !_vfmt)
    {
        return;
    }
    
    MeshBuffer* buffer = batcher->getBuffer(_vfmt);
    
    const IARenderData& ia = _iaDatas[index];
    std::size_t meshIndex = ia.meshIndex >= 0 ? ia.meshIndex : index;
    
    RenderData* data = _datas->getRenderData(meshIndex);
    if (!data)
    {
        return;
    }
    
    CCASSERT(data->getVBytes() % _bytesPerVertex == 0, "Assembler::fillBuffers vertices data doesn't follow vertex format");
    uint32_t vertexCount = ia.verticesCount >= 0 ? (uint32_t)ia.verticesCount : (uint32_t)data->getVBytes() / _bytesPerVertex;
    uint32_t indexCount = ia.indicesCount >= 0 ? (uint32_t)ia.indicesCount : (uint32_t)data->getIBytes() / sizeof(unsigned short);
    uint32_t vertexStart = (uint32_t)ia.verticesStart;
    
    // must retrieve offset before request
    auto& bufferOffset = buffer->request(vertexCount, indexCount);
    uint32_t vBufferOffset = bufferOffset.vByte / sizeof(float);
    uint32_t indexId = bufferOffset.index;
    uint32_t vertexId = bufferOffset.vertex;
    uint32_t vertexOffset = vertexId - vertexStart;
    uint32_t num = _vfPos->num;

    float* worldVerts = buffer->vData + vBufferOffset;
    memcpy(worldVerts, data->getVertices() + vertexStart * _bytesPerVertex, vertexCount * _bytesPerVertex);
    
    // Calculate vertices world positions
    if (!_useModel && !_ignoreWorldMatrix)
    {
        size_t dataPerVertex = _bytesPerVertex / sizeof(float);
        float* ptrPos = worldVerts + _posOffset;
        auto& worldMat = node->getWorldMatrix();
        
        switch (num) {
           // Vertex is X Y Z Format
            case 3:
                for (uint32_t i = 0; i < vertexCount; ++i)
                {
                    ((cocos2d::Vec3*)ptrPos)->transformMat4(*((cocos2d::Vec3*)ptrPos), worldMat);
                    ptrPos += dataPerVertex;
                }
                break;
            // Vertex is X Y Format
            case 2:
                for (uint32_t i = 0; i < vertexCount; ++i)
                {
                    float z = ptrPos[2];
                    ptrPos[2] = 0;
                    worldMat.transformPoint((cocos2d::Vec3*)ptrPos);
                    ptrPos[2] = z;
                    ptrPos += dataPerVertex;
                }
                break;
        }
    }
    
    // Copy index buffer with vertex offset
    uint16_t* indices = (uint16_t*)data->getIndices();
    uint16_t* dst = buffer->iData;
    for (auto i = 0, j = ia.indicesStart; i < indexCount; ++i, ++j)
    {
        dst[indexId++] = vertexOffset + indices[j];
    }
}

void Assembler::setVertexFormat(VertexFormat* vfmt)
{
    if (_vfmt == vfmt) return;
    CC_SAFE_RETAIN(vfmt);
    CC_SAFE_RELEASE(_vfmt);
    _vfmt = vfmt;
    if (_vfmt)
    {
        _bytesPerVertex = _vfmt->getBytes();
        _vfPos = _vfmt->getElement(ATTRIB_NAME_POSITION_HASH);
        _posOffset = _vfPos->offset / 4;
        _vfColor = _vfmt->getElement(ATTRIB_NAME_COLOR_HASH);
        if (_vfColor != nullptr)
        {
            _alphaOffset = _vfColor->offset + 3;
        }
    }
}

void Assembler::setRenderDataList(RenderDataList* datas)
{
    if (_datas == datas) return;
    CC_SAFE_RELEASE(_datas);
    _datas = datas;
    CC_SAFE_RETAIN(_datas);
}

void Assembler::updateOpacity(std::size_t index, uint8_t opacity)
{
    // has no color info in vertex buffer
    if(!_vfColor || !_datas || !_vfmt)
    {
        return;
    }
    
    const IARenderData& ia = _iaDatas[index];
    std::size_t meshIndex = ia.meshIndex >= 0 ? ia.meshIndex : index;
    
    RenderData* data = _datas->getRenderData(meshIndex);
    if (!data)
    {
        return;
    }
    
    CCASSERT(data->getVBytes() % _bytesPerVertex == 0, "Assembler::updateOpacity vertices data doesn't follow vertex format");
    uint32_t vertexCount = (uint32_t)data->getVBytes() / _bytesPerVertex;
    
    size_t dataPerVertex = _bytesPerVertex / sizeof(uint8_t);
    uint8_t* ptrAlpha = (uint8_t*)data->getVertices() + _alphaOffset;
    const Vector<Pass*>& passes = ia.getEffect()->getPasses();
    if (passes.at(0)->getBlendSrc() == BlendFactor::ONE)
    {
        float alpha = opacity / 255.0;
        for (uint32_t i = 0; i < vertexCount; ++i)
        {
           *(ptrAlpha-1) *= alpha;
           *(ptrAlpha-2) *= alpha;
           *(ptrAlpha-3) *= alpha;
           
           *ptrAlpha = opacity;
           ptrAlpha += dataPerVertex;
        }
    }
    else
    {
        for (uint32_t i = 0; i < vertexCount; ++i)
        {
           *ptrAlpha = opacity;
           ptrAlpha += dataPerVertex;
        }
    }
    
    *_dirty &= ~VERTICES_OPACITY_CHANGED;
}

RENDERER_END
