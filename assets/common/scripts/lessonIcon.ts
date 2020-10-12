import { Util } from "./util";
import { Lesson } from "./lib/convert";

const { ccclass, property } = cc._decorator;

export const LESSON_BG_COLORS = [
    "#FF5473",
    "#FADC42",
    "#C73778",
    "#007F46",
    "#6ECCFF",
    "#149CC4",
    "#AFCA2D",
    "#F2C941",
    "#F7DC2F",
    "#E96429",
    "#72DDD3",
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
        Util.load(this.lesson.chapter.course.id + '/course/res/icons/' + this.lesson.image, (err, texture) => {
            if (!err) {
                this.sprite.spriteFrame = new cc.SpriteFrame(texture);
            }
        })
        if (this.open) {
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
