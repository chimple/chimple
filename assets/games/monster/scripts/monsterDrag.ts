import Drag from "../../../common/scripts/drag";
import Monster from "./monster";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterDrag extends Drag {
    @property
    mirror: number = 1

    onLoad() {
        this.mirror = this.node.parent.convertToWorldSpaceAR(this.node.position).x > cc.winSize.width / 2 ? -1 : 1
        this.node.scaleX = this.mirror
    }

    matchPos(location: cc.Vec2): cc.Vec2 {
        return this.node.parent.convertToNodeSpaceAR(location)
    }

    onMatchOver() {
        this.isDragging = false
        Drag.letDrag = true
        this.enableTouch()
        this.allowDrag = true
        const mNode = this.matchingNode;
        this.node.position = mNode.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO))
        this.node.removeFromParent();
        mNode.addChild(this.node);
        const nNode = this.node.parent
        if (nNode) {
            const newNode = nNode.parent
            if (newNode) {
                const monster = newNode.parent
                if (monster) monster.emit('monsterMatch')
            }
        }
        const anim = this.node.getComponent(cc.Animation)
        if (anim != null) {
            anim.play()
            this.schedule(() => {
                anim.play()
            }, 4)
        }
    }

    onReturnBackOnNoMatch() {
        Drag.letDrag = true
        this.node.removeFromParent()
    }


    onTouchMove(touch: cc.Touch) {
        super.onTouchMove(touch)
        if (this.allowDrag && this.isDragging) {
            this.mirror = touch.getLocationX() > cc.winSize.width / 2 ? -1 : 1
            this.node.scaleX = this.mirror * 1.1
        }
    }

    touchStartAnimation() {
        new cc.Tween().target(this.node)
            .to(0.25, { scaleX: 1.1 * this.mirror, scaleY: 1.1 }, { progress: null, easing: 'elasticOut' })
            .start()
    }

    touchEndAnimation() {
        new cc.Tween().target(this.node)
            .to(0.25, { scaleX: 1.0 * this.mirror, scaleY: 1.0 }, { progress: null, easing: 'elasticOut' })
            .start()
    }

    collisionEnterCondition(self, other) {
        return other.node.name === 'a'
    }

}
