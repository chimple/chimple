import Drop from "../../../common/scripts/drop";
import ccclass = cc._decorator.ccclass;

@ccclass
export default class StickerDrop extends Drop {

    onMatchOver() {
       super.onMatchOver();
       this.node.opacity = 255;
    }
}
