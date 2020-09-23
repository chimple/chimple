const {ccclass, property} = cc._decorator;

@ccclass
export default class Help extends cc.Component {
    from: cc.Node;
    to: cc.Node;
    callBack: Function = null;

    @property(cc.Node)
    hand: cc.Node = null

    @property(cc.Widget)
    grayL: cc.Widget = null

    @property(cc.Widget)
    grayR: cc.Widget = null

    @property(cc.Widget)
    grayT: cc.Widget = null

    @property(cc.Widget)
    grayB: cc.Widget = null

    initNodes(from: cc.Node, to: cc.Node, callBack: Function) {
        this.from = from
        this.to = to
        this.callBack = callBack;
    }

    onLoad() {
        this.drawGray(this.from);
    }

    private drawGray(node: cc.Node) {
        const bb = node.getBoundingBoxToWorld();
        this.grayL.right = cc.winSize.width - bb.xMin;
        this.grayR.left = bb.xMax;
        this.grayT.right = cc.winSize.width - bb.xMin;
        this.grayT.left = bb.xMax;
        this.grayT.bottom = bb.yMax;
        this.grayB.right = cc.winSize.width - bb.xMin;
        this.grayB.left = bb.xMax;
        this.grayB.top = cc.winSize.height - bb.yMin;
        this.grayL.updateAlignment()
        this.grayR.updateAlignment()
        this.grayT.updateAlignment()
        this.grayB.updateAlignment()
    }

    start() {
        this.help();
    }

    private help() {
        this.node.active = true
        new cc.Tween().target(this.hand)
            .set({position: this.node.convertToNodeSpaceAR(this.from.getBoundingBoxToWorld().center)})
            .to(0.25, {scale: 0.8}, null)
            .delay(1)
            .call(() => {
                this.drawGray(this.to)
            })
            .to(1, {position: this.node.convertToNodeSpaceAR(this.to.getBoundingBoxToWorld().center)}, null)
            .to(0.25, {scale: 1}, null)
            .call(() => {
                this.node.active = false;
                // if (this.callBack != null) {
                //     this.callBack();
                // }
            })
            .start();
    }
}
