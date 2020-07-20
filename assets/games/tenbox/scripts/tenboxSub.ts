import Drop from "../../../common/scripts/drop";

const {ccclass, property} = cc._decorator;

const commonName = 'A'

@ccclass
export default class TenboxSub extends Drop {
    @property
    count: number = 0

    @property(cc.Node)
    subLayout: cc.Node = null

    @property(cc.Prefab)
    subPrefab: cc.Prefab = null

    onLoad () {
        this.node.name = commonName
        for (let index = 0; index < this.count; index++) {
            const drop = cc.instantiate(this.subPrefab)
            drop.name = commonName
            const tempNode = new cc.Node()
            tempNode.height = drop.height
            tempNode.width = drop.width
            tempNode.addChild(drop)
            this.subLayout.addChild(tempNode)
        }
        this.node.on('child-added', () => {
            if(this.node.childrenCount >= this.count) {
                this.allowDrop = false
                this.scheduleOnce(()=>{
                    new cc.Tween().target(this.node.parent)
                        .to(0.5, {x: cc.winSize.width}, null)
                        .start()
                }, 1)
            }    
        }, this)

        this.node.on('child-removed', () => {
            if(this.node.childrenCount < this.count) {
                this.allowDrop = true
            }    
        }, this)

    }
}
