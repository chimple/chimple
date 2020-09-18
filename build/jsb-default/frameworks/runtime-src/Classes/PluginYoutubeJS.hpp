#pragma once
#include "base/ccConfig.h"

#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"

extern se::Object* __jsb_sdkbox_PluginYoutube_proto;
extern se::Class* __jsb_sdkbox_PluginYoutube_class;

bool js_register_sdkbox_PluginYoutube(se::Object* obj);
bool register_all_PluginYoutubeJS(se::Object* obj);
SE_DECLARE_FUNC(js_PluginYoutubeJS_PluginYoutube_playPlayList);
SE_DECLARE_FUNC(js_PluginYoutubeJS_PluginYoutube_playVideo);
SE_DECLARE_FUNC(js_PluginYoutubeJS_PluginYoutube_init);
SE_DECLARE_FUNC(js_PluginYoutubeJS_PluginYoutube_close);
SE_DECLARE_FUNC(js_PluginYoutubeJS_PluginYoutube_playVideoList);
SE_DECLARE_FUNC(js_PluginYoutubeJS_PluginYoutube_setGDPR);

