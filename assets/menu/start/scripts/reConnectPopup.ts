import Config from "../../../common/scripts/lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ReConnectPopup extends cc.Component {

    @property(cc.Node)
    text: cc.Node = null;

    @property(cc.Node)
    yesButton: cc.Node = null;

    @property(cc.Node)
    block: cc.Node = null;

    @property(cc.Node)
    dialog: cc.Node = null;

    @property(cc.Node)
    msg: cc.Node = null;

    onLoad() {
        // const chimpleText = this.text.getComponent(ChimpleLabel);
        // const chimpleMsg = this.msg.getComponent(ChimpleLabel);
        // chimpleText.string = Util.i18NText("Do you want to open now?");  
        // chimpleMsg.string = Util.i18NText("New assignment has been assigned to you");

    }

    onEnable() {
        this.dialog.active = true;
        this.block.active = true;
    }

    onDisable() {
        this.dialog.active = false;
        this.block.active = false;
    }

    onClickYes() {
        Config.i.pushScene('menu/Profile/scene/leaderboardProfile', 'menu')
    }

    onClickNo() {
        this.dialog.active = false;
        this.block.active = false;
        this.node.active = false;
    }
}
