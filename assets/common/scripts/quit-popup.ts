import Config from "./lib/config";
import { Util } from "./util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class QuitPopup extends cc.Component {
   
    @property(cc.Node)
    inputEventBlocker: cc.Node = null;

    @property(cc.Label)
    exitLabel: cc.Label = null;

    @property(cc.Label )
    helpLabel: cc.Label = null;

    onLoad(){
       this.exitLabel.string = Util.i18NText('EXIT ?');
       this.helpLabel.string = Util.i18NText('Help?');
    }

    onClickYesButton() {
        Config.i.popScene();
        Util.stopHelpAudio();
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
        cc.director.pause();
        cc.audioEngine.pauseAllEffects();
    }

    onDisable() {
        cc.director.resume();
        cc.audioEngine.resumeAllEffects()
    }
}
