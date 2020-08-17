
import { catchError } from "../../../common/scripts/lib/error-handler";
import Drag from "../../../common/scripts/drag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragTheAlphabetChoice extends Drag {

    @catchError()
    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch);
        this.node.emit('DragTheAlphabetOnTouch');
    }

    @catchError()
    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch);
        if (this.match) {
            this.node.emit('DragTheAlphabetChoiceMatch', this);
        } else {
            this.node.emit('DragTheAlphabetChoiceNoMatch');
        }
    }
}
