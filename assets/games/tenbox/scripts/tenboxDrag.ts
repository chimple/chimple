import Drag from "../../../common/scripts/drag";
import Drop from "../../../common/scripts/drop";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TenboxDrag extends Drag {
    @property(cc.Node)
    friendPos: cc.Node = null

    friend: dragonBones.ArmatureDisplay

    onLoad() {
        super.onLoad()
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
            this.friendPos.addChild(friendNode)
            this.friend.playAnimation('face_eating', 1)
        })
    }

    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch)
        this.node.parent.parent.parent.zIndex = 1
        if (this.friend != null)
            this.friend.playAnimation('face_touch', 1)
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch)
        this.node.parent.parent.parent.zIndex = 0
        if (!this.match) {
            if (this.friend != null)
                this.friend.playAnimation('face_wrong', 1)
        }
    }

    onMatchOver() {
        this.isDragging = false
        this.allowDrag = true
        Drag.letDrag = true
        const mNode = this.matchingNode
        const parent = this.node.parent
        parent.removeFromParent()
        this.node.position = cc.Vec2.ZERO
        mNode.addChild(parent)
        mNode.getComponent(Drop).onMatchOver()
    }
}
