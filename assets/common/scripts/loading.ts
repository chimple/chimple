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

    delay: number = 3
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
        this.block.opacity = 0
        this.animation.active = false
        this.messageLabel.string = ''
        this.messageLabel.node.active = false
        this.cancelBtn.active = false
        this.scheduleOnce(() => {
            this.cancelBtn.active = this.allowCancel.valueOf()
            this.messageLabel.node.active = true
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
