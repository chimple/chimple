/****************************************************************************

 Copyright (c) 2014-2016 SDKBOX Inc

 ****************************************************************************/

#ifndef _PLUGIN_Firebase_WRAPPER_H_
#define _PLUGIN_Firebase_WRAPPER_H_

#include "PluginFirebase.h"
#include "json98.h"

#define TAG "Firebase"

namespace sdkbox {
    namespace Firebase {

        class AnalyticsWrapper {
        public:
            static AnalyticsWrapper* getInstance();

            virtual bool init() = 0;
            virtual std::string getVersion() = 0;
            virtual void setUserProperty(const std::string& name, const std::string& value) = 0;
            virtual void setUserID(const std::string& userID) =0;
            virtual void setScreenName(const std::string& screen, const std::string& screenClass) =0;
            virtual void logEvent(const std::string event, const std::map<std::string, std::string> params)=0;
            virtual void resetAnalyticsData() { }
            virtual void setAnalyticsCollectionEnabled (bool enabled) { }
            
        protected:
            bool _inited = false;
        };

        class AnalyticsWrapperEnabled : public AnalyticsWrapper {
        public:
            bool init();
            std::string getVersion();
            void setUserProperty(const std::string& name, const std::string& value);
            void setUserID(const std::string& userID);
            void setScreenName(const std::string& screen, const std::string& screenClass);
            void logEvent(const std::string event, const std::map<std::string, std::string> params);

            void resetAnalyticsData();
            void setAnalyticsCollectionEnabled (bool enabled);
        protected:
            bool nativeInit(const Json& config);
            std::string nativeSDKVersion();
        };

        class AnalyticsWrapperDisabled : public AnalyticsWrapper {
        public:
            bool init() { return false; }
            std::string getVersion() { return ""; }
            void setUserProperty(const std::string& name, const std::string& value) {}
            void setUserID(const std::string& userID) {}
            void setScreenName(const std::string& screen, const std::string& screenClass) {}
            void logEvent(const std::string event, const std::map<std::string, std::string> params) {}

        };

    }
}

#endif
