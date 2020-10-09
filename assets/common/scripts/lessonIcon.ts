import { Util } from "./util";
import { Lesson } from "./lib/convert";

const {ccclass, property} = cc._decorator;

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

    onLoad () {
        Util.load(this.lesson.chapter.course.id + '/course/res/icons/' + this.lesson.image, (err, texture) => {
            if (!err) {
                this.sprite.spriteFrame = new cc.SpriteFrame(texture);
            }
        })
        if(this.open) {
            if(this.lesson.color) this.bg.color = new cc.Color().fromHEX(this.lesson.color)            
        } else {
            this.sprite.setMaterial(0, this.grayMaterial)
            this.bg.color = cc.Color.GRAY
        }
    }
}
