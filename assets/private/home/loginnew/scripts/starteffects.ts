import ChimpleLabel from "../../../../common/scripts/chimple-label";
import Config, { ALL_LANGS, LANG_CONFIGS } from "../../../../common/scripts/lib/config";
import Profile, { LANGUAGE, SFX_OFF } from "../../../../common/scripts/lib/profile";
import { Util } from "../../../../common/scripts/util";
import UtilLogger from "../../../../common/scripts/util-logger";
import WelcomePage from "./welcomePage";

const { ccclass, property } = cc._decorator;
@ccclass
export default class StartEffects extends cc.Component {

    onLoad() {
        this.onStartEffects()
    }

    onStartEffects() {
        //title movement
        let titleAction = cc.moveTo(1, cc.v2(0, cc.winSize.width / 6));
        let titleRef = this.node
            .getChildByName("Main Camera")
            .getChildByName("chimple logo");
        titleRef.runAction(titleAction);
        //char movement
    }

    onClickShareApp() {
        Util.shareText("Hey checkout Chimple Learning app \nhttps://play.google.com/store/apps/details?id=org.chimple.bahama&hl=en_IN");
    }

    onClickSetting() {
       this.node.getChildByName('settings').active=true
       this.node.getChildByName('block').active=true
    }

    onClickRateApp() {
        cc.sys.openURL("https://play.google.com/store/apps/details?id=org.chimple.bahama&hl=en_IN");
    }

    onClickHelp() {
        UtilLogger.launchYoutube('Ez9oouE2pOE')
    }
}