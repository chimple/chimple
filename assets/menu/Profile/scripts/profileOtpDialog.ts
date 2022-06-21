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
            ProfileOtpDialog.onLoginSuccess();
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
    try {
        cc.log("ProfileOtpDialog loginfailed ", reason);
        UtilLogger.processLoginFail();
        ProfileOtpDialog?.showError("code is invalid or expired")
    } catch (error) {
        cc.log('error in profileotp login failed', error)
    }
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

    @property(cc.EditBox)
    contactEditBox: cc.EditBox = null;

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;

    static customAuthInfo: CustomAuthInfo;
    static newconfirmBtn: cc.Button;
    static newErrLabel: cc.Label;
    static otpCode: string;
    static newParentNode: cc.Button;
    static newSchoolName: cc.Node;
    static newClassName: cc.Node;
    static newNode: cc.Node;
    static loading: cc.Node = null;
    static node: cc.Node;

    dialingCode: string;
    oldSchoolId: string;

    constructor() {
        super();
    }
    @catchError()
    protected onLoad() {
        ProfileOtpDialog.node = this.node;
        ProfileOtpDialog.newconfirmBtn = this.confirmBtn;
        ProfileOtpDialog.newErrLabel = this.errLabel;
        ProfileOtpDialog.newconfirmBtn.interactable = false;
        ProfileOtpDialog.newClassName = this.className;
        ProfileOtpDialog.newParentNode = this.parentNode;
        ProfileOtpDialog.newSchoolName = this.schoolName;
        ProfileOtpDialog.newNode = this.node;
        this.createLoading()
        this.setDefaultText()
        this.editBox.enabled = true;
        this.editBox.string = "";
        this.dialingCode = Profile.getValue(DIALING_CODE) ?? "+91";
        let contact = Profile.getValue(CONTACT);
        if (contact) {
            contact = contact.substring(this.dialingCode.length);
            this.contactEditBox.string = contact;
        }
    }

    onEditingBegan() {
        this.editBox.placeholderLabel.string = "";
    }

    onPhoneEditBegan() {
        this.contactEditBox.placeholderLabel.string = "";
    }
    setDefaultText() {
        this.title.string = Util.i18NText("Please enter the details shared by your teacher below:");
        this.btnLabel.string = Util.i18NText("Confirm");
        this.editBox.placeholder = Util.i18NText("Enter the class code here");
        this.contactEditBox.placeholder = Util.i18NText("Enter Student ID here");
        ProfileOtpDialog.newErrLabel.string = "";
    }


    onTextChanged() {
        const otp = this.editBox.string;
        const phoneNumber = this.contactEditBox.string;
        if (otp.length === 6 && phoneNumber.length > 3) {
            ProfileOtpDialog.newconfirmBtn.interactable = true;
        } else {
            ProfileOtpDialog.newconfirmBtn.interactable = false;
        }
    }

    onOtpClose() {
        this.node.active = false;
        this.setDefaultText()
        ProfileOtpDialog?.hideLoading();
    }

    private createLoading() {
        ProfileOtpDialog.loading = cc.instantiate(this.loadingPrefab);
        ProfileOtpDialog.loading.zIndex = 3;
        ProfileOtpDialog.node.addChild(ProfileOtpDialog.loading);
        ProfileOtpDialog.loading.active = false;
    }
    private showLoading() {
        ProfileOtpDialog.loading.active = true;
        ProfileOtpDialog.node.parent.getChildByName('block').active = true;
    }

    static hideLoading() {
        ProfileOtpDialog.loading.active = false;
        ProfileOtpDialog.node.parent.getChildByName('block').active = false;
    }

    async onSendLinkStudentRequest() {
        const user: User = User.getCurrentUser();
        const studentId: string = user.id;
        ProfileOtpDialog.otpCode = this.editBox.string;
        // const dial_code = this.dialingCodeLabel.string;
        const phoneNumber = this.contactEditBox.string;
        if (!!studentId && !!ProfileOtpDialog.otpCode) {
            ProfileOtpDialog.newconfirmBtn.interactable = false;
            ProfileOtpDialog.newErrLabel.string = "";
            // send request
            this.showLoading();
            try {
                const isSecondProfile = this.isSecondConnectedProfile();
                cc.log('getting custom auth...', ProfileOtpDialog.otpCode, phoneNumber, studentId)
                ProfileOtpDialog.customAuthInfo = await ServiceConfig.getI().handle.customAuth(ProfileOtpDialog.otpCode, phoneNumber, studentId, isSecondProfile, this.oldSchoolId, user.name, Profile.getValue(DIALING_CODE), user.age, user.gender);
                cc.log('custom auth', ProfileOtpDialog.customAuthInfo);
                if (isSecondProfile) {
                    ProfileOtpDialog.onLoginSuccess();
                } else {
                    this.login(ProfileOtpDialog.customAuthInfo.email, ProfileOtpDialog.otpCode);
                }
            } catch (e) {
                let errCode;
                try {
                    const errJson = JSON.parse(e.message);
                    errCode = errJson.message
                } catch (err) {
                }
                cc.log('error.toString()', errCode);
                let errorMessage = "Something Went Wrong, Please Try Again";
                if (!!errCode) {
                    switch (errCode) {
                        case "invalid-code":
                            errorMessage = "Class code is invalid or expired";
                            break;
                        case "invalid-phone-number":
                            errorMessage = "Invalid Student ID";
                            break;
                        case "phone-number-already-used":
                            errorMessage = "Student ID is already used"
                            break;
                        default:
                            errorMessage = "Something Went Wrong, Please Try Again"
                            break;
                    }
                }

                ProfileOtpDialog.showError(errorMessage)
            }
        }
    }
    static showError(error: string) {
        try {
            ProfileOtpDialog?.hideLoading();
            if (!!ProfileOtpDialog.newErrLabel) {
                ProfileOtpDialog.newErrLabel.string = Util?.i18NText(error);
            }
            if (!!ProfileOtpDialog.newconfirmBtn) {
                ProfileOtpDialog.newconfirmBtn.interactable = true;
            }
        } catch (error) {
            cc.log("error", error);
        }
    }
    private async login(email: string, password: string) {
        if (UtilLogger.isNetworkAvailable()) {
            UtilLogger.login(email, password);
        }
        else {
            ProfileOtpDialog.showError("Something Went Wrong, Please Try Again")
            cc.log('web is not supported')
        }
    }
    private isSecondConnectedProfile(): boolean {
        if (User.getUsers().length <= 1) {
            return false;
        }
        for (const usr of User.getUsers()) {
            if (usr.isConnected && !!usr.schoolId && !!usr.studentId) {
                this.oldSchoolId = usr.schoolId;
                return true;
            }
        }
        return false
    }

    static onLoginSuccess() {
        try {
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
            ProfileOtpDialog.hideLoading();
            ProfileOtpDialog.newParentNode.interactable = false;
            ProfileOtpDialog.newNode.active = false;
        } catch (error) {
            ProfileOtpDialog.showError("code is invalid or expired")

        }
    }
}