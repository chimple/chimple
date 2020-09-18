#include "PluginYoutubeJS.hpp"
#include "scripting/js-bindings/manual/jsb_conversions.hpp"
#include "scripting/js-bindings/manual/jsb_global.h"
#include "PluginYoutube/PluginYoutube.h"

se::Object* __jsb_sdkbox_PluginYoutube_proto = nullptr;
se::Class* __jsb_sdkbox_PluginYoutube_class = nullptr;

static bool js_PluginYoutubeJS_PluginYoutube_playPlayList(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 5) {
        std::string arg0;
        int arg1 = 0;
        int arg2 = 0;
        bool arg3;
        bool arg4;
        ok &= seval_to_std_string(args[0], &arg0);
        ok &= seval_to_int32(args[1], (int32_t*)&arg1);
        ok &= seval_to_int32(args[2], (int32_t*)&arg2);
        ok &= seval_to_boolean(args[3], &arg3);
        ok &= seval_to_boolean(args[4], &arg4);
        SE_PRECONDITION2(ok, false, "js_PluginYoutubeJS_PluginYoutube_playPlayList : Error processing arguments");
        sdkbox::PluginYoutube::playPlayList(arg0, arg1, arg2, arg3, arg4);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 5);
    return false;
}
SE_BIND_FUNC(js_PluginYoutubeJS_PluginYoutube_playPlayList)

static bool js_PluginYoutubeJS_PluginYoutube_playVideo(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 4) {
        std::string arg0;
        int arg1 = 0;
        bool arg2;
        bool arg3;
        ok &= seval_to_std_string(args[0], &arg0);
        ok &= seval_to_int32(args[1], (int32_t*)&arg1);
        ok &= seval_to_boolean(args[2], &arg2);
        ok &= seval_to_boolean(args[3], &arg3);
        SE_PRECONDITION2(ok, false, "js_PluginYoutubeJS_PluginYoutube_playVideo : Error processing arguments");
        sdkbox::PluginYoutube::playVideo(arg0, arg1, arg2, arg3);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 4);
    return false;
}
SE_BIND_FUNC(js_PluginYoutubeJS_PluginYoutube_playVideo)

static bool js_PluginYoutubeJS_PluginYoutube_init(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        sdkbox::PluginYoutube::init();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_PluginYoutubeJS_PluginYoutube_init)

static bool js_PluginYoutubeJS_PluginYoutube_close(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        sdkbox::PluginYoutube::close();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_PluginYoutubeJS_PluginYoutube_close)

static bool js_PluginYoutubeJS_PluginYoutube_playVideoList(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 5) {
        std::vector<std::string> arg0;
        int arg1 = 0;
        int arg2 = 0;
        bool arg3;
        bool arg4;
        ok &= seval_to_std_vector_string(args[0], &arg0);
        ok &= seval_to_int32(args[1], (int32_t*)&arg1);
        ok &= seval_to_int32(args[2], (int32_t*)&arg2);
        ok &= seval_to_boolean(args[3], &arg3);
        ok &= seval_to_boolean(args[4], &arg4);
        SE_PRECONDITION2(ok, false, "js_PluginYoutubeJS_PluginYoutube_playVideoList : Error processing arguments");
        sdkbox::PluginYoutube::playVideoList(arg0, arg1, arg2, arg3, arg4);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 5);
    return false;
}
SE_BIND_FUNC(js_PluginYoutubeJS_PluginYoutube_playVideoList)

static bool js_PluginYoutubeJS_PluginYoutube_setGDPR(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        bool arg0;
        ok &= seval_to_boolean(args[0], &arg0);
        SE_PRECONDITION2(ok, false, "js_PluginYoutubeJS_PluginYoutube_setGDPR : Error processing arguments");
        sdkbox::PluginYoutube::setGDPR(arg0);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_PluginYoutubeJS_PluginYoutube_setGDPR)



static bool js_sdkbox_PluginYoutube_finalize(se::State& s)
{
    CCLOGINFO("jsbindings: finalizing JS object %p (sdkbox::PluginYoutube)", s.nativeThisObject());
    auto iter = se::NonRefNativePtrCreatedByCtorMap::find(s.nativeThisObject());
    if (iter != se::NonRefNativePtrCreatedByCtorMap::end())
    {
        se::NonRefNativePtrCreatedByCtorMap::erase(iter);
        sdkbox::PluginYoutube* cobj = (sdkbox::PluginYoutube*)s.nativeThisObject();
        delete cobj;
    }
    return true;
}
SE_BIND_FINALIZE_FUNC(js_sdkbox_PluginYoutube_finalize)

bool js_register_PluginYoutubeJS_PluginYoutube(se::Object* obj)
{
    auto cls = se::Class::create("PluginYoutube", obj, nullptr, nullptr);

    cls->defineStaticFunction("playPlayList", _SE(js_PluginYoutubeJS_PluginYoutube_playPlayList));
    cls->defineStaticFunction("playVideo", _SE(js_PluginYoutubeJS_PluginYoutube_playVideo));
    cls->defineStaticFunction("init", _SE(js_PluginYoutubeJS_PluginYoutube_init));
    cls->defineStaticFunction("close", _SE(js_PluginYoutubeJS_PluginYoutube_close));
    cls->defineStaticFunction("playVideoList", _SE(js_PluginYoutubeJS_PluginYoutube_playVideoList));
    cls->defineStaticFunction("setGDPR", _SE(js_PluginYoutubeJS_PluginYoutube_setGDPR));
    cls->defineFinalizeFunction(_SE(js_sdkbox_PluginYoutube_finalize));
    cls->install();
    JSBClassType::registerClass<sdkbox::PluginYoutube>(cls);

    __jsb_sdkbox_PluginYoutube_proto = cls->getProto();
    __jsb_sdkbox_PluginYoutube_class = cls;

    se::ScriptEngine::getInstance()->clearException();
    return true;
}

bool register_all_PluginYoutubeJS(se::Object* obj)
{
    // Get the ns
    se::Value nsVal;
    if (!obj->getProperty("sdkbox", &nsVal))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        obj->setProperty("sdkbox", nsVal);
    }
    se::Object* ns = nsVal.toObject();

    js_register_PluginYoutubeJS_PluginYoutube(ns);
    return true;
}

