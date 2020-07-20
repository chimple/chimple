import Drag from "../../../common/scripts/drag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MissingNumberDrag extends Drag {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    missingNumber: cc.Node = null

    onTouchEnd(touch: cc.Touch) {
        const isDragging = this.isDragging
        super.onTouchEnd(touch)
        if(isDragging) {
            if (this.match) {
                this.missingNumber.emit('missingNumberMatch', this)
            } else {
                this.missingNumber.emit('missingNumberNoMatch')
            }    
        }
    }
}
