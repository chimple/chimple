import ccclass = cc._decorator.ccclass;
import { Util, TouchEvents } from "../../../common/scripts/util";
import {WriteNumber} from "./writenumber";

@ccclass
export class Anim extends cc.Component {
    private _position: cc.Vec2 = null;
    private _containerNode: cc.Node = null;
    private _component: WriteNumber = null;
    private _movedToRightPos: boolean = false;
    private _anim: cc.Animation;
    private _animRunning: boolean = false;
    private _touchEnabled: boolean = false;

    protected onLoad(): void {
        this.enableTouchHandlers();
        this.node.scale = 0;
        this._anim = this.node.getComponent(cc.Animation);
    }

    protected enableTouchHandlers() {
        this.node.on(TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.on(TouchEvents.TOUCH_END, this.onTouchEnd, this);
    }

    protected disableTouchHandlers() {
        this.node.off(TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.off(TouchEvents.TOUCH_END, this.onTouchEnd, this);
    }


    onTouchStart(touch: cc.Touch) {
        if (this._component.touchAllowedOnAnimLayout && this._movedToRightPos) {
            if(!this._touchEnabled) {
                this._touchEnabled = true;
                this._component.updateSpeakCount();
                this.animateOffScreen();
                Util.speakEquation([String(this._component.speakCount)], (index) => {});
            }
        }
    }

    private animateOffScreen() {
        const x: number = Util.randomBetween(0, 0.3 * cc.winSize.width);
        new cc.Tween().target(this.node)
            .to(1, {opacity: 255, x: x, y: cc.winSize.width}, {progress: null, easing: 'cubicOut'})
            .call(() => {
                this.scheduleOnce(() => {
                    this._component.updateAnimationIndexCount();
                }, 0.1)
            })
            .start();
    }

    onTouchEnd(touch: cc.Touch) {
    }

    animateToScreen() {
        this._animRunning = true;
        this._anim.play('fly1');
        new cc.Tween().target(this.node)
            .to(1.5, {scaleX: -1, scaleY: 1, opacity: 255, x: this._position.x, y: this._position.y}, {
                progress: null,
                easing: 'quadOut'
            })
            .call(() => {
                this._movedToRightPos = true;
                this._anim.stop();
                this._animRunning = false;
            })
            .start();
    }

    set containerNode(c: cc.Node) {
        this._containerNode = c;
        this._component = this._containerNode.getComponent(WriteNumber);
    }

    set position(p) {
        this._position = p;
    }

    protected update(dt: number): void {
        if (this._component.touchAllowedOnAnimLayout && !this._animRunning) {
            this._animRunning = true;
            this._anim.play('fly1');
        }
    }
}
