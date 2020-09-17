import ccclass = cc._decorator.ccclass;
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class PageSound extends cc.Component {
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

    private playSound(node: cc.Node) {
        let button = node.getComponent(cc.Button);
        if (!this._isSoundPlaying) {
            cc.audioEngine.stopAllEffects();
            this._isSoundPlaying = true;
            button.normalSprite = this._pressedSpriteFrame;
            const audioId = Util.play(this._soundClip, false);
            cc.audioEngine.setFinishCallback(audioId, () => {
                this._isSoundPlaying = false;
                button.normalSprite = this._normalSpriteFrame;
            });
        }
    }

    stopSound() {
        this._isSoundPlaying = false;
        cc.audioEngine.stopMusic();
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
