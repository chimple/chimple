import Config from "../../../common/scripts/lib/config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scorecard extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    star1: cc.Sprite = null;

    @property(cc.Sprite)
    star2: cc.Sprite = null;

    @property(cc.Sprite)
    star3: cc.Sprite = null;

    @property(cc.SpriteFrame)
    active: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    inactive: cc.SpriteFrame = null;

    @property(cc.Node)
    friendPos: cc.Node = null;

    @property
    score: number = 0;

    @property
    text: string = 'Lesson';

    onLoad () {
        this.label.string = this.text
        if(this.score > 25) this.star1.spriteFrame = this.active
        if(this.score > 50) this.star2.spriteFrame = this.active
        if(this.score > 75) this.star3.spriteFrame = this.active
    }

    onContinueClick() {
        Config.i.popScene()
    }
}
