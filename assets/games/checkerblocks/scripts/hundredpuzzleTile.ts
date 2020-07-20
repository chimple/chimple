const { ccclass, property } = cc._decorator;

@ccclass
export default class HundredPuzzleTile extends cc.Component {
    @property(cc.Label)
    numberLabel: cc.Label = null

    onLoad() {
        this.numberLabel.string = this.node.name
    }
}
