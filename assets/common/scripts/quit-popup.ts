import Config from "./lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class QuitPopup extends cc.Component {

    onClickYesButton() {
        Config.i.popScene()
    }

    onClickNoButton() {
        this.node.active = false;
    }

    onClickHelpButton() {
        this.node.active = false;
        cc.sys.openURL("https://wa.me/917091270679");
    }
}
