declare module sdkbox {     module PluginFirebase {        export function init() : boolean;
    }}declare module sdkbox::Firebase {     module Analytics {        /**        * Set GDPR        *        * **NOTE**: please call before 'init' function        */        export function setGDPR(enabled : boolean) : void;
        /**        *  initialize the plugin instance.        */        export function init() : boolean;
        /**        * Use this to get the version of the SDK.        * @return The version of the SDK.        */        export function getVersion() : string;
        export function setUserProperty(name : string , value : string) : void;
        export function setUserID(userID : string) : void;
        export function setScreenName(screen : string , screenClass : string) : void;
        export function logEvent(event : string , params : Map<string, string>) : void;
        /**        * Clears all analytics data for this instance from the device and resets the app instance ID.        * FIRAnalyticsConfiguration values will be reset to the default values.        */        export function resetAnalyticsData() : void;
        /**        * Sets whether analytics collection is enabled for this app on this device.        * This setting is persisted across app sessions. By default it is enabled. (Only for Android)        */        export function setAnalyticsCollectionEnabled(enabled : boolean) : void;
    }}