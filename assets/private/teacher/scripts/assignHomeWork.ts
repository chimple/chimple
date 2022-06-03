import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {Util} from "../../../common/scripts/util";
import {CURRENT_SCHOOL_ID, CURRENT_SECTION_ID, CURRENT_SUBJECT_ID} from "../../../common/scripts/lib/constants";
import {AssignHomeWorkInfo, ParseApi} from "../../../common/scripts/services/parseApi";
import UtilLogger from "../../../common/scripts/util-logger";
import {ASSIGN_HOMEWORK, ASSIGN_HOMEWORK_FAILED} from "../../../common/scripts/domain/parseConstants";
import {Queue} from "../../../queue";
import {
    ASSIGNMENT_ID_KEY_FOR_ASSIGN_HW,
    CHAPTER_ID_KEY_FOR_ASSIGN_HW,
    LESSON_ID_KEY_FOR_ASSIGN_HW,
    STUDENT_ASSIGNMENT_ID_KEY,
    TEACHER_ID_KEY_FOR_ASSIGN_HW
} from "../../../chimple";
import {QUIZ_WRONG} from "../../../games/quiz/quizliteracy/scripts/quiz-literacy";
import {HELP_BTN} from "../../../common/scripts/answer-grid";

@ccclass
export class AssignHomeWork extends cc.Component {
    @property(cc.Node)
    text: cc.Node = null;

    parent: cc.Node = null;

    studentId: string = null;
    chapterId: string;
    lessonId: string;
    subjectId: string = null;

    callBack: Function = null;

    protected onLoad() {

    }

    async onYesClicked(event) {
        cc.log("yes clicked :" + this.studentId);
        const schoolId = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
        const sectionId = cc.sys.localStorage.getItem(CURRENT_SECTION_ID);
        const subjectId = !!this.subjectId ? this.subjectId : cc.sys.localStorage.getItem(CURRENT_SUBJECT_ID);
        const payload: AssignHomeWorkInfo = Util.assignHomework(this.chapterId, this.lessonId, schoolId, sectionId, subjectId, this.studentId);
        this.parent.active = true;
        this.node.removeFromParent(true);
        cc.log("calling assign Homework API");
        ParseApi.getInstance().assignHomeWork(payload)
            .then(res => {
                UtilLogger.logChimpleEvent(ASSIGN_HOMEWORK, payload);
                if (res && res.status === 200 && res.data.result
                    && res.data.result.objectId) {
                    this.callBack(this.studentId);
                    const teacherId = ParseApi.getInstance().getLoggedInUser().objectId;
                    const assignHwText = `http://chimple.github.io/${ASSIGN_HOMEWORK}/${ASSIGNMENT_ID_KEY_FOR_ASSIGN_HW}/${res.data.result.objectId}/${TEACHER_ID_KEY_FOR_ASSIGN_HW}/${teacherId}`;
                    Util.shareText(assignHwText);
                }
            })
            .catch(err => {
                Queue.getInstance().push(payload)
                UtilLogger.logChimpleEvent(ASSIGN_HOMEWORK_FAILED, payload);
            });
    }

    async onNoClicked(event) {
        this.parent.active = true;
        this.node.removeFromParent(true);
    }
}