import LessonController from "../../../common/scripts/lessonController";
import LessonIcon from "../../../common/scripts/lessonIcon";
import Config from "../../../common/scripts/lib/config";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import Loading from "../../../common/scripts/loading";
import { Util } from "../../../common/scripts/util";
import { EXAM } from "../../../common/scripts/lib/constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LessonButton extends cc.Component {

    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Prefab)
    lessonIconPrefab: cc.Prefab

    @property(cc.Label)
    chapterLabel: cc.Label

    @property(cc.Sprite)
    courseSprite: cc.Sprite

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

    lesson: Lesson
    loading: cc.Node
    open: boolean = false

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
            if (this.chapterLabel != null) this.chapterLabel.string = this.lesson.chapter.name
            if (this.courseSprite != null) {
                Util.load(this.lesson.chapter.course.id + '/course/res/icons/' + this.lesson.chapter.course.id + '_bg.png', (err, texture) => {
                    if (!err) {
                        this.courseSprite.spriteFrame = new cc.SpriteFrame(texture);
                    }
                })
            }
            this.button.interactable = this.open
            const lessonProgress = User.getCurrentUser().lessonProgressMap.get(this.lesson.id)
            if (this.open && lessonProgress && lessonProgress.score >= 0) {
                this.star1.spriteFrame = lessonProgress.score > 25 ? this.goldStar : this.grayStar
                this.star2.spriteFrame = lessonProgress.score > 50 ? this.goldStar : this.grayStar
                this.star3.spriteFrame = lessonProgress.score > 75 ? this.goldStar : this.grayStar
            }

        }
    }

    onClick() {
        const config = Config.i
        config.course = this.lesson.chapter.course;
        config.chapter = this.lesson.chapter;
        config.lesson = this.lesson;
        this.loading.getComponent(Loading).allowCancel = true;
        this.loading.active = true;
        LessonController.preloadLesson(this.node, (err: Error) => {
            if (err) {
                this.loading.getComponent(Loading).addMessage(Util.i18NText('Error downloading content. Please connect to internet and try again'), true, true);
            }
            else {
                if (this.loading.activeInHierarchy) {
                    config.pushScene('common/scenes/lessonController');
                }
            }
        });
    }
}
