import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {User} from "./lib/profile";
import StudentPreviewInfo, {TEACHER_ADD_STUDENT_SELECTED} from "./studentPreviewInfo";
import ChimpleLabel from "./chimple-label";
import {Queue} from "../../queue";
import {UpdateHomeTeacher} from "../../private/services/parseApi";
import {ASSIGNED_TEACHERS, NO_ASSIGNED_TEACHERS} from "../../chimple";
import UtilLogger from "./util-logger";

export const TEACHER_ADD_DIALOG_CLOSED = 'TEACHER_ADD_DIALOG_CLOSED';
@ccclass
export default class TeacherAddedDialog extends cc.Component {
    @property(cc.Prefab)
    studentPreviewInfoPrefab: cc.Prefab = null

    @property(cc.Node)
    text: cc.Node = null;

    @property(cc.Node)
    studentLayout: cc.Node = null;

    users: User[];
    selectedStudentId: string;
    selectedStudentName: string;

    _teacherId: string;
    _teacherName: string;

    protected onLoad() {
        this.node.on(TEACHER_ADD_STUDENT_SELECTED, async (event) => {
            event.stopPropagation();
            const item = event.getUserData();
            this.selectedStudentId = item.selectedStudent;
            this.selectedStudentName = item.studentName;
        });
        // get all Users
        this.users = User.getUsers();
        this.render();
    }

    private render() {
        const chimpleLabel = this.text.getComponent(ChimpleLabel);
        chimpleLabel.string = 'Add Teacher ' + this._teacherName;
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

    onYesClicked(event) {
        if (!!this.selectedStudentId && this._teacherId) {
            let updateHomeTeacherInfo: UpdateHomeTeacher = {
                studentId: this.selectedStudentId,
                teacherId: this._teacherId,
                kind: "UpdateHomeTeacher",
                name: this.selectedStudentName
            };
            Queue.getInstance().push(updateHomeTeacherInfo);
            UtilLogger.logChimpleEvent(ASSIGNED_TEACHERS, updateHomeTeacherInfo);
            try {
                const messages = cc.sys.localStorage.getItem(ASSIGNED_TEACHERS) || '[]';
                const jsonMessages: any[] = JSON.parse(messages);
                jsonMessages.push(this._teacherId);
                cc.sys.localStorage.setItem(ASSIGNED_TEACHERS, JSON.stringify(jsonMessages));
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
            studentId: this.selectedStudentId,
            teacherId: this._teacherId,
            kind: "UpdateHomeTeacher",
            name: this.selectedStudentName
        };
        UtilLogger.logChimpleEvent(NO_ASSIGNED_TEACHERS, updateHomeTeacherInfo);
        this.closeDialog();
    }

    set TeacherId(_teacherId: string) {
        this._teacherId = _teacherId;
    }

    set TeacherName(_name: string) {
        this._teacherName = _name;
    }

}