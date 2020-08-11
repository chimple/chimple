import Config from "./common/scripts/lib/config";
import { MODE, Mode } from "./common/scripts/lib/constants";
import Profile, { Gender } from "./common/scripts/lib/profile";

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
                const existingUsers = Profile.getUsers()
                if (existingUsers == null || existingUsers.length <= 0) {
                    Profile.createUser('test', '', 5, Gender.GIRL)
                }
                Profile.setCurrentUser(Profile.getUsers()[0])
                Config.i.loadCourseJsons(this.node, () => {
                    Config.loadScene('menu/start/scenes/start', 'menu', null)
                })
        }
    }
}
