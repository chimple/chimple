import { Chapter } from "../../../common/scripts/lib/convert";
import { Util } from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChapterSelectButton extends cc.Component {
    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Sprite)
    sprite: cc.Sprite

    chapter: Chapter
    
    onLoad () {
        if(this.chapter!= null) {
            this.label.string = this.chapter.name
            Util.load(Config.i.courseId + '/course/res/icons/' + this.chapter.image, (err, texture) => {
                if (!err) {
                    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
        }
    }
}
