import Drag from "../../../common/scripts/drag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EquationChoice extends Drag {
    @property(cc.Node)
    bgNode: cc.Node = null;

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch);
        if(this.isDragging) {
            if(this.match) {
                this.node.emit('equationMatch');
            } else {
                this.node.emit('equationNoMatch');
            }
        }
    }
}
