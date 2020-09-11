const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {
    @property(cc.Node)
    block: cc.Node = null;

    @property(cc.Prefab)
    animationPrefab: cc.Prefab = null;

    delay: number = 3
    animate: boolean = true
    animation: cc.Node

    start() {
        this.showLoading();
    }

    private showLoading() {
        this.block.color = cc.Color.TRANSPARENT
        if (this.animation != null) this.animation.active = false
        this.scheduleOnce(() => {
            this.block.color = cc.Color.GRAY;
            this.block.opacity = 128
            if (this.animate) {
                if (this.animation == null) {
                    this.animation = cc.instantiate(this.animationPrefab);
                    this.node.addChild(this.animation)
                }
                this.animation.active = true
            }
        }, this.delay);
    }

    onEnable() {
        console.log('onEnable')
        this.showLoading()
    }
}
