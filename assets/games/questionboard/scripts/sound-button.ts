import ccclass = cc._decorator.ccclass;
import { Util } from "../../../common/scripts/util";
import {ENABLE_BUTTONS, WRONG_ANSWER} from "./questionboard";
import Config from "../../../common/scripts/lib/config";
import { catchError } from "../../../common/scripts/lib/error-handler";

export const WORD_WINDOW_SOUND = 'questionboard/res/';
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
            const location ="courses/"+ Config.dir + WORD_WINDOW_SOUND + `${this._soundClip}`;
            Util.speak(location, () => {
                this._isSoundPlaying = false;
                button.normalSprite = this._normalSpriteFrame;
                this.node.dispatchEvent(new cc.Event.EventCustom(ENABLE_BUTTONS, true));
            });
        }
    }

    stopSound() {
        this._isSoundPlaying = false;
        cc.audioEngine.stopAllEffects();
        let button = this.node.getComponent(cc.Button);
        button.normalSprite = this._normalSpriteFrame;
    }

    soundOnLoad() {
        this.playSound(this.node);
    }

    onButtonClick(event, customEventData) {
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
