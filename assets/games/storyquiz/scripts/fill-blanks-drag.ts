import { FILL_IN_BLANKS_MATCH, FILL_IN_BLANKS_NO_MATCH } from "./quiz";
import Drag from "../../../common/scripts/drag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FillBlanksDrag extends Drag {
    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch);
        if (this.match) {
            this.node.emit(FILL_IN_BLANKS_MATCH, this);
        } else {
            this.node.emit(FILL_IN_BLANKS_NO_MATCH);
        }
    }
}
