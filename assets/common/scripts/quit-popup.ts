import LessonController from "./lessonController";
import Config from "./lib/config";
import { Util } from "./util";
import UtilLogger from "./util-logger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class QuitPopup extends cc.Component {

    @property(cc.Node)
    inputEventBlocker: cc.Node = null;

    @property(cc.Label)
    exitLabel: cc.Label = null;

    @property(cc.Label)
    videoLabel: cc.Label = null;


    onLoad() {
        this.inputEventBlocker.zIndex = 2
        this.node.zIndex = 3
        this.exitLabel.string = Util.i18NText('Exit');
        this.videoLabel.string = Util.i18NText('Watch Help Video');
    }

    onClickYesButton() {
        this.node.getChildByName('quit_bg').getChildByName('exit_game').getComponent(cc.Button).interactable = false;
        Config.isMicroLink = false;
        Config.i.popScene();
        LessonController.getFriend().stopAudio();
    }

    onClickNoButton() {
        this.node.active = false;
        this.inputEventBlocker.active = false;
    }

    onClickHelpButton() {
        this.node.getChildByName('quit_bg').getChildByName('help_video').getComponent(cc.Button).interactable = false;
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
