import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import Drag from "../../../common/scripts/drag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AlphaDrag extends Drag {
    pos: number = 0
    private _soundClip: cc.AudioClip = null;

    onLoad() {
        super.onLoad()
        if (Config.i.data[0][0] == 'letterboard') {
            Util.loadsLetter(this.node.name.toLowerCase(), (clip) => {
                this._soundClip = clip
            })
        } else {
            Util.loadNumericSound(this.node.name, (clip) => {
                this._soundClip = clip
            })
        }
    }

    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch)
        if (this.allowDrag && this._soundClip != null) {
            try {
                if (!!this._soundClip)
                    Util.play(this._soundClip, false)
            } catch (error) {
                console.log('Failed playing sound')
            }
        }
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if (this.match) {
            this.node.emit('alphaMatch', this)
        } else {
            this.node.emit('alphaNoMatch')
        }
    }

    onMatchOver() {
        super.onMatchOver()
        this.node.parent.color = cc.Color.WHITE
        this.node.parent.opacity = 255
    }
}
