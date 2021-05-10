import {ASSET_LOAD_METHOD, firebaseConfigWeb, Mode} from "./lib/constants";
import Profile, {CURRENTMODE, User} from "./lib/profile";
import {AcceptTeacherRequest} from "./services/ServiceApi";
import {ACCEPT_TEACHER_REQUEST} from "../../chimple";

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

const GET_COUNTRY_CODE_METHOD = "getCountryCode";
const GET_COUNTRY_CODE_METHOD_SIGNATURE = "()Ljava/lang/String;";

const DEVICE_ID_METHOD = "getDeviceId";
const DEVICE_ID_METHOD_SIGNATURE = "()Ljava/lang/String;";

const LAUNCH_YOUTUBE_METHOD = "launchYoutube";
const LAUNCH_YOUTUBE_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const REQUEST_OTP_METHOD = "requestOtp";
const REQUEST_OTP_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const VERIFY_OTP_METHOD = "verifyOtp";
const VERIFY_OTP_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const SYNC_FMC_METHOD = "syncFmcForUsers";
const SYNC_FMC_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const SUBSCRIBE_TOPIC_METHOD = "subscribeToTopic";
const SUBSCRIBE_TOPIC_METHOD_SIGNATURE = "(Ljava/lang/String;)V";

const INITIALIZED = "init";
const INITIALIZED_MEHTOD_SIGNATURE = "()V";

const LOGIN_METHOD = "login";
const LOGIN_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)V";

const FIND_SCHOOL_METHOD = "findSchool";
const FIND_SCHOOL_METHOD_SIGNATURE = "(Ljava/lang/String;)Ljava/lang/String;";

const FETCH_SECTIONS_METHOD = "fetchSectionsForSchool";
const FETCH_SECTIONS_METHOD_SIGNATURE = "(Ljava/lang/String;)Ljava/lang/String;";

const FETCH_STUDENTS_METHOD = "fetchStudentsForSchoolAndSection";
const FETCH_STUDENTS_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;";

const SYNC_PROFILE_METHOD = "syncProfile";
const SYNC_PROFILE_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V";


const HISTORICAL_PROGRESS_METHOD = "historyProgress";
const HISTORICAL_PROGRESS_METHOD_SIGNATURE = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V";

const USER_ID = "userId";
const DEVICE_ID = "deviceId";
const TIMESTAMP = "timeStamp";

export default class UtilLogger {
    private static _storageDirectory = null;
    private static _currentUserId = null;
    private static _currentDeviceId = null;
    private static _isfireBaseInitialized: boolean = false;
    private static firebase: any;

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

        if (cc.sys.isBrowser) {
            if (!UtilLogger._isfireBaseInitialized) {
                (async () => {
                    UtilLogger._isfireBaseInitialized = true;
                    await UtilLogger.importFirebaseForWeb();
                    if (UtilLogger.firebase) {
                        UtilLogger.firebase.initializeApp(firebaseConfigWeb);
                        UtilLogger.firebase.analytics();
                        UtilLogger.firebase.analytics().logEvent(key, data);
                    }
                })();
            } else {
                UtilLogger.firebase ? UtilLogger.firebase.analytics().logEvent(key, data) : '';
            }
        }
    }

    static async importFirebaseForWeb() {
        // @ts-ignore
        UtilLogger.firebase = await import("firebase/app");
        // @ts-ignore
        await import("firebase/analytics");
    }

    public static logChimpleEvent(name: string, event: any) {
        event[`${USER_ID}`] = this.currentProfile() || "";
        event[`${DEVICE_ID}`] = this.currentDeviceId() || "";
        event[`${TIMESTAMP}`] = new Date().getTime();
        UtilLogger.logEventToFireBaseWithKey(name, event);
    }

    public static logEventToFireBase(eventInfo: any) {
        eventInfo[`${USER_ID}`] = this.currentProfile() || "";
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

    public static init(): void {
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                cc.log("calling init");
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    INITIALIZED,
                    INITIALIZED_MEHTOD_SIGNATURE
                );
            }
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

    public static getCountryCode(): string {
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    GET_COUNTRY_CODE_METHOD,
                    GET_COUNTRY_CODE_METHOD_SIGNATURE
                );
            }
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

    public static syncFmcTokenForUsers() {
        const u = User.getUserIds() || [];
        const userIds: string = u.join(",");
        console.log("syncFmcTokenForUsers:" + userIds);
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("sync fmc userIds", userIds);

                jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    SYNC_FMC_METHOD,
                    SYNC_FMC_METHOD_SIGNATURE,
                    userIds
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    public static subscribeToTopic(topicId: string) {
        try {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && topicId && topicId.length > 0) {
                cc.log("subscribe to topic", topicId);

                jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    SUBSCRIBE_TOPIC_METHOD,
                    SUBSCRIBE_TOPIC_METHOD_SIGNATURE,
                    topicId
                );
            }
        } catch (e) {
        }
    }

    public static login(email: string, password: string): void {
        cc.log(`login using email: ${email} and password: ${password}`);
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    LOGIN_METHOD,
                    LOGIN_METHOD_SIGNATURE,
                    email,
                    password
                );
            }
        } catch (e) {
        }
    }

    public static fetchStudents(schoolId: string, sectionId: string): any {
        cc.log(`fetch Students: ${schoolId} and password: ${sectionId}`);
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    FETCH_STUDENTS_METHOD,
                    FETCH_STUDENTS_METHOD_SIGNATURE,
                    schoolId,
                    sectionId
                );
            }
        } catch (e) {
        }
    }

    public static findSchool(email: string): any {
        cc.log(`find school using email: ${email}`);
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    FIND_SCHOOL_METHOD,
                    FIND_SCHOOL_METHOD_SIGNATURE,
                    email
                );
            }
        } catch (e) {
        }
    }

    public static fetchSections(schoolId: string): any {
        cc.log(`fetch Sections: ${schoolId}`);
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    FETCH_SECTIONS_METHOD,
                    FETCH_SECTIONS_METHOD_SIGNATURE,
                    schoolId
                );
            }
        } catch (e) {
        }
    }

    public static historyProgress(chapterId: string, chapterName: string, lessonId: string,
                                  lessonName: string, progressId: string, school: string,
                                  section: string, subjectCode: string, score: string) {
        cc.log(`historyProgress for: ${chapterId}-${chapterName}-${lessonId}-${progressId}`);
        try {
            if (
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    HISTORICAL_PROGRESS_METHOD,
                    HISTORICAL_PROGRESS_METHOD_SIGNATURE,
                    chapterId,
                    chapterName,
                    lessonId,
                    lessonName,
                    progressId,
                    school,
                    section,
                    subjectCode,
                    score
                );
            }
        } catch (e) {
        }
    }

    public static syncProfile(schoolId: string, sectionId: string, studentId: string, profile: string, progressId: string): void {
        cc.log(`syncProfile for: ${schoolId}-${sectionId}-${studentId}-${progressId}`);
        try {
            let mode = parseInt(Profile.getValue(CURRENTMODE));
            if (
                mode === Mode.School &&
                cc.sys.isNative &&
                cc.sys.os == cc.sys.OS_ANDROID
            ) {
                return jsb.reflection.callStaticMethod(
                    LOGGER_CLASS,
                    SYNC_PROFILE_METHOD,
                    SYNC_PROFILE_METHOD_SIGNATURE,
                    schoolId,
                    sectionId,
                    studentId,
                    profile,
                    progressId
                );
            }
        } catch (e) {
        }
    }

    public static processLinkStudent(sectionId: string, schoolId: string,
                                     studentId: string, schoolName: string,
                                     sectionName: string, otpCode: string = null) {

        const user = User.getCurrentUser();
        if (user != null) {
            user.sectionId = sectionId;
            user.schoolId = schoolId;
            user.studentId = studentId;
            user.schoolName = schoolName;
            user.sectionName = sectionName;
            user.isConnected = true;
            user.storeUser();

            const request: AcceptTeacherRequest = {
                teacherId: user.schoolId,
                sectionId: user.sectionId,
                studentId: user.id,
                studentName: user.name,
                firebaseStudentId: user.studentId,
                otpCode: otpCode
            }
            UtilLogger.logChimpleEvent(ACCEPT_TEACHER_REQUEST, request);
            UtilLogger.subscribeToTopic(`assignment-${user.schoolId}-${user.sectionId}`)
            const key = `teacher_for_student_${user.id}`;
            const teachersForStudent: string[] = JSON.parse(cc.sys.localStorage.getItem(key) || '[]');
            teachersForStudent.push(user.sectionName);
            cc.sys.localStorage.setItem(key, JSON.stringify(teachersForStudent));
        }
    }
}
