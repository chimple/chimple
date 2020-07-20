#pragma once
#include "base/ccConfig.h"

#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"

extern se::Object* __jsb_sdkbox_Firebase_Analytics_proto;
extern se::Class* __jsb_sdkbox_Firebase_Analytics_class;

bool js_register_sdkbox_Firebase_Analytics(se::Object* obj);
bool register_all_PluginFirebaseJS(se::Object* obj);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_setUserProperty);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_setUserID);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_logEvent);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_init);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_setAnalyticsCollectionEnabled);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_setScreenName);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_getVersion);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_setGDPR);
SE_DECLARE_FUNC(js_PluginFirebaseJS_Analytics_resetAnalyticsData);

