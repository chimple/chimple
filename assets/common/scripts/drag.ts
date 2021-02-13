import Drop from "./drop";

/**
 * This is a generic drag class. Use this if you want drag and drop functionality
 * It has to be a child of another node, preferably an empty node
 * If you want specialized behaviour whenever a match happens or when dropped,
 * subclass this and override onTouchStart, onTouchEnd, onCollisionEnter etc
 * It matches the name of this node with the name of the drop
 * Refer to Drop class which is this one's counterpart
 */
const { ccclass, property } = cc._decorator;
const MIN_MOVED_DELTA = 10;
@ccclass
export default class Drag extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property
    resizeWithLabel: boolean = false;

    @property
    fixOnMatch: boolean = true;

    @property
    allowDrag: boolean = true;

    @property
    returnBackOnNoMatch: boolean = true;

    @property
    multipleDrags: boolean = false

    protected match: boolean = false;
    protected matchingNode: cc.Node = null;
    protected multipleNode: cc.Node = null
    protected isDragging: boolean = false;
    protected touchStartOriginPos: cc.Vec2 = null;
    protected isMoved: boolean = false;
    isReverseXNeeded: boolean = false;
    static letDrag: boolean = true

    onLoad() {

    }

    onEnable() {
        this.enableTouch();
    }

    protected enableTouch() {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
        this.node.on('touchmove', this.onTouchMove, this);
    }

    onDisable() {
        this.disableTouch()
    }

    protected disableTouch() {
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchEnd, this);
        this.node.off('touchmove', this.onTouchMove, this);
    }

    start() {
        if (this.resizeWithLabel && this.label != null) {
            const labelWidth = this.label.node.width;
            this.node.width = labelWidth + 20;
            const boxCollider = this.node.getComponent(cc.BoxCollider);
            boxCollider.size.width = this.node.width;
            this.node.parent.width = this.node.width;
        }
    }

    onTouchStart(touch: cc.Touch) {
        if (Drag.letDrag && !this.isDragging && this.allowDrag) {
            this.touchStartOriginPos = this.node.getPosition();
            Drag.letDrag = false
            this.isDragging = true;
            if (this.allowDrag) {
                this.touchStartAnimation();
            }
            if (this.allowDrag && this.multipleDrags && this.multipleNode == null) {
                this.multipleNode = cc.instantiate(this.node)
                this.node.parent.insertChild(this.multipleNode, 0)
            }
        }
    }

    onTouchMove(touch: cc.Touch) {
        if (this.allowDrag && this.isDragging) {
            if (this.isReverseXNeeded)
                this.node.setPosition(this.node.position.x - touch.getDelta().x, this.node.position.y + touch.getDelta().y);
            else
                { // @ts-ignore
                    this.node.setPosition(this.node.position.add(touch.getDelta()));
                }
        }
    }

    onTouchEnd(touch: cc.Touch) {
        if (this.allowDrag && this.isDragging) {
            const diff: cc.Vec2 = this.node.getPosition().sub(this.touchStartOriginPos);
            this.isMoved = diff.magSqr() >= MIN_MOVED_DELTA;
            this.touchEndAnimation()
            if (this.match) {
                this.allowDrag = false
                this.disableTouch()
                this.matchingNode.getComponent(Drop).onMatchOver(this.node)
                new cc.Tween().target(this.node)
                    .to(0.25, { position: this.matchPos(touch.getLocation()) }, null)
                    .call(() => {
                        this.onMatchOver()
                    })
                    .start();
            } else if (this.returnBackOnNoMatch) {
                this.disableTouch()
                new cc.Tween().target(this.node)
                    .to(0.35, { position: this.returnBackOnNoMatchPos() }, { progress: null, easing: 'sineOut' })
                    .call(() => {
                        this.onReturnBackOnNoMatch();
                    })
                    .start();
            } else {
                this.isDragging = false
                Drag.letDrag = true
            }
        }
    }



    onReturnBackOnNoMatch() {
        if (this.multipleDrags && this.multipleNode != null) {
            this.multipleNode.removeFromParent();
            this.multipleNode = null;
        }
        this.enableTouch();
        this.isDragging = false;
        Drag.letDrag = true;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (this.allowDrag && this.isDragging && this.collisionEnterCondition(self, other) && other.node.getComponent(Drop).allowDrop) {
            this.match = true;
            this.matchingNode = other.node;
        }
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider) {
        if (this.allowDrag && this.isDragging && this.collisionExitCondition(this.matchingNode, other.node)) {
            this.match = false;
            this.matchingNode = null;
        }
    }

    onDestroy() {
        this.disableTouch()
    }

    onMatchOver() {
        this.isDragging = false
        Drag.letDrag = true
        if (this.fixOnMatch) {
            this.allowDrag = false
            const mNode = this.matchingNode;
            this.node.removeFromParent();
            // @ts-ignore
            this.node.position = cc.Vec2.ZERO;
            mNode.addChild(this.node);
            if (this.node.getChildByName("shouldFlip")) { 
              this.node.scaleX = -1; 
             }
            this.disableTouch()
        } else {
            this.enableTouch()
            this.allowDrag = true
        }
    }

    returnBackOnNoMatchPos() {
        return cc.Vec2.ZERO;
    }

    matchPos(location: cc.Vec2): cc.Vec2 {
        return this.node.parent.convertToNodeSpaceAR(this.matchingNode.convertToWorldSpaceAR(cc.Vec2.ZERO))
    }

    collisionEnterCondition(self, other) {
        return other.node.name === self.node.name
    }

    collisionExitCondition(matchingNode, otherNode) {
        return matchingNode === otherNode
    }

    touchStartAnimation() {
        new cc.Tween().target(this.node)
            .to(0.25, { scale: 1.1 }, { progress: null, easing: 'elasticOut' })
            .start()
    }

    touchEndAnimation() {
        new cc.Tween().target(this.node)
            .to(0.25, { scale: 1.0 }, { progress: null, easing: 'elasticOut' })
            .start()
    }

}
