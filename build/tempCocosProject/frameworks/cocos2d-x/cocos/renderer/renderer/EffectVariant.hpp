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

#include <stdio.h>
#include "../Macro.h"
#include "Technique.h"
#include "base/CCValue.h"
#include "Effect.h"

RENDERER_BEGIN

class EffectVariant : public EffectBase
{
public:
    using Property = Technique::Parameter;
    
    EffectVariant(Effect* effect);
    EffectVariant();
    ~EffectVariant();
    
    void updateHash(double hash) { _hash = hash; };
    const double getHash() const {return _hash; };
    
    const Effect* getEffect () const { return _effect; }
    void setEffect (Effect* effect);
    
    Vector<Pass*>& getPasses() { return _passes; }
    const Vector<Pass*>& getPasses() const { return _passes; }
    
    void copy(const EffectVariant* effect);
private:
    double _hash = 0;
    bool _dirty = false;
    
    Effect* _effect;
    Vector<Pass*> _passes;
};

RENDERER_END
