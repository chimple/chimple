import ChimpleLabel from "../../../common/scripts/chimple-label";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NumberDisplay extends cc.Component {
    @property
    num: number = null

    @property
    type: string = 'Alpha'

    @property(cc.Font)
    font: cc.Font = null

    @property
    fontSize: number = null

    @property
    lineHeight: number = null

    @property(cc.SpriteFrame)
    stick: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object1: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object2: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object3: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object4: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object5: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object6: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object7: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object8: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object9: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    object10: cc.SpriteFrame = null

    onLoad() {
        if(this.type == 'Stick') {
            const layout = this.getComponent(cc.Layout)
            if(this.num <= 10) {
                layout.padding = 10
                layout.spacingX = 10
            }
            for (let index = 0; index < this.num; index++) {
                if(this.num > 10 && index % 5 == 0 && index % 10 != 0) {
                    const filler = new cc.Node()
                    filler.width = 4
                    this.node.addChild(filler)
                }
                const image = new cc.Node();
                const sprite = image.addComponent(cc.Sprite);
                sprite.spriteFrame = this.stick;
                if(this.num > 10) {
                    image.width = 8
                }
                this.node.addChild(image);
            }    
        } else if(this.type == 'Alpha') {
            const label = this.node.addComponent(ChimpleLabel)
            label.font = this.font
            label.fontSize = this.fontSize
            label.lineHeight = this.lineHeight
            label.string = this.num.toString()
        } else if(this.type == 'Object') {
            const layout = this.getComponent(cc.Layout)
            layout.resizeMode = cc.Layout.ResizeMode.CHILDREN
            if(this.num <= 10) {
                layout.paddingLeft = 5
                layout.paddingTop = 0
                layout.spacingX = 5
                layout.spacingY = 4
                layout.cellSize = cc.size(30, 30)    
            } else {
                layout.paddingLeft = 5
                layout.paddingTop = 0
                layout.spacingX = 2
                layout.spacingY = 5
                layout.cellSize = cc.size(19, 19)    
            }
            const object = this['object'+Math.ceil(Math.random()*10)]
            for (let index = 0; index < this.num; index++) {
                if(index == 10) {
                    for (let i = 0; i < 5; i++) {
                        const filler = new cc.Node()
                        this.node.addChild(filler)                            
                    }
                }
                const image = new cc.Node();
                const sprite = image.addComponent(cc.Sprite);
                sprite.spriteFrame = object
                if(this.num > 10) {
                    image.width = 8
                }
                this.node.addChild(image);
            }
        }
    }

}
