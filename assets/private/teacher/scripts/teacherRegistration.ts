import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import EditBox = cc.EditBox;
import {catchError} from "../../../common/scripts/lib/error-handler";
import {CustomEditBoxData, EDIT_ENDED_EVENT} from "../../school/scripts/customEditBox";
import {ParseNetwork} from "../../../common/scripts/services/ParseNetwork";
import {ParseApi, SelectionMode} from "../../../common/scripts/services/parseApi";
import {ParseUser} from "../../../common/scripts/domain/parseUser";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import {LOGIN_TYPE, LoginType, TEACHER_EMAIL, TEACHER_PASSWORD} from "../../../common/scripts/domain/parseConstants";
import {LoginButton, LoginData, PARSE_LOGIN_EVENT} from "./loginButton";
import Config from "../../../common/scripts/lib/config";
import Profile, {Gender, User} from "../../../common/scripts/lib/profile";
import {SELECT_SECTIONS_SCENE, TEACHER_REPORT_CARD_SCENE} from "../../school/scripts/landing";
import {nextSelectMode} from "../../school/scripts/selectionScene";
import {Util} from "../../../common/scripts/util";

const FULL_NAME_PLACEHOLDER = 'name';
const EMAIL_PLACEHOLDER = 'email';
const PASSWORD_PLACEHOLDER = 'password';
const CONFIRM_PASSWORD_PLACEHOLDER = 'confirm password';
const EMAIL_LENGTH = 24;

export enum Mode {
    Login = 1,
    Register = 2
}

export enum EditOptions {
    EmailChanged = "0",
    PasswordChanged = "1",
    FullNameChanged = "2",
    ConfirmPasswordChanged = "3"
}

@ccclass
export class TeacherRegistration extends cc.Component {
    @property(cc.Prefab)
    customEditBoxPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    loginButtonPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;

    @property(cc.Node)
    label: cc.Node = null;

    @property(cc.Node)
    switchModeNode: cc.Node = null;

    @property(cc.Node)
    wText: cc.Node = null;

    loginComponent: LoginButton = null;
    displayLabel = null;

    private fullNameEditBox: cc.Node = null;
    private emailEditBox: cc.Node = null;
    private passwordEditBox: cc.Node = null;
    private confirmPasswordEditBox: cc.Node = null;

    private loginButton: cc.Node = null;
    private email: string = null;
    private password: string = null;
    private fullName: string = null;
    private confirmPassword: string = null;
    private loading: cc.Node = null;
    private mode: Mode = Mode.Register;

    @catchError()
    protected async onLoad(): Promise<void> {
        await this.initUI();
        await this.renderUI();
        await this.registerEditBoxCustomEvent();
        await this.registerLoginEvent();
        this.mode = Mode.Register;
        this.wText.active = false;
    }

    async initUI() {
        this.createLoading();
        this.loginButton = cc.instantiate(this.loginButtonPrefab);
        this.loginButton.setPosition(cc.v2(0, -cc.winSize.height / 3));
        this.loginComponent = this.loginButton.getComponent(LoginButton);
        this.displayLabel = this.label.getComponent(ChimpleLabel);
        this.switchModeNode.setPosition(cc.v2(0, -cc.winSize.height / 3 + 62));
        this.emailEditBox = this.renderEmailBox();
        this.node.addChild(this.emailEditBox);

        this.passwordEditBox = this.renderPasswordBox(PASSWORD_PLACEHOLDER);
        this.node.addChild(this.passwordEditBox);

        this.fullNameEditBox = this.renderFullNameBox();
        this.node.addChild(this.fullNameEditBox);

        this.confirmPasswordEditBox = this.renderConfirmPasswordBox(CONFIRM_PASSWORD_PLACEHOLDER);
        this.node.addChild(this.confirmPasswordEditBox);

        this.emailEditBox.setPosition(new cc.Vec2(this.emailEditBox.x, this.emailEditBox.y + 75));
        this.passwordEditBox.setPosition(new cc.Vec2(this.passwordEditBox.x, this.passwordEditBox.y - 25));
        this.fullNameEditBox.setPosition(new cc.Vec2(this.fullNameEditBox.x, this.fullNameEditBox.y + 175));
        this.confirmPasswordEditBox.setPosition(new cc.Vec2(this.confirmPasswordEditBox.x, this.confirmPasswordEditBox.y - 125));

        this.node.addChild(this.loginButton);
    }

    renderUI() {
        switch (this.mode) {
            case Mode.Login:
                this.loginComponent.text.getComponent(ChimpleLabel).string = Util.i18NText("Login");
                this.displayLabel.string = Util.i18NText("Login To Your Account");
                this.switchModeNode.getChildByName('sButton').getComponent(ChimpleLabel).string = 'Register';
                this.switchModeNode.getChildByName('sLabel').getComponent(ChimpleLabel).string = Util.i18NText('Register Account?');
                this.confirmPasswordEditBox.active = false;
                this.fullNameEditBox.active = false;
                break;
            case Mode.Register:
                this.loginComponent.text.getComponent(ChimpleLabel).string = Util.i18NText("Register");
                this.displayLabel.string = Util.i18NText("SignUp");
                this.switchModeNode.getChildByName('sButton').getComponent(ChimpleLabel).string = Util.i18NText('Login');
                this.switchModeNode.getChildByName('sLabel').getComponent(ChimpleLabel).string = Util.i18NText('Already have an Account?');
                this.confirmPasswordEditBox.active = true;
                this.fullNameEditBox.active = true;
                break;
        }
    }

    private createLoading() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
    }

    private showLoading() {
        this.loading.active = true;
        this.emailEditBox.active = false;
        this.passwordEditBox.active = false;
        this.confirmPasswordEditBox.active = false;
        this.fullNameEditBox.active = false;
        this.switchModeNode.active = false;
        this.wText.active = false;
    }

    private hideLoading() {
        this.loading.active = false;
        this.emailEditBox.active = true;
        this.passwordEditBox.active = true;
        this.switchModeNode.active = true;
        if(this.mode === Mode.Register) {
            this.confirmPasswordEditBox.active = true;
            this.fullNameEditBox.active = true;
        }
    }
    
    private registerEditBoxCustomEvent() {
        this.node.on(EDIT_ENDED_EVENT, (event) => {
            event.stopPropagation();
            const data: CustomEditBoxData = event.getUserData() as CustomEditBoxData;
            switch (data.detectParent) {
                case EditOptions.EmailChanged:
                    this.email = data.text;
                    break;
                case EditOptions.PasswordChanged:
                    this.password = data.text;
                    break;
                case EditOptions.FullNameChanged:
                    this.fullName = data.text;
                    break;
                case EditOptions.ConfirmPasswordChanged:
                    this.confirmPassword = data.text;
                    break;
            }
            this.showNext();
        });
    }

    private async registerLoginEvent() {
        const that = this;
        this.node.on(PARSE_LOGIN_EVENT, async (event) => {
            event.stopPropagation();
            const selectedItem = event.getUserData() as LoginData;
            switch (that.mode) {
                case Mode.Register:
                    this.showLoading();
                    const currentUser: User = User.createUserOrFindExistingUser({
                            name: selectedItem.fullName
                        }
                    );
                    if (currentUser) {
                        try {
                            await ParseApi.getInstance().signUpUser(
                                {
                                    username: currentUser.id,
                                    fullName: currentUser.name || '',
                                    email: selectedItem.email,
                                    password: selectedItem.password
                                }
                            );
                            this.wText.active = true;
                            this.wText.getComponent(ChimpleLabel).string = Util.i18NText("Registration Successful - Verify your email")
                        } catch (e) {
                            cc.log(e.message);
                            this.wText.active = true;
                            this.wText.getComponent(ChimpleLabel).string = Util.i18NText("Registration Failed")
                            this.hideLoading();
                            this.showNext();
                        }
                    }
                    break;
                case Mode.Login:
                    await this.parseLogin(selectedItem.node, selectedItem.email,
                        selectedItem.password);
                    break;
            }
        });
    }

    private async parseLogin(node: cc.Node, email: string, password: string) {
        this.showLoading();
        await ParseApi.getInstance().loginUser(email, password);
        ParseNetwork.getInstance().storeIntoCache(TEACHER_EMAIL, email);
        ParseNetwork.getInstance().storeIntoCache(TEACHER_PASSWORD, password);
        ParseNetwork.getInstance().storeIntoCache(LOGIN_TYPE, String(LoginType.Teacher));
        const teacherUser: ParseUser = ParseApi.getInstance().getLoggedInUser();
        if (!ParseNetwork.getInstance().isEmpty(teacherUser)) {
            const nextScene = SELECT_SECTIONS_SCENE;
            // @ts-ignore
            nextSelectMode = SelectionMode.Section;
            this.hideLoading();
            await Profile.teacherPostLoginActivity(teacherUser.objectId);
            Config.loadScene(nextScene, 'private', null);
        } else {
            node.getComponent(cc.Button).interactable = true;
            this.hideLoading();
            ParseNetwork.getInstance().removeFromCache(TEACHER_EMAIL);
            ParseNetwork.getInstance().removeFromCache(TEACHER_PASSWORD);
            this.showNext();
            this.wText.active = true;
            this.wText.getComponent(ChimpleLabel).string = Util.i18NText("Login Failed!!!")
        }
    }

    private showNext() {
        const loginButtonComponent: LoginButton = this.loginButton.getComponent(LoginButton);
        let shouldShowActive: boolean = false;
        if (this.mode === Mode.Login) {
            loginButtonComponent.email(this.email);
            loginButtonComponent.password(this.password);
            shouldShowActive = !!this.email && !!this.password ? true : false;
        } else {
            loginButtonComponent.email(this.email);
            loginButtonComponent.password(this.password);
            loginButtonComponent.fullName(this.fullName);
            shouldShowActive = !!this.email && !!this.password && !!this.fullName
            && this.confirmPassword && this.password === this.confirmPassword ? true : false;
        }
        shouldShowActive ? loginButtonComponent.activate() : loginButtonComponent.deActivate();
    }

    private renderEmailBox(): cc.Node {
        this.emailEditBox = cc.instantiate(this.customEditBoxPrefab);
        const base: cc.Node = this.emailEditBox.getChildByName('base');
        const editBoxComponent: cc.EditBox = base.getComponent(cc.EditBox);
        editBoxComponent.maxLength = EMAIL_LENGTH;
        this.emailEditBox.name = EditOptions.EmailChanged;
        const chimpleLabel = this.getChimpleLabel(this.emailEditBox);
        chimpleLabel != null ? chimpleLabel.string = EMAIL_PLACEHOLDER : '';
        return this.emailEditBox;
    }

    private renderFullNameBox(): cc.Node {
        this.fullNameEditBox = cc.instantiate(this.customEditBoxPrefab);
        const base: cc.Node = this.fullNameEditBox.getChildByName('base');
        const editBoxComponent: cc.EditBox = base.getComponent(cc.EditBox);
        editBoxComponent.maxLength = EMAIL_LENGTH;
        this.fullNameEditBox.name = EditOptions.FullNameChanged;
        const chimpleLabel = this.getChimpleLabel(this.fullNameEditBox);
        chimpleLabel != null ? chimpleLabel.string = FULL_NAME_PLACEHOLDER : '';
        return this.fullNameEditBox;
    }


    private renderPasswordBox(placeHolder: string): cc.Node {
        this.passwordEditBox = cc.instantiate(this.customEditBoxPrefab);
        this.passwordEditBox.name = EditOptions.PasswordChanged;
        const baseNode = this.passwordEditBox.getChildByName('base');
        baseNode.getComponent(cc.EditBox).inputFlag = EditBox.InputFlag.PASSWORD;
        const chimpleLabel = this.getChimpleLabel(this.passwordEditBox);
        chimpleLabel != null ? chimpleLabel.string = placeHolder : '';
        return this.passwordEditBox;
    }

    private renderConfirmPasswordBox(placeHolder: string): cc.Node {
        this.confirmPasswordEditBox = cc.instantiate(this.customEditBoxPrefab);
        this.confirmPasswordEditBox.name = EditOptions.ConfirmPasswordChanged;
        const baseNode = this.confirmPasswordEditBox.getChildByName('base');
        baseNode.getComponent(cc.EditBox).inputFlag = EditBox.InputFlag.PASSWORD;
        const chimpleLabel = this.getChimpleLabel(this.confirmPasswordEditBox);
        chimpleLabel != null ? chimpleLabel.string = placeHolder : '';
        return this.confirmPasswordEditBox;
    }

    private getChimpleLabel(parent: cc.Node): ChimpleLabel {
        let chimpleLabelComponent = null;
        const placeHolderLabel = parent.getChildByName('PLACEHOLDER_LABEL');
        if (placeHolderLabel != null) {
            chimpleLabelComponent = placeHolderLabel.getComponent(ChimpleLabel);
        }

        return chimpleLabelComponent;
    }

    async onSwitchMode(event) {
        if (this.mode === Mode.Login) {
            this.mode = Mode.Register;
        } else {
            this.mode = Mode.Login;
        }
        await this.renderUI();
        this.showNext();
        this.wText.active = false;
    }

}