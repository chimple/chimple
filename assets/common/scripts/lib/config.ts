import { OverEvent, GAME_CONTROLLER_NAME } from "../gameController";
import { LANG } from "./constants";
import Profile, { User } from "./profile";
import { Util } from "../util";

export const DEFAULT_FONT = 'main';
export const STORY = 'story';
export const COURSES = ['en', 'en-maths', 'hi', 'hi-maths', 'ur', 'ur-maths']
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
const RTL_COURSES = ['ur', 'ur-maths']

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

export default class Config {
    private static instance: Config;

    private _scenes: Array<string>;
    private _textFontMap = new Map();
    private _levelData: Array<Array<string>>
    course: string;
    level: number;
    game: string;
    gameLevel: number;
    gameLevelName: string;
    worksheet: number;
    totalWorksheets: number;
    problem: number;
    totalProblems: number;
    data: Array<Array<string>>;
    gameConfigs;
    curriculum;
    world: number;
    flow: Flow;
    currentFontName: string;
    courseNames: Array<string>;
    overEvent: OverEvent;
    courses;
    lesson: string;
    lessonData;

    private constructor() {
    }

    static getInstance(scene?: string): Config {
        if (!Config.instance) {
            Config.instance = new Config();
            Config.instance.course = 'en';
            Config.instance.world = 0;
            Config.instance.level = 1;
            Config.instance.gameLevel = 1;
            Config.instance.gameLevelName = '1';
            Config.instance.worksheet = 1;
            Config.instance.problem = 1;
            Config.instance.totalProblems = 1;
            Config.instance._scenes = [scene];
            Config.instance.flow = Flow.Default;
            Config.instance._textFontMap = new Map();
            Config.instance.currentFontName = DEFAULT_FONT;
            Config.instance.overEvent = OverEvent.None;
            // Config.instance.courseNames = ['en', 'en-maths', LANG];
            Config.instance.courseNames = ['en', 'en-maths'];
            Config.instance.courses = {}
        }
        return Config.instance;
    }

    static get i(): Config { return Config.getInstance() }

    static get dir(): string {
        return Config.getInstance().course + '/';
    }

    get direction(): Direction { return RTL_COURSES.indexOf(this.course) != -1 ? Direction.RTL : Direction.LTR }

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
            cc.assetManager.loadBundle(bundle, (err, loadedBundle) => {
                loadedBundle.loadScene(scene, (err, loadedScene) => {
                    cc.director.runScene(loadedScene, null, () => {
                        cc.sys.garbageCollect();
                        if (callback != null) {
                            callback();
                        }
                    })
                })
            })
        } else {
            cc.director.loadScene(scene, () => {
                cc.sys.garbageCollect();
                if (callback != null) {
                    callback();
                }
            });
        }
    }

    pushScene(scene: string, bundle: string = null, callback: Function = null) {
        this._scenes.push(scene);
        Config.loadScene(scene, bundle, callback);
    }

    popScene() {
        this.clearPersistentNodes();
        this._scenes.pop();
        var scene = this._scenes[this._scenes.length - 1];
        if (scene.startsWith('menu/map/scene/map')) {
            scene = scene.substr(0, scene.length - 1) + Profile.lastWorld;
        }
        Config.loadScene(scene);
    }

    prePopScene(callback: Function) {
        var scene = this._scenes[this._scenes.length - 2];
        if (scene.startsWith('menu/map/scene/map')) {
            scene = scene.substr(0, scene.length - 1) + Profile.lastWorld;
        }
        Config.preloadScene(scene, callback);
    }

    get canPop(): boolean {
        return this._scenes.length > 1;
    }

    loadAssembleScene(push: boolean) {
        const scene = WORLDS[this.world].scene;
        if (push) {
            this.pushScene(scene, 'platform');
        } else {
            Config.loadScene(scene, 'platform');
        }
    }

    preloadAssembleScene(callback: Function) {
        const scene = WORLDS[this.world].scene;
        Config.preloadScene(scene, callback);
    }

    clearPersistentNodes() {
        const scene = cc.director.getScene();
        const gcNode = scene.getChildByName(GAME_CONTROLLER_NAME);
        if (gcNode != null) {
            cc.game.removePersistRootNode(gcNode);
        }
        const bridgeNode = scene.getChildByName(BRIDGE_NAME);
        if (bridgeNode != null) {
            cc.game.removePersistRootNode(bridgeNode);
        }
        const bgNode = scene.getChildByName(BG_NAME);
        if (bgNode != null) {
            cc.game.removePersistRootNode(bgNode);
        }
    }

    hasPersistentNodes(): boolean {
        const scene = cc.director.getScene();
        return (scene.getChildByName(GAME_CONTROLLER_NAME) != null);
    }

    nextProblem() {
        if (this.problem < this.totalProblems) {
            this.problem++;
            Config.loadScene(this.gameConfigs[this.game].scene, this.gameConfigs[this.game]);
        } else {
            //TODO: popup yay screen
            this.popScene();
        }
        // if(this._assemble != null) {
        //     this._assemble.gameOver();
        // }
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

    loadGameJson(callback: Function) {
        if (this.game == QUIZ_LITERACY && this.flow != Flow.Debug) {
            if (this.problem != 0) {
                const data = this._levelData.filter((val) => val[2] == this.problem.toString())
                if (!!callback) callback(data)
            } else {
                this.loadQuizData(callback)
            }
        } else {
            if (this.worksheet != 0 && this.problem != 0) {
                const data = this._levelData.filter((val) => val[1] == this.worksheet.toString() && val[2] == this.problem.toString())
                if (!!callback) callback(data)
            } else {
                const gameLevelStr = this.game === STORY ? this.gameLevelName : this.gameLevel
                const jsonFile = this.game === STORY ? this.course + '/' + this.game + '/' + gameLevelStr + '/res/' + this.game + '.json' : this.course + '/' + this.game + '/res/' + this.game + '.json';
                Util.load(jsonFile, (err, jsonAsset) => {
                    const json = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                    if (this.worksheet == 0) {
                        this.totalWorksheets = 0;
                        json.forEach(el => {
                            if (!el[0].startsWith('#') && el[0] == gameLevelStr && el[2] != '0') {
                                const currentWorksheet = parseInt(el[1]);
                                if (currentWorksheet > this.totalWorksheets) {
                                    this.totalWorksheets = currentWorksheet;
                                }
                            }
                        });
                        this.worksheet = Math.ceil(Math.random() * this.totalWorksheets);
                    }
                    if (this.problem == 0) {
                        json.forEach(el => {
                            if (!el[0].startsWith('#') && el[0] == gameLevelStr && el[1] == this.worksheet && el[2] != '0') {
                                const currentProblem = parseInt(el[2]);
                                if (currentProblem > this.totalProblems) {
                                    this.totalProblems = currentProblem;
                                }
                            }
                        });
                        this.problem = 1;
                    }

                    const data = []
                    this._levelData = []
                    json.forEach(el => {
                        if (!el[0].startsWith('#') && el[0] == gameLevelStr && el[1] == this.worksheet) {
                            if (el[2] != '0') {
                                if (el[2] == this.problem) data.push(el)
                                this._levelData.push(el)
                            }
                        }
                    });
                    let fontName: string = this.course.split('-')[0] + '-' + DEFAULT_FONT;
                    if (this.gameConfigs != null && this.gameConfigs[this.game].fontName != null) {
                        fontName = this.gameConfigs[this.game].fontName;
                    }
                    this.loadFontDynamically(fontName, callback, data);
                }, true);
            }
        }
    }

    loadLessonJson(callback: Function) {
        if(this.problem != 0) {
            callback(this.lessonData.rows[this.problem - 1])
        } else {
            const jsonFile = this.course + '/' + this.lesson + '/res/' + this.lesson + '.json';
            Util.load(jsonFile, (err, jsonAsset) => {
                this.lessonData = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                this.totalProblems = this.lessonData.rows.length
                this.problem = 1
                if (callback != null) callback(this.lessonData.rows[this.problem - 1])
            }, true);    
        }
    }

    loadQuizData(callback: Function) {
        this._levelData = []
        const games = this.curriculum[this.world][this.level]
            .filter(val => (val[0] != 'run' && val[0] != QUIZ_LITERACY))
        var toLoad = games.length
        games.forEach(game => {
            if (game[0] != 'run' && game[0] != QUIZ_LITERACY) {
                const jsonFile = this.course + '/' + game[0] + '/res/' + game[0] + '.json'
                Util.load(jsonFile, (err, jsonAsset) => {
                    const json = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                    json.forEach(el => {
                        if (!el[0].startsWith('#') && el[0] == game[1] && el[2] == '0') {
                            this._levelData.push([...el])
                        }
                    })

                    if (--toLoad <= 0) {
                        Util.shuffle(this._levelData)
                        this._levelData.forEach((val, index) => {
                            val[2] = String(index + 1)
                        })
                        this.problem = 1
                        this.totalProblems = this._levelData.length
                        callback([this._levelData[0]])
                    }
                })
            }
        })
    }


    loadPathJSON(fileName: string, callback: Function, isNumber: boolean = false) {
        let data: any[] = [];
        let jsonData: string = null;
        let appendPath: string = null;
        fileName = fileName.trim();
        isNumber = !isNaN(Number(fileName));
        if (fileName.indexOf("tutorial") !== -1) {
            appendPath = 'json';
        } else {
            const isUpperCase: boolean = fileName === fileName.toUpperCase();
            appendPath = isNumber ? 'numbers' : isUpperCase ? 'upper' : 'lower';
        }
        let jsonFile = this.course + '/common/res/paths/' + appendPath + '/' + fileName; //default
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

    loadCurriculumJson(callBack: Function = null) {
        Util.load(this.course + '/common/res/games.json', (err: Error, jsonAsset) => {
            if (!err) {
                this.gameConfigs = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
            } else {
                cc.log(err.message);
            }
        });

        const jsonFile = this.course + '/common/res/curriculum.json';
        Util.load(jsonFile, (err: Error, jsonAsset) => {
            if (!err) {
                const json = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                this.curriculum = {};
                var prevWorld: number = -1;
                var prevLevel: number = -1;
                json.forEach(el => {
                    const [worldStr, levelStr, game, gameLevel, extra, skills] = el;
                    const world = parseInt(worldStr) - 1;
                    const level = parseInt(levelStr) - 1;
                    if (!worldStr.startsWith('#')) {
                        if (prevWorld != world) {
                            this.curriculum[world] = [];
                            prevWorld = world;
                            prevLevel = -1;
                        }
                        if (prevLevel != level) {
                            this.curriculum[world][level] = [];
                            prevLevel = level;
                        }
                        this.curriculum[world][level].forEach(element => {
                            if (element[0] == game) {
                                cc.log(world + level + game);
                            }
                        });
                        this.curriculum[world][level].push([game, gameLevel, extra, skills]);
                    }
                });
                if (callBack !== null) callBack();
            } else {
                cc.log(err.message);
            }
        });
    }

    loadCourseJsons(node: cc.Node, callBack: Function) {
        const user = User.getCurrentUser()
        let numCourses = Object.keys(user.courseProgress).length
        for (let name of Object.keys(user.courseProgress)) {
            this.courses[name] = {}
            const jsonFile = name + '/common/res/course.json';
            Util.load(jsonFile, (err: Error, jsonAsset) => {
                if (!err) {
                    this.courses[name].chapters = jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
                }
                numCourses--
            })
        }
        const checkAllLoaded = () => {
            if (numCourses <= 0) {
                cc.director.getScheduler().unschedule(checkAllLoaded, node)
                callBack()
            }
        }
        cc.director.getScheduler().schedule(checkAllLoaded, node, 1)
    }

    currentLevelGames(): Array<string> {
        return this.curriculum[this.world][this.level];
    }

    currentWorlds() {
        return this.curriculum;
    }

    get friend(): string {
        return WORLDS[this.world].armature;
    }

    setGame(game: string, level: number) {
        this.game = game;
        this.gameLevel = level;
        this.gameLevelName = this.game === STORY ? this.gameConfigs[this.game].levelLabels[this.gameLevel] : this.gameLevel.toString()
        this.worksheet = 0;
        this.totalWorksheets = 0;
        this.problem = 0;
        this.totalProblems = 1;
    }

    public toString(): string {
        return 'level: ' + this.gameLevel + ' worksheet: ' + this.worksheet + ' problem: ' + this.problem + ' totalProblems: ' + this.totalProblems;
    }
}
