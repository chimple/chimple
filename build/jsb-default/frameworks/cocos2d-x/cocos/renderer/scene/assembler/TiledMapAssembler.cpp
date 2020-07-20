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

#include "TiledMapAssembler.hpp"
#include "../NodeProxy.hpp"
#include "../ModelBatcher.hpp"
#include "../RenderFlow.hpp"

RENDERER_BEGIN

TiledMapAssembler::TiledMapAssembler()
{
    
}

TiledMapAssembler::~TiledMapAssembler()
{
    
}

void TiledMapAssembler::updateNodes(std::size_t iaIndex, const std::vector<std::string>& nodes)
{
    _nodesMap[iaIndex] = nodes;
}

void TiledMapAssembler::clearNodes(std::size_t iaIndex)
{
    _nodesMap.erase(iaIndex);
}

void TiledMapAssembler::handle(NodeProxy *node, ModelBatcher* batcher, Scene* scene)
{
    _node = node;
    _batcher = batcher;
    
    Assembler::handle(node, batcher, scene);

    // Last tiles data may be empty, but has user node, so render it by manual.
    auto lastNodesIndex = getIACount();
    auto it = _nodesMap.find(lastNodesIndex);
    if (it != _nodesMap.end())
    {
        renderNodes(lastNodesIndex);
    }
}

void TiledMapAssembler::renderNodes(std::size_t index)
{
    static cocos2d::Mat4 tempWorldMat;
    const auto& worldMat = _node->getWorldMatrix();
    auto it = _nodesMap.find(index);
    if (it != _nodesMap.end())
    {
        auto flow = _batcher->getFlow();
        for (auto& id : it->second) {
            auto child = _node->getChildByID(id);
            if (child)
            {
                child->enableVisit(true);
                child->enableUpdateWorldMatrix(false);
                child->updateLocalMatrix();
                auto& localMat = child->getLocalMatrix();
                cocos2d::Mat4::multiply(worldMat, localMat, &tempWorldMat);
                child->updateWorldMatrix(tempWorldMat);
                flow->visit(child);
                child->enableUpdateWorldMatrix(true);
                child->enableVisit(false);
            }
        }
    }
    _batcher->changeCommitState(ModelBatcher::Common);
}

void TiledMapAssembler::beforeFillBuffers(std::size_t index)
{
    renderNodes(index);
}

RENDERER_END
