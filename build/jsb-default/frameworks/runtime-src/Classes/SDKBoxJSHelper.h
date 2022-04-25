
#pragma once

#include <map>
#include <vector>
#include <string>

#ifdef SDKBOX_JSBINDING_CC3

#include "cocos/bindings/jswrapper/SeApi.h"
#include "cocos/bindings/manual/jsb_conversions.h"
#include "cocos/platform/Application.h"

#define AppNS cc::Application

#else

#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "scripting/js-bindings/manual/jsb_conversions.hpp"
#include "scripting/js-bindings/manual/jsb_global.h"

#include "cocos2d.h"
#include "base/CCScheduler.h"
#include "platform/CCApplication.h"

#define AppNS cocos2d::Application

#endif

#define MAKE_V8_HAPPY \
se::ScriptEngine::getInstance()->clearException(); \
se::AutoHandleScope hs;

#define RUN_ON_MAIN_THREAD_BEGIN \
auto funcName = __FUNCTION__; \
auto scheduler = AppNS::getInstance()->getScheduler(); \
scheduler->performFunctionInCocosThread([=]() {

#define RUN_ON_MAIN_THREAD_END });

namespace sdkbox {
    class JSListenerBase {
    public:
        void setJSDelegate(const se::Value& jsDelegate);
        const se::Value& getJSDelegate();

        void invokeJSFun(const std::string& funName, const se::ValueArray& params = se::EmptyValueArray);
        void invokeJSFunNow(const std::string& funName, const se::ValueArray& params = se::EmptyValueArray);

    protected:
        se::Value _JSDelegate;
    };

    se::Value getPluginValue(se::Object* obj, const std::string& name);
}

bool register_all_SDKBoxJS_helper(se::Object* obj);
SE_DECLARE_FUNC(js_SDKBox_init);
SE_DECLARE_FUNC(js_SDKBox_getConfig);
SE_DECLARE_FUNC(js_SDKBox_setConfig);
