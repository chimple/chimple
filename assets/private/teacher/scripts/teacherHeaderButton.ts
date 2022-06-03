import Config from "../../../common/scripts/lib/config";
import {SELECT_SECTIONS_SCENE, TEACHER_HOME} from "../../school/scripts/landing";
import {SelectionMode} from "../../../common/scripts/services/parseApi";
import {nextSelectMode} from "../../school/scripts/selectionScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TeacherHeaderButton extends cc.Component {
    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Sprite)
    selected: cc.Sprite

    onSwitchSectionClicked(event) {
        // @ts-ignore
        nextSelectMode = SelectionMode.Section;
        Config.loadScene(SELECT_SECTIONS_SCENE, 'private', null);
    }

    onHomeButtonClicked(event) {
        Config.loadScene(TEACHER_HOME, 'private', null);
    }
}