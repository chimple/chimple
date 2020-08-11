
import { catchError } from "../../../common/scripts/lib/error-handler";
import Drag from "../../../common/scripts/drag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragTheAlphabetChoice extends Drag {
    @catchError()
    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if (this.match) {
            this.node.emit('DragTheAlphabetMatch', this);
        } else {
            this.node.emit('DragTheAlphabetNoMatch');
        }
    }
}
