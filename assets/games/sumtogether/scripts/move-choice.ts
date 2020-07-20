import { Util } from "../../../common/scripts/util";
import AutoDrag from "../../../common/scripts/auto-drag";
import { MOVE_MATCH, MOVE_NOT_MATCH } from "../../../common/scripts/helper";

const {ccclass} = cc._decorator;

@ccclass
export default class MoveChoice extends AutoDrag {
    moveDropNode: cc.Node = null;
    value: number = null;
    parent: cc.Node = null;
    dragInProgress: boolean = false;

    onLoad() {
        super.onLoad();
    }

    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch);
        if (this.allowDrag && !this.dragInProgress) {
            this.dragInProgress =  true;
            Util.speakEquation([String(this.value)], (index) => {
            });
        }
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch);
        this.dragInProgress =  true;
        new cc.Tween().target(this.node)
            .to(0.5, {scale: 1.0}, {progress: null, easing: 'elasticOut'})
            .start();
    }

    onMatchOver() {
        super.onMatchOver();
        this.node.opacity = 255;
        this.node.dispatchEvent(new cc.Event.EventCustom(MOVE_MATCH, true));
    }

    onMatchFail() {
        super.onMatchFail();
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(MOVE_NOT_MATCH, true);
        customEvent.setUserData({
            choice: this.node
        });
        this.node.dispatchEvent(customEvent);
    }

    findDropNode(): cc.Node {
        return this.moveDropNode;
    }
}
