import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {Util} from "../../../common/scripts/util";
import {User} from "../../../common/scripts/lib/profile";
import {ServiceConfig} from "../../../common/scripts/services/ServiceConfig";
import {AcceptTeacherRequest} from "../../../common/scripts/services/ServiceApi";
import UtilLogger from "../../../common/scripts/util-logger";
import {ACCEPT_TEACHER_REQUEST} from "../../../chimple";


@ccclass
export default class OtpDialog extends cc.Component {
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
        if (!!studentId && !!otpCode) {
            this.confirmBtn.interactable = false;
            this.errLabel.string = "";

            // send request
            try {
                const response = await ServiceConfig.getI().handle.linkStudent(studentId, otpCode);
                console.log(response);
                if (response && response.ok) {
                    const user = User.getCurrentUser();
                    user.sectionId = response.data.sectionId;
                    user.schoolId = response.data.schoolId;
                    user.studentId = response.data.studentId;
                    const request: AcceptTeacherRequest = {
                        teacherId: user.schoolId,
                        sectionId: user.sectionId,
                        studentId: user.id,
                        studentName: user.name,
                        firebaseStudentId: user.studentId
                    }
                    UtilLogger.subscribeToTopic(`assignment-${user.schoolId}-${user.sectionId}`)
                    UtilLogger.logChimpleEvent(ACCEPT_TEACHER_REQUEST, request);
                    this.onOtpClose();
                }
            } catch (e) {
                this.errLabel.string = "code is invalid or expired";
                this.confirmBtn.interactable = true;
            }
        }
    }
}