import Drag from "../../../common/scripts/drag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberTrainDrag extends Drag {
    @property(cc.Label)
    num: cc.Label = null;

    @property(cc.Node)
    numbertrain: cc.Node = null

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
