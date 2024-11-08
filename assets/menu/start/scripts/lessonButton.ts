import LessonController from "../../../common/scripts/lessonController";
import LessonIcon from "../../../common/scripts/lessonIcon";
import Config, { COURSES_LANG_ID } from "../../../common/scripts/lib/config";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import Loading from "../../../common/scripts/loading";
import { REWARD_TYPES, Util } from "../../../common/scripts/util";
import { EXAM } from "../../../common/scripts/lib/constants";
import PreTestDialog from "./preTestDialog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LessonButton extends cc.Component {

    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Prefab)
    lessonIconPrefab: cc.Prefab

    @property(cc.Sprite)
    downloadSprite: cc.Sprite

    @property(cc.Sprite)
    star1: cc.Sprite

    @property(cc.Sprite)
    star2: cc.Sprite

    @property(cc.Sprite)
    star3: cc.Sprite

    @property(cc.SpriteFrame)
    grayStar: cc.SpriteFrame

    @property(cc.SpriteFrame)
    goldStar: cc.SpriteFrame

    @property(cc.Prefab)
    preTestPopup: cc.Prefab = null

    @property(cc.Node)
    lockIcon: cc.Node = null

    lesson: Lesson
    loading: cc.Node
    open: boolean = false
    showScoreStars: boolean = true

    onLoad() {
        const config = Config.i
        if (this.lesson != null && this.lesson.chapter.course != null && this.lesson != null) {
            const lessonIcon = cc.instantiate(this.lessonIconPrefab)
            const lessonIconComp = lessonIcon.getComponent(LessonIcon)
            lessonIconComp.lesson = this.lesson
            lessonIconComp.open = this.open
            this.button.node.insertChild(lessonIcon, 0)
            this.label.string = this.lesson.type == EXAM ? Util.i18NText('Challenge') : this.lesson.name
            this.button.node.on('touchend', (event: cc.Event) => {
                if (event.target.getComponent(cc.Button).interactable) {
                    this.onClick();
                }
            })
            this.button.interactable = this.open || this.lesson.chapter.course.id == 'reward'
            const lessonProgress = User.getCurrentUser().lessonProgressMap.get(this.lesson.id)
            if (this.lesson.assignmentId !== null && this.lesson.assignmentId !== undefined) {
                if (this.open
                    && this.showScoreStars
                    && lessonProgress
                    // && lessonProgress.assignmentIds.includes(this.lesson.assignmentId)
                    && lessonProgress.score >= 0) {
                    this.star1.spriteFrame = lessonProgress.score > 25 ? this.goldStar : this.grayStar
                    this.star2.spriteFrame = lessonProgress.score > 50 ? this.goldStar : this.grayStar
                    this.star3.spriteFrame = lessonProgress.score > 75 ? this.goldStar : this.grayStar
                }
            } else {
                if (this.open && lessonProgress && lessonProgress.score >= 0) {
                    this.star1.spriteFrame = lessonProgress.score > 25 ? this.goldStar : this.grayStar
                    this.star2.spriteFrame = lessonProgress.score > 50 ? this.goldStar : this.grayStar
                    this.star3.spriteFrame = lessonProgress.score > 75 ? this.goldStar : this.grayStar
                }
            }
            this.lockIcon.active = (!this.open && this.lesson.chapter.course.id == 'reward')
        }
    }

    onClick() {
        if (!this.open && this.lesson.chapter.course.id == 'reward') {
            User.getCurrentUser().currentReward = [
                REWARD_TYPES[4],
                this.lesson.chapter.id,
                this.lesson.id
            ]
            Config.i.popAllScenes()
            Config.i.pushScene('menu/start/scenes/start', 'menu', null, true);
            return;
        }
        const user = User.getCurrentUser();
        if (COURSES_LANG_ID.includes(this.lesson.chapter.course.id)) {
            const courseProgress = user.courseProgressMap.get(this.lesson.chapter.course.id);
            if (courseProgress.currentChapterId == null && !this.lesson.id.endsWith('_PreQuiz')) {
                cc.log(this.lesson.chapter.course.id)
                try {
                    const dialog = cc.instantiate(this.preTestPopup);
                    const canvasNode = cc.director.getScene().getChildByName("Canvas");
                    const script: PreTestDialog = dialog.getComponent(PreTestDialog)
                    if (script.isValid) {
                        script.courseId = this.lesson.chapter.course.id;
                        script.chapter = this.lesson.chapter;
                        canvasNode.addChild(dialog);
                    }
                } catch (e) { }
            } else {
                this.loadLesson();
            }
        } else {
            this.loadLesson();
        }
    }

    loadLesson() {
        Util.loadLesson(this.lesson, this.loading, this.node)
    }
}
