import ccclass = cc._decorator.ccclass;
import { catchError } from "../../../common/scripts/lib/error-handler";

export const EDIT_ENDED_EVENT = 'editEndedCustomEvent';
export const EDIT_STARTED_EVENT = 'editStartedCustomEvent';

export interface CustomEditBoxData {
    text: string;
    detectParent: string;
}

@ccclass
export class CustomEditBox extends cc.Component {
    private text: string = '';
    private detectParent: string = '';

    constructor() {
        super();
    }

    @catchError()
    protected onLoad() {
        this.registerListeners();
    }

    private registerListeners(): void {
        const baseNode = this.node.getChildByName('base');
        if (baseNode != null) {
            baseNode.on('text-changed', this.textChanged, this);
            baseNode.on('editing-did-began', this.editBegan, this);
            baseNode.on('editing-did-ended', this.editEnded, this);
        }
    }

    private textChanged(editBox: cc.EditBox) {
        cc.log('text', editBox.string, 'for', editBox.node.parent.name);
        this.text = editBox.string;
        this.detectParent = editBox.node.parent.name;
    }

    private editBegan(editBox: cc.EditBox) {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(EDIT_STARTED_EVENT, true);
        this.node.dispatchEvent(customEvent);
    }

    private editEnded(editBox: cc.EditBox) {
        this.textChangedEvent();
    }

    private textChangedEvent(): void {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(EDIT_ENDED_EVENT, true);
        const data: CustomEditBoxData = {
            text        : this.text,
            detectParent: this.detectParent
        };
        customEvent.setUserData(data);
        this.node.dispatchEvent(customEvent);
    }

}