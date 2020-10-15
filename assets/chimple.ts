import Config, { LANG_CONFIGS, Lang } from "./common/scripts/lib/config";
import Profile, { Gender, User, LANGUAGE } from "./common/scripts/lib/profile";
import { D_MODE, DeployMode, Mode, MODE } from "./common/scripts/lib/constants";
import UtilLogger from "./common/scripts/util-logger";
import { Util } from "./common/scripts/util";

const { ccclass, property } = cc._decorator;

export const CHIMPLE_MODE = 'CHIMPLE_MODE';
export const DEPLOY_MODE = 'DEPLOY_MODE';

export const BASE: string = "BASE";
export const HOME: string = "HOME";
export const SCHOOL: string = "SCHOOL";
export const REGISTER: string = "REGISTER";
export const NONE: string = "NONE";

export const REJECT_TEACHER_REQUEST: string = 'reject_teacher_request';
export const ACCEPT_TEACHER_REQUEST: string = 'accept_teacher_request';
export const TEACHER_ADDED: string = 'teacher_added';
export const RECEIVED_TEACHER_REQUEST: string = 'received_teacher_request';
export const TEACHER_ID_KEY = 'id';
export const TEACHER_NAME_KEY = 'name';
export const TEACHER_SECTION_ID = 'sectionid';
export const ASSIGN_HOMEWORK: string = 'assign_homework';
export const ASSIGNMENT_ID_KEY_FOR_ASSIGN_HW = 'aid';
export const STUDENT_ASSIGNMENT_ID_KEY = 'sid';
export const TEACHER_ID_KEY_FOR_ASSIGN_HW = 'tid';
export const CHAPTER_ID_KEY_FOR_ASSIGN_HW = 'cid';
export const LESSON_ID_KEY_FOR_ASSIGN_HW = 'lid';


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
            if (messageType === RECEIVED_TEACHER_REQUEST) {
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
                    UtilLogger.logChimpleEvent(RECEIVED_TEACHER_REQUEST, data);
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
                Config.i.pushScene(LANDING_SCENE, 'private', null, true);
                break;
            default:
                this.navigateToBase();
                break;
        }
        // this.navigateToBase();

    }

    private selectModes() {
        const modes: number = MODE;
        switch (modes) {
            case Mode.Home:
                // send to welcomePage.ts
                Config.i.pushScene('private/home/loginnew/scenes/welcomePage', 'private', null, true);
                break;
            case Mode.School:
                // send to selectSections.ts
                Config.i.pushScene('private/schools/scenes/selectSections', 'private', null, true);
                break;
        }
    }

    public static navigateToHome() {
        Config.i.pushScene('private/home/loginnew/scenes/homeLoginScene', 'private', null, true);
    }

    private navigateToBase() {
        const existingUsers = User.getUsers();
        if (existingUsers == null || existingUsers.length <= 0) {
            User.createUser('test', '', 5, Gender.GIRL, 'test', 'armydog');
        }
        User.setCurrentUser(User.getUsers()[0]);
        Config.i.pushScene('menu/start/scenes/start', 'menu', null, true);
    }
}
