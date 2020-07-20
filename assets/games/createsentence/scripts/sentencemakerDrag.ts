import Drag from "../../../common/scripts/drag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SentencemakerDrag extends Drag {
    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if (this.match) {
            this.node.emit('sentencemakerMatch', this)
        } else {
            this.node.emit('sentencemakerNoMatch')
        }
    }
}
