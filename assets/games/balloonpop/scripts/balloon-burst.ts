import Drag from "../../../common/scripts/drag";
import Balloonpop from "./balloonpop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BalloonBurst extends Drag {


    onTouchStart(touch: cc.Touch){
        super.onTouchStart(touch);
        this.node.destroy();
        cc.log(this.node.getComponentInChildren(cc.Label).string);
    }



    update (dt) {
        if(this.node.position.y>cc.winSize.height/2){
            this.node.destroy();
        }
    }
}
