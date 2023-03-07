import ccclass = cc._decorator.ccclass;
import { CHOICE_CLICKED } from "./openwindow1";
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class OpenWindow1ChoiceCard extends cc.Component {
    text: string = null;
    touchEnabled: boolean = false;
    parentNode: cc.Node = null;

    @catchError()
    protected onLoad(): void {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);

    }

    onTouchStart(touch: cc.Touch) {
    }

    onTouchEnd(touch: cc.Touch) {
        if (this.touchEnabled) {
            const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(CHOICE_CLICKED, true);
            customEvent.setUserData({
                text      : this.text,
                parentNode: this.parentNode,
                node: this.node
            });
            this.node.dispatchEvent(customEvent);
        }
    }

}
