import { ASSET_LOAD_METHOD } from "./lib/constants";
import { User } from "./lib/profile";

const LOGGER_CLASS = "org/chimple/bahama/logger/ChimpleLogger";

const LOGGER_METHOD = "logEvent";
const LOGGER_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const SET_USER_ID_METHOD = "setUserIdEvent";
const SET_USER_ID_SIGNATURE = "(Ljava/lang/String;)V";

const SET_USER_PROPERTY_METHOD = "setUserPropertiesEvent";
const SET_USER_PROPERTY_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)V";

const PROFILE_METHOD = "logProfile";
const PROFILE_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)V";

const DOWNLOAD_FILE_METHOD = "downloadFile";
const DOWNLOAD_FILE_METHOD_SIGNATURE =
    "(Ljava/lang/String;Ljava/lang/String;)V";

const FILE_EXISTS_METHOD = "isFileExists";
const FILE_EXISTS_METHOD_SIGNATURE = "(Ljava/lang/String;)Z";

const CHECK_URL_DOWNLOADED_METHOD = "checkIfUrlDownloaded";
const CHECK_URL_DOWNLOADED_METHOD_SIGNATURE =
    "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;";

const IS_NETWORK_AVAILABLE_METHOD = "isNetworkAvailable";
const IS_NETWORK_AVAILABLE_METHOD_SIGNATURE = "()Z";

const GET_STORAGE_DIRECTORY = "getStorageDirectory";
const GET_STORAGE_DIRECTORY_METHOD_SIGNATURE = "()Ljava/lang/String;";

const CURRENT_PROFILE_METHOD = "currentStudentId";
const CURRENT_PROFILE_METHOD_SIGNATURE = "()Ljava/lang/String;";

const DEVICE_ID_METHOD = "getDeviceId";
const DEVICE_ID_METHOD_SIGNATURE = "()Ljava/lang/String;";

const LAUNCH_YOUTUBE_METHOD = "launchYoutube";
const LAUNCH_YOUTUBE_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const REQUEST_OTP_METHOD = "requestOtp";
const REQUEST_OTP_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const VERIFY_OTP_METHOD = "verifyOtp";
const VERIFY_OTP_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const USER_ID = "userId";
const DEVICE_ID = "deviceId";
const TIMESTAMP = "timeStamp";

export default class UtilLogger {
    private static _storageDirectory = null;
    private static _currentUserId = null;
    private static _currentDeviceId = null;

    public static logEvent(eventInfo: object) {
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                eventInfo[`${USER_ID}`] = this.currentProfile() || "";
                eventInfo[`${DEVICE_ID}`] = this.currentDeviceId() || "";
                eventInfo[`${TIMESTAMP}`] = new Date().getTime();
                cc.log("logging event", JSON.stringify(eventInfo));
                if (ASSET_LOAD_METHOD != "file") {
                    jsb.reflection.callStaticMethod(
                        LOGGER_CLASS,
                        LOGGER_METHOD,
                        LOGGER_METHOD_SIGNATURE,
                        JSON.stringify(eventInfo)
                    );
                }
            }
            this.logEventToFireBase(eventInfo);
        } catch (e) {
        }
    }

    public static setUserIdEvent(userId: string) {
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("setUserId event", userId);

                jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    SET_USER_ID_METHOD,
                    SET_USER_ID_SIGNATURE,
                    userId
                );

            }
        } catch (e) {
        }
    }

    public static setUserPropertiesEvent(key: string, value) {
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("setUserPropertiesEvent event", key, ":", value);

                jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    SET_USER_PROPERTY_METHOD,
                    SET_USER_PROPERTY_SIGNATURE,
                    key,
                    value
                );

            }
        } catch (e) {
        }
    }

    public static logEventToFireBaseWithKey(key: string, data: object) {
        cc.log(
            "logging firebase event",
            key,
            " with content",
            JSON.stringify(data)
        );

        if ("undefined" != typeof sdkbox) {
            // @ts-ignore
            sdkbox.firebase.Analytics.logEvent(key, data);
        }
    }

    public static logChimpleEvent(name: string, event: any) {
        event[`${USER_ID}`] = event.userId ? event.userId : (this.currentProfile() || "");
        event[`${DEVICE_ID}`] = this.currentDeviceId() || "";
        event[`${TIMESTAMP}`] = new Date().getTime();
        UtilLogger.logEventToFireBaseWithKey(name, event);
    }

    public static logEventToFireBase(eventInfo: any) {
        eventInfo[`${USER_ID}`] = eventInfo.userId ? eventInfo.userId : (this.currentProfile() || "");
        eventInfo[`${DEVICE_ID}`] = this.currentDeviceId() || "";
        eventInfo[`${TIMESTAMP}`] = new Date().getTime();
        UtilLogger.logEventToFireBaseWithKey("logInfo", eventInfo);
    }

    public static logProfile(profileInfo: string, profileFile: string) {
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("logging profile", profileInfo, " ", profileFile);
                jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    PROFILE_METHOD,
                    PROFILE_METHOD_SIGNATURE,
                    profileInfo,
                    profileFile
                );
            }
        } catch (e) {
        }
    }

    public static currentProfile() {
        this._currentUserId = User.getCurrentUser() ? User.getCurrentUser().id : "";
        return this._currentUserId;
    }

    public static getStorageDirectory() {
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                this._storageDirectory = jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    GET_STORAGE_DIRECTORY,
                    GET_STORAGE_DIRECTORY_METHOD_SIGNATURE
                );
                cc.log("storage directory:", this._storageDirectory);
            }
        } catch (e) {
        }
        return this._storageDirectory;
    }

    public static currentDeviceId() {
        try {
            if (
                this._currentDeviceId === null &&
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                this._currentDeviceId = jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    DEVICE_ID_METHOD,
                    DEVICE_ID_METHOD_SIGNATURE
                );
                cc.log("current device Id:", this._currentDeviceId);
            }
        } catch (e) {
        }
        return this._currentDeviceId;
    }

    public static initPluginFirebase() {
        try {
            if ("undefined" == typeof sdkbox) {
                cc.log("sdkbox is undefined");
                return;
            }

            // @ts-ignore
            if ("undefined" == typeof sdkbox.firebase) {
                cc.log("sdkbox.firebase is undefined");
                return;
            }
            // @ts-ignore
            sdkbox.firebase.Analytics.init();
        } catch (e) {
        }
    }

    public static initYoutubePlugin() {
        try {
            if ("undefined" == typeof sdkbox) {
                cc.log("sdkbox is undefined");
                return;
            }

            // @ts-ignore
            if ('undefined' == typeof sdkbox.PluginYoutube) {
                cc.log('sdkbox.PluginYoutube is undefined');
                return;
            }

            // @ts-ignore
            sdkbox.PluginYoutube.init();
        } catch (e) {
        }
    }
    public static downloadFile(url: string, downloadDirectory: string) {
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID &&
                ASSET_LOAD_METHOD === "file"
            ) {
                jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    DOWNLOAD_FILE_METHOD,
                    DOWNLOAD_FILE_METHOD_SIGNATURE,
                    url,
                    downloadDirectory
                );
            }
        } catch (e) {
        }
    }

    public static isFileExists(downloadDirectory: string): boolean {
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID &&
                ASSET_LOAD_METHOD === "file"
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    FILE_EXISTS_METHOD,
                    FILE_EXISTS_METHOD_SIGNATURE,
                    downloadDirectory
                );
            }
            return false;
        } catch (e) {
        }
    }

    public static launchYoutube(videoId: string): void {
        cc.log("calling launchYoutube");
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                cc.log("calling launchYoutube 1111");
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    LAUNCH_YOUTUBE_METHOD,
                    LAUNCH_YOUTUBE_METHOD_SIGNATURE,
                    videoId
                );
            }
        } catch (e) {
        }
    }

    public static checkIfUrlDownloaded(
        url: string,
        downloadDirectory: string
    ): string {
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID &&
                ASSET_LOAD_METHOD === "file"
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    CHECK_URL_DOWNLOADED_METHOD,
                    CHECK_URL_DOWNLOADED_METHOD_SIGNATURE,
                    url,
                    downloadDirectory
                );
            }
            return null;
        } catch (e) {
        }
    }

    public static isNetworkAvailable(): boolean {
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID &&
                ASSET_LOAD_METHOD === "file"
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    IS_NETWORK_AVAILABLE_METHOD,
                    IS_NETWORK_AVAILABLE_METHOD_SIGNATURE
                );
            }
            return false;
        } catch (e) {
        }
    }

    public static requestOtp(requestOtpText: string) {
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("Request Otp event", requestOtpText);

                jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    REQUEST_OTP_METHOD,
                    REQUEST_OTP_METHOD_SIGNATURE,
                    requestOtpText
                );

            }
        } catch (e) {
        }
    }

    public static verifyOtp(verifyOtpText: string) {
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("Verify Otp event", verifyOtpText);

                jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    VERIFY_OTP_METHOD,
                    VERIFY_OTP_METHOD_SIGNATURE,
                    verifyOtpText
                );

            }
        } catch (e) {
        }
    }
}
