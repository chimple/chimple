import Config from "./common/scripts/lib/config";
import Profile, { Gender, User } from "./common/scripts/lib/profile";
import { D_MODE, DeployMode, Mode, MODE } from "./common/scripts/lib/constants";
import { Queue } from "./queue";

const { ccclass, property } = cc._decorator;

export const CHIMPLE_MODE = 'CHIMPLE_MODE';
export const DEPLOY_MODE = 'DEPLOY_MODE';

export const BASE: string = "BASE";
export const HOME: string = "HOME";
export const SCHOOL: string = "SCHOOL";
export const REGISTER: string = "REGISTER";
export const NONE: string = "NONE";

export const LANDING_SCENE = 'private/school/scenes/landing';
export const HOME_SCENE = 'menu/home/scenes/home';
export const START_SCENE = 'menu/start/scenes/start';
@ccclass
export default class Chimple extends cc.Component {
    async onLoad() {

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
