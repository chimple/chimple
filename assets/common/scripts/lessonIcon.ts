import { Util } from "./util";
import { Chapter } from "../../common/scripts/lib/convert";
import { Lesson } from "./lib/convert";
import { User } from "./lib/profile";

const { ccclass, property } = cc._decorator;

export const LESSON_BG_COLORS = [
    "#72DDD3",
    "#FC8E83",
    "#B8D855",
    "#D48FF9",
    "#F98AC9"
]

@ccclass
export default class LessonIcon extends cc.Component {
    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Node)
    bg: cc.Node

    @property(cc.Material)
    grayMaterial: cc.Material

    lesson: Lesson
    open: boolean = false

    onLoad() {
        const defaultSpriteFrame = this.sprite.spriteFrame
        this.sprite.spriteFrame = null
        Util.load(this.lesson.chapter.course.id + '/course/res/icons/' + this.lesson.image, (err, texture) => {
            if (!err) {
                this.sprite.spriteFrame = new cc.SpriteFrame(texture);
            } else {
                this.sprite.spriteFrame = defaultSpriteFrame
            }
        })
        if (this.open) {
            const currentLesson = User.getCurrentUser().lessonProgressMap.get(this.lesson.id)
            if (User.getCurrentUser().debug != true) {
                try {
                    if (currentLesson.score < 0) {
                        const lessonHighlightAnimation = this.getComponent(cc.Animation);
                        lessonHighlightAnimation.play('lesson_highlight');
                    }
                } catch (error) {
                    const lessonHighlightAnimation = this.getComponent(cc.Animation);
                    lessonHighlightAnimation.play('lesson_highlight');
                }
            }

            this.bg.color = new cc.Color().fromHEX(
                this.lesson.color
                    ? this.lesson.color
                    : LESSON_BG_COLORS[Math.floor(Math.random() * LESSON_BG_COLORS.length)])
        } else {
            this.sprite.setMaterial(0, this.grayMaterial)
            this.bg.color = new cc.Color(224, 224, 224)
        }
    }
}
