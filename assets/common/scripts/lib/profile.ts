import { ASSET_LOAD_METHOD } from "./constants";
import UtilLogger from "../util-logger";
import Config from "./config";
import { ParseApi } from "../../../private/services/parseApi";
import { ParseSubject } from "../../../private/domain/parseSubject";
import { TEACHER_REPORT_CARD_SCENE } from "../../../chimple";

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
    isTeacher?: boolean
}

export enum Language {
    ENGLISH,
    HINDI,
}

export const availLanguages = ["english", "hindi"];

export class User {
    private static _currentUser: User;
    private _id: string;
    private _name: string;
    private _age: number;
    private _gender: Gender;
    private _imgPath: string;
    private _sfxOff: boolean;
    private _musicOff: boolean;
    private _inventory: object;
    private _currentBg: string;
    private _currentCharacter: string;
    private _courseProgress: object;
    private _unlockedInventory: object;
    private _isTeacher: boolean;

    constructor(
        id: string,
        name: string,
        age: number,
        gender: Gender,
        imgPath: string,
        sfxOff: boolean,
        musicOff: boolean,
        inventory: object,
        currentBg: string,
        currentCharacter: string,
        courseProgress: object,
        unlockedInventory: object
    ) {
        this._id = id;
        this._name = name;
        this._age = age;
        this._gender = gender;
        this._imgPath = imgPath;
        this._inventory = inventory;
        this._unlockedInventory = unlockedInventory;
        this._currentBg = currentBg;
        this._currentCharacter = currentCharacter;
        this._courseProgress = courseProgress;
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

    set courseProgress(courseProgress: object) {
        this._courseProgress = courseProgress;
    }

    get courseProgress(): object {
        return this._courseProgress;
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

    private _storeUser() {
        User.storeUser(this);
    }

    static storeUser(user: User) {
        cc.sys.localStorage.setItem(user.id, JSON.stringify(user));
        ParseApi.updateProfile(JSON.stringify(user))
            .then(r => cc.log('successfully updated profile ', user))
            .catch(err => cc.log('failed to update profile ', user, ' with error ', err));
    }

    static createUser(
        name: string,
        imgPath: string,
        age: number,
        gender: Gender,
        id: string = null,
        isTeacher: boolean = false
    ): User {
        let uid = !!id ? id : new Date().toISOString();
        let user = new User(
            uid,
            name,
            age,
            gender,
            imgPath,
            true,
            true,
            {},
            "",
            "bear",
            {
                'en'      : {'currentLesson': '1', 'completedLessons': []},
                'en-maths': {'currentLesson': '1', 'completedLessons': []}
            },
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
        console.log("User created ", JSON.parse(cc.sys.localStorage.getItem(uid)));
        return user;
    }

    static getUsers(): Array<User> {
        let response = [];
        const userIdList = User.getUserIds();
        if (userIdList != null) {
            userIdList.forEach((id) => {
                let user = this.fromJson(
                    JSON.parse(cc.sys.localStorage.getItem(id))
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

    static fromJson(data): User {
        let user = new User(
            data._id,
            data._name,
            data._age,
            data._gender,
            data._imgPath,
            data._sfxOff,
            data._musicOff,
            data._inventory,
            data._currentBg,
            data._currentCharacter,
            data._courseProgress,
            data._unlockedInventory
        );
        return user;
    }

    static setCurrentUser(user: User) {
        this._currentUser = user;
    }

    static getCurrentUser() {
        return this._currentUser;
    }

    static getUser(uid: string): User {
        let data = JSON.parse(cc.sys.localStorage.getItem(uid));
        return data ? this.fromJson(data) : null;
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

    private static setAllLevels(
        config: Config,
        maxWorld: number,
        maxLevel: number
    ) {
        for (const world in config.curriculum) {
            if (Number(world) <= maxWorld) {
                for (const level in config.curriculum[world]) {
                    if (Number(world) < maxWorld || Number(level) <= maxLevel) {
                        for (const game in config.curriculum[world][level]) {
                            this.setItem(
                                Config.getInstance().course +
                                "_" +
                                world +
                                "_" +
                                level +
                                "_" +
                                config.curriculum[world][level][game][0],
                                1
                            );
                        }
                    }
                }
            }
        }
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
        return this.getItem(Config.getInstance().course + WORLD);
    }

    static set lastWorld(newVal: number) {
        this.setItem(Config.getInstance().course + WORLD, newVal);
        this.setItem(Config.getInstance().course + LEVEL, 0);
        this.toJson();
    }

    static get lastLevel(): number {
        return this.getItem(Config.getInstance().course + LEVEL);
    }

    static set lastLevel(newVal) {
        if (this.lastLevel < newVal) {
            this.setItem(Config.getInstance().course + LEVEL, newVal);
            this.toJson();
        }
    }

    static isGameCompleted(world: number, level: number, game: string): boolean {
        return (
            this.getItem(
                Config.getInstance().course + "_" + world + "_" + level + "_" + game
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
            Config.getInstance().course + "_" + world + "_" + level + "_" + game,
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
        const subjects: ParseSubject[] = await ParseApi.getAllSubjects();
        subjects.forEach(
            (p: ParseSubject) => {
                courseProgress[p.courseCode] = {
                    'currentLesson'   : '1',
                    'completedLessons': []
                };
            }
        );
        currentUser.courseProgress = courseProgress;
    }
}