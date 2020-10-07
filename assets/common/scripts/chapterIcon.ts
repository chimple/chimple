import { Util } from "./util";
import { Chapter } from "./lib/convert";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChapterIcon extends cc.Component {
    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Node)
    bg: cc.Node

    chapter: Chapter

    onLoad() {
        Util.load(this.chapter.course.id + '/course/res/icons/' + this.chapter.image, (err, texture) => {
            if (!err) {
                this.sprite.spriteFrame = new cc.SpriteFrame(texture);
            }
        })
        if (this.chapter.color) this.bg.color = new cc.Color().fromHEX(this.chapter.color)
    }
}
