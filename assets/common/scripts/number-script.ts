import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import catchError from "./lib/error-handler";
import { BACK_GROUND, NUMBER_LABEL, ANSWER_GRID_BUTTON_CLICKED } from "./answer-grid";

@ccclass
export default class NumberScript extends cc.Component {
    @property
    normalLabelColor: string = '';

    @property
    pressedLabelColor: string = '';

    protected onLoad(): void {
    }


    @catchError()
    onButtonClick(event, customEventData) {
        const backGround = event.target.getChildByName(BACK_GROUND);
        if (!!backGround) {
            const labelNode: cc.Node = backGround.getChildByName(NUMBER_LABEL);
            const label = labelNode.getComponent(cc.Label);
            const outLine = labelNode.addComponent(cc.LabelOutline);
            outLine.width = 2;
            const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(ANSWER_GRID_BUTTON_CLICKED, true);
            customEvent.setUserData({
                selectedDigit: label.string
            });
            this.node.dispatchEvent(customEvent);
        }
    }
}
