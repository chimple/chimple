import ccclass = cc._decorator.ccclass;
import { BALANCE_BTN_CLICKED } from "./balancing";
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class BalancingButton extends cc.Component {
    private _clicked: boolean = false;
    private _enabled: boolean = false;

    @catchError()
    protected onLoad(): void {
        this._enabled = true;
    }

    @catchError()
    onButtonClick(event, customEventData) {
        if (!this._clicked && this._enabled) {
            this._clicked = true;
            const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(BALANCE_BTN_CLICKED, true);
            customEvent.setUserData({
                type: this.node.name
            });
            this.node.dispatchEvent(customEvent);
        }
    }

    @catchError()
    makeInteractable(interactable: boolean) {
        const butComp = this.node.getComponent(cc.Button);
        if (butComp) {
            butComp.interactable = interactable;
            this._enabled = interactable;
        }
    }

    set clicked(c) {
        this._clicked = c;
    }
}
