import Config from "./common/scripts/lib/config";
import { MODE, Mode } from "./common/scripts/lib/constants";
import Profile, { Gender, User } from "./common/scripts/lib/profile";
import { ParseApi } from "./private/services/parseApi";
import { ParseUser } from "./private/domain/parseUser";

const { ccclass, property } = cc._decorator;

export const SELECT_SECTIONS_SCENE = 'private/school/scenes/selectSections';
export const SCHOOL_REGISTRATION_SCENE = 'private/school/scenes/schoolRegistration';
export const HOME_SCENE = 'menu/home/scenes/home';
@ccclass
export default class Chimple extends cc.Component {
    onLoad() {
        switch (MODE) {
            case Mode.Home:
                Config.loadScene('private/home/login/scenes/welcomePage', 'private', null)
                break
            case Mode.School:
                const loggedInUser: ParseUser = ParseApi.getLoggedInUser();
                if (!!loggedInUser && !ParseApi.isEmpty(loggedInUser)) {
                    Config.loadScene(SELECT_SECTIONS_SCENE, 'private', null);
                } else {
                    Config.loadScene(SCHOOL_REGISTRATION_SCENE, 'private', null);
                }
                break
            default: //Mode.Base
                const existingUsers = User.getUsers()
                if (existingUsers == null || existingUsers.length <= 0) {
                    User.createUser('test', '', 5, Gender.GIRL)
                }
                User.setCurrentUser(User.getUsers()[0])
                Config.i.loadCourseJsons(this.node, () => {
                    Config.loadScene('menu/start/scenes/start', 'menu', null)
                })
                break;

        }
    }
}
