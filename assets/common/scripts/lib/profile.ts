import { Queue } from "../../../queue";
import Header from "../header";
import { INVENTORY_DATA, REWARD_BACKGROUNDS, REWARD_CHARACTERS, REWARD_TYPES, Util } from "../util";
import UtilLogger from "../util-logger";
import Config, { ALL_LANGS } from "./config";
import { COUNTRY_CODES, CURRENT_STUDENT_ID, EXAM, MIN_PASS } from "./constants";

const WORLD = "World";
const LEVEL = "Level";
const IS_INITIALIZED = "isInitialized";
export const DIALING_CODE = "dialingCode";
export const SFX_OFF = "sfxOff";
export const GENDER = "gender";
export const MUSIC_OFF = "musicOff";
export const AGE = "age";
export const USER_ID = "UserId";
export const MAX_USERS = 3;
export const MAX_AGE = 12;
export const LANGUAGE = "language";
export const CURRENTMODE = 'currentMode';
export const EMAIL = "email";
export const CONTACT = "contact";
export const PASSWORD = "password";
export const IS_OTP_VERIFIED = "isOtpVerified";
export const IN_LOGIN_FLOW = "in_login_flow";

export enum Gender {
    BOY,
    GIRL,
    UNKNOWN
}

export interface UserAttribute {
    id?: string,
    name?: string,
    age?: number,
    gender?: Gender,
    imgPath?: string,
    avatarImage?: string,
    isTeacher?: boolean
}

export interface CourseProgress {
    currentChapterId: string;
    date?: Date;
    assignments?: string[]
    lessonPlan?: string[]
    lessonPlanIndex?: number
}

export class CourseProgressClass implements CourseProgress {
    currentChapterId: string
    date: Date
    assignments: string[]
    lessonPlan: string[]
    lessonPlanIndex: number

    constructor(currentChapterId: string = null) {
        this.currentChapterId = currentChapterId
        this.date = new Date()
        this.assignments = []
        this.lessonPlan = []
        this.lessonPlanIndex = 0
    }
}

export interface LessonProgress {
    achievement?: number;
    score: number;
    attempts?: number;
    date?: Date;
}

export class LessonProgressClass implements LessonProgress {
    achievement: number = 0;
    score: number;
    attempts: number;
    date: Date;

    constructor(score: number, attempts: number = 0) {
        this.score = score;
        this.attempts = attempts;
        this.date = new Date()
    }
}


export class User {
    private static _currentUser: User;
    private _serverId: string;
    private _id: string;
    private _name: string;
    private _age: number;
    private _gender: Gender;
    private _imgPath: string;
    private _avatarImage: string;
    private _inventory: object;
    private _currentBg: string;
    private _currentCharacter: string;
    private _chapterFinishedMap: Map<string, boolean>;
    private _courseProgressMap: Map<string, CourseProgress>;
    private _lessonProgressMap: Map<string, LessonProgress>;
    private _unlockedInventory: object;
    private _unlockedRewards: object;
    private _isTeacher: boolean;
    private _level: number;
    private _lessonPlanDate: Date
    private _assignments: string[]
    private _lessonPlanCourseId: string
    debug: boolean = false
    curriculumLoaded: boolean = false

    constructor(
        id: string,
        name: string,
        age: number,
        gender: Gender,
        imgPath: string,
        avatarImage: string,
        isTeacher: boolean,
        inventory: object,
        currentBg: string,
        currentCharacter: string,
        courseProgressMap: Map<string, CourseProgress>,
        lessonProgressMap: Map<string, LessonProgress>,
        chapterFinishedMap: Map<string, boolean>,
        unlockedInventory: object,
        unlockedRewards: object,
        debug: boolean = false,
        serverId: string = ''
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
        this._unlockedRewards = unlockedRewards;
        this._currentBg = currentBg;
        this._currentCharacter = currentCharacter;
        this._courseProgressMap = courseProgressMap;
        this._lessonProgressMap = lessonProgressMap;
        this._chapterFinishedMap = chapterFinishedMap;
        UtilLogger.setUserIdEvent(id);
        UtilLogger.setUserPropertiesEvent("userName", name);
        UtilLogger.setUserPropertiesEvent("userAge", age);
        this._genderEvent(gender);
        this.debug = debug
        this._serverId = serverId
        this._assignments = []
        this._lessonPlanCourseId = courseProgressMap.keys().next().value
    }

    _genderEvent(gender: Gender) {
        switch (gender) {
            case Gender.BOY:
                UtilLogger.setUserPropertiesEvent("userGender", "Boy");
                break;
            case Gender.GIRL:
                UtilLogger.setUserPropertiesEvent("userGender", "Girl");
                break;
            case Gender.UNKNOWN:
                UtilLogger.setUserPropertiesEvent("userGender", "Unknown");
                break;
        }
    }

    set serverId(id: string) {
        this._serverId = id;
        this._storeUser();
        UtilLogger.setUserIdEvent(id);
    }

    set id(id: string) {
        this._id = id;
        this._storeUser();
        UtilLogger.setUserIdEvent(id);
    }

    get id(): string {
        return this._id;
    }

    get serverId(): string {
        return this._serverId;
    }

    set name(name: string) {
        this._name = name;
        this._storeUser();
        UtilLogger.setUserPropertiesEvent("userName", name);
    }

    get name(): string {
        return this._name;
    }

    set age(age: number) {
        this._age = age;
        this._storeUser();
        UtilLogger.setUserPropertiesEvent("userAge", age);
    }

    get age(): number {
        return this._age;
    }

    set gender(gender: Gender) {
        this._gender = gender;
        this._storeUser();
        this._genderEvent(gender);
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
        UtilLogger.setUserPropertiesEvent("userAvatarImage", avatarImage);
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

    set unlockedRewards(unlockedRewards: object) {
        this._unlockedRewards = {};
        this._storeUser();
    }

    get unlockedRewards(): object {
        return this._unlockedRewards;
    }

    set isTeacher(isTeacher: boolean) {
        this._isTeacher = isTeacher;
        this._storeUser();
    }

    set lessonPlan(lessonPlan: string[]) {
        this.courseProgressMap.get(this.lessonPlanCourseId).lessonPlan = lessonPlan
        this._storeUser();
    }

    get lessonPlan(): string[] {
        return this.courseProgressMap.get(this.lessonPlanCourseId).lessonPlan
    }

    set lessonPlanDate(lessonPlanDate: Date) {
        this._lessonPlanDate = lessonPlanDate;
        this._storeUser();
    }

    get lessonPlanDate(): Date {
        return this._lessonPlanDate;
    }

    set lessonPlanIndex(lessonPlanIndex: number) {
        this.courseProgressMap.get(this.lessonPlanCourseId).lessonPlanIndex = lessonPlanIndex;
        this._storeUser();
    }

    get lessonPlanIndex(): number {
        return this.courseProgressMap.get(this.lessonPlanCourseId).lessonPlanIndex;
    }

    set assignments(assignments: string[]) {
        this._assignments = assignments;
        this._storeUser();
    }

    get assignments(): string[] {
        return this._assignments;
    }

    set lessonPlanCourseId(lessonPlanCourseId: string) {
        this._lessonPlanCourseId = lessonPlanCourseId;
        this._storeUser();
    }

    get lessonPlanCourseId(): string {
        return this._lessonPlanCourseId;
    }

    unlockInventoryForItem(item: string) {
        this._unlockedInventory[item] = true;
        this._storeUser();
    }

    unlockRewardsForItem(item: string, value: number) {
        this._unlockedRewards[item] = value;
        this._storeUser();
    }

    updateInventory(name: string, value: string) {
        this._inventory[name] = value
        this._storeUser()
    }

    openAllRewards() {
        REWARD_CHARACTERS.forEach((char) => {
            this._unlockedRewards[`${REWARD_TYPES[0]}-${char}`] = 1
            INVENTORY_DATA.forEach((arr) => {
                arr.forEach((inv) => {
                    this._unlockedRewards[`${REWARD_TYPES[3]}-${char}-${inv}`] = 1
                })
            })
        })
        REWARD_BACKGROUNDS.forEach((bg) => {
            this._unlockedRewards[`${REWARD_TYPES[1]}-${bg}`] = 1
        })
        this._storeUser()
    }

    openAllRewardsForCharacter(character: string) {
        INVENTORY_DATA.forEach((arr) => {
            arr.forEach((inv) => {
                this._unlockedRewards[`${REWARD_TYPES[3]}-${character}-${inv}`] = 1
            })
        })
    }

    openOnlyTheSelectedRewards(character: string) {
        INVENTORY_DATA.forEach((arr, i) => {
            let unlockItem = this._inventory[`${character}-${arr[0].split("-")[0]}`];
            arr.forEach((inv) => {
                this._unlockedRewards[`${REWARD_TYPES[3]}-${character}-${inv}`] = 0
            })

            this._unlockedRewards[`${REWARD_TYPES[3]}-${character}-${arr[i].split('-')[0].concat(`-${unlockItem}`)}`] = 1
        })
    }

    unlockBydefaultRewards() {
        this.unlockRewardsForItem(`${REWARD_TYPES[0]}-${REWARD_CHARACTERS[0]}`, 1)
        this.unlockRewardsForItem(`${REWARD_TYPES[1]}-${REWARD_BACKGROUNDS[0]}`, 1)
    }

    updateLessonProgress(lessonId: string, score: number, quizScores: number[]): [string, string] {
        var reward: [string, string]
        const config = Config.i
        const user = User.getCurrentUser()
        if (user.courseProgressMap.get(Config.i.course.id).currentChapterId == null) {
            const formulaScore = quizScores.reduce((acc, cur, i, arr): number => {
                const mul = Math.floor(arr.length / 2) - Math.floor(i / 2)
                const neg = cur == 0 ? -0.5 : cur
                return acc + neg * mul
            }, 0)
            const max = quizScores.length / 2 * (quizScores.length / 2 + 1)
            const total = Math.max(0, formulaScore / max)
            const chapters = config.curriculum.get(config.course.id).chapters
            user.courseProgressMap.get(Config.i.course.id).currentChapterId = chapters[Math.floor((chapters.length - 1) * total)].id
        } else {
            if (this._lessonProgressMap.has(lessonId)) {
                const lessonProgress = this._lessonProgressMap.get(lessonId)
                lessonProgress.attempts++
                lessonProgress.date = new Date()
                if (score > lessonProgress.score) {
                    lessonProgress.score = score;
                    if (Config.i.lesson.type == EXAM && score >= MIN_PASS) {
                        reward = [REWARD_TYPES[2], Config.i.lesson.image]
                    } else {
                        reward = Util.unlockNextReward()
                    }
                }
            } else {
                if (Config.i.lesson.type == EXAM && score >= MIN_PASS) {
                    reward = [REWARD_TYPES[2], Config.i.lesson.image]
                } else {
                    reward = Util.unlockNextReward()
                }
                this._lessonProgressMap.set(lessonId, new LessonProgressClass(score, 1));
            }

            if (Config.i.lesson.type != EXAM || score >= MIN_PASS) {
                // open the next lesson
                const lessons = Config.i.chapter.lessons
                const lessonIndex = lessons.findIndex((les) => {
                    return les.id == lessonId
                })
                if (lessons.length > lessonIndex + 1) {
                    const nextLesson = lessons[lessonIndex + 1]
                    if (!this._lessonProgressMap.has(nextLesson.id)) {
                        this._lessonProgressMap.set(nextLesson.id, new LessonProgressClass(-1));
                    }
                } else if (this.courseProgressMap.get(Config.i.course.id).currentChapterId == Config.i.chapter.id) {
                    var found = false
                    const nextChapter = Config.i.course.chapters
                        .find((c) => {
                            if (found) return true
                            found = c.id == this.courseProgressMap.get(Config.i.course.id).currentChapterId
                            return false
                        })
                    if (nextChapter) this.courseProgressMap.get(Config.i.course.id).currentChapterId = nextChapter.id
                }
            }
        }
        if (user.lessonPlan
            && user.lessonPlanIndex < user.lessonPlan.length
            && user.lessonPlan[user.lessonPlanIndex] == config.lesson.id
        ) {
            user.lessonPlanIndex++
            config.lessonPlanIncr = true
        }
        if (user.assignments) {
            const index = user.assignments.indexOf(config.lesson.id)
            if (index > -1) {
                user.assignments.splice(index, 1)
            }
        }

        // check if all lessons for current chapter are finished
        const courseProgress = user.courseProgressMap.get(Config.i.course.id);
        if (!!courseProgress) {
            courseProgress.date = new Date()
            this._chapterFinishedMap = !this._chapterFinishedMap ? new Map() : this._chapterFinishedMap;
            const currentChapter = config.curriculum.get(config.course.id).chapters.find(c => c.id === courseProgress.currentChapterId);
            if (!!currentChapter && !this._chapterFinishedMap.has(currentChapter.id)) {
                const allLessonIds = currentChapter.lessons.map(l => l.id);
                const userFinishedLessonIds = Array.from(this._lessonProgressMap.keys());
                const isAllLessonsFinished = allLessonIds.filter(arr1Item => !userFinishedLessonIds.includes(arr1Item)).length === 0;
                if (isAllLessonsFinished) {
                    this._chapterFinishedMap.set(currentChapter.id, true);

                    UtilLogger.logChimpleEvent("chapterEnd", {
                        chapterName: config.chapter.name,
                        chapterId: config.chapter.id,
                        courseName: config.course.id
                    });
                }
            }
        }
        this._storeUser();
        return reward
    }

    private _storeUser() {
        User.storeUser(this);
    }

    static storeUser(user: User) {
        cc.log('serverid', user._serverId);
        cc.sys.localStorage.setItem(user.id, User.toJson(user));

        if (!user.debug) {
            // log to ff userProfile
            UtilLogger.logChimpleEvent("userProfile", {
                userAge: user.age,
                gender: user.gender,
                userId: user.id
            });

            if (cc.sys.localStorage.getItem(CURRENT_STUDENT_ID)) {
                let profileInfo = {
                    profile: User.toJson(user),
                    kind: 'Profile',
                    studentId: cc.sys.localStorage.getItem(CURRENT_STUDENT_ID)
                };

                Queue.getInstance().push(profileInfo);
            }
        }
    }

    static createUUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
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
        let uid = !!id ? id : User.createUUID();
        const debug = (name == 'debug15' && avatarImage == 'teacherbird'
            && age == 8 && gender == Gender.GIRL)
        let user = new User(
            uid,
            name,
            age,
            gender,
            imgPath,
            avatarImage,
            isTeacher,
            {},
            "forest",
            "chimp",
            debug
                ? new Map([
                    ['en', new CourseProgressClass('en00')],
                    ['maths', new CourseProgressClass('maths00')],
                    ['hi', new CourseProgressClass('hi00')],
                    ['puzzle', new CourseProgressClass('puzzle00')],
                    ['test-lit', new CourseProgressClass('chapter_0')],
                    ['test-maths', new CourseProgressClass('chapter_0')]
                ])
                : new Map([
                    ['en', new CourseProgressClass()],
                    ['maths', new CourseProgressClass()],
                    ['hi', new CourseProgressClass()],
                    ['puzzle', new CourseProgressClass('puzzle00')]
                ]),
            new Map(),
            new Map(),
            {},
            {},
            debug
        );
        if (debug) user.openAllRewards()
        // open bydefault unlocked rewards
        user.unlockBydefaultRewards()
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
                if (!user.isTeacher && user.age > 0) response.push(user);
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
            const lp = data.courseProgressMap[key]
            lp.date = new Date(lp.date)
            courseProgressMap.set(key, lp);
        }
        const lessonProgressMap = new Map<string, LessonProgress>();
        for (const key in data.lessonProgressMap) {
            const lp = data.lessonProgressMap[key]
            lp.date = new Date(lp.date)
            lessonProgressMap.set(key, lp);
        }
        const chapterFinishedMap = new Map<string, boolean>();
        for (const key in data.chapterFinishedMap) {
            chapterFinishedMap.set(key, data.chapterFinishedMap[key]);
        }
        let user = new User(
            data.id,
            data.name,
            data.age,
            data.gender,
            data.imgPath,
            data.avatarImage,
            data.isTeacher,
            data.inventory,
            data.currentBg,
            data.currentCharacter,
            courseProgressMap,
            lessonProgressMap,
            chapterFinishedMap,
            data.unlockedInventory,
            data.unlockedRewards,
            data.debug,
            data.serverId
        );
        user._lessonPlanDate = new Date(data.lessonPlanDate)
        if (data.lessonPlanCourseId) user._lessonPlanCourseId = data.lessonPlanCourseId
        if (data.assignments) user._assignments = data.assignments
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
        const chapterFinishedMapObj = {};
        user._chapterFinishedMap.forEach((lp, id) => {
            chapterFinishedMapObj[id] = lp;
        });
        return JSON.stringify({
            'id': user.id,
            'name': user.name,
            'age': user.age,
            'gender': user.gender,
            'imgPath': user.imgPath,
            'avatarImage': user.avatarImage,
            'isTeacher': user.isTeacher,
            'inventory': user.inventory,
            'currentBg': user.currentBg,
            'currentCharacter': user.currentCharacter,
            'courseProgressMap': courseProgressObj,
            'lessonProgressMap': lessonProgressObj,
            'unlockedInventory': user.unlockedInventory,
            'unlockedRewards': user.unlockedRewards,
            'debug': user.debug,
            'serverId': user.serverId,
            'lessonPlanCourseId': user.lessonPlanCourseId,
            'lessonPlanDate': user.lessonPlanDate,
            'assignments': user.assignments,
            'chapterFinishedMap': chapterFinishedMapObj
        });
    }

    static setCurrentUser(user: User) {
        this._currentUser = user;
        Config.i.clear()
        Header.homeSelected = true
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
        let existingUser: User = null;
        if (!!userAttribute && !!userAttribute.id) {
            existingUser = this.getUser(userAttribute.id);
            if (!!existingUser) return existingUser;
        }

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

    static initialize() {
        if (Profile.getValue(IS_INITIALIZED) != "true") {
            this.setItem(SFX_OFF, 0);
            this.setItem(MUSIC_OFF, 0);
            this.setItem(IS_OTP_VERIFIED, 0);
            this.setValue(IS_INITIALIZED, "true");
            let countryCode = UtilLogger.getCountryCode();
            if (!countryCode) {
                this.setValue(DIALING_CODE, "+91");
            } else {
                COUNTRY_CODES.forEach((e) => {
                    if (e["code"].toLowerCase() === countryCode) {
                        this.setValue(DIALING_CODE, e["dial_code"]);
                    }
                });
            }
        }
    }

    static getValue(item: string) {
        return cc.sys.localStorage.getItem(item)
    }

    static setValue(item: string, value: string) {
        cc.sys.localStorage.setItem(item, value);
    }

    static getItem(item: string): number {
        return Number(Profile.getValue(item) || 0);
    }

    static setItem(item: string, val: number) {
        Profile.setValue(item, val.toString())
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
        return this.getItem(Config.getInstance().course.id + WORLD);
    }

    static set lastWorld(newVal: number) {
        this.setItem(Config.getInstance().course.id + WORLD, newVal);
        this.setItem(Config.getInstance().course.id + LEVEL, 0);
        this.toJson();
    }

    static get lastLevel(): number {
        return this.getItem(Config.getInstance().course.id + LEVEL);
    }

    static set lastLevel(newVal) {
        if (this.lastLevel < newVal) {
            this.setItem(Config.getInstance().course.id + LEVEL, newVal);
            this.toJson();
        }
    }

    static isGameCompleted(world: number, level: number, game: string): boolean {
        return (
            this.getItem(
                Config.getInstance().course.id + "_" + world + "_" + level + "_" + game
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
            Config.getInstance().course.id + "_" + world + "_" + level + "_" + game,
            completed ? 1 : 0
        );
        this.toJson();
    }

    static async teacherPostLoginActivity(objectId: string) {
        const currentUser: User = User.createUserOrFindExistingUser({ id: objectId });
        User.setCurrentUser(currentUser);
        return currentUser;
    }
}
