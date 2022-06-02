import Profile, { CONTACT, IS_OTP_VERIFIED } from "../../../../common/scripts/lib/profile";
import { Util } from "../../../../common/scripts/util";
import UtilLogger from "../../../../common/scripts/util-logger";
import SecondScreen from "./secondscreen";

export enum OtpStatus {
    VERIFIED, VERIFYING, NOT_VERIFIED, OTP_RESEND
}
const { ccclass, property } = cc._decorator;

//@ts-ignore
cc.phoneVerificationSucceeded = async function (id, otp) {
    cc.log("phoneVerificationSucceeded");
    await Profile.setItem(IS_OTP_VERIFIED, 1);
}

//@ts-ignore
cc.phoneVerificationFailed = function () {
    Profile.setItem(IS_OTP_VERIFIED, -1);
}

@ccclass
export default class OtpVerifier extends cc.Component {

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    @property(cc.Button)
    confirmBtn: cc.Button = null;

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Label)
    btnLabel: cc.Label = null;

    @property(cc.Label)
    errLabel: cc.Label = null;

    otpStatus: OtpStatus = OtpStatus.NOT_VERIFIED;

    onEnable() {
        this.title.string = Util.i18NText("We sent an OTP to verify your number.");
        this.editBox.string = "";
        this.confirmBtn.interactable = false;
        this.btnLabel.string = Util.i18NText("Confirm");
        this.editBox.placeholder = Util.i18NText("Enter the 6-digit otp here...");
        this.errLabel.string = "";
        this.editBox.enabled = true;
    }

    onClose() {
        this.node.active = false;
        this.unscheduleAllCallbacks();
    }

    onEditingBegan() {
        this.editBox.placeholderLabel.string = "";
    }

    onTextChanged() {
        let otp = this.editBox.string;
        if (otp.length === 6) {
            this.confirmBtn.interactable = true;
        }
        else {
            this.confirmBtn.interactable = false;
        }
    }

    onEnterOtp() {
        if (this.otpStatus === OtpStatus.OTP_RESEND) {
            UtilLogger.requestOtp(Profile.getValue(CONTACT));
            this.otpStatus = OtpStatus.NOT_VERIFIED;
            this.btnLabel.string = Util.i18NText('Confirm');
            this.confirmBtn.interactable = false;
            this.errLabel.string = "";
            this.editBox.string = "";
        }
        else {
            let otp = this.editBox.string;
            UtilLogger.verifyOtp(otp);
            this.otpStatus = OtpStatus.VERIFYING;
            this.setOtpStatus();
        }
    }

    setOtpStatus() {
        cc.log("setOtp ", this.otpStatus)
        if (this.otpStatus === OtpStatus.VERIFIED) {
            this.node.active = false;
            this.node.parent.getComponent(SecondScreen).setContactVerifiedStatus();
        }
        else if (this.otpStatus === OtpStatus.NOT_VERIFIED) {
            this.errLabel.string = Util.i18NText("Cannot verify OTP");
            this.btnLabel.string = Util.i18NText("Resend OTP");
            this.otpStatus = OtpStatus.OTP_RESEND;
            this.editBox.enabled = true;
        }
        else if (this.otpStatus === OtpStatus.VERIFYING) {
            this.btnLabel.string = Util.i18NText("verifying...");
            this.editBox.enabled = false;
            let checkCount = 20;
            let result = 0;

            let callback = () => {
                result = Profile.getItem(IS_OTP_VERIFIED);
                cc.log("checking ", checkCount, result)
                if (checkCount < 1 || result === 1 || result === -1) {
                    this.unschedule(callback);
                    if (result === 1) {
                        this.otpStatus = OtpStatus.VERIFIED;
                        this.setOtpStatus();
                    }
                    else {
                        this.otpStatus = OtpStatus.NOT_VERIFIED;
                        this.setOtpStatus();
                    }
                }
                checkCount--;
            }
            this.schedule(callback, 3);
        };
    }
}
