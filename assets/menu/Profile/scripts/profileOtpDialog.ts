import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../common/scripts/util";
import Profile, { CONTACT, CURRENTMODE, DIALING_CODE, User } from "../../../common/scripts/lib/profile";
import { ServiceConfig } from "../../../common/scripts/services/ServiceConfig";
import UtilLogger from "../../../common/scripts/util-logger";
import { CustomAuthInfo } from "../../../common/scripts/services/ServiceApi";
import catchError from "../../../common/scripts/lib/error-handler";
import { Mode, School, } from "../../../common/scripts/lib/constants";

//@ts-ignore
cc.loginSucceeded = async function (schoolInfo: string) {

    try {
        cc.sys.localStorage.setItem("loginUser", ProfileOtpDialog.customAuthInfo.email)
        cc.sys.localStorage.setItem("loginPassword", ProfileOtpDialog.otpCode)
        cc.log("loginSucceeded: " + schoolInfo);
        if (!!schoolInfo) {
            const school: School = JSON.parse(schoolInfo);
            cc.sys.localStorage.setItem('SCHOOL_USER', ProfileOtpDialog.customAuthInfo.schoolId);
            cc.sys.localStorage.setItem('SCHOOL_CODE', school.schoolCode);
            Profile.setItem(CURRENTMODE, Mode.HomeConnect);
            UtilLogger.processNewLinkStudent(ProfileOtpDialog.customAuthInfo, ProfileOtpDialog.otpCode);
            const s = ProfileOtpDialog.customAuthInfo.schoolName ? ProfileOtpDialog.customAuthInfo.schoolName : '';
            const sec = ProfileOtpDialog.customAuthInfo.sectionName ? ProfileOtpDialog.customAuthInfo.sectionName : '';
            ProfileOtpDialog.newParentNode.getComponentInChildren(cc.Label).string = Util.i18NText("Connected");
            ProfileOtpDialog.newParentNode.node.color = new cc.Color(240, 88, 34);
            if (s) {
                ProfileOtpDialog.newSchoolName.getComponent(cc.Label).string = Util.i18NText("School") + " : " + s
            }
            if (sec) {
                ProfileOtpDialog.newClassName.getComponent(cc.Label).string = Util.i18NText("Class  :") + " " + sec
            }
            ProfileOtpDialog.newParentNode.interactable = false;
            ProfileOtpDialog.newNode.active = false;
        }
        else {
            ProfileOtpDialog.showError("code is invalid or expired")
        }
    } catch (error) {
        ProfileOtpDialog.showError("code is invalid or expired")

    }
}

//@ts-ignore
cc.loginFailed = async function (reason) {
    ProfileOtpDialog.showError("code is invalid or expired")
    cc.log("loginFailed in otp: " + reason);
}

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

    static customAuthInfo: CustomAuthInfo;
    static newconfirmBtn: cc.Button;
    static newErrLabel: cc.Label;
    static otpCode: string;
    static newParentNode: cc.Button;
    static newSchoolName: cc.Node;
    static newClassName: cc.Node;
    static newNode: cc.Node;

    constructor() {
        super();
    }
    @catchError()
    protected onLoad() {
        this.title.string = Util.i18NText("Ask your teacher for the class code and enter it there");
        this.editBox.string = "";
        ProfileOtpDialog.newconfirmBtn = this.confirmBtn;
        ProfileOtpDialog.newErrLabel = this.errLabel;
        ProfileOtpDialog.newconfirmBtn.interactable = false;
        ProfileOtpDialog.newClassName = this.className;
        ProfileOtpDialog.newParentNode = this.parentNode;
        ProfileOtpDialog.newSchoolName = this.schoolName;
        ProfileOtpDialog.newNode = this.node;
        this.btnLabel.string = Util.i18NText("Confirm");
        this.editBox.placeholder = Util.i18NText("Enter the 6-digit OTP here...");
        ProfileOtpDialog.newErrLabel.string = "";
        this.editBox.enabled = true;
    }

    onEditingBegan() {
        this.editBox.placeholderLabel.string = "";
    }

    onTextChanged() {
        let otp = this.editBox.string;
        if (otp.length === 6) {
            ProfileOtpDialog.newconfirmBtn.interactable = true;
        } else {
            ProfileOtpDialog.newconfirmBtn.interactable = false;
        }
    }

    onOtpClose() {
        this.node.active = false;
    }

    async onSendLinkStudentRequest() {
        const studentId: string = User.getCurrentUser().id;
        ProfileOtpDialog.otpCode = this.editBox.string;
        const user = User.getCurrentUser();
        const dial_code = !!Profile.getValue(DIALING_CODE) ? Profile.getValue(DIALING_CODE) : null;
        const phoneNumber = !!Profile.getValue(CONTACT) ? Profile.getValue(CONTACT).substring(dial_code.length) : null;
        if (!!studentId && !!ProfileOtpDialog.otpCode) {
            ProfileOtpDialog.newconfirmBtn.interactable = false;
            ProfileOtpDialog.newErrLabel.string = "";
            // send request
            try {
                cc.log('getting custom auth...', ProfileOtpDialog.otpCode, phoneNumber, dial_code, studentId)
                ProfileOtpDialog.customAuthInfo = await ServiceConfig.getI().handle.customAuth(ProfileOtpDialog.otpCode, phoneNumber, dial_code, studentId);
                cc.log('custom auth', ProfileOtpDialog.customAuthInfo);
                this.login(ProfileOtpDialog.customAuthInfo.email, ProfileOtpDialog.otpCode);
            } catch (e) {
                cc.log('error', e);
                ProfileOtpDialog.showError("code is invalid or expired")
            }
        }
    }
    static showError(error: string) {
        ProfileOtpDialog.newErrLabel.string = error;
        ProfileOtpDialog.newconfirmBtn.interactable = true;
    }
    private async login(email: string, password: string) {
        if (UtilLogger.isNetworkAvailable()) {
            UtilLogger.login(email, password);
        }
        else {
            ProfileOtpDialog.showError("code is invalid or expired")
            cc.log('web is not supported')
        }
    }
}