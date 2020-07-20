import Drag from "../../../common/scripts/drag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PatternTrainDrag extends Drag {
    @property(cc.Sprite)
    pattern: cc.Sprite = null;

    @property(cc.Node)
    patterntrain: cc.Node = null

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if(this.isDragging) {
            if (this.match) {
                this.patterntrain.emit('patterntrainMatch', this)
            } else {
                this.patterntrain.emit('patterntrainNoMatch')
            }    
        }
    }
}
