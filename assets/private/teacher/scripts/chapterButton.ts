import ccclass = cc._decorator.ccclass;

export const CHAPTER_ITEM_SELECTED_EVENT = 'CHAPTER_ITEM_SELECTED_EVENT';
let clickEnabled: boolean = true;

export interface ChapterData {
    subjectId: string;
    chapterId: string;
    chapterName: string;
    subject: string;
}

@ccclass
export class ChapterButton extends cc.Component {
    private _subjectId: string;
    private _chapterId: string;
    private _chapterName: string;
    private _subject: string;

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
            cc.log('item clicked', this.node.name);
        }

    }

    private itemSelectedEvent(): void {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(CHAPTER_ITEM_SELECTED_EVENT, true);
        const selectedData: ChapterData = {
            subjectId  : this._subjectId,
            chapterId  : this._chapterId,
            chapterName: this._chapterName,
            subject: this._subject
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
    }

    set subjectId(newVal: string) {
        this._subjectId = newVal;
    }

    set chapterId(id: string) {
        this._chapterId = id;
    }

    set chapterName(n: string) {
        this._chapterName = n;
    }

    set subject(l: string) {
        this._subject = l;
    }
}