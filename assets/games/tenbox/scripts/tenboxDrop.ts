import Drop from "../../../common/scripts/drop";

const { ccclass, property } = cc._decorator

const commonName = 'A'

@ccclass
export default class TenboxDrop extends Drop {
    @property
    count: number = 0

    @property(cc.Prefab)
    dropPrefab: cc.Prefab = null

    @property(cc.Prefab)
    subPrefab: cc.Prefab = null

    @property(cc.Node)
    cover: cc.Node = null

    @property(cc.Node)
    seal: cc.Node = null

    onLoad() {
        if (this.count == 10) {
            this.closeCover()
        } else {
            this.cover.active = false
            this.seal.active = false
        }
        this.node.name = commonName
        for (let index = 0; index < this.count; index++) {
            const drop = cc.instantiate(this.dropPrefab)
            drop.name = commonName
            const tempNode = new cc.Node()
            tempNode.height = drop.height
            tempNode.width = drop.width
            tempNode.addChild(drop)
            this.node.addChild(tempNode)
        }
        this.node.on('child-added', () => {
            if (++this.count >= 10) {
                this.allowDrop = false
                this.closeCover()
            }
        }, this)

        this.node.on('child-removed', () => {
            if (--this.count < 10) {
                this.allowDrop = true
            }
        }, this)

    }

    private closeCover() {
        this.allowDrop = false
        this.scheduleOnce(() => {
            this.cover.active = true
            this.seal.active = true
            this.cover.on('touchstart', () => {
                this.cover.active = false
                this.seal.active = false
            }, this)
            new cc.Tween().target(this.seal)
                .set({ scale: 2 })
                .to(0.5, { scale: 1 }, null)
                .start()
        }, 1)
    }
}
