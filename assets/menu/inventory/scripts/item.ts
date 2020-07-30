
const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    isLocked: boolean = false;

    @property(cc.Node)
    lockIconNode: cc.Node = null;

    onClickCallback: Function = null


    onLoad() {
        // updating ui according to data
        // this.itemIconNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.itemSprite);
    }

    onItemClick(event) {
        console.log(event.currentTarget.name)
        if (!this.isLocked) {
            this.onClickCallback(event.currentTarget.name)
        }
    }

    start() {

    }
}
