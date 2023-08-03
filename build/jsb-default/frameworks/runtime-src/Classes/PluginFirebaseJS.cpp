#include "PluginFirebaseJS.hpp"
#include "scripting/js-bindings/manual/jsb_conversions.hpp"
#include "scripting/js-bindings/manual/jsb_global.h"
#include "PluginFirebase/PluginFirebase.h"

se::Object* __jsb_sdkbox_Firebase_Analytics_proto = nullptr;
se::Class* __jsb_sdkbox_Firebase_Analytics_class = nullptr;

static bool js_PluginFirebaseJS_Analytics_setUserProperty(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        std::string arg0;
        std::string arg1;
        ok &= seval_to_std_string(args[0], &arg0);
        ok &= seval_to_std_string(args[1], &arg1);
        SE_PRECONDITION2(ok, false, "js_PluginFirebaseJS_Analytics_setUserProperty : Error processing arguments");
        sdkbox::Firebase::Analytics::setUserProperty(arg0, arg1);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_setUserProperty)

static bool js_PluginFirebaseJS_Analytics_setUserID(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= seval_to_std_string(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_PluginFirebaseJS_Analytics_setUserID : Error processing arguments");
        sdkbox::Firebase::Analytics::setUserID(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_setUserID)

static bool js_PluginFirebaseJS_Analytics_logEvent(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        std::string arg0;
        std::map<std::string, std::string> arg1;
        ok &= seval_to_std_string(args[0], &arg0);
        ok &= seval_to_std_map_string_string(args[1], &arg1);
        SE_PRECONDITION2(ok, false, "js_PluginFirebaseJS_Analytics_logEvent : Error processing arguments");
        sdkbox::Firebase::Analytics::logEvent(arg0, arg1);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_logEvent)

static bool js_PluginFirebaseJS_Analytics_init(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = sdkbox::Firebase::Analytics::init();
        ok &= boolean_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_PluginFirebaseJS_Analytics_init : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_init)

static bool js_PluginFirebaseJS_Analytics_setAnalyticsCollectionEnabled(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        bool arg0;
        ok &= seval_to_boolean(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_PluginFirebaseJS_Analytics_setAnalyticsCollectionEnabled : Error processing arguments");
        sdkbox::Firebase::Analytics::setAnalyticsCollectionEnabled(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_setAnalyticsCollectionEnabled)

static bool js_PluginFirebaseJS_Analytics_setScreenName(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        std::string arg0;
        std::string arg1;
        ok &= seval_to_std_string(args[0], &arg0);
        ok &= seval_to_std_string(args[1], &arg1);
        SE_PRECONDITION2(ok, false, "js_PluginFirebaseJS_Analytics_setScreenName : Error processing arguments");
        sdkbox::Firebase::Analytics::setScreenName(arg0, arg1);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_setScreenName)

static bool js_PluginFirebaseJS_Analytics_getVersion(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = sdkbox::Firebase::Analytics::getVersion();
        ok &= std_string_to_seval(result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_PluginFirebaseJS_Analytics_getVersion : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_getVersion)

static bool js_PluginFirebaseJS_Analytics_setGDPR(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        bool arg0;
        ok &= seval_to_boolean(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_PluginFirebaseJS_Analytics_setGDPR : Error processing arguments");
        sdkbox::Firebase::Analytics::setGDPR(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_setGDPR)

static bool js_PluginFirebaseJS_Analytics_resetAnalyticsData(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        sdkbox::Firebase::Analytics::resetAnalyticsData();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_PluginFirebaseJS_Analytics_resetAnalyticsData)



static bool js_sdkbox_Firebase_Analytics_finalize(se::State& s)
{
    CCLOGINFO("jsbindings: finalizing JS object %p (sdkbox::Firebase::Analytics)", s.nativeThisObject());
    auto iter = se::NonRefNativePtrCreatedByCtorMap::find(s.nativeThisObject());
    if (iter != se::NonRefNativePtrCreatedByCtorMap::end())
    {
        se::NonRefNativePtrCreatedByCtorMap::erase(iter);
        sdkbox::Firebase::Analytics* cobj = (sdkbox::Firebase::Analytics*)s.nativeThisObject();
        delete cobj;
    }
    return true;
}
SE_BIND_FINALIZE_FUNC(js_sdkbox_Firebase_Analytics_finalize)

bool js_register_PluginFirebaseJS_Analytics(se::Object* obj)
{
    auto cls = se::Class::create("Analytics", obj, nullptr, nullptr);

    cls->defineStaticFunction("setUserProperty", _SE(js_PluginFirebaseJS_Analytics_setUserProperty));
    cls->defineStaticFunction("setUserID", _SE(js_PluginFirebaseJS_Analytics_setUserID));
    cls->defineStaticFunction("logEvent", _SE(js_PluginFirebaseJS_Analytics_logEvent));
    cls->defineStaticFunction("init", _SE(js_PluginFirebaseJS_Analytics_init));
    cls->defineStaticFunction("setAnalyticsCollectionEnabled", _SE(js_PluginFirebaseJS_Analytics_setAnalyticsCollectionEnabled));
    cls->defineStaticFunction("setScreenName", _SE(js_PluginFirebaseJS_Analytics_setScreenName));
    cls->defineStaticFunction("getVersion", _SE(js_PluginFirebaseJS_Analytics_getVersion));
    cls->defineStaticFunction("setGDPR", _SE(js_PluginFirebaseJS_Analytics_setGDPR));
    cls->defineStaticFunction("resetAnalyticsData", _SE(js_PluginFirebaseJS_Analytics_resetAnalyticsData));
    cls->defineFinalizeFunction(_SE(js_sdkbox_Firebase_Analytics_finalize));
    cls->install();
    JSBClassType::registerClass<sdkbox::Firebase::Analytics>(cls);

    __jsb_sdkbox_Firebase_Analytics_proto = cls->getProto();
    __jsb_sdkbox_Firebase_Analytics_class = cls;

    se::ScriptEngine::getInstance()->clearException();
    return true;
}

bool register_all_PluginFirebaseJS(se::Object* obj)
{
    // Get the ns
    se::Value nsVal;
    if (!obj->getProperty("sdkboxfirebase", &nsVal))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        obj->setProperty("sdkboxfirebase", nsVal);
    }
    se::Object* ns = nsVal.toObject();

    js_register_PluginFirebaseJS_Analytics(ns);
    return true;
}

