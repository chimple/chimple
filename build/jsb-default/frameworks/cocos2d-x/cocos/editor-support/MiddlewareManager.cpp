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
#include "MiddlewareManager.h"
#include "base/CCGLUtils.h"
#include "scripting/js-bindings/jswrapper/SeApi.h"
#include <algorithm>

MIDDLEWARE_BEGIN
    
MiddlewareManager* MiddlewareManager::_instance = nullptr;

MiddlewareManager::MiddlewareManager()
{
    
}

MiddlewareManager::~MiddlewareManager()
{
    for (auto it : _mbMap)
    {
        auto buffer = it.second;
        if (buffer)
        {
            delete buffer;
        }
    }
    _mbMap.clear();
}

MeshBuffer* MiddlewareManager::getMeshBuffer(int format)
{
    MeshBuffer* mb = _mbMap[format];
    if (!mb)
    {
        mb = new MeshBuffer(format);
        _mbMap[format] = mb;
    }
    return mb;
}

void MiddlewareManager::_clearRemoveList()
{
    for (std::size_t i = 0; i < _removeList.size(); i++)
    {
        auto editor = _removeList[i];
        auto it = std::find(_updateList.begin(), _updateList.end(), editor);
        if (it != _updateList.end())
        {
            _updateList.erase(it);
        }
    }
    
    _removeList.clear();
}

void MiddlewareManager::update(float dt)
{
    isUpdating = true;
    
    for (std::size_t i = 0, n = _updateList.size(); i < n; i++)
    {
        auto editor = _updateList[i];
        if (_removeList.size() > 0)
        {
            auto removeIt = std::find(_removeList.begin(), _removeList.end(), editor);
            if (removeIt == _removeList.end())
            {
                editor->update(dt);
            }
        }
        else
        {
            editor->update(dt);
        }
    }
    
    isUpdating = false;
    
    _clearRemoveList();
}

void MiddlewareManager::render(float dt)
{
    for (auto it : _mbMap)
    {
        auto buffer = it.second;
        if (buffer)
        {
            buffer->reset();
        }
    }
    
    isRendering = true;
    
    auto isOrderDirty = false;
    uint32_t maxRenderOrder = 0;
    for (std::size_t i = 0, n = _updateList.size(); i < n; i++)
    {
        auto editor = _updateList[i];
        uint32_t renderOrder = maxRenderOrder;
        if (_removeList.size() > 0)
        {
            auto removeIt = std::find(_removeList.begin(), _removeList.end(), editor);
            if (removeIt == _removeList.end())
            {
                editor->render(dt);
                renderOrder = editor->getRenderOrder();
            }
        }
        else
        {
            editor->render(dt);
            renderOrder = editor->getRenderOrder();
        }
        
        if (maxRenderOrder > renderOrder)
        {
            isOrderDirty =  true;
        }
        else
        {
            maxRenderOrder = renderOrder;
        }
    }
    
    isRendering = false;
    
    for (auto it : _mbMap)
    {
        auto buffer = it.second;
        if (buffer)
        {
            buffer->uploadIB();
            buffer->uploadVB();
        }
    }
    
    _clearRemoveList();
    
    if (isOrderDirty)
    {
        std::sort(_updateList.begin(), _updateList.end(), [](IMiddleware* it1, IMiddleware* it2)
        {
            return it1->getRenderOrder() < it2->getRenderOrder();
        });
    }
}

void MiddlewareManager::addTimer(IMiddleware* editor)
{
    auto it0 = std::find(_updateList.begin(), _updateList.end(), editor);
    if (it0 != _updateList.end()) {
        return;
    }
    
    auto it1 = std::find(_removeList.begin(), _removeList.end(), editor);
    if (it1 != _removeList.end())
    {
        _removeList.erase(it1);
    }
    _updateList.push_back(editor);
}

void MiddlewareManager::removeTimer(IMiddleware* editor)
{
    if (isUpdating || isRendering)
    {
        _removeList.push_back(editor);
    }
    else
    {
        auto it = std::find(_updateList.begin(), _updateList.end(), editor);
        if (it != _updateList.end())
        {
            _updateList.erase(it);
        }
    }
}
MIDDLEWARE_END
