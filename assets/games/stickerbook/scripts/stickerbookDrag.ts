import Drag from "../../../common/scripts/drag";
import StickerBook from "./stickerbook";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StickerBookDrag extends Drag {
    // @property
    // mirror: number = 1

    // onLoad() {
    //     this.mirror = this.node.parent.convertToWorldSpaceAR(this.node.position).x > cc.winSize.width / 2 ? -1 : 1
    //     this.node.scaleX = this.mirror
    // }

    // matchPos(location: cc.Vec2): cc.Vec2 {
    //     return this.node.parent.convertToNodeSpaceAR(location)
    // }

    // onMatchOver() {
    //     this.isDragging = false
    //     Drag.letDrag = true
    //     this.enableTouch()
    //     this.allowDrag = true
    //     const mNode = this.matchingNode;
    //     this.node.position = mNode.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO))
    //     this.node.removeFromParent();
    //     mNode.addChild(this.node);
    //     const nNode = this.node.parent
    //     if (nNode) {
    //         const newNode = nNode.parent
    //         if (newNode) {
    //             const monster = newNode.parent
    //             if (monster) monster.emit('monsterMatch')
    //         }
    //     }
    //     const anim = this.node.getComponent(cc.Animation)
    //     if (anim != null) {
    //         anim.play()
    //         this.schedule(() => {
    //             anim.play()
    //         }, 4)
    //     }
    // }

    // onReturnBackOnNoMatch() {
    //     Drag.letDrag = true
    //     this.node.removeFromParent()
    // }


    // onTouchMove(touch: cc.Touch) {
    //     super.onTouchMove(touch)
    //     if (this.allowDrag && this.isDragging) {
    //         this.mirror = touch.getLocationX() > cc.winSize.width / 2 ? -1 : 1
    //         this.node.scaleX = this.mirror * 1.1
    //     }
    // }

    // collisionEnterCondition(self, other) {
    //     return other.node.name === 'a'
    // }

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
        super.onTouchEnd(touch, false)
        console.log('onTouchEnd')
        if (this.match) {
            this.node.children[0].active = false
            this.node.emit('monsterMatch', this)
            console.log('onTouchEnd monsterMatch')
        } else {
            console.log('onTouchEnd monsterNoMatch')
            this.node.emit('monsterNoMatch')
            
            // const pic = this.node.children[1]
            // const worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO)
            // const newPos = this.node.getPosition();
            // console.log('const newPos', newPos)
            // console.log('const worldPos', worldPos)
            // const location = touch.getLocation();
            // const nodeSpaceLocation = this.node.getParent().convertToNodeSpaceAR(location);
            // console.log('nodeSpaceLocation', nodeSpaceLocation.x, nodeSpaceLocation.y)
            // // newPos.x = nodeSpaceLocation.x //- this.adjustCords.x
            // // newPos.y = nodeSpaceLocation.y //- this.adjustCords.y
            // // this.node.x = newPos.x
            // // this.node.y = newPos.y
            // pic.position = new cc.Vec2(nodeSpaceLocation.x, nodeSpaceLocation.y)
            // console.log('this.node', pic.x, pic.y)

            // this.node.emit('monsterNoMatch', newPos)
            // console.log('this.node.emit(monsterNoMatch, this)')
        }
    }

}
