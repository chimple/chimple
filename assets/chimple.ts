import Config, {LANG_CONFIGS, Lang} from "./common/scripts/lib/config";
import Profile, {Gender, User, LANGUAGE} from "./common/scripts/lib/profile";
import {D_MODE, DeployMode, Mode, MODE} from "./common/scripts/lib/constants";
import UtilLogger from "./common/scripts/util-logger";
import {Util} from "./common/scripts/util";

const {ccclass, property} = cc._decorator;

export const CHIMPLE_MODE = 'CHIMPLE_MODE';
export const DEPLOY_MODE = 'DEPLOY_MODE';

export const BASE: string = "BASE";
export const HOME: string = "HOME";
export const SCHOOL: string = "SCHOOL";
export const REGISTER: string = "REGISTER";
export const NONE: string = "NONE";

export const NO_ASSIGNED_TEACHERS: string = 'no_assigned_teachers';
export const ASSIGNED_TEACHERS: string = 'assigned_teachers';
export const ADD_TEACHER: string = 'add_teacher';
export const TEACHER_ID_KEY = 'id';
export const TEACHER_NAME_KEY = 'name';

export const LANDING_SCENE = 'private/school/scenes/landing';
export const HOME_SCENE = 'menu/home/scenes/home';
export const START_SCENE = 'menu/start/scenes/start';
//@ts-ignore
cc.deep_link = function (url) {
    cc.log("deep link called with url:" + url);
    http://chimple.github.io
        if (url !== null && url.includes("http://chimple.github.io/")) {
            let messageType: string = null;
            let splits = url.split("://chimple.github.io/");
            if (splits !== null && splits.length === 2) {
                let elements = splits[1].split('/');
                messageType = elements.splice(0, 1)[0];
                if (messageType === ADD_TEACHER) {
                    let data = Object.assign({});
                    if (elements !== null && (elements.length % 2 === 0)) {
                        let all_keys = elements;
                        let all_values = [];
                        for (let i = 0; i < elements.length; i++) {
                            all_values.push(all_keys.splice(i + 1, 1)[0]);
                        }
                        let mappings = all_keys.map(function (e, i) {
                            return [e, all_values[i]];
                        });

                        mappings.forEach(arr => {
                            if (arr && arr.length === 2) {
                                data[arr[0].toLowerCase()] = arr[1]
                            }
                        })
                    }
                    try {
                        const jsonMessages: any[] = Util.removeDuplicateMessages(data, messageType);
                        UtilLogger.logChimpleEvent(ADD_TEACHER, data);
                        cc.sys.localStorage.setItem(messageType, JSON.stringify(jsonMessages));
                    } catch (e) {

                    }
                }
            }
            cc.log('saved into local storage:' + cc.sys.localStorage.getItem(messageType));
        }
};


@ccclass
export default class Chimple extends cc.Component {
    async onLoad() {
        //  Queue.init(); // init queue
        UtilLogger.initPluginFirebase();
        Util.loadi18NMapping(() => {
        })
        const lang = Profile.getValue(LANGUAGE) || Lang.ENGLISH
        const langConfig = LANG_CONFIGS.get(lang)
        if (langConfig) Config.i.loadFontDynamically(langConfig.font)
        const deployMode: number = D_MODE;
        const selectedMode: number = Number(cc.sys.localStorage.getItem(CHIMPLE_MODE)) || MODE;
        switch (deployMode) {
            case DeployMode.Open:
                this.navigateToBase();
                break;
            case DeployMode.Close:
                Config.loadScene(LANDING_SCENE, 'private', null);
                break;
            default:
                this.navigateToBase();
                break;
        }
        // this.navigateToBase();

    }

    public static navigateToHome() {
        Config.loadScene('private/home/loginnew/scenes/homeLoginScene', 'private', null);
    }

    private navigateToBase() {
        const existingUsers = User.getUsers();
        if (existingUsers == null || existingUsers.length <= 0) {
            User.createUser('test', '', 5, Gender.GIRL, 'test', 'armydog');
        }
        User.setCurrentUser(User.getUsers()[0]);
        Config.loadScene('menu/start/scenes/start', 'menu', null);
    }
}
