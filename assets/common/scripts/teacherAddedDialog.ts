import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {User} from "./lib/profile";
import StudentPreviewInfo, {TEACHER_ADD_STUDENT_SELECTED} from "./studentPreviewInfo";
import ChimpleLabel from "./chimple-label";
import {
    ACCEPT_TEACHER_REQUEST,
    ACCEPT_TEACHER_REQUEST_LINKED_USED,
    REJECT_TEACHER_REQUEST,
    TEACHER_ADDED
} from "../../chimple";
import UtilLogger from "./util-logger";
import {UpdateHomeTeacher} from "./services/parseApi";
import {ServiceConfig} from "./services/ServiceConfig";
import {AcceptTeacherRequest} from "./services/ServiceApi";
import {Util} from "./util";


export const TEACHER_ADD_DIALOG_CLOSED = 'TEACHER_ADD_DIALOG_CLOSED';
@ccclass
export default class TeacherAddedDialog extends cc.Component {
    @property(cc.Prefab)
    studentPreviewInfoPrefab: cc.Prefab = null

    @property(cc.Node)
    text: cc.Node = null;

    @property(cc.Node)
    yesButton: cc.Node = null;


    @property(cc.Node)
    studentLayout: cc.Node = null;

    users: User[];
    selectedStudentId: string;
    selectedStudentName: string;

    _firebaseStudentId: string;
    _teacherSectionId: string;
    _teacherId: string;
    _teacherName: string;

    protected onLoad() {
        this.node.on(TEACHER_ADD_STUDENT_SELECTED, async (event) => {
            event.stopPropagation();
            const item = event.getUserData();
            this.selectedStudentId = item.selectedStudent;
            this.selectedStudentName = item.studentName;
            this.yesButton.color = new cc.Color().fromHEX('#C0E52F');
            this.yesButton.active = true;
        });
        // get all Users
        this.users = User.getUsers();
        this.render();
    }

    private render() {
        const validUsers = [];
        const chimpleLabel = this.text.getComponent(ChimpleLabel);
        chimpleLabel.string = Util.i18NText("Add Teacher") + " " + this._teacherName;
        const len = this.users.length;

        const teachersAdded: AcceptTeacherRequest[] = JSON.parse(cc.sys.localStorage.getItem(TEACHER_ADDED) || '[]');
        this.users.forEach(u => {
            const t = teachersAdded.find(t => {
               return t.teacherId === this._teacherId && t.sectionId === this._teacherSectionId && t.studentId === u.id                
            })
            if(!t) {
                validUsers.push(u);
            }            
        })

        validUsers.forEach(
            (user) => {
                const studentPreviewInfoNode: cc.Node = cc.instantiate(this.studentPreviewInfoPrefab);
                studentPreviewInfoNode.scale = 2;
                const script: StudentPreviewInfo = studentPreviewInfoNode.getComponent(StudentPreviewInfo);
                script.setUser(user);
                script.setParent(this.studentLayout);
                script.renderStudent();
                this.studentLayout.addChild(studentPreviewInfoNode);
                if (len === 1) {
                    script.generateEvent();
                }
            }
        )
        if (validUsers.length > 1) {
            this.yesButton.color = new cc.Color().fromHEX('#6A6D5D');
            this.yesButton.active = true;
        }
    }

    async onYesClicked(event) {
        if (!!this._teacherId && !!this.selectedStudentId) {
            const request: AcceptTeacherRequest = {
                teacherId: this._teacherId,
                sectionId: this._teacherSectionId,
                studentId: this.selectedStudentId,
                studentName: this.selectedStudentName,
                firebaseStudentId: this._firebaseStudentId
            }
            await ServiceConfig.getI().handle.teacherRequestAccepted(request);

            const teachersAdded: AcceptTeacherRequest[] = JSON.parse(cc.sys.localStorage.getItem(TEACHER_ADDED) || '[]');
            teachersAdded.push(request);
            cc.sys.localStorage.setItem(TEACHER_ADDED, JSON.stringify(teachersAdded));

            if (teachersAdded && teachersAdded.length > 0) {
                teachersAdded.forEach(
                    t => UtilLogger.logChimpleEvent(TEACHER_ADDED, t)
                )
            };

            UtilLogger.logChimpleEvent(ACCEPT_TEACHER_REQUEST, request);

            const tKey = ACCEPT_TEACHER_REQUEST_LINKED_USED + this._teacherId;
            const teacherRequestsAccepted = JSON.parse(cc.sys.localStorage.getItem(tKey) || '[]');
            teacherRequestsAccepted.push(this._teacherId + '|' + this._teacherSectionId + '|' + this._firebaseStudentId);
            cc.sys.localStorage.setItem(tKey, JSON.stringify(teacherRequestsAccepted));

            const key = `teacher_for_student_${this.selectedStudentId}`;
            const teachersForStudent: string[] = JSON.parse(cc.sys.localStorage.getItem(key) || '[]');
            teachersForStudent.push(this._teacherName);
            cc.sys.localStorage.setItem(key, JSON.stringify(teachersForStudent));
        }

        this.closeDialog();

    }

    closeDialog() {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(TEACHER_ADD_DIALOG_CLOSED, true);
        this.node.dispatchEvent(customEvent);
        this.scheduleOnce(() => {
            this.node.removeFromParent(true);
        }, 0.25)
    }

    onNoClicked(event) {
        let updateHomeTeacherInfo: UpdateHomeTeacher = {
            homeId: this.selectedStudentId,
            teacherId: this._teacherId,
            firebaseStudentId: this._firebaseStudentId,
            kind: "UpdateHomeTeacher",
            studentName: this.selectedStudentName
        };
        UtilLogger.logChimpleEvent(REJECT_TEACHER_REQUEST, updateHomeTeacherInfo);
        this.closeDialog();
    }

    set TeacherId(_teacherId: string) {
        this._teacherId = _teacherId;
    }

    set TeacherName(_name: string) {
        this._teacherName = _name;
    }

    set SelectedSectionId(_id: string) {
        this._teacherSectionId = _id;
    }

    set SelectedAddStudentId(_id: string) {
        this._firebaseStudentId = _id;
    }

}