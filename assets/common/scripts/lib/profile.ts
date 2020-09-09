import UtilLogger from "../util-logger";
import Config from "./config";
import { Queue } from "../../../queue";
import { CURRENT_STUDENT_ID } from "./constants";
import { Course } from "./convert";
import { Util } from "../util";

const WORLD = "World";
const LEVEL = "Level";
export const SFX_OFF = "sfxOff";
export const GENDER = "gender";
export const MUSIC_OFF = "musicOff";
export const AGE = "age";
export const USER_ID = "UserId";
export const MAX_USERS = 3;
export const MAX_AGE = 12;
export const LANGUAGE = "language";
export const EMAIL = "email";
export const CONTACT = "contact";
export const PASSWORD = "password";

export enum Gender {
    BOY,
    GIRL,
    UNKNOWN
}

export interface UserAttribute {
    id: string,
    name?: string,
    age?: number,
    gender?: Gender,
    imgPath?: string,
    avatarImage?: string,
    isTeacher?: boolean
}

export interface CourseProgress {
    currentLessonId: string;
}

export class CourseProgressClass implements CourseProgress {
    currentLessonId = null;
}

export interface LessonProgress {
    score: number;
    quizAttempts: number;
}

export class LessonProgressClass implements LessonProgress {
    score: number;
    quizAttempts: number;

    constructor(score: number, quizAttempts: number = 0) {
        this.score = score;
        this.quizAttempts = quizAttempts;
    }
}

export enum Language {
    ENGLISH,
    HINDI,
}

export const availLanguages = ["english", "hindi"];
export const languageSelect = [
    ["english", "A", "#FFBC00"],
    ["हिन्दी", "अ", "#3E99E7"],
    ["english", "C", "#3CBD93"],
    ["hindi", "Z", "#F55B5D"]
];

export class User {
    private static _currentUser: User;
    private _id: string;
    private _name: string;
    private _age: number;
    private _gender: Gender;
    private _imgPath: string;
    private _avatarImage: string;
    private _sfxOff: boolean;
    private _musicOff: boolean;
    private _inventory: object;
    private _currentBg: string;
    private _currentCharacter: string;
    private _courseProgressMap: Map<string, CourseProgress>;
    private _lessonProgressMap: Map<string, LessonProgress>;
    private _unlockedInventory: object;
    private _isTeacher: boolean;

    constructor(
        id: string,
        name: string,
        age: number,
        gender: Gender,
        imgPath: string,
        avatarImage: string,
        isTeacher: boolean,
        sfxOff: boolean,
        musicOff: boolean,
        inventory: object,
        currentBg: string,
        currentCharacter: string,
        courseProgressMap: Map<string, CourseProgress>,
        lessonProgressMap: Map<string, LessonProgress>,
        unlockedInventory: object
    ) {
        this._id = id;
        this._name = name;
        this._age = age;
        this._gender = gender;
        this._imgPath = imgPath;
        this._avatarImage = avatarImage;
        this._isTeacher = isTeacher;
        this._inventory = inventory;
        this._unlockedInventory = unlockedInventory;
        this._currentBg = currentBg;
        this._currentCharacter = currentCharacter;
        this._courseProgressMap = courseProgressMap;
        this._lessonProgressMap = lessonProgressMap;
    }

    set id(id: string) {
        this._id = id;
        this._storeUser();
    }

    get id(): string {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
        this._storeUser();
    }

    get name(): string {
        return this._name;
    }

    set age(age: number) {
        console.log("came setting age", age);
        this._age = age;
        this._storeUser();
    }

    get age(): number {
        return this._age;
    }

    set gender(gender: Gender) {
        this._gender = gender;
        this._storeUser();
    }

    get gender(): Gender {
        return this._gender;
    }

    set imgPath(imgPath: string) {
        this._imgPath = imgPath;
        this._storeUser();
    }

    get imgPath(): string {
        return this._imgPath;
    }

    set avatarImage(avatarImage: string) {
        console.log(" avatar image : ", avatarImage);
        this._avatarImage = avatarImage;
        this._storeUser();
    }

    get avatarImage(): string {
        return this._avatarImage;
    }

    set inventory(inventory: object) {
        this._inventory = inventory;
        this._storeUser();
    }

    get inventory(): object {
        return this._inventory;
    }

    set currentBg(currentBg: string) {
        this._currentBg = currentBg;
        this._storeUser();
    }

    get currentBg(): string {
        return this._currentBg;
    }

    set currentCharacter(currentCharacter: string) {
        this._currentCharacter = currentCharacter;
        this._storeUser();
    }

    get currentCharacter(): string {
        return this._currentCharacter;
    }

    set courseProgressMap(courseProgressMap: Map<string, CourseProgress>) {
        this._courseProgressMap = courseProgressMap;
    }

    get courseProgressMap(): Map<string, CourseProgress> {
        return this._courseProgressMap;
    }

    set lessonProgressMap(lessonProgressMap: Map<string, LessonProgress>) {
        this._lessonProgressMap = lessonProgressMap;
    }

    get lessonProgressMap(): Map<string, LessonProgress> {
        return this._lessonProgressMap;
    }

    set unlockedInventory(unlockedInventory: object) {
        this._unlockedInventory = {};
        this._storeUser();
    }

    get unlockedInventory(): object {
        return this._unlockedInventory;
    }

    set isTeacher(isTeacher: boolean) {
        this._isTeacher = isTeacher;
        this._storeUser();
    }

    unlockInventoryForItem(item: string) {
        this._unlockedInventory[item] = true;
        this._storeUser();
    }

    updateLessonProgress(lessonId: string, score: number) {
        if (this._lessonProgressMap.has(lessonId)) {
            if (score > this._lessonProgressMap.get(lessonId).score) {
                this._lessonProgressMap.get(lessonId).score = score;
            }
        } else {
            this._lessonProgressMap.set(lessonId, new LessonProgressClass(score));
        }
        this._storeUser();
    }

    private _storeUser() {
        User.storeUser(this);
    }

    static storeUser(user: User) {
        cc.sys.localStorage.setItem(user.id, User.toJson(user));
        let profileInfo = {
            profile  : User.toJson(user),
            kind     : 'Profile',
            studentId: cc.sys.localStorage.getItem(CURRENT_STUDENT_ID)
        };

        // log to ff userProfile
        UtilLogger.logChimpleEvent("userProfile", {
            userAge: user.age,
            gender : user.gender,
            userId : user.id
        });
        Queue.getInstance().push(profileInfo);
    }

    static createUser(
        name: string,
        imgPath: string,
        age: number,
        gender: Gender,
        id: string = null,
        avatarImage: string = null,
        isTeacher: boolean = false
    ): User {
        let uid = !!id ? id : new Date().toISOString();
        let user = new User(
            uid,
            name,
            age,
            gender,
            imgPath,
            avatarImage,
            isTeacher,
            true,
            true,
            {},
            "",
            "bear",
            new Map([
                ['test-lit', new CourseProgressClass()],
                ['test-maths', new CourseProgressClass()]
            ]),
            new Map(),
            {}
        );
        User.storeUser(user);
        let userIds = User.getUserIds();
        if (userIds == null) {
            userIds = [uid];
        } else {
            userIds.push(uid);
        }
        User.setUserIds(userIds);
        console.log("User created ", User.fromJson(cc.sys.localStorage.getItem(uid)));
        return user;
    }

    static getUsers(): Array<User> {
        let response = [];
        const userIdList = User.getUserIds();
        if (userIdList != null) {
            userIdList.forEach((id) => {
                let user = User.fromJson(
                    cc.sys.localStorage.getItem(id)
                );
                response.push(user);
            });
        }
        return response;
    }

    private static getUserIds() {
        return JSON.parse(cc.sys.localStorage.getItem(USER_ID)) as Array<string>;
    }

    private static setUserIds(userId: string[]) {
        cc.sys.localStorage.setItem(USER_ID, JSON.stringify(userId));
        console.log("User Id aray created ", JSON.parse(cc.sys.localStorage.getItem(USER_ID)));
    }

    static fromJson(jsonStr: string): User {
        const data = JSON.parse(jsonStr);
        if (!data) return null;
        const courseProgressMap = new Map<string, CourseProgress>();
        for (const key in data.courseProgressMap) {
            courseProgressMap.set(key, data.courseProgressMap[key]);
        }
        const lessonProgressMap = new Map<string, LessonProgress>();
        for (const key in data.lessonProgressMap) {
            lessonProgressMap.set(key, data.lessonProgressMap[key]);
        }
        let user = new User(
            data.id,
            data.name,
            data.age,
            data.gender,
            data.imgPath,
            data.avatarImage,
            data.isTeacher,
            data.sfxOff,
            data.musicOff,
            data.inventory,
            data.currentBg,
            data.currentCharacter,
            courseProgressMap,
            lessonProgressMap,
            data.unlockedInventory
        );
        return user;
    }

    static toJson(user: User): string {
        const courseProgressObj = {};
        user.courseProgressMap.forEach((cp, name) => {
            courseProgressObj[name] = cp;
        });
        const lessonProgressObj = {};
        user.lessonProgressMap.forEach((lp, id) => {
            lessonProgressObj[id] = lp;
        });
        return JSON.stringify({
            'id'               : user.id,
            'name'             : user.name,
            'age'              : user.age,
            'gender'           : user.gender,
            'imgPath'          : user.imgPath,
            'avatarImage'      : user.avatarImage,
            'isTeacher'        : user.isTeacher,
            'sfxOff'           : user._sfxOff,
            'musicOff'         : user._musicOff,
            'inventory'        : user.inventory,
            'currentBg'        : user.currentBg,
            'currentCharacter' : user.currentCharacter,
            'courseProgressMap': courseProgressObj,
            'lessonProgressMap': lessonProgressObj,
            'unlockedInventory': user.inventory
        });
    }

    static setCurrentUser(user: User) {
        this._currentUser = user;
    }

    static getCurrentUser() {
        return this._currentUser;
    }

    static getUser(uid: string): User {
        return User.fromJson(cc.sys.localStorage.getItem(uid));
    }

    static deleteUser(id: string) {
        cc.sys.localStorage.removeItem(id);
        const userIds = User.getUserIds();
        let index = userIds.indexOf(id);
        userIds.splice(index, 1);
        cc.sys.localStorage.setItem(USER_ID, JSON.stringify(userIds));
    }

    static createUserOrFindExistingUser(userAttribute: UserAttribute): User {
        const existingUser: User = this.getUser(userAttribute.id);
        if (!!existingUser) return existingUser;

        return User.createUser(
            userAttribute.name,
            userAttribute.imgPath,
            userAttribute.age,
            userAttribute.gender,
            userAttribute.id,
            userAttribute.avatarImage || userAttribute.imgPath,
            userAttribute.isTeacher
        );
    }
}

// Do not use anymore
export default class Profile {
    static _profile = {};
    static _loaded: boolean = false;
    static _userIdList = [];
    static _settings = {};

    static initialize() {
        if (Object.keys(this._settings).length == 0) {
            this.setValue(LANGUAGE, availLanguages[0]);
            this.setValue(SFX_OFF, "false");
            this.setValue(MUSIC_OFF, "false");
        }
    }

    static getValue(item: string) {
        return this._settings[item];
    }

    static setValue(item: string, value: string) {
        this._settings[item] = value;
        cc.sys.localStorage.setItem(item, value);
    }

    static getItem(item: string): number {
        return Number(this._profile[item] || 0);
    }

    static deleteItem(item: string): number {
        return Number(this._profile[item] || 0);
    }

    static setItem(item: string, val: number) {
        this._profile[item] = val;
        cc.sys.localStorage.setItem(
            UtilLogger.currentProfile(),
            JSON.stringify(this._profile)
        );
    }

    static fromJsonUsingParse(parseStoredProfile: string) {
        // load from Parse Student (logged in)
        let parsedStoredProfile = JSON.parse(parseStoredProfile || '{}');
        const currentStudentProfile = UtilLogger.currentProfile();
        cc.sys.localStorage.setItem(currentStudentProfile, JSON.stringify(parsedStoredProfile));
    }

    static toJson() {
        if (CC_JSB) {
            const currentStudentProfile = UtilLogger.currentProfile();
            const profileFile = `${currentStudentProfile}.json`;
            cc.log(
                "writing profile information to ",
                profileFile,
                JSON.stringify(this._profile)
            );
            UtilLogger.logProfile(JSON.stringify(this._profile), profileFile);
        }
    }

    static get lastWorld(): number {
        return this.getItem(Config.getInstance().courseId + WORLD);
    }

    static set lastWorld(newVal: number) {
        this.setItem(Config.getInstance().courseId + WORLD, newVal);
        this.setItem(Config.getInstance().courseId + LEVEL, 0);
        this.toJson();
    }

    static get lastLevel(): number {
        return this.getItem(Config.getInstance().courseId + LEVEL);
    }

    static set lastLevel(newVal) {
        if (this.lastLevel < newVal) {
            this.setItem(Config.getInstance().courseId + LEVEL, newVal);
            this.toJson();
        }
    }

    static isGameCompleted(world: number, level: number, game: string): boolean {
        return (
            this.getItem(
                Config.getInstance().courseId + "_" + world + "_" + level + "_" + game
            ) == 1
        );
    }

    static setGameCompleted(
        world: number,
        level: number,
        game: string,
        completed: boolean = true
    ) {
        this.setItem(
            Config.getInstance().courseId + "_" + world + "_" + level + "_" + game,
            completed ? 1 : 0
        );
        this.toJson();
    }

    static async teacherPostLoginActivity(objectId: string) {
        const currentUser: User = User.createUserOrFindExistingUser({
                id: objectId
            }
        );
        User.setCurrentUser(currentUser);
        let courseProgress = {};
        // const subjects: ParseSubject[] = await ParseApi.getAllSubjects();
        // subjects.forEach(
        //     (p: ParseSubject) => {
        //         courseProgress[p.courseCode] = {
        //             'currentLesson'   : '1',
        //             'completedLessons': []
        //         };
        //     }
        // );
        // currentUser.courseProgress = courseProgress;
    }
}
