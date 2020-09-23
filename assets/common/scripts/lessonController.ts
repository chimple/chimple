import { Queue } from "../../queue";
import BackButton from "./backButton";
import Balloon from "./balloon";
import Friend from "./friend";
import Game from "./game";
import Config, { DEFAULT_FONT } from "./lib/config";
import { CURRENT_CLASS_ID, CURRENT_SCHOOL_ID, CURRENT_SECTION_ID, CURRENT_STUDENT_ID, CURRENT_SUBJECT_ID } from "./lib/constants";
import { Lesson } from "./lib/convert";
import { GAME_CONFIGS } from "./lib/gameConfigs";
import { User } from "./lib/profile";
import Loading from "./loading";
import ProgressMonitor, { StarType } from "./progressMonitor";
import { QUIZ_ANSWERED } from "./quiz-monitor";
import { Util } from "./util";
import UtilLogger from "./util-logger";

const { ccclass, property } = cc._decorator;

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

    @property(cc.Node)
    backButton: cc.Node = null

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
    lessonSessionId: string = null;
    problemSessionId: string = null;
    problemStartTime: number = 0;
    problemTime: number = 0;
    isGameCompleted: boolean = false;
    isQuizCompleted: boolean = false;
    isQuiz: boolean = false;
    gameTime: number = 0;
    quizTime: number = 0;
    friend: Friend = null;

    static gamePrefab: cc.Prefab;

    onLoad() {
        this.loading.width = cc.winSize.width;
        this.loading.zIndex = 10;
        this.progressMonitorNode = cc.instantiate(this.progressMonitor);
        this.progressMonitorNode.zIndex = 2;
        this.node.addChild(this.progressMonitorNode);
        const backButtonComp = this.backButton.getComponent(BackButton)
        backButtonComp.extraFunction = () => {
            this.onBackClick()
        }
        this.lessonStart();
    }

    static preloadLesson(callback: Function) {
        const config = Config.i;
        config.problem = 0;
        cc.assetManager.loadBundle(config.lesson.id, (err, bundle) => {
            if (err) {
                return console.error(err);
            }

            bundle.preloadDir('res', null, null, (err: Error, items) => {
                Util.bundles.set(config.lesson.id, bundle);
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
        let fontName: string = config.course.id.split('-')[0] + '-' + DEFAULT_FONT;
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
        this.lessonStartTime = new Date().getTime();
        this.lessonSessionId = User.createUUID();
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(Friend)
            this.startGame(LessonController.gamePrefab);
            this.loading.active = false;
        })
    }

    private problemStart(replaceScene: boolean) {
        this.problemStartTime = new Date().getTime();
        this.problemSessionId = User.createUUID();
        if (replaceScene) {
            LessonController.preloadGame((prefab: cc.Prefab) => {
                this.friend.node.removeFromParent()
                this.friend.isFace = false
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
        const gameComponent = this.gameNode.getComponent(Game)
        if(gameComponent) {
            if(!gameComponent.friendPos) {
                gameComponent.friendPos = new cc.Node()
                gameComponent.friendPos.position = cc.v3(-512, -384)
                gameComponent.node.addChild(gameComponent.friendPos)
            }
            gameComponent.friend = this.friend
            gameComponent.friendPos.addChild(this.friend.node)
        }
        this.gameParent.addChild(this.gameNode);
        this.friend.playIdleAnimation(1)
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
        const config = Config.i;
        const timeSpent = Math.ceil((new Date().getTime() - this.problemStartTime) / 1000);
        // if (config.game === QUIZ_LITERACY || config.game === QUIZ_MATHS) {
        //     monitor = this.quizMonitorNode.getComponent(QuizMonitor);
        //     monitor.stopStar = this.isQuizAnsweredCorrectly;
        // } else {
        const monitor = this.progressMonitorNode.getComponent(ProgressMonitor);
        // }
        const currentProblem = config.problem;
        if (currentProblem == config.totalProblems) {
            const loadingComp = this.loading.getComponent(Loading);
            loadingComp.animate = false;
        }
        this.loading.active = true;
        this.isQuiz = config.game.toLowerCase().includes("quiz");
        this.isQuizCompleted = this.isQuiz ? true : false;
        this.isGameCompleted = this.isQuiz ? false : true;
        const score: number = this.isQuiz ? this.quizScore : this.total;

        if (cc.sys.localStorage.getItem(CURRENT_STUDENT_ID)) {
            let monitorInfo = {
                chapter: config.chapter.id,
                lesson: config.lesson.id,
                incorrect: this.wrongMoves,
                totalQuestions: config.totalProblems,
                correct: this.rightMoves,
                totalChallenges: config.totalProblems,
                totalSeconds: timeSpent,
                activity: config.game,
                kind: 'Monitor',
                schoolId: cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID),
                studentId: cc.sys.localStorage.getItem(CURRENT_STUDENT_ID),
                classId: cc.sys.localStorage.getItem(CURRENT_CLASS_ID)
            };
            Queue.getInstance().push(monitorInfo);
        }

        const eventName: string = this.isQuiz ? "quizEnd" : "gameEnd";
        UtilLogger.logChimpleEvent(eventName, {
            lessonSessionId: this.lessonSessionId,
            problemSessionId: this.problemSessionId,
            chapterName: config.chapter.name,
            chapterId: config.chapter.id,
            lessonName: config.lesson.name,
            lessonId: config.lesson.id,
            courseName: config.course.id,
            problemNo: config.problem,
            timeSpent: timeSpent,
            wrongMoves: this.wrongMoves,
            correctMoves: this.rightMoves,
            skills: config.lesson.skills && config.lesson.skills.length > 0 ? config.lesson.skills.join(",") : "",
            game_completed: this.isGameCompleted,
            quiz_completed: this.isQuizCompleted
        });

        const starType = this.isQuiz ? (this.isQuizAnsweredCorrectly ? StarType.Correct : StarType.Wrong) : StarType.Default;
        monitor.updateProgress(currentProblem, starType, () => {
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
        user.updateLessonProgress(config.lesson.id, this.total);
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
                chapter: config.chapter.id,
                lesson: config.lesson.id,
                percentComplete: percentageComplete,
                timespent: timeSpent,
                assessment: this.total,
                kind: 'Progress',
                schoolId: cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID),
                studentId: cc.sys.localStorage.getItem(CURRENT_STUDENT_ID),
                sectionId: cc.sys.localStorage.getItem(CURRENT_SECTION_ID),
                subjectId: cc.sys.localStorage.getItem(CURRENT_SUBJECT_ID)
            };

            Queue.getInstance().push(updateInfo);
        }

        UtilLogger.logChimpleEvent("lessonEnd", {
            lessonSessionId: this.lessonSessionId,
            chapterName: config.chapter.name,
            chapterId: config.chapter.id,
            lessonName: config.lesson.name,
            lessonId: config.lesson.id,
            courseName: config.course.id,
            score: config.game.toLowerCase().includes("quiz") ? this.quizScore : this.total,
            timeSpent: timeSpent,
            skills: config.lesson.skills ? config.lesson.skills.join(",") : "",
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
            .to(0.5, { position: cc.v2(cc.winSize.width / 2, 100) }, null)
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
            this.friend.playHappyAnimation(1)
        });
        this.gameNode.on('wrong', () => {
            this.wrongMoves++;
            Util.playSfx(this.wrongAudio);
            this.friend.playSadAnimation(1)

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
        this.friend.stopAudio();
    }

    protected onDisable() {
        if (!this.isQuizCompleted && !this.isGameCompleted) {
            const timeSpent = Math.ceil((new Date().getTime() - this.problemStartTime) / 1000);
            const eventName: string = this.isQuiz ? "quizSkipped" : "gameSkipped";
            const config = Config.i;
            UtilLogger.logChimpleEvent(eventName, {
                lessonSessionId: this.lessonSessionId,
                problemSessionId: this.problemSessionId,
                chapterName: config.chapter.name,
                chapterId: config.chapter.id,
                lessonName: config.lesson.name,
                lessonId: config.lesson.id,
                courseName: config.course.id,
                problemNo: config.problem,
                timeSpent: timeSpent,
                wrongMoves: this.wrongMoves,
                correctMoves: this.rightMoves,
                skills: "",
                game_completed: this.isGameCompleted,
                quiz_completed: this.isQuizCompleted
            });
        }

    }

    public static getFriend(): Friend {
        const lessonNode = cc.Canvas.instance.node
        const lessonComp = lessonNode.getComponent(LessonController)
        return lessonComp.friend
    }

}
