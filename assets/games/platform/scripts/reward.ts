import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Vec2 = cc.Vec2;
import { OBSTACLE_GROUP } from "../../../common/scripts/helper";

@ccclass
export class Reward extends cc.Component {
    @property(cc.SpriteFrame)
    r1: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r2: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r3: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r4: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r5: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r6: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r7: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r8: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r9: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    r10: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    o1: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    o2: cc.SpriteFrame = null;

    @property(cc.Prefab)
    imageNode: cc.Prefab = null;

    _touched: boolean = false;
    _rewardNumber: number = -1;
    correctAnswer: number = -1;

    get touched() {
        return this._touched;
    }

    set touched(touched) {
        this._touched = touched;
    }

    protected onLoad(): void {
    }

    loadImage(index) {
        this._rewardNumber = index;
        const image = cc.instantiate(this.imageNode);
        image.getComponent(cc.Sprite).spriteFrame = this['r' + index];
        image.setPosition(new Vec2(0, -16));
        this.node.addChild(image);
    }

    loadObstacle() {
        this.node.group = OBSTACLE_GROUP;
        const image = cc.instantiate(this.imageNode);
        image.getComponent(cc.Sprite).spriteFrame = Math.random() > 0.5 ? this.o1 : this.o2;
        image.setPosition(new Vec2(0, -16));
        this.node.addChild(image);
    }

    isCorrect(): boolean {
        return !!this.correctAnswer && !!this._rewardNumber && this.correctAnswer === this._rewardNumber;
    }
}
