import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {User} from "./lib/profile";
import StudentPreviewInfo, {TEACHER_ADD_STUDENT_SELECTED} from "./studentPreviewInfo";
import ChimpleLabel from "./chimple-label";
import {Queue} from "../../queue";
import {ParseApi, UpdateHomeTeacher} from "../../private/services/parseApi";
import {ACCEPT_TEACHER_REQUEST, REJECT_TEACHER_REQUEST, TEACHER_ADDED} from "../../chimple";
import UtilLogger from "./util-logger";
import {ParseSchoolStudent} from "../../private/domain/parseStudent";
import {ParseSchool} from "../../private/domain/parseSchool";

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
            // give me teacher user id from school id
            const school: ParseSchool = await ParseApi.getInstance().schoolById(this._teacherId)
            let updateHomeTeacherInfo: UpdateHomeTeacher = {
                homeId: this.selectedStudentId,
                teacherId: school.user.objectId,
                kind: "UpdateHomeTeacher",
                name: this.selectedStudentName,
                schoolId: school.objectId,
                sectionId: this._teacherSectionId
            };
            Queue.getInstance().push(updateHomeTeacherInfo);
            const teachersAdded = JSON.parse(cc.sys.localStorage.getItem(TEACHER_ADDED + this._teacherId) || '[]');
            teachersAdded.push(this.selectedStudentId);
            cc.sys.localStorage.setItem(TEACHER_ADDED + this._teacherId, JSON.stringify(teachersAdded));
            UtilLogger.logChimpleEvent(ACCEPT_TEACHER_REQUEST, updateHomeTeacherInfo);
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
            kind: "UpdateHomeTeacher",
            name: this.selectedStudentName
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

}