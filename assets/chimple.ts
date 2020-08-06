import Config from "./common/scripts/lib/config";
import { MODE, Mode } from "./common/scripts/lib/constants";
import { ParseApi } from "./private/services/parseApi";
import { ParseLoggedInUser } from "./private/domain/parseLoggedInUser";

const {ccclass, property} = cc._decorator;

export const SELECT_SECTIONS_SCENE = 'private/school/scenes/selectSections';
export const SCHOOL_REGISTRATION_SCENE = 'private/school/scenes/schoolRegistration';
export const HOME_SCENE = 'menu/home/scenes/home';
@ccclass
export default class Chimple extends cc.Component {
    onLoad() {
        switch (MODE) {
            case Mode.Home:
                Config.loadScene('private/home/login/scenes/welcomePage', 'private', null);
                break;

            case Mode.School:
                const loggedInUser: ParseLoggedInUser = ParseApi.getLoggedInUser();
                if (!!loggedInUser && !ParseApi.isEmpty(loggedInUser)) {
                    Config.loadScene(SELECT_SECTIONS_SCENE, 'private', null);
                } else {
                    Config.loadScene(SCHOOL_REGISTRATION_SCENE, 'private', null);
                }
                break;
                default: //Mode.Base
                    Config.loadScene(HOME_SCENE, 'menu', null);
                }
        }
    }
