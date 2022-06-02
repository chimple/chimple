import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

export enum RegisterType {
    Child = 1,
    Teacher,
    School
}

export const REGISTER_ITEM_SELECTED_EVENT = 'REGISTER_ITEM_SELECTED_EVENT';
let clickEnabled: boolean = true;

@ccclass
export class RegisterButton extends cc.Component {
    @property
    regType: number = 0;

    constructor() {
        super();
    }

    protected onLoad() {
        clickEnabled = true;
    }

    async onClicked() {
        if (clickEnabled) {
            clickEnabled = false;
            this.itemSelectedEvent();
        }
    }

    private itemSelectedEvent(): void {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(REGISTER_ITEM_SELECTED_EVENT, true);
        const selectedData = {
            type: this.regType
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
    }
}
