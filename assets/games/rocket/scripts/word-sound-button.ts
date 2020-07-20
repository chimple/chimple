import ccclass = cc._decorator.ccclass;
import Rocket from "./rocket";
import catchError from "../../../common/scripts/lib/error-handler";
@ccclass
export default class WordSoundButton extends cc.Component {
    private _isSoundPlaying = false;
    containerComponent: Rocket;

    @catchError()
    private playSound() {
        if (!this._isSoundPlaying) {
            this._isSoundPlaying = true;
            this.containerComponent.speakWord();
        }
    }

    @catchError()
    stopSound() {
        this._isSoundPlaying = false;
        cc.audioEngine.stopAllEffects();
    }

    @catchError()
    soundOnLoad() {
        this.playSound();
    }

    @catchError()
    onButtonClick(event, customEventData) {
        let node = event.target;
        this.stopSound();
        this.playSound();
    }


    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }
}
