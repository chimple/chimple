import Drag from "../../../common/scripts/drag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PictureDrag extends Drag {
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

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if (this.match) {
            this.node.children[0].active = false
            this.node.emit('pictureMatch', this)
        } else {
            const pic = this.node.children[1]
            const worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO)
            const newPos = this.node.getPosition()
            var doTween = false
            if(worldPos.x + pic.width > cc.winSize.width) {
                newPos.x -= (worldPos.x + pic.width - cc.winSize.width)
                doTween = true
            } else if(worldPos.x < 0) {
                newPos.x -= worldPos.x
                doTween = true
            }
            if(worldPos.y + pic.height > cc.winSize.height) {
                newPos.y -= (worldPos.y + pic.height - cc.winSize.height)
                doTween = true
            } else if(worldPos.y < 0) {
                newPos.y -= worldPos.y
                doTween = true
            }
            if(doTween) {
                new cc.Tween().target(this.node)
                    .to(0.25, {position: newPos}, { progress: null, easing: 'sineOut' })
                    .start()
            }
            this.node.emit('pictureNoMatch', this)
        }
    }
}
