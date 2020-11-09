import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {User} from "./lib/profile";
import StudentPreviewInfo, {TEACHER_ADD_STUDENT_SELECTED} from "./studentPreviewInfo";
import ChimpleLabel from "./chimple-label";
import {Queue} from "../../queue";
import {ACCEPT_TEACHER_REQUEST, REJECT_TEACHER_REQUEST, TEACHER_ADDED} from "../../chimple";
import UtilLogger from "./util-logger";
import {ParseSchool} from "./domain/parseSchool";
import {ParseApi, UpdateHomeTeacher} from "./services/parseApi";
import {ServiceConfig} from "./services/ServiceConfig";
import {AcceptTeacherRequest} from "./services/ServiceApi";

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
            this.yesButton.active = true;
        });
        // get all Users
        this.users = User.getUsers();
        this.render();
    }

    private render() {
        this.yesButton.active = false;
        const chimpleLabel = this.text.getComponent(ChimpleLabel);
        chimpleLabel.string = 'Add Teacher ' + this._teacherName;
        const studentAdded = JSON.parse(cc.sys.localStorage.getItem(TEACHER_ADDED + this._teacherId) || '[]');
        this.users = this.users.filter(u => !studentAdded.includes(u.id))
        this.users.forEach(
            (user) => {
                const studentPreviewInfoNode: cc.Node = cc.instantiate(this.studentPreviewInfoPrefab);
                studentPreviewInfoNode.scale = 2;
                const script: StudentPreviewInfo = studentPreviewInfoNode.getComponent(StudentPreviewInfo);
                script.setUser(user);
                script.setParent(this.studentLayout);
                script.renderStudent();
                this.studentLayout.addChild(studentPreviewInfoNode);
            }
        )
    }

    async onYesClicked(event) {
        if (!!this._teacherId) {
            const request: AcceptTeacherRequest = {
                teacherId: this._teacherId,
                sectionId: this._teacherSectionId,
                studentId: this.selectedStudentId,
                studentName: this.selectedStudentName,
                firebaseStudentId: this._firebaseStudentId
            }
            await ServiceConfig.getI().handle.teacherRequestAccepted(request);
            const teachersAdded = JSON.parse(cc.sys.localStorage.getItem(TEACHER_ADDED + this._teacherId) || '[]');
            teachersAdded.push(this.selectedStudentId);

            const key = `teacher_for_student_${this.selectedStudentId}`;
            const teachersForStudent: string[] = JSON.parse(cc.sys.localStorage.getItem(key) || '[]');
            teachersForStudent.push(this._teacherName);
            cc.sys.localStorage.setItem(key, JSON.stringify(teachersForStudent));

            cc.sys.localStorage.setItem(TEACHER_ADDED + this._teacherId, JSON.stringify(teachersAdded));
            UtilLogger.logChimpleEvent(ACCEPT_TEACHER_REQUEST, request);
            try {
                const messages = cc.sys.localStorage.getItem(ACCEPT_TEACHER_REQUEST) || '[]';
                const jsonMessages: any[] = JSON.parse(messages);
                jsonMessages.push(this._teacherId);
                cc.sys.localStorage.setItem(ACCEPT_TEACHER_REQUEST, JSON.stringify(jsonMessages));
            } catch (e) {

            }
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