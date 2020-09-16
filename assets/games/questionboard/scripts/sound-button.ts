import ccclass = cc._decorator.ccclass;
import { Util } from "../../../common/scripts/util";
import { ENABLE_BUTTONS, WRONG_ANSWER } from "./questionboard";
import Config from "../../../common/scripts/lib/config";
import { catchError } from "../../../common/scripts/lib/error-handler";

@ccclass
export default class SoundButton extends cc.Component {
    private _isSoundPlaying = false;
    private _soundClip = null;
    private _normalSpriteFrame: cc.SpriteFrame = null;
    private _pressedSpriteFrame: cc.SpriteFrame = null;

    @catchError()
    protected onLoad(): void {
        let button = this.node.getComponent(cc.Button);
        this._normalSpriteFrame = button.normalSprite;
        this._pressedSpriteFrame = button.pressedSprite;
    }

    @catchError()
    private playSound(node: cc.Node) {

        let button = node.getComponent(cc.Button);
        if (!this._isSoundPlaying) {
            this._isSoundPlaying = true;
            button.normalSprite = this._pressedSpriteFrame;
            const location = `${this._soundClip}`;
            Util.loadGameSound(`${this._soundClip}`, function (clip) {
                if (clip != null) {
                    Util.speakClip(clip,()=>{this._isSoundPlaying = false; button.interactable = true;})
                    if (this.node != null) {
                        this.node.dispatchEvent(new cc.Event.EventCustom(ENABLE_BUTTONS, true));
                    }
                }
            });
            button.normalSprite = this._normalSpriteFrame;

        }

    }



    stopSound() {
        this._isSoundPlaying = false;
        cc.audioEngine.stopAllEffects();
        let button = this.node.getComponent(cc.Button);
        button.normalSprite = this._normalSpriteFrame;
    }

    soundOnLoad() {
        let button = this.node.getComponent(cc.Button);
        button.interactable = false;
        setTimeout(() => {
            if (this.node != null) {
                this.playSound(this.node);
            }
            button.interactable = true;
        }, 7000);

    }

    onButtonClick(event, customEventData) {
        let button = this.node.getComponent(cc.Button);
        button.interactable = false;
        let node = event.target;
        this.stopSound();
        this.playSound(node);
    }

    set soundClip(n) {
        this._soundClip = n;
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    }
}
