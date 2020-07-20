import Drop from "../../../common/scripts/drop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberTrainDrop extends Drop {
    @property(cc.Node)
    wagonBase: cc.Node = null

    @property
    order: number = 1

    onLoad() {
        super.onLoad()
        this.wagonBase.scaleY = this.order * 0.5
    }
}
