import Config, { Flow, QUIZ_LITERACY, QUIZ_MATHS, BRIDGE_NAME } from "./lib/config";
import Profile from "./lib/profile";
import Nest from "./nest";
import ProgressMonitor from "./progressMonitor";
import { Util } from "./util";
import UtilLogger from "./util-logger";
import QuizMonitor, { QUIZ_ANSWERED } from "./quiz-monitor";
import Balloon from "./balloon";

const {ccclass, property} = cc._decorator;
export const GAME_CONTROLLER_NAME = 'gameController';
export const LOG_GAME = 'game';
export const LOG_WORLD = 'world';
export const LOG_LEVEL = 'level';
export const COURSE = 'course';
export const SKILLS = 'skills';
export const LOG_GAME_LEVEL = 'gameLevel';
export const LOG_PROBLEM = 'problem';
export const LOG_WRONG_MOVES = 'wrongMoves';
export const LOG_RIGHT_MOVES = 'rightMoves';
export const LOG_TYPE = 'type';
export const PROBLEM_START = 'problemStart';
export const GAME_START = 'gameStart';
export const PROBLEM_END = 'problemEnd';
export const GAME_END = 'gameEnd';
export const LEVEL_COMPLETED = 'level_completed';
export const WORLD_COMPLETED = 'world_completed';
export const APP_START = 'app_start';
export const APP_END = 'app_end';
export const FAIL_TO_COLLECT_ALL_REWARDS = 'failToCollectAllRewards';
export const SELECT_CONTENT = 'select_content';
export const ITEM_ID = 'item_id';
export const CONTENT_TYPE = 'content_type';
export const UNLOCK_ACHIEVEMENT = 'unlock_achievement';
export const ACHIEVEMENT_ID = 'achievement_id';
export const LEVEL_START = 'level_start';
export const LEVEL_NAME = 'level_name';
export const LEVEL_END = 'level_end';

const GAME = 'game';
const STORY = 'story';
const QUIZ = 'quiz';

export const enum OverEvent {
    None,
    GameOver,
    LevelOver,
    WorldOver,
    LevelRepeat
}

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab)
    progressMonitor: cc.Prefab = null;

    @property(cc.Prefab)
    quizMonitor: cc.Prefab = null;

    @property(cc.AudioClip)
    correctAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    wrongAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    startAudio: cc.AudioClip = null;

    @property(cc.Prefab)
    balloonPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    nestPrefab: cc.Prefab = null;

    progressMonitorNode: cc.Node = null;
    quizMonitorNode: cc.Node = null;
    gameNode: cc.Node = null;
    wrongMoves: number = 0;
    rightMoves: number = 0;
    callback: () => boolean;
    chimp: dragonBones.ArmatureDisplay = null;
    nest: cc.Node = null;
    quizScore: number = 0;
    total: number = 0;
    isQuizAnsweredCorrectly: boolean = false;

    onLoad() {
        this.node.name = GAME_CONTROLLER_NAME;
        this.node.width = cc.winSize.width;
        this.nest = cc.instantiate(this.nestPrefab);
        const chimpNode = this.nest.getChildByName('chimp');
        if (chimpNode != null) {
            this.chimp = chimpNode.getComponent(dragonBones.ArmatureDisplay);
        }
        this.node.addChild(this.nest);
    }

    problemStart(replaceScene: boolean, callback: Function) {
        this.wrongMoves = 0;
        this.rightMoves = 0;
        const config = Config.getInstance();

        const log = Object.assign({});
        log[`${LOG_TYPE}`] = PROBLEM_START;
        log[`${LOG_GAME}`] = config.game;
        log[`${LOG_WORLD}`] = config.world;
        log[`${LOG_LEVEL}`] = config.level;
        log[`${LOG_GAME_LEVEL}`] = config.gameLevel;
        log[`${LOG_PROBLEM}`] = config.problem;
        log[`${COURSE}`] = config.course;
        UtilLogger.logEvent(log);

        config.loadGameJson((data: Array<Array<string>>) => {
            config.data = data;
            config.overEvent = OverEvent.GameOver;
            if (replaceScene) {
                if (config.problem == 1) {
                    // GAME START
                    const log = Object.assign({});
                    log[`${LOG_TYPE}`] = GAME_START;
                    log[`${LOG_GAME}`] = config.game;
                    log[`${LOG_WORLD}`] = config.world;
                    log[`${LOG_LEVEL}`] = config.level;
                    log[`${LOG_GAME_LEVEL}`] = config.gameLevel;
                    log[`${LOG_PROBLEM}`] = config.problem;
                    log[`${COURSE}`] = config.course;
                    UtilLogger.logEvent(log);

                    const select_content = Object.assign({});
                    select_content[`${ITEM_ID}`] = config.game;
                    select_content[`${CONTENT_TYPE}`] = config.level;
                    select_content[`${COURSE}`] = config.course;
                    UtilLogger.logEventToFireBaseWithKey(
                        SELECT_CONTENT, select_content
                    );

                    if ((config.game === QUIZ_LITERACY || config.game === QUIZ_MATHS)) {
                        this.quizMonitorNode = cc.instantiate(this.quizMonitor);
                        this.quizMonitorNode.zIndex = 2;
                        this.node.addChild(this.quizMonitorNode);
                    } else {
                        this.progressMonitorNode = cc.instantiate(this.progressMonitor);
                        this.progressMonitorNode.zIndex = 2;
                        this.node.addChild(this.progressMonitorNode);
                    }
                }
                Config.loadScene(config.gameConfigs[config.game].scene, config.gameConfigs[config.game].bundle)
                // Config.preloadScene(config.gameConfigs[config.game].scene, () => {
                //     callback();
                // });

            } else {
                callback();
            }
        });
    }

    loadGameScene() {
        const config = Config.getInstance();
        Config.loadScene(config.gameConfigs[config.game].scene, config.gameConfigs[config.game].bundle, this.setupEventHandlers.bind(this));
        Util.computeTimeDiff('gameController', new Date());
    }

    private setupEventHandlers() {
        const config = Config.getInstance();
        const canvas = cc.director.getScene().getChildByName('Canvas');
        if (canvas != null) {
            this.gameNode = canvas.getChildByName(config.game);
            if (this.gameNode != null) {
                this.gameNode.on('nextProblem', (replaceScene: boolean = true) => {
                    this.problemOver(replaceScene);
                });
                this.gameNode.on('correct', () => {
                    this.rightMoves++;
                    Util.playSfx(this.correctAudio);
                    if (this.chimp != null)
                        this.chimp.playAnimation('correct', 1);
                });
                this.gameNode.on('wrong', () => {
                    this.wrongMoves++;
                    Util.playSfx(this.wrongAudio);
                    if (this.chimp != null)
                        this.chimp.playAnimation('wrong', 1);
                });
                if (this.nest) {
                    const nestComp = this.nest.getComponent(Nest);
                    if (nestComp) nestComp.gameNode = this.gameNode;
                }

                this.gameNode.on(QUIZ_ANSWERED, (isAnsweredCorrectly: boolean) => {
                    if (isAnsweredCorrectly) {
                        cc.log("QUIZ_ANSWERED correctly");
                        this.isQuizAnsweredCorrectly = true;
                        this.quizScore++;
                    } else {
                        cc.log("QUIZ_ANSWERED wrongly");
                        this.isQuizAnsweredCorrectly = false;
                    }
                });
            }
        }
    }

    problemOver(replaceScene: boolean) {
        const config = Config.getInstance();

        const log = Object.assign({});
        log[`${LOG_TYPE}`] = PROBLEM_END;
        log[`${LOG_GAME}`] = config.game;
        log[`${LOG_WORLD}`] = config.world;
        log[`${LOG_LEVEL}`] = config.level;
        log[`${LOG_GAME_LEVEL}`] = config.gameLevel;
        log[`${LOG_PROBLEM}`] = config.problem;
        log[`${LOG_WRONG_MOVES}`] = this.wrongMoves;
        log[`${LOG_RIGHT_MOVES}`] = this.rightMoves;
        log[`${COURSE}`] = config.course;
        UtilLogger.logEvent(log);

        let monitor = null;
        if (config.game === QUIZ_LITERACY || config.game === QUIZ_MATHS) {
            monitor = this.quizMonitorNode.getComponent(QuizMonitor);
            monitor.stopStar = this.isQuizAnsweredCorrectly;
        } else {
            monitor = this.progressMonitorNode.getComponent(ProgressMonitor);
        }
        const currentProblem = config.problem;
        const block = cc.instantiate(this.blockPrefab);
        const canvas = cc.director.getScene().getChildByName('Canvas');
        if (canvas) canvas.addChild(block);

        monitor.updateProgress(currentProblem, () => {
            monitor.stopStar = false;
            if (currentProblem < config.totalProblems) {
                if (replaceScene) {
                    this.loadGameScene();

                } else {
                    if (this.gameNode != null) {
                        block.removeFromParent();
                        this.gameNode.emit('nextIteration');
                    }
                }
            } else {
                this.gameOver();
            }
        });
        if (config.problem > 0 && config.problem < config.totalProblems) {
            config.problem++;
            this.problemStart(replaceScene, () => {
                monitor.stopStar = true;
            });
        } else {
            monitor.stopStar = true;
        }
    }

    gameOver() {
        Util.playSfx(this.startAudio);
        const config = Config.getInstance();

        const log = Object.assign({});
        log[`${LOG_TYPE}`] = GAME_END;
        log[`${LOG_GAME}`] = config.game;
        log[`${LOG_WORLD}`] = config.world;
        log[`${LOG_LEVEL}`] = config.level;
        log[`${LOG_GAME_LEVEL}`] = config.gameLevel;
        log[`${COURSE}`] = config.course;
        UtilLogger.logEvent(log);

        var overEvent = OverEvent.GameOver;

        // if (Profile.lastLevel == config.level) {
        Profile.setGameCompleted(config.world, config.level, config.game);
        const levelDone = config.currentLevelGames()
            .filter(val => val[0] != 'run')
            .every(val =>
                Profile.isGameCompleted(config.world, config.level, val[0])
            );

        if (levelDone) {
            let skillsAchieved: string[] = [];
            config.currentLevelGames()
                .filter(val => val[0] != 'run')
                .forEach(val => {
                    if (val.length >= 4 && val[3] !== null && val[3] !== '') {
                        skillsAchieved.push(val[3]);
                    }
                });

            skillsAchieved = Array.from(new Set([].concat(skillsAchieved))) || [];
            cc.log('skillsAchieved', skillsAchieved);
            if ((config.game == QUIZ_LITERACY || config.game == QUIZ_MATHS)
                && this.quizScore / config.totalProblems < 0.6) {
                overEvent = OverEvent.LevelRepeat;
            } else {
                overEvent = OverEvent.LevelOver;
            }
            if (overEvent == OverEvent.LevelOver
                && config.world == Profile.lastWorld
                && config.level == Profile.lastLevel) {

                const log = Object.assign({});
                log[`${LOG_TYPE}`] = LEVEL_COMPLETED;
                log[`${LOG_WORLD}`] = config.world;
                log[`${LOG_LEVEL}`] = config.level;
                log[`${SKILLS}`] = skillsAchieved && skillsAchieved.length > 0 ?
                    skillsAchieved.join(',') : '';
                log[`${COURSE}`] = config.course;
                UtilLogger.logEvent(log);

                if (config.currentWorlds()[config.world].length == config.level + 1) {
                    Profile.lastWorld = config.world + 1;
                    overEvent = OverEvent.WorldOver;

                    const log = Object.assign({});
                    log[`${LOG_TYPE}`] = WORLD_COMPLETED;
                    log[`${LOG_WORLD}`] = config.world;
                    log[`${COURSE}`] = config.course;
                    UtilLogger.logEvent(log);

                    // log achievement event
                    const unlockAchievement = Object.assign({});
                    unlockAchievement[`${ACHIEVEMENT_ID}`] = config.world;
                    unlockAchievement[`${COURSE}`] = config.course;
                    UtilLogger.logEventToFireBaseWithKey(
                        UNLOCK_ACHIEVEMENT, unlockAchievement
                    );
                } else {
                    Profile.lastLevel = config.level + 1;
                    const log = Object.assign({});

                    // log LEVEL_START
                    const levelStart = Object.assign({});
                    levelStart[`${LEVEL_NAME}`] = config.level + 1;
                    levelStart[`${COURSE}`] = config.course;
                    UtilLogger.logEventToFireBaseWithKey(
                        LEVEL_START, levelStart
                    );

                    // log LEVEL_END
                    const levelEnd = Object.assign({});
                    levelEnd[`${LEVEL_END}`] = config.level;
                    levelEnd[`${COURSE}`] = config.course;
                    UtilLogger.logEventToFireBaseWithKey(
                        LEVEL_END, levelEnd
                    );
                }
            }
        }
        // }
        const block = cc.instantiate(this.blockPrefab);
        const canvas = cc.director.getScene().getChildByName('Canvas');
        if (canvas) canvas.addChild(block);

        const balloon = cc.instantiate(this.balloonPrefab);
        balloon.position = cc.director.getScene().convertToNodeSpaceAR(this.chimp.node.parent.convertToWorldSpaceAR(cc.v2(0, -118)));
        const balloonComp = balloon.getComponent(Balloon);
        balloonComp.game = config.game;
        if (config.gameConfigs[config.game].color)
            balloonComp.color = new cc.Color().fromHEX(config.gameConfigs[config.game].color);
        balloonComp.label.string = Util.i18NText(overEvent == OverEvent.LevelOver
            ? 'New Level Unlocked' : overEvent == OverEvent.LevelRepeat
                ? 'Repeat Level' : 'Game Over');
        balloonComp.chimp = this.chimp.node;
        this.chimp.node.removeFromParent();
        balloonComp.seat.addChild(this.chimp.node);
        if (config.gameConfigs[config.game].color != null) {
            balloonComp.color = new cc.Color().fromHEX(config.gameConfigs[config.game].color);
        }
        balloonComp.onClickCallback = () => {
            if (config.flow == Flow.Debug) {
                config.popScene();
            } else {
                config.overEvent = overEvent;
                config.clearPersistentNodes();
                config.preloadAssembleScene(() => balloonComp.stopZigzag = true);
                balloonComp.flyZigzag(() =>
                    new cc.Tween().target(balloon)
                        .to(0.5, {position: cc.v2(cc.winSize.width / 2, 600)}, null)
                        .call(() => config.loadAssembleScene(false))
                        .start()
                );
                // }
            }
        };
        cc.director.getScene().addChild(balloon);
        balloonComp.animateGlow();
        new cc.Tween().target(balloon)
            .to(0.5, {position: cc.v2(cc.winSize.width / 2, 100)}, null)
            .delay(2)
            .call(() => {
                balloonComp.onBalloonClick();
            })
            .start();
        const bridgeNode = cc.director.getScene().getChildByName(BRIDGE_NAME);
        if (bridgeNode != null) {
            new cc.Tween().target(bridgeNode)
                .to(0.5, {y: 0}, null)
                .start();
        }
    }

}
