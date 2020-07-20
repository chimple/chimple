import ccclass = cc._decorator.ccclass;
import {CONFIRM_BUTTON_CLICKED} from "./answer-grid";
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class ConfirmScript extends cc.Component {
    @catchError()
    onButtonClick(event, customEventData) {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(CONFIRM_BUTTON_CLICKED, true);
        this.node.dispatchEvent(customEvent);
    }
}
