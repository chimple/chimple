import ccclass = cc._decorator.ccclass;
import AudioSource = cc.AudioSource;

export const PARSE_LOGIN_EVENT = 'parseLoginEvent';

export interface LoginData {
    node: cc.Node;
    code: string;
    password: string;
}

@ccclass
export class NextButton extends cc.Component {
    private _code: string;
    private _password: string;

    constructor() {
        super();
    }


    async onNextButtonClick() {
        const nextButtonComponent = this.node.getComponent(cc.Button);
        if (nextButtonComponent != null) {
            nextButtonComponent.interactable = false;
        }
        this.startParseLoginEvent();
    }

    private playSound() {
        let source: AudioSource = this.node.getComponent(cc.AudioSource);
        source.play();
    }

    set schoolCode(code: string) {
        this._code = code;
    }

    set password(password: string) {
        this._password = password;
    }

    private startParseLoginEvent(): void {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(PARSE_LOGIN_EVENT, true);
        const selectedData: LoginData = {
            node: this.node,
            code: this._code,
            password: this._password
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
        this.node.active = false;
    }

    public activate() {
        this.node.active = true;
    }

    public deActivate() {
        this.node.active = false;
    }
}