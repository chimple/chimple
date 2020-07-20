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

#pragma once

#include <vector>
#include <unordered_map>
#include <string>
#include <functional>
#include "../Macro.h"
#include "ProgramLib.h"
#include "Model.h"
#include "Effect.h"
#include "../memop/RecyclePool.hpp"

RENDERER_BEGIN

class DeviceGraphics;
class View;
class Scene;
class ProgramLib;
class Model;
class InputAssembler;
class Effect;
class Technique;
class Texture2D;

/**
 * @addtogroup renderer
 * @{
 */

/**
 *  @brief Base renderer implements the basic render process.
 */
class BaseRenderer : public Ref
{
public:
    struct StageItem
    {
        Model* model = nullptr;
        InputAssembler *ia = nullptr;
        EffectVariant* effect = nullptr;
        std::vector<const Pass*> passes;
        int sortKey = -1;
    };
    typedef std::function<void(const View&, std::vector<StageItem>&)> StageCallback;
    /**
     *  @brief The default constructor.
     */
    BaseRenderer();
    
    /**
     *  @brief Initializes the base renderer.
     *  @param[in] device DeviceGraphics pointer.
     *  @param[in] programTemplates All linked programs.
     */
    bool init(DeviceGraphics* device, std::vector<ProgramLib::Template>& programTemplates);
    /**
     *  @brief Initializes the base renderer.
     *  @param[in] device DeviceGraphics pointer.
     *  @param[in] programTemplates All programs.
     *  @param[in] defaultTexture Default texture pointer.
     */
    bool init(DeviceGraphics* device, std::vector<ProgramLib::Template>& programTemplates, Texture2D* defaultTexture);
    /**
     *  @brief The default destructor.
     */
    virtual ~BaseRenderer();
    /**
     *  @brief Register a new render stage.
     *  @param[in] name Stage name.
     *  @param[in] call Stage handle callback.
     */
    void registerStage(const std::string& name, const StageCallback& callback);
    /**
     *  @brief Gets the program library pointer.
     *  @return Program library pointer.
     */
    ProgramLib* getProgramLib() const { return _programLib; };
    
protected:
    void render(const View&, const Scene* scene);
    void draw(const StageItem& item);
    void setProperty (const Effect::Property* prop);
    
    struct StageInfo
    {
    public:
        std::vector<StageItem> items;
        std::string stage = "";
    };
    
    void resetTextureUint();
    int allocTextureUnit();
    void reset();
    View* requestView();
    
    int _usedTextureUnits = 0;
    DeviceGraphics* _device = nullptr;
    ProgramLib* _programLib = nullptr;
    Program* _program = nullptr;
    Texture2D* _defaultTexture = nullptr;
    std::unordered_map<std::string, const StageCallback> _stage2fn;
    RecyclePool<DrawItem>* _drawItems = nullptr;
    RecyclePool<StageInfo>* _stageInfos = nullptr;
    RecyclePool<View>* _views = nullptr;
    
    cocos2d::Mat4* _tmpMat4 = nullptr;

    CC_DISALLOW_COPY_ASSIGN_AND_MOVE(BaseRenderer);
    
    OrderedValueMap _defines;
    size_t _definesHash = 0;
    std::string _definesKey = "";
    
    static const size_t cc_lightDirection;
    static const size_t cc_lightColor;
    static const size_t cc_lightPositionAndRange;
    static const size_t cc_shadow_map[4];
    static const size_t cc_shadow_map_lightViewProjMatrix;
    static const size_t cc_shadow_map_info;
    static const size_t cc_shadow_map_bias;
    static const size_t cc_shadow_lightViewProjMatrix;
    static const size_t cc_shadow_info;
    static const size_t cc_matView;
    static const size_t cc_matViewInv;
    static const size_t cc_matWorld;
    static const size_t cc_matWorldIT;
    static const size_t cc_matProj;
    static const size_t cc_matViewProj;
    static const size_t cc_cameraPos;
    static const size_t cc_time;
    
    static std::vector<const OrderedValueMap*> __tmp_defines__;
};

// end of renderer group
/// @}
RENDERER_END
