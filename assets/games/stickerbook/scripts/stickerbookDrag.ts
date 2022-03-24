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
    //     // super.onTouchMove(touch)
    //     // if (this.allowDrag && this.isDragging) {
    //     //     this.mirror = touch.getLocationX() > cc.winSize.width / 2 ? -1 : 1
    //     //     this.node.scaleX = this.mirror * 1.1
    //     // }
    //     // if (this.allowDrag && this.isDragging) {
    //     //     if (this.isReverseXNeeded)
    //     // this.node.setPosition(this.node.position.x + touch.getDelta().x, this.node.position.y + touch.getDelta().y);
    //     //     else { // @ts-ignore
    //     //         this.node.setPosition(this.node.position.add(touch.getDelta()));
    //     //     }
    //     // }
    //     this.node.children[1].active = true
    //     console.log('stickerbookDrag ontouchmove called')
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

    onTouchStart(touch: cc.Touch): void {
        super.onTouchStart(touch)
        this.node.children[1].active = true
        this.node.children[1].setContentSize(StickerBook.pictureSizes.get(this.node.name))
        console.log('stickerbookDrag ontouchstart called')
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch, false)
        console.log('onTouchEnd')
        if (this.match) {
            this.node.children[0].active = false
            this.node.emit('stickericonMatch', this)
            StickerBook.data[13 + parseInt(this.node.name) * 7] = 'true';
            console.log('Answer Correct this.node.name', this.node.name, StickerBook.data[13 + parseInt(this.node.name) * 7]);
            cc.sys.localStorage.setItem('stickerbook', JSON.stringify(StickerBook.stickerbookData));
            console.log('onTouchEnd stickerbookMatch')
        } else {
            console.log('onTouchEnd stickerbookNoMatch', this.node.getParent().getParent().getParent())
            console.log('this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index])', this.node.convertToWorldSpace(StickerBook.stickerIconPostion[parseInt(this.node.name)]))
            // drag.x = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).x + 6 - 0.1065088757397;
            // drag.y = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).y + 60;
            const index = parseInt(this.node.name)
            const correctPositionX = parseInt(StickerBook.data[8 + index * 7]) || null;
            const correctPositionY = parseInt(StickerBook.data[9 + index * 7]) || null;

            console.log('correctPositionX correctPositionY', correctPositionX, correctPositionY)
            if (correctPositionX != null && correctPositionY != null) {
                new cc.Tween().target(this.node)
                    .to(0.25, {
                        // position: StickerBook.stickerIconPostion[parseInt(this.node.name)],
                        x: this.node.getParent().getParent().getParent().convertToWorldSpace(StickerBook.stickerIconPostion[parseInt(this.node.name)]).x + 6 - 0.1065088757397,
                        y: this.node.getParent().getParent().getParent().convertToWorldSpace(StickerBook.stickerIconPostion[parseInt(this.node.name)]).y + 60
                    }, { progress: null, easing: 'sineOut' })
                    .start()
                this.node.children[1].setContentSize(130, 130)
            }
            // this.node.setPosition(new cc.Vec3(730 + parseInt(this.node.name) * 180, 180));

            this.node.children[1].active = true
            if (correctPositionX == null && correctPositionY == null) {
                StickerBook.data[10 + index * 7] = this.node.getParent().getParent().getParent().convertToWorldSpace(touch.getLocation()).x;
                StickerBook.data[11 + index * 7] = this.node.getParent().getParent().getParent().convertToWorldSpace(touch.getLocation()).y;
                StickerBook.data[13 + parseInt(this.node.name) * 7] = 'true';
                cc.sys.localStorage.setItem('stickerbook', JSON.stringify(StickerBook.stickerbookData));
            }
            this.node.emit('stickericonNoMatch')

        }
    }

}
