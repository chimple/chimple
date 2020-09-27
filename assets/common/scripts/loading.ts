const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {
    @property(cc.Node)
    block: cc.Node = null;

    @property(cc.Prefab)
    animationPrefab: cc.Prefab = null;

    @property(cc.Node)
    animation: cc.Node = null;

    @property(cc.Label)
    messageLabel: cc.Label = null

    @property(cc.Node)
    cancelBtn: cc.Node = null

    @property(Boolean)
    allowCancel: Boolean = false

    delay: number = 0
    animate: boolean = true

    onLoad() {
        this.node.width = cc.winSize.width
    }

    start() {
        this.showLoading();
    }

    onEnable() {
        this.showLoading()
    }

    private showLoading() {
        this.block.color = cc.Color.TRANSPARENT
        this.animation.active = false
        this.cancelBtn.active = this.allowCancel.valueOf()
        this.messageLabel.string = ''
        this.scheduleOnce(() => {
            this.block.color = cc.Color.GRAY;
            this.block.opacity = 128
            if (this.animate) {
                this.animation.active = true
            }
        }, this.delay);
    }

    addMessage(message: string, stopAnimation: boolean = true, replace: boolean = false) {
        this.messageLabel.string = replace ? message : this.messageLabel.string + '\n' + message
        if (stopAnimation) this.animation.active = false
    }

    onCancel() {
        this.node.active = false
    }
}
