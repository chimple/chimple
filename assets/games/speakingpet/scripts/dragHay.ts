import Drag from "../../../common/scripts/drag";
import DropCow from "./dropCow";
import { Util } from "../../../common/scripts/util";
import LessonController from "../../../common/scripts/lessonController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragHay extends Drag {
    @property(cc.AudioClip)
    correctClip: cc.AudioClip = null;

    @property(cc.RichText)
    richTextNode: cc.RichText = null;

    private _text: string = null;
    private _soundName: string = null;
    private _soundClip: cc.AudioClip = null;

    get text(): string {
        return this._text;
    }

    set text(newVal) {
        this._text = newVal;
        this.richTextNode.string = newVal;
    }

    get soundName(): string {
        return this._soundName;
    }

    set soundName(newVal) {
        this._soundName = newVal;
        Util.loadGameSound(this._soundName, (clip) => {
            this._soundClip = clip;
        })
    }


    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch);
        if(this._soundClip != null) {
            LessonController.getFriend().speak(this._soundClip)
            // Util.play(this._soundClip, false);
        }
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch);
        if(this.match) {
            if(this._soundClip != null) {
                // Util.play(this._soundClip, false);
                LessonController.getFriend().speak(this._soundClip)
            }
        } else {
            this.node.emit('dragHayWrong')
        }
    }

    onMatchOver() {
        new cc.Tween().target(this.node)
        .to(0.5, { scale: 0.1}, null)
        .hide()
        .call(() => {
            this.matchingNode.getComponent(DropCow).eat()
            this.node.emit('dragHayDone');
            super.onMatchOver();
        })
        .start();

    }
}
