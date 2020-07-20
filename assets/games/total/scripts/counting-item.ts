import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Total from "./total";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class CountingItem extends cc.Component {
    @property(cc.AudioClip)
    loadAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    touchAudio: cc.AudioClip = null;

    countingComponent: Total = null;
    isBranches: boolean = false;

    private _count: number = null;
    private _originZIndex: number;

    @catchError()
    protected onLoad(): void {
        this.registerTouch();
        this.hideLabel();
    }

    @catchError()
    showLabel(text) {
        const imageNode = this.node.getChildByName('imageNode');
        if (!!imageNode) {
            imageNode.opacity = 255;
            const labelNode = imageNode.getChildByName('labelNode');
            labelNode.color = new cc.Color().fromHEX('#654321');
            const label = labelNode.getComponent(cc.Label);
            const textL = this.countingComponent.currentConfig.numberpads[text] || text;
            const outLine = labelNode.addComponent(cc.LabelOutline);
            outLine.width = 2;

            label.string = textL;
        }
    }

    @catchError()
    hideLabel() {
        const imageNode = this.node.getChildByName('imageNode');
        if (!!imageNode) {
            imageNode.opacity = 0;
        }
    }

    @catchError()
    playLoadingSound() {
        try {
            if (!!this.loadAudio)
                Util.playSfx(this.loadAudio);
        } catch (e) {

        }
    }

    onTouchStart(touch: cc.Touch) {
        try {
            this.count();
        } catch (e) {

        }
    }

    bringToFront() {
        this._originZIndex = this.node.zIndex;
        this.node.zIndex = 100;
    }

    sendBack() {
        this.node.zIndex = this._originZIndex;
    }

    @catchError()
    reCount() {
        this._count = null;
        this.count();
        this.sendBack();
    }

    @catchError()
    count() {
        try {
            if (!!this.touchAudio)
                Util.playSfx(this.touchAudio)
            this.bringToFront();
            if (this._count === null) {
                this._count = this.countingComponent.updateCount(this.isBranches ? 5 : 1);
                this.showLabel(String(this._count));
            }
        } catch (e) {

        }
    }

    onTouchEnd(touch: cc.Touch) {
        this.sendBack();
    }


    registerTouch() {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
    }

    unregisterTouch() {
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchEnd, this);
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
        this.unregisterTouch();
    }
}
