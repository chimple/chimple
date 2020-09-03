const { ccclass, property } = cc._decorator;

@ccclass
export default class ChapterContent extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    layout: cc.Node = null;

    start() {
        const layoutComp = this.layout.getComponent(cc.Layout)
        layoutComp.updateLayout()
        this.layout.parent.width = this.layout.width
    }
}
