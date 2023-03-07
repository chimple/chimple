import ccclass = cc._decorator.ccclass;
import { START_SCROLL_CLICK } from "./openwindow1";
import property = cc._decorator.property;
import { Util } from "../../../common/scripts/util";

@ccclass
export default class OpenWindow1SpinButton extends cc.Component {
    @property(cc.AudioClip)
    clickClip: cc.AudioClip = null;

    clickedEnabled: boolean = true;

    onButtonClick(event, customEventData) {
        if (this.clickedEnabled) {
            cc.audioEngine.stopAllEffects();
            Util.playSfx(this.clickClip);
            this.clickedEnabled = false;
            const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(START_SCROLL_CLICK, true);
            this.node.dispatchEvent(customEvent);
        }
    }
}
