import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import EditBox = cc.EditBox;
import { catchError } from "../../../common/scripts/lib/error-handler";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import { CustomEditBoxData, EDIT_ENDED_EVENT, EDIT_STARTED_EVENT } from "./customEditBox";
import { LoginData, NextButton, PARSE_LOGIN_EVENT } from "./nextButton";
import { ParseApi, SelectionMode } from "../../../common/scripts/services/parseApi";
import Config from "../../../common/scripts/lib/config";
import { nextSelectMode } from "./selectionScene";
import { ParseNetwork } from "../../../common/scripts/services/ParseNetwork";
import { ParseUser } from "../../../common/scripts/domain/parseUser";
import { LOGIN_TYPE, LoginType, SCHOOL_CODE, SCHOOL_PASSWORD } from "../../../common/scripts/domain/parseConstants";
import { SECTION_LIST, SELECT_SECTIONS_SCENE } from "./landing";
import { ParseConnection } from "../../../common/scripts/domain/parseConnection";
import UtilLogger from "../../../common/scripts/util-logger";
import { CURRENT_SCHOOL_ID, Mode, School, Section, IS_REMEMBER_TOGGLE_ON, REMEMBERED_USER } from "../../../common/scripts/lib/constants";
import Profile, { CURRENTMODE, IN_LOGIN_FLOW, User } from "../../../common/scripts/lib/profile";

export enum EditOptions {
    SchoolCodeChanged = "0",
    PasswordChanged = "1"
}

const SCHOOL_CODE_PLACEHOLDER = 'Email id';
const PASSWORD_PLACEHOLDER = 'password';
//@ts-ignore
cc.loginSucceeded = async function (schoolInfo: string) {
    cc.sys.localStorage.setItem("loginUser", SchoolRegistration.loginUser)
    cc.sys.localStorage.setItem("loginPassword", SchoolRegistration.loginPassword)
    cc.log("loginSucceeded: " + schoolInfo);
    if (!!schoolInfo) {
        const school: School = JSON.parse(schoolInfo);
        cc.sys.localStorage.setItem('SCHOOL_USER', school.firebaseId);
        cc.sys.localStorage.setItem('SCHOOL_CODE', school.schoolCode);
        Profile.setItem(CURRENTMODE, Mode.School);
        setTimeout(() => {
            const nextScene = SECTION_LIST;
            // @ts-ignore
            nextSelectMode = SelectionMode.Section;
            Config.i.pushScene(nextScene, 'private', null, true);
            // Config.loadScene(nextScene, 'private', null);
        }, 5)
    }
}

//@ts-ignore
cc.loginFailed = async function (reason) {
    try {
        cc.log("user in scool register schoolId", reason);
        UtilLogger.processLoginFail();
        SchoolRegistration.registrationNode.getComponent(cc.Button).interactable = true;
        SchoolRegistration.registrationNode.parent.getChildByName('block').active = false;
        SchoolRegistration.loading.active = false
        SchoolRegistration.warning.active = true
        cc.log("loginFailed: " + reason);
    } catch (error) {
        cc.log("error in login fialed");
        cc.log(error)
    }
}

@ccclass
export class SchoolRegistration extends cc.Component {
    @property(cc.Prefab)
    customEditBoxPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    nextButtonPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    warningPrefab: cc.Prefab = null;

    @property(cc.EditBox)
    userNameBox: cc.EditBox = null;

    @property(cc.EditBox)
    passwordBox: cc.EditBox = null;

    @property(cc.SpriteFrame)
    enableSprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    disableSprite: cc.SpriteFrame = null;

    @property(cc.Button)
    nextButtonNode: cc.Button = null

    @property(cc.Node)
    rememberNode: cc.Node = null


    private schoolEditBox: cc.Node = null;
    private nextButton: cc.Node = null;
    private schoolCode: string = null;
    private password: string = null;
    static loading: cc.Node = null;
    static warning: cc.Node = null;
    static registrationNode: cc.Node
    static loginUser: string
    static loginPassword: string
    private loginEmail: string
    private loginPassword: string

    constructor() {
        super();
    }

    @catchError()
    protected async onLoad(): Promise<void> {
        this.createLoading();
        const loggedInUser = cc.sys.localStorage.getItem("loginUser")
        if (loggedInUser != null) {
            this.userNameBox.string = loggedInUser//"autouser@gmail.com"
            this.loginEmail = loggedInUser
            this.enableNextButton()
        }
        if (cc.sys.localStorage.getItem(IS_REMEMBER_TOGGLE_ON) != null && cc.sys.localStorage.getItem(IS_REMEMBER_TOGGLE_ON) === "true") {
            this.rememberNode.getComponent(cc.Toggle).isChecked = true;
        }
        else {
            this.rememberNode.getComponent(cc.Toggle).isChecked = false;
        }
    }

    private createLoading() {
        SchoolRegistration.loading = cc.instantiate(this.loadingPrefab);
        SchoolRegistration.warning = cc.instantiate(this.warningPrefab);
        SchoolRegistration.loading.zIndex = 3;
        this.node.getParent().addChild(SchoolRegistration.loading);
        this.node.addChild(SchoolRegistration.warning)
        SchoolRegistration.warning.active = false;
        SchoolRegistration.loading.active = false;
    }

    private showLoading() {
        SchoolRegistration.loading.active = true;
    }

    private hideLoading() {
        SchoolRegistration.loading.active = false;
    }

    private errorMessage() {
        this.node.parent.getChildByName('error').active = true
        this.node.parent.getChildByName('cancelButton').active = true
    }
    private onCancelButtonClick() {
        this.node.parent.getChildByName('error').active = false
        this.node.parent.getChildByName('cancelButton').active = false
        this.enableNextButton()
        SchoolRegistration.registrationNode.getComponent(cc.Button).interactable = true;

    }

    onNextButtonClick() {
        const loggedInUser = cc.sys.localStorage.getItem("loginUser");
        if (loggedInUser != null) {
            // check password locally
            this.checkPasswordCache(this.loginPassword);
        } else
            this.parseLogin();
    }

    private async parseLogin() {
        SchoolRegistration.registrationNode = this.nextButtonNode.node
        if (UtilLogger.isNetworkAvailable()) {
            SchoolRegistration.registrationNode.parent.getChildByName('block').active = true
            SchoolRegistration.registrationNode.parent.getChildByName('block').opacity = 80
            this.showLoading();
            SchoolRegistration.loginUser = this.loginEmail
            SchoolRegistration.loginPassword = this.loginPassword
            UtilLogger.login(this.loginEmail, this.loginPassword);
        }
        else {
            this.errorMessage()
        }
    }

    private showNext() {
        const nextButtonComponent: NextButton = this.nextButton.getComponent(NextButton);
        nextButtonComponent.schoolCode = this.schoolCode;
        nextButtonComponent.password = this.password;
        let shouldShowActive: boolean = !!this.schoolCode && !!this.password ? true : false;
        shouldShowActive ? nextButtonComponent.activate() : nextButtonComponent.deActivate();
    }


    onEditName(e) {
        let value = this.userNameBox.node.getChildByName("text").getComponent(cc.Label).string;
        this.loginEmail = value;
        this.enableNextButton()
    }
    onCrossButtonClicked() {
        this.userNameBox.node.getChildByName("text").getComponent(cc.Label).string = ' '
        this.userNameBox.node.getChildByName("placeholder").getComponent(cc.Label).string = ' '
        this.loginEmail = null
        this.nextButtonNode.interactable = false
        this.nextButtonNode.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.disableSprite;
    }
    enableNextButton() {
        if (this.loginPassword != null && this.loginEmail != null && this.loginPassword.length >= 4) {
            this.nextButtonNode.interactable = true
            this.nextButtonNode.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.enableSprite;
        }
        else
            this.disableNextButton();
    }

    disableNextButton() {
        this.nextButtonNode.interactable = false
        this.nextButtonNode.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.disableSprite;
    }
    onEditPasswod(e) {
        let value = e.string;//this.passwordBox.node.getChildByName("text").getComponent(cc.Label).string;
        this.loginPassword = value;
        this.enableNextButton()
    }

    checkPasswordCache(password: string) {
        if (password === cc.sys.localStorage.getItem("loginPassword")) {
            cc.sys.localStorage.removeItem(REMEMBERED_USER)
            //  navigate to sectionlist
            Config.i.pushScene('private/school/scenes/sectionList', 'private', null, true);
        } else {
            // show error msg
            SchoolRegistration.registrationNode = this.nextButtonNode.node
            SchoolRegistration.registrationNode.getComponent(cc.Button).interactable = true;
            SchoolRegistration.registrationNode.parent.getChildByName('block').active = false;
            SchoolRegistration.loading.active = false
            SchoolRegistration.warning.active = true
        }
    }

    private showPassword() {
        this.passwordBox.node.getComponent(cc.EditBox).inputFlag = EditBox.InputFlag.PASSWORD;
        this.passwordBox.node.getChildByName('show').active = false
        this.passwordBox.node.getChildByName('hide').active = true
    }

    private hidePassword() {
        this.passwordBox.node.getComponent(cc.EditBox).inputFlag = EditBox.InputFlag.DEFAULT;
        this.passwordBox.node.getChildByName('show').active = true
        this.passwordBox.node.getChildByName('hide').active = false
    }

    onClickBackBtn() {
        // Profile.setItem(IN_LOGIN_FLOW, 1)
        // Config.loadScene('private/home/loginnew/scenes/welcomePage', 'private', null);
        // navigate to previous screen
        Config.i.popScene();
    }

    onRememberButtonClick(toggle, customEventData) {
        if (toggle.isChecked) {
            Profile.setValue(IS_REMEMBER_TOGGLE_ON, "true")
        }
        else {
            Profile.setValue(IS_REMEMBER_TOGGLE_ON, "false")
        }
    }


}