import Drag from "../../../common/scripts/drag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StampDrag extends Drag {
    inStickerPack: boolean = true
    imageIndex: number = 0

    touchStartAnimation() {
        super.touchStartAnimation()
        this.node.zIndex = 1
        this.node.children[0].y = -15
        this.node.x += 5
    }

    touchEndAnimation() {
        super.touchEndAnimation()
        this.node.children[0].y = -10
        this.node.x -= 5
        this.node.zIndex = 0
    }

    onTouchStart(touch: cc.Touch): void {
        super.onTouchStart(touch)
        if (this.allowDrag && this.inStickerPack) {
            this.inStickerPack = false
            this.node.scale = 1
            this.node.parent = this.node.parent.parent.parent
        }
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if (this.match) {
            this.node.children[0].active = false
            this.node.emit('stampMatch', this, this.node)
        } else {
            const pic = this.node.children[1]
            const worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO)
            const newPos = this.node.getPosition()
            var doTween = false
            if (worldPos.x + pic.width > cc.winSize.width) {
                newPos.x -= (worldPos.x + pic.width - cc.winSize.width)
                doTween = true
            } else if (worldPos.x < 0) {
                newPos.x -= worldPos.x
                doTween = true
            }
            if (worldPos.y + pic.height > cc.winSize.height) {
                newPos.y -= (worldPos.y + pic.height - cc.winSize.height)
                doTween = true
            } else if (worldPos.y < 0) {
                newPos.y -= worldPos.y
                doTween = true
            }
            if (doTween) {
                new cc.Tween().target(this.node)
                    .to(0.25, { position: newPos }, { progress: null, easing: 'sineOut' })
                    .start()
            }
            const temp = this.node.parent.convertToWorldSpaceAR(touch.getLocation())
            this.node.position.x = temp.x
            this.node.position.y = temp.y
            console.log('this.node.position ', this.node.position)
            this.node.emit('stampNoMatch', this, this.node)
        }
    }
}
