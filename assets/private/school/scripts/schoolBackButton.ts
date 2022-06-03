import ccclass = cc._decorator.ccclass;
import Config from "../../../common/scripts/lib/config";
import { SelectionMode } from "../../../common/scripts/services/parseApi";
import { nextSelectMode } from "./selectionScene";
import { SELECT_SECTIONS_SCENE } from "./landing";

@ccclass
export class SchoolBackButton extends cc.Component {

    onButtonClick(event, customEventData) {
        // @ts-ignore
        nextSelectMode = nextSelectMode === SelectionMode.Student ? SelectionMode.Section :
            SelectionMode.Subject ? SelectionMode.Student : SelectionMode.Section;
        Config.loadScene(SELECT_SECTIONS_SCENE, 'private', null);
    }
}