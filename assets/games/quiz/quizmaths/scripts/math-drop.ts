import Drop from "../../../../common/scripts/drop";
import catchError from "../../../../common/scripts/lib/error-handler";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MathDrop extends Drop {
    origWidth: number = 0;

    onLoad() {
        super.onLoad();
        this.origWidth = this.node.width;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        super.onCollisionEnter(other, self);
        if (this.allowDrop) {
            this.node.width = other.node.width;
        }
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider) {
        super.onCollisionExit(other, self);
        if (this.allowDrop) {
            this.node.width = this.origWidth;
        }
    }

    onMatchOver() {
        this.match = false;
        if (this.allowOnlyOneDrop) {
            this.allowDrop = false;
        }
    }

    collisionEnterCondition(self, other) {
        return true;
    }
}
