
#include "PluginYoutubeJSHelper.h"
#include "SDKBoxJSHelper.h"
#include "PluginYoutube/PluginYoutube.h"

class YoutubeListenerJS : public sdkbox::YoutubeListener, public sdkbox::JSListenerBase
{
public:
    YoutubeListenerJS():sdkbox::JSListenerBase() {
    }

    virtual void onPlayEnds(bool played_ok)
    {
        RUN_ON_MAIN_THREAD_BEGIN
        MAKE_V8_HAPPY
        se::ValueArray args;
        args.push_back(se::Value(played_ok));
        invokeJSFun(funcName, args);
        RUN_ON_MAIN_THREAD_END
    }
};

static bool js_PluginYoutubeJS_setListener(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc == 1)
    {
        YoutubeListenerJS* nativeDelegate = dynamic_cast<YoutubeListenerJS*>(sdkbox::PluginYoutube::getListener());
        if (!nativeDelegate) {
            nativeDelegate = new (std::nothrow) class YoutubeListenerJS();
            sdkbox::PluginYoutube::setListener(nativeDelegate);
        }
        nativeDelegate->setJSDelegate(args[0]);

        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
SE_BIND_FUNC(js_PluginYoutubeJS_setListener)

extern se::Class* __jsb_sdkbox_PluginYoutube_class;
bool register_all_PluginYoutubeJS_helper(se::Object* obj)
{
    auto pluginValue = sdkbox::getPluginValue(obj, "sdkbox.PluginYoutube");
    auto plugin = pluginValue.toObject();
    plugin->defineFunction("setListener", _SE(js_PluginYoutubeJS_setListener));

    se::ScriptEngine::getInstance()->clearException();
    return true;
}
