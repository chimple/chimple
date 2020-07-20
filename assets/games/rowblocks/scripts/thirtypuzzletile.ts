import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ThirtyPuzzleTile extends cc.Component {
    @property(cc.Label)
    numberLabel: cc.Label = null

    @catchError()
    onLoad() {
        this.numberLabel.string = this.node.name
    }
}
