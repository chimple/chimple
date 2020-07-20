const { ccclass, property } = cc._decorator;

@ccclass
export default class MultLayout extends cc.Component {
    @property
    count: number = 0;

    @property(cc.SpriteFrame)
    countingSpriteFrame: cc.SpriteFrame = null;

    @property(cc.Node)
    objectsLayout: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;


    onLoad() {
        this.label.string = this.count.toString();
        const layout = this.objectsLayout.getComponent(cc.Layout)
        if (this.count > 12) {
            layout.cellSize = cc.size(16, 16)
        }
        for (let index = 0; index < this.count; index++) {
            const image = new cc.Node();
            const sprite = image.addComponent(cc.Sprite);
            sprite.spriteFrame = this.countingSpriteFrame;
            this.objectsLayout.addChild(image);
        }

    }

    feed(friend: cc.Node) {
        const friendPos = friend.convertToWorldSpaceAR(cc.Vec2.ZERO)
        friendPos.y += 200
        while (this.objectsLayout.childrenCount > 0) {
            const fruit = this.objectsLayout.children[this.objectsLayout.childrenCount - 1]
            const pos = fruit.convertToWorldSpaceAR(cc.Vec2.ZERO)
            fruit.removeFromParent(true);
            fruit.position = pos
            cc.director.getScene().addChild(fruit)
            new cc.Tween().target(fruit)
                .to(1, {position: friendPos}, null)
                .call(() => {
                    fruit.active = false
                })
                .start()            
        }
    }

}
