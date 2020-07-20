import Drag from "./drag";

/**
 * This is a generic drop class.
 * It matches the name of this node with the name of the drag
 * Refer to Drag class which is this one's counterpart
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class Drop extends cc.Component {
    @property
    allowDrop: boolean = true

    @property
    allowOnlyOneDrop: boolean = true

    protected match: boolean = false;
    protected matchingNode: cc.Node = null;

    onLoad() {
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (this.allowDrop && this.collisionEnterCondition(self, other) && other.node.getComponent(Drag).allowDrag) {
            this.match = true;
            this.matchingNode = other.node;
        }
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider) {
        if (this.allowDrop) {
            this.match = false;
            this.matchingNode = null;
        }
    }

    onMatchOver() {
        this.match = false
        if (this.allowOnlyOneDrop) {
            this.allowDrop = false
        }
    }

    collisionEnterCondition(self, other) {
        return other.node.name === self.node.name
    }
}
