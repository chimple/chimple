import Drag from "./drag";
import Drop from "./drop";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class AutoDrag extends Drag {
    protected _originalPosition: cc.Vec2 = null;
    protected _isDragging: boolean = false;
    protected match: boolean = false;
    protected matchingNode: cc.Node = null;
    private _dropObject: cc.Node = null;


    onLoad() {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
    }


    onTouchStart(touch: cc.Touch) {
        if (Drag.letDrag && !this.isDragging && this.allowDrag) {
            this._originalPosition = this.node.position;
            this.updateDropNode();
        }
    }

    findMatch() {
        if (this.match) {
            this.allowDrag = false;
            this._isDragging = false;
            new cc.Tween().target(this.node)
                .to(0.3, {position: this.node.parent.convertToNodeSpaceAR(this.matchingNode.convertToWorldSpaceAR(cc.Vec2.ZERO))}, null)
                .call(this.onMatchOver.bind(this))
                .start();
        } else if (this.returnBackOnNoMatch) {
            new cc.Tween().target(this.node)
                .to(1, {position: this._originalPosition}, {progress: null, easing: 'sineOut'})
                .call(() => {
                    this.allowDrag = true;
                    this._isDragging = false;
                    Drag.letDrag = true
                })
                .call(this.onMatchFail.bind(this))
                .start();
        } else {
            this.allowDrag = true;
            Drag.letDrag = true;
            this._isDragging = false;
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (this.allowDrag && !this.isDragging && this.collisionEnterCondition(self, other) && other.node.getComponent(Drop).allowDrop) {
            this.match = true;
            this.matchingNode = other.node;
        }
    }

    onTouchEnd(touch: cc.Touch) {
        if (this.allowDrag && !this._isDragging && this._dropObject !== null) {
            this._isDragging = true;
            new cc.Tween().target(this.node)
                .to(0.3, {position: this.node.parent.convertToNodeSpaceAR(this._dropObject.convertToWorldSpaceAR(cc.Vec2.ZERO))}, null)
                .call(() => {
                    this.findMatch();
                })
                .start();
        }
    }

    updateDropNode() {
        this._dropObject = this.findDropNode();
    }

    disableTouch() {
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchEnd, this);
    }

    onDestroy() {
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchEnd, this);
    }

    onMatchOver() {
        Drag.letDrag = true;
        this.allowDrag = false;
        if (this.fixOnMatch) {
            const mNode = this.matchingNode;
            this.node.opacity = 0;
            this.node.removeFromParent(false);
            this.node.position = cc.Vec2.ZERO;
            mNode.addChild(this.node);
            mNode.getComponent(Drop).onMatchOver();
        } else {
            this.allowDrag = true
        }
    }

    onMatchFail() {
    }

    abstract findDropNode(): cc.Node
}
