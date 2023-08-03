/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated January 1, 2020. Replaces all prior versions.
 *
 * Copyright (c) 2013-2020, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software
 * or otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THE SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/

#include "SkeletonCacheAnimation.h"
#include "MiddlewareMacro.h"
#include "SkeletonCacheMgr.h"
#include "renderer/renderer/Pass.h"
#include "renderer/renderer/Technique.h"
#include "renderer/scene/assembler/CustomAssembler.hpp"
#include "renderer/gfx/Texture.h"
#include "spine-creator-support/AttachUtil.h"

USING_NS_CC;
USING_NS_MW;
using namespace cocos2d::renderer;
static const std::string techStage = "opaque";
static const std::string textureKey = "texture";

namespace spine {
    
    SkeletonCacheAnimation::SkeletonCacheAnimation (const std::string& uuid, bool isShare) {
        if (isShare) {
            _skeletonCache = SkeletonCacheMgr::getInstance()->buildSkeletonCache(uuid);
            _skeletonCache->retain();
        } else {
            _skeletonCache = new SkeletonCache();
            _skeletonCache->initWithUUID(uuid);
            _skeletonCache->retain();
            _skeletonCache->autorelease();
        }
        beginSchedule();
    }
    
    SkeletonCacheAnimation::~SkeletonCacheAnimation () {
        if (_skeletonCache) {
            _skeletonCache->release();
            _skeletonCache = nullptr;
        }
        while (!_animationQueue.empty()) {
            auto ani = _animationQueue.front();
            _animationQueue.pop();
            delete ani;
        }
        CC_SAFE_RELEASE_NULL(_attachUtil);
        CC_SAFE_RELEASE(_nodeProxy);
        CC_SAFE_RELEASE(_effect);
        stopSchedule();
    }
    
    void SkeletonCacheAnimation::update(float dt) {
        if (_paused) return;
        
        auto gTimeScale = SkeletonAnimation::GlobalTimeScale;
        dt *= _timeScale * gTimeScale;
        
        if (_isAniComplete) {
            if (_animationQueue.empty() && !_headAnimation) {
                if (_animationData && !_animationData->isComplete()) {
                    _skeletonCache->updateToFrame(_animationName);
                }
                return;
            }
            if (!_headAnimation) {
                _headAnimation = _animationQueue.front();
                _animationQueue.pop();
            }
            if (!_headAnimation) {
                return;
            }
            _accTime += dt;
            if (_accTime > _headAnimation->delay) {
                std::string name = _headAnimation->animationName;
                bool loop = _headAnimation->loop;
                delete _headAnimation;
                _headAnimation = nullptr;
                setAnimation(name, loop);
                return;
            }
        }
        
        if (!_animationData) return;
        
        if (_accTime <= 0.00001 && _playCount == 0) {
            if (_startListener) {
                _startListener(_animationName);
            }
        }
        
        _accTime += dt;
        int frameIdx = floor(_accTime / SkeletonCache::FrameTime);
        if (!_animationData->isComplete()) {
            _skeletonCache->updateToFrame(_animationName, frameIdx);
        }
        
        int finalFrameIndex = (int)_animationData->getFrameCount() - 1;
        if (_animationData->isComplete() && frameIdx >= finalFrameIndex) {
            _playCount++;
            _accTime = 0.0f;
            if (_playTimes > 0 && _playCount >= _playTimes) {
                frameIdx = finalFrameIndex;
                _playCount = 0;
                _isAniComplete = true;
            } else {
                frameIdx = 0;
            }
            if (_endListener) {
                _endListener(_animationName);
            }
            if (_completeListener) {
                _completeListener(_animationName);
            }
        }
        _curFrameIndex = frameIdx;
    }
    
    void SkeletonCacheAnimation::render(float dt) {
        
        if (!_nodeProxy || !_effect) {
            return;
        }
        
        CustomAssembler* assembler = (CustomAssembler*)_nodeProxy->getAssembler();
        if (assembler == nullptr) {
            return;
        }
        assembler->reset();
        assembler->setUseModel(!_batch);
        
        if (!_animationData) return;
        SkeletonCache::FrameData* frameData = _animationData->getFrameData(_curFrameIndex);
        if (!frameData) return;
        
        auto& segments = frameData->getSegments();
        auto& colors = frameData->getColors();
        if (segments.size() == 0 || colors.size() == 0) return;
        
        auto mgr = MiddlewareManager::getInstance();
        if (!mgr->isRendering) return;
        
        _nodeColor.a = _nodeProxy->getRealOpacity() / (float)255;
        
        auto vertexFormat = _useTint? VF_XYUVCC : VF_XYUVC;
        middleware::MeshBuffer* mb = mgr->getMeshBuffer(vertexFormat);
        middleware::IOBuffer& vb = mb->getVB();
        middleware::IOBuffer& ib = mb->getIB();
        const auto& srcVB = frameData->vb;
        const auto& srcIB = frameData->ib;
        
        // vertex size int bytes with one color
        int vbs1 = sizeof(V2F_T2F_C4B);
        // vertex size in floats with one color
        int vs1 = vbs1 / sizeof(float);
        // vertex size int bytes with two color
        int vbs2 = sizeof(V2F_T2F_C4B_C4B);
        // vertex size in floats with two color
        int vs2 = vbs2 / sizeof(float);
        
        int vs = _useTint ? vs2 : vs1;
        int vbs = _useTint ? vbs2 : vbs1;
        
        const cocos2d::Mat4& nodeWorldMat = _nodeProxy->getWorldMatrix();

        int colorOffset = 0;
        SkeletonCache::ColorData* nowColor = colors[colorOffset++];
        auto maxVFOffset = nowColor->vertexFloatOffset;
        
        Color4B finalColor;
        Color4B darkColor;
        float tempR = 0.0f, tempG = 0.0f, tempB = 0.0f, tempA = 0.0f;
        float multiplier = 1.0f;
        int srcVertexBytesOffset = 0;
        int srcVertexBytes = 0;
        int vertexBytes = 0;
        int vertexFloats = 0;
        int tintBytes = 0;
        int srcIndexBytesOffset = 0;
        int indexBytes = 0;
        GLuint textureHandle = 0;
        double effectHash = 0;
        int blendMode = 0;
        int dstVertexOffset = 0;
        float* dstVertexBuffer = nullptr;
        unsigned int* dstColorBuffer = nullptr;
        unsigned short* dstIndexBuffer = nullptr;
        bool needColor = false;
        BlendFactor curBlendSrc = BlendFactor::ONE;
        BlendFactor curBlendDst = BlendFactor::ZERO;
        
        if (abs(_nodeColor.r - 1.0f) > 0.0001f ||
            abs(_nodeColor.g - 1.0f) > 0.0001f ||
            abs(_nodeColor.b - 1.0f) > 0.0001f ||
            abs(_nodeColor.a - 1.0f) > 0.0001f ||
            _premultipliedAlpha) {
            needColor = true;
        }
        
        auto handleColor = [&](SkeletonCache::ColorData* colorData){
            tempA = colorData->finalColor.a * _nodeColor.a;
            multiplier = _premultipliedAlpha ? tempA / 255 : 1;
            tempR = _nodeColor.r * multiplier;
            tempG = _nodeColor.g * multiplier;
            tempB = _nodeColor.b * multiplier;
            
            finalColor.a = (GLubyte)tempA;
            finalColor.r = (GLubyte)(colorData->finalColor.r * tempR);
            finalColor.g = (GLubyte)(colorData->finalColor.g * tempG);
            finalColor.b = (GLubyte)(colorData->finalColor.b * tempB);
            
            darkColor.r = (GLubyte)(colorData->darkColor.r * tempR);
            darkColor.g = (GLubyte)(colorData->darkColor.g * tempG);
            darkColor.b = (GLubyte)(colorData->darkColor.b * tempB);
            darkColor.a = _premultipliedAlpha ? 255 : 0;
        };
        
        handleColor(nowColor);
        
        for (std::size_t segIndex = 0, segLen = segments.size(); segIndex < segLen; segIndex++) {
            auto segment = segments[segIndex];
            srcVertexBytes = segment->vertexFloatCount * sizeof(float);
            if (!_useTint) {
                tintBytes = segment->vertexFloatCount / vs2 * sizeof(float);
                vertexBytes = srcVertexBytes - tintBytes;
                vertexFloats = vertexBytes / sizeof(float);
            } else {
                vertexBytes = srcVertexBytes;
                vertexFloats = segment->vertexFloatCount;
            }

            // fill vertex buffer
            vb.checkSpace(vertexBytes, true);
            dstVertexOffset = (int)vb.getCurPos() / vbs;
            dstVertexBuffer = (float*)vb.getCurBuffer();
            dstColorBuffer = (unsigned int*)vb.getCurBuffer();
            if (!_useTint) {
                char* srcBuffer = (char*)srcVB.getBuffer() + srcVertexBytesOffset;
                for (std::size_t srcBufferIdx = 0; srcBufferIdx < srcVertexBytes; srcBufferIdx += vbs2) {
                    vb.writeBytes(srcBuffer + srcBufferIdx, vbs);
                }
            } else {
                vb.writeBytes((char*)srcVB.getBuffer() + srcVertexBytesOffset, vertexBytes);
            }
            
            // batch handle
            if (_batch) {
                cocos2d::Vec3* point = nullptr;
                float tempZ = 0.0f;
                for (auto posIndex = 0; posIndex < vertexFloats; posIndex += vs)
                {
                    point = (cocos2d::Vec3*)(dstVertexBuffer + posIndex);
                    tempZ = point->z;
                    point->z = 0;
                    nodeWorldMat.transformPoint(point);
                    point->z = tempZ;
                }
            }
            
            // handle vertex color
            if (needColor) {
                int srcVertexFloatOffset = srcVertexBytesOffset / sizeof(float);
                if (_useTint) {
                    for (auto colorIndex = 0; colorIndex < vertexFloats; colorIndex += vs, srcVertexFloatOffset += vs2)
                    {
                        if (srcVertexFloatOffset >= maxVFOffset) {
                            nowColor = colors[colorOffset++];
                            handleColor(nowColor);
                            maxVFOffset = nowColor->vertexFloatOffset;
                        }
                        memcpy(dstColorBuffer + colorIndex + 4, &finalColor, sizeof(finalColor));
                        memcpy(dstColorBuffer + colorIndex + 5, &darkColor, sizeof(darkColor));
                    }
                } else {
                    for (auto colorIndex = 0; colorIndex < vertexFloats; colorIndex += vs, srcVertexFloatOffset += vs2)
                    {
                        if (srcVertexFloatOffset >= maxVFOffset) {
                            nowColor = colors[colorOffset++];
                            handleColor(nowColor);
                            maxVFOffset = nowColor->vertexFloatOffset;
                        }
                        memcpy(dstColorBuffer + colorIndex + 4, &finalColor, sizeof(finalColor));
                    }
                }
            }
            
            // move src vertex buffer offset
            srcVertexBytesOffset += srcVertexBytes;
            
            // fill index buffer
            indexBytes = segment->indexCount * sizeof(unsigned short);
            ib.checkSpace(indexBytes, true);
            assembler->updateIARange(segIndex, (int)ib.getCurPos() / sizeof(unsigned short), segment->indexCount);
            dstIndexBuffer = (unsigned short*)ib.getCurBuffer();
            ib.writeBytes((char*)srcIB.getBuffer() + srcIndexBytesOffset, indexBytes);
            for (auto indexPos = 0; indexPos < segment->indexCount; indexPos ++) {
                dstIndexBuffer[indexPos] += dstVertexOffset;
            }
            srcIndexBytesOffset += indexBytes;
            
            // set assembler glvb and glib
            assembler->updateIABuffer(segIndex, mb->getGLVB(), mb->getGLIB());
            
            // handle material
            textureHandle = segment->getTexture()->getNativeTexture()->getHandle();
            blendMode = segment->blendMode;
            effectHash = textureHandle + (blendMode << 16) + ((int)_useTint << 24) + ((int)_batch << 25) + ((int)_effect->getHash() << 26);
            EffectVariant* renderEffect = assembler->getEffect(segIndex);
            bool needUpdate = false;
            if (renderEffect) {
                double renderHash = renderEffect->getHash();
                if (abs(renderHash - effectHash) >= 0.01) {
                    needUpdate = true;
                }
            }
            else {
                auto effect = new cocos2d::renderer::EffectVariant();
                effect->autorelease();
                effect->copy(_effect);
                
                assembler->updateEffect(segIndex, effect);
                renderEffect = effect;
                needUpdate = true;
            }

            if (needUpdate) {
                renderEffect->setProperty(textureKey, segment->getTexture()->getNativeTexture());
                switch (blendMode) {
                    case BlendMode_Additive:
                        curBlendSrc = _premultipliedAlpha ? BlendFactor::ONE : BlendFactor::SRC_ALPHA;
                        curBlendDst = BlendFactor::ONE;
                        break;
                    case BlendMode_Multiply:
                        curBlendSrc = BlendFactor::DST_COLOR;
                        curBlendDst = BlendFactor::ONE_MINUS_SRC_ALPHA;
                        break;
                    case BlendMode_Screen:
                        curBlendSrc = BlendFactor::ONE;
                        curBlendDst = BlendFactor::ONE_MINUS_SRC_COLOR;
                        break;
                    default:
                        curBlendSrc = _premultipliedAlpha ? BlendFactor::ONE : BlendFactor::SRC_ALPHA;
                        curBlendDst = BlendFactor::ONE_MINUS_SRC_ALPHA;
                }
                renderEffect->setBlend(true, BlendOp::ADD, curBlendSrc, curBlendDst,
                               BlendOp::ADD, curBlendSrc, curBlendDst);
            }
            
            renderEffect->updateHash(effectHash);
        }
        
        if (_attachUtil)
        {
            _attachUtil->syncAttachedNode(_nodeProxy, frameData);
        }
    }
    
    Skeleton* SkeletonCacheAnimation::getSkeleton() const {
        return _skeletonCache->getSkeleton();
    }
    
    void SkeletonCacheAnimation::setTimeScale (float scale) {
        _timeScale = scale;
    }
    
    float SkeletonCacheAnimation::getTimeScale () const {
        return _timeScale;
    }
    
    void SkeletonCacheAnimation::paused (bool value) {
        _paused = value;
    }
    
    Bone* SkeletonCacheAnimation::findBone (const std::string& boneName) const {
        return _skeletonCache->findBone(boneName);
    }
    
    Slot* SkeletonCacheAnimation::findSlot (const std::string& slotName) const {
        return _skeletonCache->findSlot(slotName);
    }
    
    void SkeletonCacheAnimation::setSkin (const std::string& skinName) {
        _skeletonCache->setSkin(skinName);
        _skeletonCache->resetAllAnimationData();
    }

    void SkeletonCacheAnimation::setSkin (const char* skinName) {
        _skeletonCache->setSkin(skinName);
        _skeletonCache->resetAllAnimationData();
    }
    
    Attachment* SkeletonCacheAnimation::getAttachment (const std::string& slotName, const std::string& attachmentName) const {
        return _skeletonCache->getAttachment(slotName, attachmentName);
    }
    
    bool SkeletonCacheAnimation::setAttachment (const std::string& slotName, const std::string& attachmentName) {
        auto ret = _skeletonCache->setAttachment(slotName, attachmentName);
        _skeletonCache->resetAllAnimationData();
        return ret;
    }
    
    bool SkeletonCacheAnimation::setAttachment (const std::string& slotName, const char* attachmentName) {
        auto ret = _skeletonCache->setAttachment(slotName, attachmentName);
        _skeletonCache->resetAllAnimationData();
        return ret;
    }
    
    void SkeletonCacheAnimation::setColor (cocos2d::Color4B& color) {
        _nodeColor.r = color.r / 255.0f;
        _nodeColor.g = color.g / 255.0f;
        _nodeColor.b = color.b / 255.0f;
        _nodeColor.a = color.a / 255.0f;
    }
    
    void SkeletonCacheAnimation::setBatchEnabled (bool enabled) {
        _batch = enabled;
    }
    
    void SkeletonCacheAnimation::setOpacityModifyRGB (bool value) {
        _premultipliedAlpha = value;
    }
    
    bool SkeletonCacheAnimation::isOpacityModifyRGB () const {
        return _premultipliedAlpha;
    }
    
    void SkeletonCacheAnimation::beginSchedule() {
        MiddlewareManager::getInstance()->addTimer(this);
    }
    
    void SkeletonCacheAnimation::stopSchedule() {
        MiddlewareManager::getInstance()->removeTimer(this);
    }
    
    void SkeletonCacheAnimation::onEnable() {
        beginSchedule();
    }
    
    void SkeletonCacheAnimation::onDisable() {
        stopSchedule();
    }
    
    void SkeletonCacheAnimation::setUseTint(bool enabled) {
        _useTint = enabled;
    }
    
    void SkeletonCacheAnimation::setAnimation (const std::string& name, bool loop) {
        _playTimes = loop ? 0 : 1;
        _animationName = name;
        _animationData = _skeletonCache->buildAnimationData(_animationName);
        _isAniComplete = false;
        _accTime = 0.0f;
        _playCount = 0;
        _curFrameIndex = 0;
    }
    
    void SkeletonCacheAnimation::addAnimation (const std::string& name, bool loop, float delay) {
        auto aniInfo = new AniQueueData();
        aniInfo->animationName = name;
        aniInfo->loop = loop;
        aniInfo->delay = delay;
        _animationQueue.push(aniInfo);
    }
    
    Animation* SkeletonCacheAnimation::findAnimation(const std::string& name) const {
        return _skeletonCache->findAnimation(name);
    }
    
    void SkeletonCacheAnimation::setStartListener (const CacheFrameEvent& listener) {
        _startListener = listener;
    }
    
    void SkeletonCacheAnimation::setEndListener (const CacheFrameEvent& listener) {
        _endListener = listener;
    }
    
    void SkeletonCacheAnimation::setCompleteListener (const CacheFrameEvent& listener) {
        _completeListener = listener;
    }
    
    void SkeletonCacheAnimation::updateAnimationCache (const std::string& animationName) {
        _skeletonCache->resetAnimationData(animationName);
    }
    
    void SkeletonCacheAnimation::updateAllAnimationCache () {
        _skeletonCache->resetAllAnimationData();
    }
    
    void SkeletonCacheAnimation::setAttachUtil(CacheModeAttachUtil* attachUtil) {
        if (attachUtil == _attachUtil) return;
        CC_SAFE_RELEASE(_attachUtil);
        _attachUtil = attachUtil;
        CC_SAFE_RETAIN(_attachUtil);
    }
    
    void SkeletonCacheAnimation::bindNodeProxy(cocos2d::renderer::NodeProxy* node) {
        if (node == _nodeProxy) return;
        CC_SAFE_RELEASE(_nodeProxy);
        _nodeProxy = node;
        CC_SAFE_RETAIN(_nodeProxy);
    }
    
    void SkeletonCacheAnimation::setEffect(cocos2d::renderer::EffectVariant* effect) {
        if (effect == _effect) return;
        CC_SAFE_RELEASE(_effect);
        _effect = effect;
        CC_SAFE_RETAIN(_effect);
    }
    
    uint32_t SkeletonCacheAnimation::getRenderOrder() const {
        if (!_nodeProxy) return 0;
        return _nodeProxy->getRenderOrder();
    }
    
    void SkeletonCacheAnimation::setToSetupPose () {
        if (_skeletonCache) {
            _skeletonCache->setToSetupPose();
        }
    }
    
    void SkeletonCacheAnimation::setBonesToSetupPose () {
        if (_skeletonCache) {
            _skeletonCache->setBonesToSetupPose();
        }
    }
    
    void SkeletonCacheAnimation::setSlotsToSetupPose () {
        if (_skeletonCache) {
            _skeletonCache->setSlotsToSetupPose();
        }
    }
}
