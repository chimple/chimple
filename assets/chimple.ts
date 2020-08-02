import Config from "./common/scripts/lib/config";
import {MODE, Mode} from "./common/scripts/lib/constants";
import {ParseApi} from "./private/services/parseApi";
import {ParseLoggedInUser} from "./private/domain/parseLoggedInUser";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Chimple extends cc.Component {
    onLoad() {
        switch (MODE) {
            case Mode.Home:
                Config.loadScene('private/home/login/scenes/welcomePage', 'private', null)
                break

            case Mode.School:
                const loggedInUser: ParseLoggedInUser = ParseApi.getLoggedInUser();
                if (!!loggedInUser && !ParseApi.isEmpty(loggedInUser)) {
                    Config.loadScene('private/school/scenes/selectSections', 'private', null)
                } else {
                    Config.loadScene('private/school/scenes/schoolRegistration', 'private', null)
                }

                break

            default: //Mode.Base
                Config.loadScene('menu/home/scenes/home', 'menu', null)
        }
    }
}
