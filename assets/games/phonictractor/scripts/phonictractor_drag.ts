import { catchError } from "../../../common/scripts/lib/error-handler";
import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import LessonController from "../../../common/scripts/lessonController";
import Config from "../../../common/scripts/lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PhonicTractorDrag extends Drag {
    private _soundClip: cc.AudioClip = null;

    onLoad() {
        this.label.string = Config.wide ? ' ' + this.node.name + ' ' : this.node.name
        Util.loadGameAudioOrPhonics(this.node.name.toLowerCase(), (clip) => {
            if (clip != null) {
                this._soundClip = clip
            }
        });
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

    @catchError()
    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if (this.match) {
            this.node.emit('phonicTractorMatch', this)
        } else {
            this.node.emit('phonicTractorNoMatch')
        }
    }
}
