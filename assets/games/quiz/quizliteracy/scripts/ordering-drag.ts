import Drag from "../../../../common/scripts/drag";
import { ORDERING_MATCH, ORDERING_NO_MATCH } from "./ordering_sequence";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OrderingDrag extends Drag {

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch);
        if (this.match) {
            this.node.emit(ORDERING_MATCH, this);
        } else {
            this.node.emit(ORDERING_NO_MATCH);
        }
    }
}
