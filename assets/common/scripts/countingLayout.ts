const {ccclass, property} = cc._decorator;

@ccclass
export default class CountingLayout extends cc.Component {
    @property
    fullCount: number = 1;

    @property
    emptyCount: number = 0;

    @property(cc.SpriteFrame)
    fullTexture: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    emptyTexture: cc.SpriteFrame = null

    @property
    scale: number = 1


    onLoad () {
        for (let index = 0; index < this.fullCount; index++) {
            const image = new cc.Node();
            image.scale = this.scale
            const sprite = image.addComponent(cc.Sprite);
            if(index < (this.fullCount - this.emptyCount)) {
                sprite.spriteFrame = this.fullTexture;
            } else {
                sprite.spriteFrame = this.emptyTexture;
            }
            this.node.addChild(image);                
        }
        cc.log('CountingLayout:init'+this.node.childrenCount)
    }

    feed(friend: cc.Node) {
        const friendPos = friend.convertToWorldSpaceAR(cc.Vec2.ZERO)
        friendPos.y += 200
        while (this.node.childrenCount > 0) {
            const fruit = this.node.children[this.node.childrenCount - 1]
            const pos = fruit.convertToWorldSpaceAR(cc.Vec2.ZERO)
            fruit.removeFromParent(false);
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
