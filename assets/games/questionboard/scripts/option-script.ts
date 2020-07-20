import ccclass = cc._decorator.ccclass;
import {CORRECT_ANSWER, WRONG_ANSWER} from "./questionboard";
import { catchError } from "../../../common/scripts/lib/error-handler";


@ccclass
export default class OptionScript extends cc.Component {
    private _text: string = null;
    private _correctAnswer: string = null;

    onButtonClick(event, customEventData) {
        if (this._text === this._correctAnswer) {
            this.node.dispatchEvent(new cc.Event.EventCustom(CORRECT_ANSWER, true));
        } else {
            const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(WRONG_ANSWER, true);
            customEvent.setUserData({
                node: this.node
            });
            this.node.dispatchEvent(customEvent);
        }

    }

    @catchError()
    protected onLoad(): void {
        //this.enableTouchHandlers();
        const button = this.node.getComponent(cc.Button);
        button.interactable = false;
    }

    // protected enableTouchHandlers() {
    //     this.node.on(TouchEvents.TOUCH_START, this.onTouchStart, this);
    //     this.node.on(TouchEvents.TOUCH_END, this.onTouchEnd, this);
    // }

    // onTouchStart(touch: cc.Touch) {
    // }
    //
    //
    // onTouchEnd(touch: cc.Touch) {
    //     if (this._text === this._correctAnswer) {
    //         this.node.dispatchEvent(new cc.Event.EventCustom(CORRECT_ANSWER, true));
    //     } else {
    //         const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(WRONG_ANSWER, true);
    //         customEvent.setUserData({
    //             node: this.node
    //         });
    //         this.node.dispatchEvent(customEvent);
    //     }
    //
    // }

    set correctAnswer(a) {
        this._correctAnswer = a;
    }

    set text(t) {
        this._text = t;
    }

}
