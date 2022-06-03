import ccclass = cc._decorator.ccclass;
import {catchError} from "../../../common/scripts/lib/error-handler";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import {Util} from "../../../common/scripts/util";
import {REGISTER_ITEM_SELECTED_EVENT, RegisterType} from "./registerButton";
import {Mode, MODE} from "../../../common/scripts/lib/constants";
import Config from "../../../common/scripts/lib/config";
import {ParseUser} from "../../../common/scripts/domain/parseUser";
import {ParseApi, SelectionMode} from "../../../common/scripts/services/parseApi";
import {ParseNetwork} from "../../../common/scripts/services/ParseNetwork";
import Profile from "../../../common/scripts/lib/profile";
import {
    SCHOOL_REGISTRATION_SCENE,
    SELECT_SECTIONS_SCENE,
    TEACHER_REGISTRATION_SCENE,
    TEACHER_REPORT_CARD_SCENE
} from "../../school/scripts/landing";
import {ParseConnection} from "../../../common/scripts/domain/parseConnection";
import {nextSelectMode} from "../../school/scripts/selectionScene";

const PHOTO = 'photo';
const NAME = 'name';

@ccclass
export class Register extends cc.Component {
    constructor() {
        super();
    }

    @catchError()
    protected onLoad() {
        this.registerTypeEvent();
        this.renderUI();
    }

    renderUI() {
        const layout: cc.Node = this.node.getChildByName('layout');
        const layoutComponent = layout.getComponent(cc.Layout);
        layout.children.forEach(
            (c: cc.Node) => {
                const photo: cc.Node = c.getChildByName(PHOTO);
                const name = photo.getChildByName(NAME);
                const chimpleLabel = name.getComponent(ChimpleLabel);
                chimpleLabel.string = Util.i18NText(chimpleLabel.string);
            }
        );
    }

    private registerTypeEvent() {
        this.node.on(REGISTER_ITEM_SELECTED_EVENT, async (event) => {
            event.stopPropagation();
            const selectedItem = event.getUserData();
            switch (selectedItem.type) {
                case RegisterType.Child:
                    // @ts-ignore
                    MODE = Mode.Home;
                    this.navigateToHome();
                    break;
                case RegisterType.Teacher:
                    // @ts-ignore
                    MODE = Mode.Teacher;
                    await this.navigateToTeacher();
                    break;
                case RegisterType.School:
                    cc.log("registration type", RegisterType.School);
                    // @ts-ignore
                    MODE = Mode.School;
                    await this.navigateToSchool();
                    break;
            }

        });
    }

    public navigateToHome() {
        Config.loadScene('private/home/loginnew/scenes/welcomePage', 'private', null);
    }

    public async navigateToSchool() {
        const loggedInUser: ParseUser = ParseApi.getInstance().getLoggedInUser();
        const connections: ParseConnection[] = await ParseApi.getInstance().connections();
        if (!!loggedInUser && !ParseNetwork.getInstance().isEmpty(loggedInUser) &&
            !ParseNetwork.getInstance().isEmpty(connections)) {
            Config.i.pushScene(SELECT_SECTIONS_SCENE, 'private', null, true);
        } else {
            Config.i.pushScene(SCHOOL_REGISTRATION_SCENE, 'private', null);
        }
    }

    public async navigateToTeacher() {
        const teacherUser: ParseUser = ParseApi.getInstance().getLoggedInUser();
        if (!!teacherUser && !ParseNetwork.getInstance().isEmpty(teacherUser)) {
            await Profile.teacherPostLoginActivity(teacherUser.objectId);
            const nextScene = SELECT_SECTIONS_SCENE;
            // @ts-ignore
            nextSelectMode = SelectionMode.Section;
            Config.i.pushScene(nextScene, 'private', null, true);
        } else {
            Config.i.pushScene(TEACHER_REGISTRATION_SCENE, 'private', null);
        }
    }

}