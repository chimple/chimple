import Drag from "../../../common/scripts/drag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HundredPuzzleDragTile extends Drag {
    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        if (this.match) {
            this.node.emit('hundredpuzzleMatch', this)
        } else {
            this.node.emit('hundredpuzzleNoMatch')
            const worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO)
            const newPos = this.node.getPosition()
            var doTween = false
            if(worldPos.x + this.node.width > cc.winSize.width) {
                newPos.x -= (worldPos.x + this.node.width - cc.winSize.width)
                doTween = true
            } else if(worldPos.x < 0) {
                newPos.x -= worldPos.x
                doTween = true
            }
            if(worldPos.y > cc.winSize.height) {
                newPos.y -= (worldPos.y - cc.winSize.height)
                doTween = true
            } else if(worldPos.y - this.node.height < 0) {
                newPos.y -= worldPos.y - this.node.height
                doTween = true
            }
            if(doTween) {
                new cc.Tween().target(this.node)
                    .to(0.25, {position: newPos}, { progress: null, easing: 'sineOut' })
                    .start()
            }
        }
    }
}
