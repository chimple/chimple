import { Util } from "./util";
import { Chapter } from "./lib/convert";
import { LESSON_BG_COLORS } from "./lessonIcon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChapterIcon extends cc.Component {
    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Node)
    bg: cc.Node

    @property(cc.Material)
    grayMaterial: cc.Material

    chapter: Chapter
    open: boolean = true

    onLoad() {
        const defaultSpriteFrame = this.sprite.spriteFrame
        this.sprite.spriteFrame = null
        Util.load(this.chapter.course.id + '/course/res/icons/' + this.chapter.image, (err, texture) => {
            if (!err) {
                this.sprite.spriteFrame = new cc.SpriteFrame(texture);
            } else {
                this.sprite.spriteFrame = defaultSpriteFrame
            }
        })
        if (this.open) {
            this.bg.color = new cc.Color().fromHEX(
                this.chapter.color
                    ? this.chapter.color
                    : LESSON_BG_COLORS[Math.floor(Math.random() * LESSON_BG_COLORS.length)])
        } else {
            this.sprite.setMaterial(0, this.grayMaterial)
            this.bg.color = new cc.Color(224, 224, 224)
        }
    }
}
