import Config from "../../../../common/scripts/lib/config";
import Profile, { LANGUAGE } from "../../../../common/scripts/lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WelcomeScene extends cc.Component {

    onLoad() {
        setTimeout(() => {
            if (Profile.lang === null) {
                Config.loadScene('private/home/loginnew/scenes/languageSelectScene', "private", null);
            }
            else {
                Config.loadScene('private/home/loginnew/scenes/welcomePage', "private", null);
            }

        }, 3500)
    }
}
