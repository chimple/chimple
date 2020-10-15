import { Util } from "../util";
import UtilLogger from "../util-logger";
import { Chapter, Course, Lesson } from "./convert";
import Profile, { User } from "./profile";

export const DEFAULT_FONT = 'main';
export const STORY = 'story';
export const COURSES = ['en', 'en-maths', 'hi', 'hi-maths', 'ur', 'ur-maths'];

export enum Flow {
    Default,
    Platformer,
    Debug,
    Open
}

export const BG_NAME = 'bgRoot';
export const BRIDGE_NAME = 'bridge';
export const QUIZ_LITERACY = 'quizliteracy';
export const QUIZ_MATHS = 'quizmaths';

export enum Direction {
    LTR,
    RTL
}

const RTL_COURSES = ['ur', 'ur-maths'];

export enum Lang {
    ENGLISH = 'en',
    HINDI = 'hi',
}

export const ALL_LANGS = [Lang.ENGLISH, Lang.HINDI];

export class LangConfig {
    font: string;
    displayName: string;
    symbol: string;
    colorCode: string;
}

export const LANG_CONFIGS = new Map<Lang, LangConfig>([
    [Lang.ENGLISH, { 'font': 'en-main', 'displayName': 'English', 'symbol': 'A', 'colorCode': '#FFBC00' }],
    [Lang.HINDI, { 'font': 'hi-main', 'displayName': 'हिन्दी', 'symbol': 'अ', 'colorCode': '#3E99E7' }]
])

export class World {
    scene: string;
    mapPrefab: string;
    armature: string;

    constructor(scene: string, mapPrefab: string, armature: string) {
        this.scene = scene;
        this.mapPrefab = mapPrefab;
        this.armature = armature;
    }
}

export const WORLDS = [
    new World('platform/scenes/assemble', 'forestMapPrefab', 'tiger'),
    new World('platform/scenes/cityAssemble', 'cityMapPrefab', 'dog'),
    new World('platform/scenes/desertAssemble', 'desertMapPrefab', 'camel'),
    new World('platform/scenes/gardenAssemble', 'gardenMapPrefab', 'rabbit'),
    new World('platform/scenes/seaAssemble', 'seaMapPrefab', 'koala'),
    new World('platform/scenes/skyAssemble', 'skyMapPrefab', 'horse'),
    new World('platform/scenes/snowAssemble', 'snowMapPrefab', 'bear'),
    new World('platform/scenes/beachAssemble', 'beachMapPrefab', 'hippo'),
    new World('platform/scenes/playgroundAssemble', 'playgroundMapPrefab', 'cat'),
    new World('platform/scenes/farmAssemble', 'farmMapPrefab', 'duck')
];

class SceneDef {
    scene: string;
    bundle: string;

    constructor(scene: string, bundle: string) {
        this.scene = scene;
        this.bundle = bundle;
    }
}

export default class Config {
    private static instance: Config;

    private _scenes: Array<SceneDef> = [];
    private _textFontMap = new Map();
    private _lessonData;

    course: Course;
    lesson: Lesson;
    chapter: Chapter;
    game: string;
    problem: number;
    totalProblems: number;
    data: Array<Array<string>>;
    currentFontName: string;
    curriculum: Map<string, Course> = new Map();
    currentGameLessonId: string;
    //currently used in story remove later
    gameLevelName: string;
    worksheet: number;

    //remove later
    flow: Flow;

    private constructor() {
    }

    static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
            Config.instance.gameLevelName = '1';
            Config.instance.worksheet = 1;
            Config.instance.problem = 1;
            Config.instance.totalProblems = 1;
            Config.instance.flow = Flow.Default;
            Config.instance._textFontMap = new Map();
            Config.instance.currentFontName = DEFAULT_FONT;
        }
        return Config.instance;
    }

    static get i(): Config {
        return Config.getInstance();
    }

    static get dir(): string {
        return Config.getInstance().course.id + '/';
    }

    clear() {
        this.course = null
        this.chapter = null
        this.lesson = null
    }

    get direction(): Direction {
        // return this.course == null ? Direction.RTL : RTL_COURSES.indexOf(this.course.id) != -1 ? Direction.RTL : Direction.LTR;
        return Direction.LTR
    }

    addTextFont(fontName: string, newVal: cc.Font) {
        this._textFontMap.set(fontName, newVal);
    }

    hasLoadedTextFont(fontName: string) {
        return this._textFontMap.has(fontName);
    }

    getTextFont(fontName: string) {
        return this._textFontMap.get(fontName);
    }

    get textFontMap() {
        return this._textFontMap;
    }

    static preloadScene(scene: string, callback: Function) {
        cc.director.preloadScene(scene, () => {
            if (callback != null) callback();
        });
    }

    static loadScene(scene: string, bundle: string = null, callback: Function = null) {
        Util.freeResources();
        if (bundle != null) {
            UtilLogger.logChimpleEvent("load_scene", {
                scene: scene,
                bundle: bundle
            })

            cc.assetManager.loadBundle(bundle, (err, loadedBundle) => {
                loadedBundle.loadScene(scene, (err, loadedScene) => {
                    cc.director.runScene(loadedScene, null, () => {
                        cc.sys.garbageCollect();
                        if (callback != null) {
                            callback();
                        }
                    });
                });
            });
        } else {
            cc.director.loadScene(scene, () => {
                UtilLogger.logChimpleEvent("load_scene", {
                    scene: scene
                })

                cc.sys.garbageCollect();
                if (callback != null) {
                    callback();
                }
            });
        }
    }

    pushScene(scene: string, bundle: string = null, callback: Function = null, first: boolean = false) {
        if (first) this.popAllScenes()
        this._scenes.push(new SceneDef(scene, bundle));
        Config.loadScene(scene, bundle, callback);
    }

    popScene() {
        const popScene: SceneDef = this._scenes.pop();
        UtilLogger.logChimpleEvent("scene_exit", {
            scene: popScene.scene,
            bundle: popScene.bundle
        })

        var sceneDef = this._scenes[this._scenes.length - 1];
        var scene = sceneDef.scene;
        if (scene.startsWith('menu/map/scene/map')) {
            scene = scene.substr(0, scene.length - 1) + Profile.lastWorld;
        }
        Config.loadScene(scene, sceneDef.bundle);
    }

    prePopScene(callback: Function) {
        var sceneDef = this._scenes[this._scenes.length - 2];
        var scene = sceneDef.scene;
        if (scene.startsWith('menu/map/scene/map')) {
            scene = scene.substr(0, scene.length - 1) + Profile.lastWorld;
        }
        Config.preloadScene(scene, callback);
    }

    popAllScenes() {
        this._scenes = [];
    }

    get canPop(): boolean {
        return this._scenes.length > 1;
    }

    loadFontDynamically(fontName: string, callBack: Function = null, data: any = null) {
        if (this._textFontMap.has(fontName)) {
            this.currentFontName = fontName;
            if (!!callBack) callBack(data);
        } else {
            cc.resources.load(`fonts/${fontName}`, cc.Font, (err, fontAsset) => {
                if (err) {
                    if (!!callBack) callBack(data);
                } else {
                    console.log("loading font from Config", fontName);
                    this._textFontMap.set(fontName, fontAsset);
                    this.currentFontName = fontName;
                    if (!!callBack) callBack(data);
                }
            });
        }
    }

    loadFont() {

    }

    loadLessonJson(callback: Function, node: cc.Node = null, lessons: Array<Lesson> = null, maxPerLesson: number = 0) {
        if (this.problem != 0) {
            callback(this._lessonData.rows[this.problem - 1]);
        } else if (lessons != null) {
            var allLessonData = []
            let numLessons = lessons.length
            lessons.forEach((les) => {
                const jsonFile = this.course.id + '/' + les.id + '/res/' + les.id + '.json';
                Util.load(jsonFile, (err, jsonAsset) => {
                    const lessonData = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                    const quizRows: [] = lessonData.rows.filter((el) => {
                        return el[0].toLowerCase().includes("quiz")
                    })
                        .map((el) => {
                            el[2] = les.id
                            return el
                        })
                    allLessonData = allLessonData.concat(maxPerLesson > 0 ? Util.shuffle(quizRows).slice(0, maxPerLesson) : quizRows)
                    numLessons--
                })
            })
            const checkAllLoaded = () => {
                if (numLessons <= 0) {
                    cc.director.getScheduler().unschedule(checkAllLoaded, node);
                    if (maxPerLesson == 0) {
                        Util.shuffle(allLessonData)
                        this._lessonData = { 'rows': allLessonData.slice(0, Math.min(10, allLessonData.length - 1)) }
                    } else {
                        this._lessonData = { 'rows': allLessonData }
                    }
                    this.totalProblems = this._lessonData.rows.length;
                    this.problem = 1;
                    if (callback != null) callback(this._lessonData.rows[this.problem - 1]);
                }
            }
            cc.director.getScheduler().schedule(checkAllLoaded, node, 1);
        } else {
            const jsonFile = this.course.id + '/' + this.lesson.id + '/res/' + this.lesson.id + '.json';
            Util.load(jsonFile, (err, jsonAsset) => {
                this._lessonData = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                this._lessonData.rows.forEach(el => {
                    el[2] = this.lesson.id
                });
                this.totalProblems = this._lessonData.rows.length;
                this.problem = 1;
                if (callback != null) callback(this._lessonData.rows[this.problem - 1]);
            }, true);
        }
    }

    // loadQuizData(callback: Function) {
    //     this._levelData = []
    //     const games = this.curriculum[this.world][this.level]
    //         .filter(val => (val[0] != 'run' && val[0] != QUIZ_LITERACY))
    //     var toLoad = games.length
    //     games.forEach(game => {
    //         if (game[0] != 'run' && game[0] != QUIZ_LITERACY) {
    //             const jsonFile = this.course + '/' + game[0] + '/res/' + game[0] + '.json'
    //             Util.load(jsonFile, (err, jsonAsset) => {
    //                 const json = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
    //                 json.forEach(el => {
    //                     if (!el[0].startsWith('#') && el[0] == game[1] && el[2] == '0') {
    //                         this._levelData.push([...el])
    //                     }
    //                 })

    //                 if (--toLoad <= 0) {
    //                     Util.shuffle(this._levelData)
    //                     this._levelData.forEach((val, index) => {
    //                         val[2] = String(index + 1)
    //                     })
    //                     this.problem = 1
    //                     this.totalProblems = this._levelData.length
    //                     callback([this._levelData[0]])
    //                 }
    //             })
    //         }
    //     })
    // }

    nextProblem() {
        if (this.problem < this.totalProblems) {
            this.problem++;
            this.data = [this._lessonData.rows[this.problem - 1]];
        }
    }

    prevProblem() {
        if (this.problem > 1) {
            this.problem--;
            this.data = [this._lessonData.rows[this.problem - 1]];
        }
    }

    loadPathJSON(fileName: string, callback: Function, isNumber: boolean = false) {
        let data: any[] = [];
        let jsonData: string = null;
        let appendPath: string = null;
        fileName = fileName.trim();
        isNumber = !isNaN(Number(fileName));
        if (fileName.indexOf("tutorial") !== -1) {
            fileName = fileName.replace(".png", "");
            appendPath = 'json';
        } else {
            const isUpperCase: boolean = fileName === fileName.toUpperCase();
            appendPath = isNumber ? 'numbers' : isUpperCase ? 'upper' : 'lower';
        }
        let jsonFile = this.course.id + '/course/res/paths/' + appendPath + '/' + fileName; //default
        jsonFile = jsonFile + ".json";
        Util.load(jsonFile, (err, jsonAsset) => {
            data = [];
            if (jsonAsset !== null) {
                const json = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                if (Array.isArray(json)) {
                    json.forEach(el => {
                        data.push(el);
                    });
                }
            }
            jsonData = !!data && data.length > 0 ? JSON.stringify(data) :
                (cc.sys.localStorage.getItem(fileName) != null &&
                    cc.sys.localStorage.getItem(fileName).length > 0) ?
                    cc.sys.localStorage.getItem(fileName) : null;

            callback(jsonData);
        }, true);
    }

    loadCourseJsons(user: User, node: cc.Node, callBack: Function) {
        let numCourses = 0
        user.courseProgressMap.forEach((courseProgress, name) => {
            if (!Config.i.curriculum.has(name)) {
                numCourses++
                this.loadSingleCourseJson(name, () => {
                    numCourses--;
                });
            }
        });

        const checkAllLoaded = () => {
            if (numCourses <= 0) {
                user.curriculumLoaded = true;
                cc.director.getScheduler().unschedule(checkAllLoaded, node);
                callBack();
            }
        };
        cc.director.getScheduler().schedule(checkAllLoaded, node, 1);
    }

    loadSingleCourseJson(name: string, callBack: Function) {
        cc.assetManager.loadBundle(name, (err, bundle) => {
            if (err) {
                return console.error(err);
            }
            Util.bundles.set(name, bundle);
            const jsonFile = name + '/course/res/course.json';
            Util.load(jsonFile, (err: Error, jsonAsset) => {
                if (!err) {
                    const course: Course = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                    course.chapters.forEach((chapter) => {
                        chapter.course = course;
                        chapter.lessons.forEach((lesson) => {
                            lesson.chapter = chapter;
                            // if (User.getCurrentUser().debug) {
                            //     lesson.open = true
                            // }
                        });
                    });
                    this.curriculum.set(name, course);
                }
                callBack()
            });
        });
    }

    get friend(): string {
        // return WORLDS[0].armature;
        return 'chimp'
    }
}
