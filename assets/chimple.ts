import Config from "./common/scripts/lib/config";
import Profile, { Gender, User } from "./common/scripts/lib/profile";
import { ParseApi } from "./private/services/parseApi";
import { ParseUser } from "./private/domain/parseUser";
import { D_MODE, DeployMode, Mode, MODE } from "./common/scripts/lib/constants";

const {ccclass, property} = cc._decorator;

export const CHIMPLE_MODE = 'CHIMPLE_MODE';
export const DEPLOY_MODE = 'DEPLOY_MODE';

export const BASE: string = "BASE";
export const HOME: string = "HOME";
export const SCHOOL: string = "SCHOOL";
export const REGISTER: string = "REGISTER";
export const NONE: string = "NONE";

export const SELECT_SECTIONS_SCENE = 'private/school/scenes/selectSections';
export const SCHOOL_REGISTRATION_SCENE = 'private/school/scenes/schoolRegistration';
export const TEACHER_REGISTRATION_SCENE = 'private/teacher/scenes/teacherRegistration';
export const TEACHER_REPORT_CARD_SCENE = 'private/teacher/scenes/teacherReportCard';
export const REGISTER_SCENE = 'private/register/scenes/register';
export const HOME_SCENE = 'menu/home/scenes/home';
@ccclass
export default class Chimple extends cc.Component {
    async onLoad() {
        const deployMode: number = Number(cc.sys.localStorage.getItem(DEPLOY_MODE)) || D_MODE;
        const selectedMode: number = Number(cc.sys.localStorage.getItem(CHIMPLE_MODE)) || MODE;
        // switch (deployMode) {
        //     case DeployMode.Open:
        //         this.navigateToBase();
        //         break;
        //     case DeployMode.Close:
        //         switch (selectedMode) {
        //             case Mode.Home:
        //                 Chimple.navigateToHome();
        //                 break;
        //             case Mode.School:
        //                 Chimple.navigateToSchool();
        //                 break;
        //             case Mode.Teacher:
        //                 await Chimple.navigateToTeacher();
        //                 break;
        //             case Mode.Base:
        //                 this.navigateToBase();
        //                 break;
        //             default: // Mode.NONE
        //                 Config.loadScene(REGISTER_SCENE, 'private', null);
        //                 break;
        //         }
        //         break;
        //     default:
        //         this.navigateToBase();
        //         break;
        // }
                this.navigateToBase();

    }

    public static navigateToHome() {
        Config.loadScene('private/home/login/scenes/welcomePage', 'private', null);
    }

    public static navigateToSchool() {
        const loggedInUser: ParseUser = ParseApi.getLoggedInUser();
        if (!!loggedInUser && !ParseApi.isEmpty(loggedInUser)) {
            Config.loadScene(SELECT_SECTIONS_SCENE, 'private', null);
        } else {
            Config.loadScene(SCHOOL_REGISTRATION_SCENE, 'private', null);
        }
    }

    public static async navigateToTeacher() {
        const teacherUser: ParseUser = ParseApi.getLoggedInUser();
        if (!!teacherUser && !ParseApi.isEmpty(teacherUser)) {
            await Profile.teacherPostLoginActivity(teacherUser.objectId);
            Config.loadScene(TEACHER_REPORT_CARD_SCENE, 'private', null);
        } else {
            Config.loadScene(TEACHER_REGISTRATION_SCENE, 'private', null);
        }
    }

    private navigateToBase() {
        const existingUsers = User.getUsers();
        if (existingUsers == null || existingUsers.length <= 0) {
            User.createUser('test', '', 5, Gender.GIRL);
        }
        User.setCurrentUser(User.getUsers()[0]);
        Config.i.loadCourseJsons(this.node, () => {
            Config.loadScene('menu/start/scenes/start', 'menu', null);
        });
    }
}
