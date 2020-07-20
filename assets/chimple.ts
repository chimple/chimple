import Config from "./common/scripts/lib/config";
import { MODE, Mode } from "./common/scripts/lib/constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Chimple extends cc.Component {
    onLoad() {
        switch (MODE) {
            case Mode.Home:
                Config.loadScene('private/home/login/scenes/welcomePage', 'private', null)
                break

            case Mode.School:

                break

            default: //Mode.Base
                Config.loadScene('menu/home/scenes/home', 'menu', null)
        }
    }
}
