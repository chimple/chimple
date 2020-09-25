import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import LessonController from "../../../common/scripts/lessonController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpellingDrag extends Drag {
    private _soundClip: cc.AudioClip = null;

    onLoad() {
        super.onLoad()
        this.label.string = this.node.name
        Util.loadsPhonicsOrLetter(this.node.name.toLowerCase(), (clip) => {
            this._soundClip = clip
        })
    }

    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch)
        if (this._soundClip != null) {
            try {
                LessonController.getFriend().speak(this._soundClip)
            } catch (error) {
                console.log('Failed playing sound')
            }
        }
    }

    onTouchEnd(touch: cc.Touch) {
        const allowDrag = this.allowDrag
        super.onTouchEnd(touch)
        if(allowDrag && this.isMoved) {
            if (this.match) {
                this.node.emit('spellingMatch', this)
            } else {
                this.node.emit('spellingNoMatch')
            }    
        }
    }
}
