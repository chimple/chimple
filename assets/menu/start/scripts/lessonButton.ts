import { Util } from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";
import { Lesson, Chapter } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";

const {ccclass, property} = cc._decorator;

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

    lesson: Lesson
    courseName: string
    chapter: Chapter

    onLoad() {
        if(this.lesson != null && this.courseName != null && this.chapter != null) {
            const config = Config.i
            this.label.string = this.lesson.name
            Util.load(this.courseName + '/course/res/icons/' + this.lesson.image, (err, texture) => {
                if (!err) {
                    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
            this.button.node.on('click', () => {
                config.lesson = this.lesson.id
                config.chapter = this.chapter.id
                config.course = this.courseName
                config.pushScene('common/scenes/lessonController')
            })
            if(this.chapterLabel != null) this.chapterLabel.string = this.chapter.name
            if(this.courseSprite != null) {
                Util.load(this.courseName + '/course/res/icons/' + this.courseName + '_bg.png', (err, texture) => {
                    if (!err) {
                        this.courseSprite.spriteFrame = new cc.SpriteFrame(texture);
                    }
                })    
            }
            const user = User.getCurrentUser()
            if (!user.lessonProgressMap.has(this.lesson.id)) {
                this.completedSprite.node.active = false
            }
        }
    }
}
