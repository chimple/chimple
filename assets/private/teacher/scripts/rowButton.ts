import ccclass = cc._decorator.ccclass;
import Config from "../../../common/scripts/lib/config";
import {TEACHER_STUDENT_PROGRESS} from "../../school/scripts/landing";
import StudentProgressScene from "../../home/secondscreen/script/studentProgressScene";
import TeacherStudentProcessScene from "./teacherStudentProcessScene";
import {User} from "../../../common/scripts/lib/profile";
import {ParseApi} from "../../../common/scripts/services/parseApi";
import {ParseChapterProgress} from "../../../common/scripts/domain/parseChapterProgress";

@ccclass
export default class RowButton extends cc.Component {
    studentId: string = null;

    protected onLoad() {
    }

    async onRowClicked(event) {
        if (this.studentId !== null) {
            cc.log(this.studentId);
            const student: User = User.createUserOrFindExistingUser({
                id: this.studentId
            })
            TeacherStudentProcessScene.user = student;
            Config.i.pushScene(TEACHER_STUDENT_PROGRESS, 'private');
        }
    }
}