import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {CustomEditBoxData, EDIT_ENDED_EVENT} from "../../school/scripts/customEditBox";
import UtilLogger from "../../../common/scripts/util-logger";
import Profile, {User} from "../../../common/scripts/lib/profile";
import {ParseApi} from "../../../common/scripts/services/parseApi";
import Config from "../../../common/scripts/lib/config";
import {SELECT_SECTIONS_SCENE} from "../../school/scripts/landing";


let handler = null;

//@ts-ignore
// cc.phoneVerificationSucceeded = async function (verificationId, otp) {
//     cc.log("phoneVerificationSucceeded");
//     await handler.verifyRegistration(verificationId, otp)
// };
//
// //@ts-ignore
// cc.phoneVerificationFailed = function () {
//     cc.log("phoneVerificationFailed");
// };


export enum EditOptions {
    RequestOtpChanged = "0",
    VerifyOtpChanged = "1",
    PasswordChanged = "2"
}


@ccclass
export class TeacherOtpRegistration extends cc.Component {

    @property(cc.Node)
    requestOtpEditBox: cc.Node = null;

    @property(cc.Node)
    passwordEditBox: cc.Node = null;

    @property(cc.Node)
    verifyOtpEditBox: cc.Node = null;

    @property(cc.Node)
    requestOtpText: cc.Node = null;

    @property(cc.Node)
    verifyOtpText: cc.Node = null;

    @property(cc.Node)
    requestOtp: cc.Node = null;

    @property(cc.Node)
    verifyOtp: cc.Node = null;

    @property(cc.Node)
    wText: cc.Node = null;

    passwordUserText: string;
    requestOtpUserText: string = null;
    verifyOtpUserText: string = null;

    protected onLoad() {
        handler = this;
        this.verifyOtpEditBox.active = false;
        this.verifyOtp.active = false;
        this.requestOtp.active = false;
        this.wText.active = false
        this.requestOtpEditBox.name = EditOptions.RequestOtpChanged;
        this.verifyOtpEditBox.name = EditOptions.VerifyOtpChanged;
        this.passwordEditBox.name = EditOptions.PasswordChanged;
        this.registerEditBoxCustomEvent();
    }


    onRequestOtpClicked(event) {
        if (this.requestOtpUserText && this.requestOtpUserText.length > 0) {
            UtilLogger.requestOtp(this.requestOtpUserText);
            if(this.passwordUserText != null) {
                this.verifyOtpEditBox.active = true;
                this.verifyOtp.active = true;
            }
        }
    }


    onVerifyOtpClicked(event) {
        if (this.verifyOtpUserText && this.verifyOtpUserText.length > 0) {
            UtilLogger.verifyOtp(this.verifyOtpUserText);
        }
    }

    private registerEditBoxCustomEvent() {
        this.node.on(EDIT_ENDED_EVENT, (event) => {
            event.stopPropagation();
            const data: CustomEditBoxData = event.getUserData() as CustomEditBoxData;
            switch (data.detectParent) {
                case EditOptions.RequestOtpChanged:
                    this.requestOtpUserText = data.text;
                    cc.log(this.requestOtpUserText)
                    if (this.requestOtpUserText !== null) {
                        this.verifyOtpEditBox.active = false;
                        this.verifyOtp.active = false;
                    }
                    this.showRequestOtp()
                    break;
                case EditOptions.PasswordChanged:
                    this.passwordUserText = data.text;
                    cc.log(this.passwordUserText)
                    this.showRequestOtp()
                    break;
                case EditOptions.VerifyOtpChanged:
                    this.verifyOtpUserText = data.text;
                    cc.log(this.verifyOtpUserText)
                    break;
            }
        });
    }

    showRequestOtp() {
        if(this.passwordUserText != null && this.requestOtpUserText != null &&
            this.requestOtpUserText.length > 0 && this.passwordUserText.length > 0) {
            this.requestOtp.active= true;
        } else {
            this.requestOtp.active = false;
        }
    }

    async verifyRegistration(verificationId, code) {
        const currentUser: User = await Profile.teacherPostLoginActivity(null);
        const pNumber = this.requestOtpUserText.replace('+','');
        try {
            await ParseApi.getInstance().signUpTestUser({
                phoneNumber: pNumber,
                username: currentUser.id,
                password: this.passwordUserText,
                verficationId: verificationId,
                code: code
            });
        } catch (e) {
            cc.log(e)
        }

        Config.loadScene(SELECT_SECTIONS_SCENE, 'private', null);
    }
}