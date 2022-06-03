import ccclass = cc._decorator.ccclass;

export const SUBJECT_ITEM_SELECTED_EVENT = 'SUBJECT_ITEM_SELECTED_EVENT';
let subjectClickEnabled: boolean = false;

export interface SubjectData {
    subject: string;
    id: string;
}

@ccclass
export class SubjectButton extends cc.Component {
    private _subject: string;
    private _id: string;

    constructor() {
        super();
    }

    protected onLoad() {
        subjectClickEnabled = true;
    }

    async onClicked() {
        if (subjectClickEnabled) {
            subjectClickEnabled = false;
            this.itemSelectedEvent();
            cc.log('item clicked', this.node.name);
        }

    }

    private itemSelectedEvent(): void {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(SUBJECT_ITEM_SELECTED_EVENT, true);
        const selectedData: SubjectData = {
            subject: this._subject,
            id     : this._id
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
    }

    set subject(newVal: string) {
        this._subject = newVal;
    }

    set id(id: string) {
        this._id = id;
    }

    public static clickedEnabled(enabled: boolean) {
        subjectClickEnabled = enabled;
    }
}