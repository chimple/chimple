import Drag from "../../../common/scripts/drag";
import StickerBook from "./stickerbook";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StickerBookDrag extends Drag {
    
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
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch, false)
        if (this.match) {
            this.node.children[0].active = false
            this.node.emit('stickericonMatch', this)
            StickerBook.data[13 + parseInt(this.node.name) * 7] = 'true';
            cc.sys.localStorage.setItem('stickerbook', JSON.stringify(StickerBook.stickerbookDataJson));
        } else {
            // drag.x = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).x + 6 - 0.1065088757397;
            // drag.y = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).y + 60;
            const index = parseInt(this.node.name)
            const correctPositionX = parseInt(StickerBook.data[8 + index * 7]) || null;
            const correctPositionY = parseInt(StickerBook.data[9 + index * 7]) || null;

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
                cc.sys.localStorage.setItem('stickerbook', JSON.stringify(StickerBook.stickerbookDataJson));
            }
            this.node.emit('stickericonNoMatch')

        }
    }

}
