import { Util } from "../../scripts/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Achievement extends cc.Component {
    @property(cc.Sprite)
    reward: cc.Sprite = null;

    @property(cc.SpriteFrame)
    gold: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    silver: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    bronze: cc.SpriteFrame = null;

    image: string
    courseId: string
    score: number

    onLoad () {
        Util.load(this.courseId + '/course/res/icons/' + this.image, (err, texture) => {
            if (!err) {
                this.reward.spriteFrame = new cc.SpriteFrame(texture);
            }
        })
        this.getComponent(cc.Sprite).spriteFrame = this.score > 90 
            ? this.gold 
            : (this.score > 80 ? this.silver : this.bronze)
    }
}
