import { Util } from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";
import { Lesson, Chapter, Course } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import LessonController from "../../../common/scripts/lessonController";
import Loading from "../../../common/scripts/loading";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LessonButton extends cc.Component {

    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Label)
    chapterLabel: cc.Label

    @property(cc.Sprite)
    courseSprite: cc.Sprite

    @property(cc.Sprite)
    completedSprite: cc.Sprite

    @property(cc.Sprite)
    downloadSprite: cc.Sprite

    @property(cc.Material)
    grayMaterial: cc.Material

    course: Course
    chapter: Chapter
    lesson: Lesson
    loading: cc.Node
    open: boolean = false

    onLoad() {
        const config = Config.i
        if (this.lesson != null && this.course != null && this.lesson != null) {
            this.label.string = this.lesson.name
            Util.load(this.course.id + '/course/res/icons/' + this.lesson.image, (err, texture) => {
                if (!err) {
                    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
            this.button.node.on('click', () => {
                config.course = this.course
                config.chapter = this.chapter
                config.lesson = this.lesson;
                this.loading.getComponent(Loading).allowCancel = true
                this.loading.active = true
                LessonController.preloadLesson((err: Error) => {
                    if(err) {
                        this.loading.getComponent(Loading).addMessage(err.message, true, true)
                    } else {
                        config.pushScene('common/scenes/lessonController')
                    }
                })
            })
            if (this.chapterLabel != null) this.chapterLabel.string = this.chapter.name
            if (this.courseSprite != null) {
                Util.load(this.course.id + '/course/res/icons/' + this.course.id + '_bg.png', (err, texture) => {
                    if (!err) {
                        this.courseSprite.spriteFrame = new cc.SpriteFrame(texture);
                    }
                })
            }
            if(!this.open) {
                this.button.interactable = false
                this.sprite.setMaterial(0, this.grayMaterial)
            }
            const lessonProgress = User.getCurrentUser().lessonProgressMap.get(this.lesson.id)
            if (!lessonProgress || lessonProgress.score < 0) {
                this.completedSprite.node.active = false
            }
        }
    }
}
