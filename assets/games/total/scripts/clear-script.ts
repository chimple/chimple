import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import catchError from "../../../common/scripts/lib/error-handler";
import { CLEAR_BUTTON_CLICKED } from "../../../common/scripts/answer-grid";

@ccclass
export default class ClearScript extends cc.Component {
    @property
    oneByOne: boolean = true;

    @catchError()
    onButtonClick(event, customEventData) {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(CLEAR_BUTTON_CLICKED, true);
        customEvent.setUserData({
            oneByOne: this.oneByOne
        });
        this.node.dispatchEvent(customEvent);
    }
}
