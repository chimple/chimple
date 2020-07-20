import Drag from "../../../common/scripts/drag";
import { STICK_CHOICE_CORRECT, STICK_CHOICE_WRONG } from "./rocket";
import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class StickerChoice extends Drag {
    private _originalPosition: cc.Vec2 = null;
    name: string = '';
    word: string = '';
    @property(cc.AudioClip)
    correctClip: cc.AudioClip = null;

    @property(cc.AudioClip)
    wrongClip: cc.AudioClip = null;

    @catchError()
    onLoad() {
        super.onLoad();
    }

    start() {
        super.start();
    }

    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch);
        this._originalPosition = this.node.position;
        try {
            Util.speakPhonicsOrLetter(this.word || this.name, () => {
            })
        } catch (e) {

        }
    }

    onTouchMove(touch: cc.Touch) {
        super.onTouchMove(touch);
    }

    returnBackOnNoMatchPos() {
        try {
            if (!!this.wrongClip)
                Util.playSfx(this.wrongClip);
        } catch (e) {

        }
        return this._originalPosition ? this._originalPosition : this.node.position;
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if (this.match) {
            this.node.dispatchEvent(new cc.Event.EventCustom(STICK_CHOICE_CORRECT, true));
        } else {
            if (this.allowDrag && this.isMoved) {
                this.node.dispatchEvent(new cc.Event.EventCustom(STICK_CHOICE_WRONG, true));
            }
        }
    }

    onMatchOver() {
        super.onMatchOver();
    }
}
