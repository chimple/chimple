import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

export const PARSE_LOGIN_EVENT = 'parseLoginEvent';

export interface LoginData {
    node?: cc.Node;
    email?: string;
    password?: string;
    fullName?: string;
}

@ccclass
export class LoginButton extends cc.Component {
    private _email: string;
    private _password: string;
    private _fullName: string;

    @property(cc.Node)
    text: cc.Node = null;

    constructor() {
        super();
    }

    protected onLoad() {
        const loginButtonComponent = this.node.getComponent(cc.Button);
        if (loginButtonComponent != null) {
            loginButtonComponent.interactable = false;
        }
        this.node.active = false;
    }

    async onLoginButtonClick() {
        const loginButtonComponent = this.node.getComponent(cc.Button);
        if (loginButtonComponent != null) {
            loginButtonComponent.interactable = false;
        }

        this.startParseLoginEvent();
    }

    set confirmPassword(f: string) {
        this._fullName = f;
    }

    fullName(f: string) {
        this._fullName = f;
    }

    email(e: string) {
        this._email = e;
    }

    password(password: string) {
        this._password = password;
    }

    private startParseLoginEvent(): void {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(PARSE_LOGIN_EVENT, true);
        const selectedData: LoginData = {
            node: this.node,
            email: this._email,
            password: this._password,
            fullName: this._fullName
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
        this.node.active = false;
    }

    public activate() {
        const loginButtonComponent = this.node.getComponent(cc.Button);
        loginButtonComponent.interactable = true;
        this.node.active = true;
    }

    public deActivate() {
        const loginButtonComponent = this.node.getComponent(cc.Button);
        loginButtonComponent.interactable = false;
        this.node.active = false;
    }
}