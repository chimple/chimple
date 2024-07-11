import Drop from "../../../../common/scripts/drop";
import MathDrag, {MATH_NO_MATCH} from "./math-drag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MathDrop extends Drop {
    origWidth: number = 0;
    droppedNodeUUID: string = null;

    onLoad() {
        super.onLoad();
        this.origWidth = this.node.width;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        MathDrag.dragWrongMovesCount = 0;
        super.onCollisionEnter(other, self);
        if (this.allowDrop) {
            this.node.width = other.node.width;
        }
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider) {
        MathDrag.dragWrongMovesCount = 0;
        super.onCollisionExit(other, self);
        if (this.droppedNodeUUID === other.node.uuid)
            this.allowDrop = true;

        if (this.allowDrop) {
            this.node.width = this.origWidth;
        }

        if (other != null) {
            const mathDragComponent = other.getComponent(MathDrag);
            if (mathDragComponent !== null && mathDragComponent.matchIndex !== null && mathDragComponent.matchIndex.length > 0) {
                const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(MATH_NO_MATCH, true);
                customEvent.setUserData({
                    drop: mathDragComponent.node.name + '_' + mathDragComponent.matchIndex
                });
                this.node.dispatchEvent(customEvent);
                mathDragComponent.matchIndex = '';
            }
        }
    }

    onMatchOver(matchingDragNode: cc.Node) {
        this.droppedNodeUUID = matchingDragNode.uuid;
        this.match = false;
        this.allowDrop = false;
    }

    collisionEnterCondition(self, other) {
        MathDrag.dragWrongMovesCount = 0;
        return true;
    }
}
