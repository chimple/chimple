import Config, { COURSES } from "./lib/config";

import { Util } from "./util";

const { ccclass, property } = cc._decorator;

export const LITERACY_GAMES: string = 'literacy'
export const MATHS_GAMES: string = 'maths'

var handleClick: boolean = true

export enum BalloonType {
    Game,
    Type
}

@ccclass
export default class Balloon extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null

    @property
    game: string = null

    @property(cc.Node)
    seat: cc.Node = null

    @property(cc.Node)
    image: cc.Node = null

    @property(cc.Sprite)
    icon: cc.Sprite = null

    @property(cc.Node)
    chimp: cc.Node = null

    @property(cc.Node)
    doneIcon: cc.Node = null

    @property
    done: boolean = false

    @property(cc.Node)
    waitingIcon: cc.Node = null

    @property
    waiting: boolean = false

    @property(cc.Node)
    glow: cc.Node = null

    @property(cc.Node)
    stars: cc.Node = null

    @property(cc.AudioClip)
    appearAudio: cc.AudioClip = null

    _color: cc.Color = null
    onClickCallback: Function = null
    level: number = 0
    stopZigzag: boolean = false
    type: BalloonType = BalloonType.Game

    onLoad() {
        const config = Config.i
        handleClick = true;
        if (!this.done && this.doneIcon != null) {
            this.doneIcon.active = false
        }
        if (this.type == BalloonType.Type) {
            if (this.game == 'en') {
                this.label.string = 'English'
                this._color = new cc.Color().fromHEX('#FFD141')
            } else if (this.game == 'hi') {
                this.label.string = 'हिन्दी'
                this._color = new cc.Color().fromHEX('#5E9C46')
            } else if (this.game == 'en-maths') {
                this.label.string = 'Maths'
                this._color = new cc.Color().fromHEX('#6A5AAB')
            } else if (this.game == 'hi-maths') {
                this.label.string = 'गणित'
                this._color = new cc.Color().fromHEX('#6A5AAB')
            } else if (this.game == 'ur') {
                this.label.string = 'اردو'
                this._color = new cc.Color().fromHEX('#5E9C46')
            } else if (this.game == 'ur-maths') {
                this.label.string = 'ریاضی'
                this._color = new cc.Color().fromHEX('#6A5AAB')
            }
        }
        if (!!this.image && !!this._color)
            this.image.color = this._color

        const button = this.node.getComponent(cc.Button)
        if (button != null) button.interactable = false
        this.waitingIcon.active = true
        Util.downloadIfNeeded(this.node, this.game, this.level, (success: boolean) => {
            if(success) {
                const button = this.node.getComponent(cc.Button)
                if (button != null) button.interactable = true
                this.setIcon()
                this.waitingIcon.active = false    
            }
        })
    }


    private setIcon() {
        const iconFile = (COURSES.indexOf(this.game) >= 0 ? this.game : Config.i.course.id) + '/common/res/icons/' + this.game + '.png'
        Util.load(iconFile, (err, texture) => {
            if (!err) {
                this.icon.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
    }

    set color(newColor: cc.Color) {
        this._color = newColor
        this.image.color = newColor
    }

    onBalloonClick() {
        if (handleClick && this.chimp != null) {
            handleClick = false
            this.onClickCallback()
        }
    }

    flyToNest(callback: Function = null) {
        const nest = cc.director.getScene().getChildByName('nest');
        const nestPos = nest != null ? nest.position : cc.v2(cc.winSize.width - 65, cc.winSize.height - 61)
        this.node.runAction(cc.sequence(cc.bezierTo(2, [
            cc.v2((nestPos.x - this.node.x) / 4, (nestPos.y - 118 - this.node.y) / 4),
            cc.v2((nestPos.x - this.node.x) / 2, (nestPos.y - 118 - this.node.y) / 2),
            cc.v2(nestPos.x, nestPos.y - 118)
        ]), cc.callFunc(() => {
            if (callback != null) callback()
        })));
    }

    jumpChimpToBalloon(callback: Function) {
        const finalPos = this.chimp.parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(this.seat.position));
        this.chimp.runAction(cc.sequence([
            cc.bezierTo(1, [
                cc.v2(this.chimp.x, this.chimp.y + 100),
                cc.v2(finalPos.x / 2, finalPos.y + 100),
            ]),
            cc.callFunc(() => {
                // @ts-ignore
                this.chimp.position = cc.Vec2.ZERO
                this.chimp.removeFromParent(false)
                this.seat.addChild(this.chimp)
                if (callback != null) callback()
            })
        ]))
    }

    jumpChimpFromBalloon(callback: Function) {
        this.chimp.position = cc.director.getScene().convertToNodeSpaceAR(this.chimp.parent.convertToWorldSpaceAR(this.chimp.position))
        this.chimp.removeFromParent()
        cc.director.getScene().addChild(this.chimp)
        const finalPos = cc.v2(cc.winSize.width / 4, 400)
        this.chimp.runAction(cc.sequence(
            cc.bezierTo(1, [
                cc.v2(this.chimp.x, this.chimp.y + 100),
                cc.v2(finalPos.x / 2, finalPos.y + 100),
                finalPos
            ]), cc.callFunc(() => {
                if (callback != null) callback()
            })))
    }


    flyUpUpAndAbove(callback: Function = null) {
        this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(1, 0.1), cc.bezierTo(1, [
            cc.v2(this.node.x - 400 + Math.random() * 800, cc.winSize.height / 3),
            cc.v2(this.node.x - 400 + Math.random() * 800, 2 * cc.winSize.height / 3),
            cc.v2(this.node.x - 400 + Math.random() * 800, 5 * cc.winSize.height / 3)
        ])), cc.callFunc(() => {
            if (callback != null) callback()
        })))
    }

    flyZigzag(callback: Function = null) {
        new cc.Tween().target(this.node)
            .to(1, { position: this.node.parent.convertToNodeSpaceAR(cc.v2(Math.random() * cc.winSize.width, Math.random() * cc.winSize.height / 2)) }, { progress: null, easing: 'cubicInOut' })
            .call(() => {
                if (this.stopZigzag) {
                    if (callback != null) callback()
                } else {
                    this.flyZigzag(callback)
                }
            })
            .start()
    }

    flyToCenter(callback: Function = null) {
        new cc.Tween().target(this.node)
            .to(1, { position: this.node.parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width / 2, cc.winSize.height / 4)) }, { progress: null, easing: 'cubicInOut' })
            .call(() => {
                if (callback != null) callback()
            })
            .start()
    }

    animateGlow() {
        this.glow.active = true
        this.stars.active = true
        const anim = this.node.getComponent(cc.Animation)
        if (anim != null) {
            anim.play()
        }
    }

}
