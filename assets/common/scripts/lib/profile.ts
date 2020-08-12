import { ASSET_LOAD_METHOD } from "./constants";
import UtilLogger from "../util-logger";
import Config from "./config";
import { ParseApi } from "../../../private/services/parseApi";

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

export enum Language {
    ENGLISH,
    HINDI,
}

export const availLanguages = ["english", "hindi"];

export interface UserAttributes {
    id: string;
    name: string;
    age: number;
    gender: Gender;
    imgPath: string;
}

export class User {
    constructor(
        public id: string,
        public name: string,
        public age: number,
        public gender: Gender,
        public imgPath: string,
        public sfxOff: boolean,
        public musicOff: boolean,
        public inventory: object,
        public currentBg: string,
        public currentCharacter: string,
        public unlockedInventory: object
    ) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.imgPath = imgPath;
        this.inventory = inventory;
        this.unlockedInventory = unlockedInventory;
        this.currentBg = currentBg;
        this.currentCharacter = currentCharacter;
    }

    set setName(name: string) {
        this.name = name;
        this._storeUser();
    }

    set setAge(age: number) {
        console.log("came setting age", age);
        this.age = age;
        this._storeUser();
    }

    set setGender(gender: Gender) {
        this.gender = gender;
        this._storeUser();
    }

    set setImgPath(imgPath: string) {
        this.imgPath = imgPath;
        this._storeUser();
    }

    set setInventory(inventory: object) {
        this.inventory = inventory;
        this._storeUser();
    }

    setCurrentBg(currentBg: string) {
        this.currentBg = currentBg;
        this._storeUser();
    }

    setCurrentCharacter(currentCharacter: string) {
        this.currentCharacter = currentCharacter;
        this._storeUser();
    }

    setUnlockedInventory(inventoryItemName: string) {
        this.unlockedInventory[inventoryItemName] = true;
        this._storeUser();
    }

    _storeUser() {
        cc.sys.localStorage.setItem(this.id, JSON.stringify(this));
    }
}

export default class Profile {
    static _profile = {};
    static _loaded: boolean = false;
    static _currentUser: User;
    static _userIdList = [];
    static _settings = {};

    static createUserOrFindExistingUser(userAttributes: UserAttributes) {
        cc.log(userAttributes)
        // find an existing user
        const existingUser: User = Profile.getUser(userAttributes.id);
        if (!!existingUser) return existingUser;

        return Profile.createUser(
            userAttributes.name,
            userAttributes.imgPath,
            userAttributes.age,
            userAttributes.gender,
            userAttributes.id
        );
    }

    static createUser(
        name: string,
        imgPath: string,
        age: number,
        gender: Gender,
        id: string = null
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
            {}
        );
        cc.sys.localStorage.setItem(uid, JSON.stringify(user));
        let userId = JSON.parse(cc.sys.localStorage.getItem(USER_ID)) as Array<string>;
        if (userId == null) {
            userId = [uid];
        } else {
            userId.push(uid);
        }
        cc.sys.localStorage.setItem(USER_ID, JSON.stringify(userId));
        console.log(
            "User Id aray created ",
            JSON.parse(cc.sys.localStorage.getItem(USER_ID))
        );
        console.log("User  created ", JSON.parse(cc.sys.localStorage.getItem(uid)));
        return user;
    }

    static getUsers(): Array<User> {
        let response = [];
        this._userIdList = JSON.parse(
            cc.sys.localStorage.getItem(USER_ID)
        ) as Array<string>;
        if (this._userIdList != null) {
            this._userIdList.forEach((id) => {
                let user = this._convertToClass(
                    JSON.parse(cc.sys.localStorage.getItem(id))
                );
                response.push(user);
            });
        }
        return response;
    }

    static setCurrentUser(user: User) {
        this._currentUser = user;
    }

    static getUser(uid: string): User {
        let data = JSON.parse(cc.sys.localStorage.getItem(uid));
        return data ? this._convertToClass(data) : null;
    }

    static _convertToClass(data): User {
        let user = new User(
            data.id,
            data.name,
            data.age,
            data.gender,
            data.imgPath,
            data.sfxOff,
            data.musicOff,
            data.inventory,
            data.currentBg,
            data.currentCharacter,
            data.unlockedInventory
        );
        return user;
    }

    static initialize() {
        if (Object.keys(this._settings).length == 0) {
            this.setValue(LANGUAGE, availLanguages[0]);
            this.setValue(SFX_OFF, "false");
            this.setValue(MUSIC_OFF, "false");
        }
    }

    static getCurrentUser() {
        return this._currentUser;
    }

    static deleteUser(id: string) {
        cc.sys.localStorage.removeItem(id);
        let index = this._userIdList.indexOf(id);
        this._userIdList.splice(index, 1);
        cc.sys.localStorage.setItem(USER_ID, JSON.stringify(this._userIdList));
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

    static fromJsonUsingParse(studentProfile: string) {
        // load from Parse Student (logged in)
        if (!this._loaded) {
            this._loaded = true;
            this._profile = JSON.parse(studentProfile || '{}');
            const currentStudentProfile = UtilLogger.currentProfile();
            cc.sys.localStorage.setItem(currentStudentProfile, JSON.stringify(this._profile));
        }
    }

    static fromJson() {
        if (!this._loaded) {
            this._loaded = true;
            const currentStudentProfile = UtilLogger.currentProfile();
            if (ASSET_LOAD_METHOD != "file" && CC_JSB) {
                // this should be sdcard
                cc.loader.load(
                    {
                        url : `/sdcard/aruba/current_profile/${currentStudentProfile}.json`,
                        type: "json"
                    },
                    (err, data) => {
                        if (!err && !!data) {
                            Object.keys(data).forEach((key) => {
                                this._profile[key] = Number(data[key]);
                            });
                            cc.sys.localStorage.setItem(
                                UtilLogger.currentProfile(),
                                JSON.stringify(this._profile)
                            );
                        }
                    }
                );
            } else {
                const profile = JSON.parse(
                    cc.sys.localStorage.getItem(currentStudentProfile)
                );
                if (profile != null) {
                    this._profile = profile;
                }
            }
        }
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
}
