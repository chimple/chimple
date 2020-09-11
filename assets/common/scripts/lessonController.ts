import Balloon from "./balloon";
import Config, { DEFAULT_FONT } from "./lib/config";
import { GAME_CONFIGS } from "./lib/gameConfigs";
import ProgressMonitor from "./progressMonitor";
import { QUIZ_ANSWERED } from "./quiz-monitor";
import { Util } from "./util";
import { Queue } from "../../queue";
import { CURRENT_CLASS_ID, CURRENT_SCHOOL_ID, CURRENT_SECTION_ID, CURRENT_STUDENT_ID, CURRENT_SUBJECT_ID } from "./lib/constants";
import { User } from "./lib/profile";
import { Lesson } from "./lib/convert";
import UtilLogger from "./util-logger";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LessonController extends cc.Component {

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

    @property(dragonBones.ArmatureDisplay)
    chimp: dragonBones.ArmatureDisplay = null;

    @property(cc.Node)
    gameParent: cc.Node = null;

    @property(cc.Node)
    loading: cc.Node = null;

    progressMonitorNode: cc.Node = null;
    quizMonitorNode: cc.Node = null;
    gameNode: cc.Node = null;
    wrongMoves: number = 0;
    rightMoves: number = 0;
    callback: () => boolean;
    nest: cc.Node = null;
    quizScore: number = 0;
    total: number = 0;
    isQuizAnsweredCorrectly: boolean = false;
    lessonStartTime: number = 0;
    problemStartTime: number = 0;
    problemTime: number = 0;
    isGameCompleted: boolean = false;
    isQuizCompleted: boolean = false;
    gameTime: number = 0;
    quizTime: number = 0;

    static gamePrefab: cc.Prefab;

    onLoad() {
        this.loading.width = cc.winSize.width;
        this.loading.zIndex = 10;
        this.progressMonitorNode = cc.instantiate(this.progressMonitor);
        this.progressMonitorNode.zIndex = 2;
        this.node.addChild(this.progressMonitorNode);
        this.lessonStart();
    }

    static preloadLesson(callback: Function) {
        const config = Config.i;
        config.problem = 0;
        cc.assetManager.loadBundle(config.lessonId, (err, bundle) => {
            if (err) {
                return console.error(err);
            }

            bundle.preloadDir('res', null, null, (err: Error, items) => {
                Util.bundles.set(config.lessonId, bundle);
                config.loadLessonJson((data: Array<string>) => {
                    config.data = [data];
                    this.preloadGame((prefab: cc.Prefab) => {
                        this.gamePrefab = prefab;
                        callback();
                    });
                });
            });
        });

    }

    static preloadGame(callback: Function) {
        const config = Config.i;
        config.game = config.data[0][0];
        const gameConfig = GAME_CONFIGS[config.game];
        let fontName: string = config.courseId.split('-')[0] + '-' + DEFAULT_FONT;
        if (gameConfig.fontName != null) {
            fontName = gameConfig.fontName;
        }
        config.loadFontDynamically(fontName);

        cc.assetManager.loadBundle(gameConfig.bundle, (err, bundle) => {
            bundle.load(gameConfig.prefab, cc.Prefab, (err, prefab) => {
                callback(prefab);
            });
        });
    }

    private lessonStart() {
        this.startGame(LessonController.gamePrefab);
        this.loading.active = false;
    }

    private problemStart(replaceScene: boolean) {
        this.problemStartTime = new Date().getTime();
        if (replaceScene) {
            LessonController.preloadGame((prefab: cc.Prefab) => {
                this.startGame(prefab);
                this.loading.active = false;
            });
        } else {
            if (this.gameNode != null) this.gameNode.emit('nextIteration');
            this.loading.active = false;
        }

    }

    private startGame(prefab: cc.Prefab) {
        if (this.gameNode != null) this.gameNode.removeFromParent();
        this.gameNode = cc.instantiate(prefab);
        this.gameParent.addChild(this.gameNode);
        const gameConfig = GAME_CONFIGS[Config.i.game];
        if (gameConfig.center) {
            this.gameNode.x = -512;
            this.gameNode.y = -384;
        } else {
            this.gameNode.x = 0;
            this.gameNode.y = 0;
        }
        this.setupEventHandlers();
    }

    private problemEnd(replaceScene: boolean) {
        let monitor = null;
        const config = Config.i;
        const timeSpent = Math.ceil((new Date().getTime() - this.problemStartTime) / 1000);
        // if (config.game === QUIZ_LITERACY || config.game === QUIZ_MATHS) {
        //     monitor = this.quizMonitorNode.getComponent(QuizMonitor);
        //     monitor.stopStar = this.isQuizAnsweredCorrectly;
        // } else {
        monitor = this.progressMonitorNode.getComponent(ProgressMonitor);
        // }
        const currentProblem = config.problem;
        this.loading.active = true;

        const score: number = config.game.toLowerCase().includes("quiz") ? this.quizScore : this.total;

        if (cc.sys.localStorage.getItem(CURRENT_STUDENT_ID)) {
            let monitorInfo = {
                chapter        : config.chapterId,
                lesson         : config.lessonId,
                incorrect      : this.wrongMoves,
                totalQuestions : config.totalProblems,
                correct        : this.rightMoves,
                totalChallenges: config.totalProblems,
                totalSeconds   : timeSpent,
                activity       : config.game,
                kind           : 'Monitor',
                schoolId       : cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID),
                studentId      : cc.sys.localStorage.getItem(CURRENT_STUDENT_ID),
                classId        : cc.sys.localStorage.getItem(CURRENT_CLASS_ID)
            };
            Queue.getInstance().push(monitorInfo);
        }
        
        const eventName: string = config.game.toLowerCase().includes("quiz") ? "quizEnd" :
            "gameEnd";
        UtilLogger.logChimpleEvent(eventName, {
            chapterName   : config.chapter.name,
            chapterId     : config.chapterId,
            lessonName    : config.lesson.name,
            lessonId      : config.lessonId,
            courseName    : config.courseId,
            problemNo     : config.problem,
            timeSpent     : timeSpent,
            wrongMoves    : this.wrongMoves,
            correctMoves  : this.rightMoves,
            skills        : config.lesson.skills && config.lesson.skills.length > 0 ? config.lesson.skills.join(",") : "",
            game_completed: config.game.toLowerCase().includes("quiz") ? false : true,
            quiz_completed: config.game.toLowerCase().includes("quiz") ? true : false
        });

        monitor.updateProgress(currentProblem, () => {
            monitor.stopStar = false;
            if (currentProblem < config.totalProblems) {
                config.nextProblem();
                this.problemStart(replaceScene);
            } else {
                this.lessonEnd();
            }
        });
    }

    private lessonEnd() {
        Util.playSfx(this.startAudio);
        const config = Config.getInstance();
        const timeSpent = Math.ceil((new Date().getTime() - this.lessonStartTime) / 1000);
        this.total = Math.max(0, 100 - this.wrongMoves * 10);

        const user = User.getCurrentUser();
        user.updateLessonProgress(config.lessonId, this.total);
        let finishedLessons = 0;
        let percentageComplete = 0;
        if (config.chapter && config.chapter.lessons &&
            config.chapter.lessons.length > 0) {
            config.chapter.lessons.forEach(
                (lesson: Lesson) => {
                    user.lessonProgressMap.has(lesson.id) ? finishedLessons++ : '';
                }
            );
            percentageComplete = finishedLessons / config.chapter.lessons.length;
        }

        if (cc.sys.localStorage.getItem(CURRENT_STUDENT_ID)) {
            let updateInfo = {
                chapter        : config.chapterId,
                lesson         : config.lessonId,
                percentComplete: percentageComplete,
                timespent      : timeSpent,
                assessment     : this.total,
                kind           : 'Progress',
                schoolId       : cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID),
                studentId      : cc.sys.localStorage.getItem(CURRENT_STUDENT_ID),
                sectionId      : cc.sys.localStorage.getItem(CURRENT_SECTION_ID),
                subjectId      : cc.sys.localStorage.getItem(CURRENT_SUBJECT_ID)
            };

            Queue.getInstance().push(updateInfo);
        }

        UtilLogger.logChimpleEvent("lessonEnd", {
            chapterName   : config.chapter.name,
            chapterId     : config.chapterId,
            lessonName    : config.lesson.name,
            lessonId      : config.lessonId,
            courseName    : config.courseId,
            score         : config.game.toLowerCase().includes("quiz") ? this.quizScore : this.total,
            timeSpent     : timeSpent,
            skills        : config.lesson.skills ? config.lesson.skills.join(",") : "",
            game_completed: config.game.toLowerCase().includes("quiz") ? false : true,
            quiz_completed: config.game.toLowerCase().includes("quiz") ? true : false
        });

        const block = cc.instantiate(this.blockPrefab);
        this.node.addChild(block);

        const balloon = cc.instantiate(this.balloonPrefab);
        balloon.position = cc.director.getScene().convertToNodeSpaceAR(this.chimp.node.parent.convertToWorldSpaceAR(cc.v2(0, -118)));
        const balloonComp = balloon.getComponent(Balloon);
        balloonComp.game = config.game;
        balloonComp.label.string = Util.i18NText('Game Over');
        balloonComp.chimp = this.chimp.node;
        this.chimp.node.removeFromParent();
        balloonComp.seat.addChild(this.chimp.node);
        balloonComp.onClickCallback = () => {
            config.popScene();
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
    }

    private setupEventHandlers() {
        this.gameNode.on('nextProblem', (replaceScene: boolean = true) => {
            this.problemEnd(replaceScene);
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

    onBackClick() {
        Config.i.popScene();
        Util.stopHelpAudio();
    }
}
