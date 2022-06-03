import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import ChimpleLabel from "../../../common/scripts/chimple-label";
import {ParseApi} from "../../../common/scripts/services/parseApi";
import {CustomEditBoxData, EDIT_ENDED_EVENT} from "./customEditBox";
import {SECTIONS} from "../../../common/scripts/domain/parseConstants";
import {CURRENT_SCHOOL_ID} from "../../../common/scripts/lib/constants";
import {SelectionScene} from "./selectionScene";
import {ParseSection} from "../../../common/scripts/domain/parseSection";

export const TEACHER_ADD_SECTION_DIALOG_CLOSED = 'TEACHER_ADD_SECTION_DIALOG_CLOSED';
@ccclass
export default class AddSectionDialog extends cc.Component {

    @property(cc.Node)
    text: cc.Node = null;

    text1: string = null;

    parent: cc.Node = null;

    protected onLoad() {
        this.node.on(TEACHER_ADD_SECTION_DIALOG_CLOSED, async (event) => {
            event.stopPropagation();
            const item = event.getUserData();
        });

        this.node.on(EDIT_ENDED_EVENT, (event) => {
            event.stopPropagation();
            const data: CustomEditBoxData = event.getUserData() as CustomEditBoxData;
            this.text1 = data.text;
        });
        this.render();
    }

    private render() {
        const chimpleLabel = this.text.getComponent(ChimpleLabel);
        chimpleLabel.string = 'Add Section';
    }

    async onYesClicked(event) {
        if (!!this.text1) {
            await ParseApi.getInstance().createSection(this.text1);
            const schoolId: string = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
            ParseApi.getInstance().removeFromCache(SECTIONS + schoolId);
            const selectionScene = this.parent.getComponent(SelectionScene);
            const data: ParseSection[] = await ParseApi.getInstance().getSectionsForSchool(schoolId);
            selectionScene.updateSectionData(data);
        }
        this.closeDialog();
    }

    closeDialog() {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(TEACHER_ADD_SECTION_DIALOG_CLOSED, true);
        this.node.dispatchEvent(customEvent);
        this.scheduleOnce(() => {
            this.node.removeFromParent(true);
        }, 0.25)
    }

    onNoClicked(event) {
        this.closeDialog();
    }
}