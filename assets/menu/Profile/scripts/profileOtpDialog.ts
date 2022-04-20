import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../common/scripts/util";
import Profile, { CONTACT, DIALING_CODE, User } from "../../../common/scripts/lib/profile";
import { ServiceConfig } from "../../../common/scripts/services/ServiceConfig";
import UtilLogger from "../../../common/scripts/util-logger";

@ccclass
export default class ProfileOtpDialog extends cc.Component {
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

    @property(cc.Button)
    parentNode: cc.Button = null;

    @property(cc.Node)
    schoolName: cc.Node = null;

    @property(cc.Node)
    className: cc.Node = null;

    protected onLoad() {
        this.title.string = Util.i18NText("We sent an OTP to verify your number.");
        this.editBox.string = "";
        this.confirmBtn.interactable = false;
        this.btnLabel.string = Util.i18NText("Confirm");
        this.editBox.placeholder = Util.i18NText("Enter the 6-digit otp here...");
        this.errLabel.string = "";
        this.editBox.enabled = true;
    }

    onEditingBegan() {
        this.editBox.placeholderLabel.string = "";
    }

    onTextChanged() {
        let otp = this.editBox.string;
        if (otp.length === 6) {
            this.confirmBtn.interactable = true;
        } else {
            this.confirmBtn.interactable = false;
        }
    }

    onOtpClose() {
        this.node.active = false;
    }

    async onSendLinkStudentRequest() {
        const studentId: string = User.getCurrentUser().id;
        const otpCode: string = this.editBox.string;
        const user = User.getCurrentUser();
        const dial_code = !!Profile.getValue(DIALING_CODE) ? Profile.getValue(DIALING_CODE) : null;
        const phoneNumber = !!Profile.getValue(CONTACT) ? Profile.getValue(CONTACT).substring(dial_code.length) : null;
        if (!!studentId && !!otpCode) {
            this.confirmBtn.interactable = false;
            this.errLabel.string = "";

            // send request
            try {
                const response = await ServiceConfig.getI().handle.linkStudent(studentId, otpCode, phoneNumber, user.age, user.name, dial_code);
                if (response && response.ok) {
                    UtilLogger.processLinkStudent(
                        response.data.sectionId,
                        response.data.schoolId,
                        response.data.studentId,
                        response.data.schoolName,
                        response.data.sectionName,
                        response.data.progressId,
                        otpCode,
                        response.data.profile);
                    const s = response.data.schoolName ? response.data.schoolName : '';
                    const sec = response.data.sectionName ? response.data.sectionName : '';
                    this.parentNode.getComponentInChildren(cc.Label).string = "Connected";
                    this.parentNode.node.color = new cc.Color(240, 88, 34);

                    if (s) {
                        this.schoolName.getComponent(cc.Label).string = "School: " + s
                    }
                    if (sec) {
                        this.className.getComponent(cc.Label).string = "Class: " + sec
                    }
                    this.parentNode.interactable = false;
                    this.onOtpClose();
                }
            } catch (e) {
                this.errLabel.string = "code is invalid or expired";
                this.confirmBtn.interactable = true;
            }
        }
    }
}