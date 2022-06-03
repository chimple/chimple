import { Util } from "../../../../common/scripts/util";
import EditProfile from "./editprofile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RemoveUserPopup extends cc.Component {

    @property(cc.Label)
    removeUserLabel: cc.Label = null;

    @property
    isTeacher: boolean = false;

    onClickYesButton() {
        let comp = this.node.parent.getComponent(EditProfile);
        this.isTeacher ? comp.deleteTeacher() : comp.deleteUser();
    }

    onClickNoButton() {
        this.node.active = false;
        this.isTeacher = false;
    }

    onClickHelpButton() {
        cc.sys.openURL("https://wa.me/917019270679");
        this.node.active = false;
    }

    onEnable() {
        let title = this.isTeacher ? "Remove Teacher?" : "Remove User?";
        this.removeUserLabel.string = Util.i18NText(title);
    }
}
