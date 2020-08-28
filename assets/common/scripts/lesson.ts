import Balloon from "./balloon";
import Config, { DEFAULT_FONT, QUIZ_LITERACY, QUIZ_MATHS } from "./lib/config";
import { GAME_CONFIGS } from "./lib/gameConfigs";
import ProgressMonitor from "./progressMonitor";
import QuizMonitor, { QUIZ_ANSWERED } from "./quiz-monitor";
import { Util } from "./util";
import { Queue } from "../../queue";
import { CURRENT_CLASS_ID, CURRENT_SCHOOL_ID, CURRENT_SECTION_ID, CURRENT_STUDENT_ID, CURRENT_SUBJECT_ID } from "./lib/constants";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Lesson extends cc.Component {

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

    onLoad() {
        this.lessonStart();
    }

    private lessonStart() {
        const config = Config.getInstance();
        config.problem = 0;
        config.loadLessonJson((data: Array<string>) => {
            config.data = [data];
            if ((config.game === QUIZ_LITERACY || config.game === QUIZ_MATHS)) {
                this.quizMonitorNode = cc.instantiate(this.quizMonitor);
                this.quizMonitorNode.zIndex = 2;
                this.node.addChild(this.quizMonitorNode);
            } else {
                this.progressMonitorNode = cc.instantiate(this.progressMonitor);
                this.progressMonitorNode.zIndex = 2;
                this.node.addChild(this.progressMonitorNode);
            }
            this.problemStart(true, () => {
            });
        });
    }

    private problemStart(replaceScene: boolean, callback: Function) {
        this.wrongMoves = 0;
        this.rightMoves = 0;
        const config = Config.getInstance();

        if (replaceScene) {
            config.game = config.data[0][0];
            const gameConfig = GAME_CONFIGS[config.game];
            let fontName: string = config.course.split('-')[0] + '-' + DEFAULT_FONT;
            if (gameConfig.fontName != null) {
                fontName = gameConfig.fontName;
            }
            config.loadFontDynamically(fontName);

            cc.assetManager.loadBundle(gameConfig.bundle, (err, bundle) => {
                bundle.load(gameConfig.prefab, cc.Prefab, (err, prefab) => {
                    if (this.gameNode != null) this.gameNode.removeFromParent();
                    this.gameNode = cc.instantiate(prefab);
                    this.gameParent.addChild(this.gameNode);
                    if (gameConfig.center) {
                        this.gameNode.x = -512;
                        this.gameNode.y = -384;
                    } else {
                        this.gameNode.x = 0;
                        this.gameNode.y = 0;
                    }
                    this.setupEventHandlers();
                    callback();
                });
            });
        } else {
            if (this.gameNode != null) this.gameNode.emit('nextIteration');
            callback();
        }

    }

    private problemEnd(replaceScene: boolean) {
        let monitor = null;
        const config = Config.i;
        if (config.game === QUIZ_LITERACY || config.game === QUIZ_MATHS) {
            monitor = this.quizMonitorNode.getComponent(QuizMonitor);
            monitor.stopStar = this.isQuizAnsweredCorrectly;
        } else {
            monitor = this.progressMonitorNode.getComponent(ProgressMonitor);
        }
        const currentProblem = config.problem;
        const block = cc.instantiate(this.blockPrefab);
        this.node.addChild(block);

        let monitorInfo = {
            chapter        : "Chapter",
            lesson         : "lesson",
            incorrect      : 0,
            totalQuestions : 1,
            correct        : 1,
            totalChallenges: 0,
            totalSeconds   : 100,
            activity       : config.game,
            kind           : 'Monitor',
            schoolId       : cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID),
            studentId      : cc.sys.localStorage.getItem(CURRENT_STUDENT_ID),
            classId        : cc.sys.localStorage.getItem(CURRENT_CLASS_ID)
        };

        Queue.getInstance().push(monitorInfo);
        monitor.updateProgress(currentProblem, () => {
            monitor.stopStar = false;
            if (currentProblem < config.totalProblems) {
                config.nextProblem();
                this.problemStart(replaceScene, () => {
                    if (this.gameNode != null) block.removeFromParent();
                });
            } else {
                this.lessonEnd();
            }
        });
    }

    private lessonEnd() {
        Util.playSfx(this.startAudio);
        const config = Config.getInstance();

        let updateInfo = {
            chapter   : "chapter",
            lesson    : config.lesson,
            timespent : 120,
            assessment: 0,
            kind      : 'Progress',
            schoolId  : cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID),
            studentId : cc.sys.localStorage.getItem(CURRENT_STUDENT_ID),
            sectionId : cc.sys.localStorage.getItem(CURRENT_SECTION_ID),
            subjectId : cc.sys.localStorage.getItem(CURRENT_SUBJECT_ID)
        };

        Queue.getInstance().push(updateInfo);

        // generic firebase logging

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
    }

}
