import Drag from "../../../common/scripts/drag";
import LessonController from "../../../common/scripts/lessonController";
import { Util } from "../../../common/scripts/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberTrainDrag extends Drag {
    @property(cc.Label)
    num: cc.Label = null;

    @property(cc.Node)
    numbertrain: cc.Node = null
    private _soundClip: cc.AudioClip = null;
    onLoad() {
        try {
            Util.loadNumericSound(this.node.name, (clip: cc.AudioClip) => {
                this._soundClip = clip
            })
        } catch (e) {
            console.log(e);
        }
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
        super.onTouchEnd(touch)
        if(this.isDragging) {
            if (this.match) {
                this.numbertrain.emit('numbertrainMatch', this)
            } else {
                this.numbertrain.emit('numbertrainNoMatch')
            }    
        }
    }
}
