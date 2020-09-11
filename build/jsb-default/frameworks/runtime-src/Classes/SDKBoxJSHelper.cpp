
#include "SDKBoxJSHelper.h"
#include <string>
// #include <sstream>
#include "sdkbox/Sdkbox.h"

#include "cocos2d.h"
#include "base/CCScheduler.h"
#include "platform/CCApplication.h"

namespace sdkbox {

    // string toolkit
    static inline void split(const std::string& src, const std::string& token, std::vector<std::string>& vect)
    {
        size_t nend = 0;
        size_t nbegin = 0;
        size_t tokenSize = token.size();
        while(nend != std::string::npos)
        {
            nend = src.find(token, nbegin);
            if(nend == std::string::npos)
                vect.push_back(src.substr(nbegin, src.length()-nbegin));
            else
                vect.push_back(src.substr(nbegin, nend-nbegin));
            nbegin = nend + tokenSize;
        }
    }

    void JSListenerBase::setJSDelegate(const se::Value& jsDelegate) {
        _JSDelegate.setObject(jsDelegate.toObject(), true);
    }

    const se::Value& JSListenerBase::getJSDelegate() {
        return _JSDelegate;
    }

    void JSListenerBase::invokeJSFun(const std::string& funName, const se::ValueArray& params) {
        for (int i = 0; i < params.size(); i++) {
            const se::Value& param = params.at(i);
            if (param.isObject()) {
                param.toObject()->root();
            }
        }

        cocos2d::Application::getInstance()->getScheduler()->performFunctionInCocosThread([funName, params, this](){
            this->invokeJSFunNow(funName, params);
        });
    }

    void JSListenerBase::invokeJSFunNow(const std::string& funName, const se::ValueArray& params) {
        se::ScriptEngine::getInstance()->clearException();
        se::AutoHandleScope hs;
        if (!_JSDelegate.isObject())
            return;

        se::Value func;
        _JSDelegate.toObject()->getProperty(funName.c_str(), &func);

        if (func.isObject() && func.toObject()->isFunction()) {
            bool ok = func.toObject()->call(params, _JSDelegate.toObject());
            if (!ok) {
                se::ScriptEngine::getInstance()->clearException();
            }
        }
        for (int i = 0; i < params.size(); i++) {
            const se::Value& param = params.at(i);
            if (param.isObject()) {
                param.toObject()->unroot();
            }
        }
    }

    se::Value getPluginValue(se::Object* obj, const std::string& name) {
        std::vector<std::string> vect;
        sdkbox::split(name, ".", vect);

        se::Value parent(obj, true);
        se::Value ret;
        for (auto n : vect) {
            se::Object* pObj = parent.toObject();
            if (nullptr == pObj) {
                // shoudn't be here
                break;
            }
            if (!pObj->getProperty(n.c_str(), &ret)) {
                // shouldn't be here
                break;
            }
            parent.setObject(ret.toObject(), true);
        }
        return ret;
    }
}

/**
 *
 * sdkbox.init
 * sdkbox.getConfig
 * sdkbox.setConfig
 *
 */

static bool js_SDKBox_init(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (2 == argc || 3 == argc || 4 == argc) {
        const char* arg0 = nullptr;
        const char* arg1 = nullptr;
        const char* arg2 = "all";
        bool arg3 = false;

        std::string arg0_tmp; ok &= seval_to_std_string(args[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
        std::string arg1_tmp; ok &= seval_to_std_string(args[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
        
        if (3 == argc || 4 == argc) {
            std::string arg2_tmp; ok &= seval_to_std_string(args[2], &arg2_tmp); arg2 = arg2_tmp.c_str();
        }
        if (4 == argc) {
            ok &= seval_to_boolean(args[3], &arg3);
        }

        SE_PRECONDITION2(ok, false, "js_SDKBox_init : Error processing arguments");

        if (2 == argc) {
            sdkbox::init(arg0, arg1);
        } else if (3 == argc) {
            sdkbox::init(arg0, arg1, arg2);
        } else if (4 == argc) {
            sdkbox::init(arg0, arg1, arg2, arg3);
        }
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_SDKBox_init)

static bool js_SDKBox_getConfig(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = sdkbox::getConfig();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_SDKBox_getConfig : Error processing arguments");
        return true;
    }
    if (argc == 1) {
        const char* arg0 = nullptr;
        std::string arg0_tmp; ok &= seval_to_std_string(args[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
        SE_PRECONDITION2(ok, false, "js_SDKBox_getConfig : Error processing arguments");

        std::string result = sdkbox::getConfig(arg0);
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_SDKBox_getConfig : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_SDKBox_getConfig)

static bool js_SDKBox_setConfig(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        const char* arg0 = nullptr;
        std::string arg0_tmp; ok &= seval_to_std_string(args[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
        SE_PRECONDITION2(ok, false, "js_SDKBox_setConfig : Error processing arguments");

        sdkbox::setConfig(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_SDKBox_setConfig)

bool register_all_SDKBoxJS_helper(se::Object* obj)
{
    se::Value nsVal;
    if (!obj->getProperty("sdkbox", &nsVal))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        obj->setProperty("sdkbox", nsVal);
    }

    auto pluginValue = sdkbox::getPluginValue(obj, "sdkbox");
    auto plugin = pluginValue.toObject();
    plugin->defineFunction("getConfig", _SE(js_SDKBox_getConfig));
    plugin->defineFunction("setConfig", _SE(js_SDKBox_setConfig));
    plugin->defineFunction("init", _SE(js_SDKBox_init));

    se::ScriptEngine::getInstance()->clearException();
    return true;
}
