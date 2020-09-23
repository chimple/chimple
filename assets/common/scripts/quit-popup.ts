import Config from "./lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class QuitPopup extends cc.Component {
    @property(cc.Node)
    inputEventBlocker: cc.Node = null;

    onClickYesButton() {
        Config.i.popScene()
    }

    onClickNoButton() {
        this.node.active = false;
        this.inputEventBlocker.active = false;
    }

    onClickHelpButton() {
        cc.sys.openURL("https://wa.me/917019270679");
        this.node.active = false;
        this.inputEventBlocker.active = false;
    }

    onEnable() {
        this.inputEventBlocker.active = true;
    }
}
