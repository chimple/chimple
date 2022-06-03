import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "../../../common/scripts/lib/config";
import {CURRENT_SCHOOL_ID, CURRENT_SECTION_ID} from "../../../common/scripts/lib/constants";
import {ParseApi, StudentLessonInfo} from "../../../common/scripts/services/parseApi";
import {ParseStudent} from "../../../common/scripts/domain/parseStudent";
import TeacherStudentButton from "./teacherStudentButton";
import {AssignHomeWork} from "./assignHomeWork";
import {Util} from "../../../common/scripts/util";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import {ASSIGNMENTS} from "../../../common/scripts/domain/parseConstants";
import {ParseNetwork} from "../../../common/scripts/services/ParseNetwork";
import {ParseAssignment} from "../../../common/scripts/domain/parseAssignment";
import {ParseAssignmentForChapter} from "../../../common/scripts/domain/parseAssignmentForChapter";

export const ASSIGN_HW_TO_STUDENT = 'ASSIGN_HW_TO_STUDENT';

@ccclass
export default class TeacherStudentProgress extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    assignHWPrefab: cc.Prefab = null;

    @property(cc.Node)
    assignHWButton: cc.Node = null;

    @property(cc.Node)
    layout: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    loading: cc.Node = null;

    protected async onLoad() {
        const config = Config.i
        this.label.string = config.lesson.name;
        this.loading.active = true;
        const schoolId: string = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
        const sectionId: string = cc.sys.localStorage.getItem(CURRENT_SECTION_ID);
        const students: ParseStudent[] = await ParseApi.getInstance().getStudentsForSection(schoolId, sectionId);


        const progressResults: StudentLessonInfo[] = await ParseApi.getInstance().getProgressForStudentByChapterAndLesson(config.chapter.id, config.lesson.id);
        const assignments: ParseAssignmentForChapter[] = await ParseApi.getInstance().getAssignmentsForStudentsByChapterAndLesson(
            schoolId, sectionId, config.chapter.id, config.lesson.id, students
        );

        students.forEach((student, index) => {
            const lessonButton = cc.instantiate(this.lessonButtonPrefab);
            const lessonButtonComp = lessonButton.getComponent(TeacherStudentButton);
            lessonButtonComp.student = student;
            lessonButtonComp.lesson = config.lesson;
            const assignmentCurrLesson = assignments.filter(
                (a) => a.student && a.student.objectId === student.objectId && a.chapter === config.chapter.id && a.lesson === config.lesson.id
            );

            const isAssignmentPresent: boolean = assignmentCurrLesson && assignmentCurrLesson.length > 0;
            lessonButtonComp.isAssignmentPresent = isAssignmentPresent;
            const result: StudentLessonInfo[] = progressResults.filter(sl => sl.objectId === student.objectId &&
                sl.lesson == config.lesson.id);
            let assessment: number = 0;
            if (result && result.length > 0) {
                const r = result[0];
                assessment = r.assessment;
            }
            lessonButtonComp.assessment = assessment;
            lessonButtonComp.loading = this.loading
            this.layout.addChild(lessonButton)
        })
        this.layout.width = cc.winSize.width
        this.layout.parent.height = this.layout.height
        this.layout.parent.width = cc.winSize.width
        this.layout.parent.parent.width = cc.winSize.width
        this.loading.active = false;

        this.node.on(ASSIGN_HW_TO_STUDENT, (event) => {
            event.stopPropagation();
            const {studentId, name} = event.getUserData();
            this.showAssignHWDialog(studentId, name);
        });
    }

    updateUI(studentId: string) {
        this.layout.children.filter(c => {
            const teacherStudentComponent = c.getComponent(TeacherStudentButton);
            if (teacherStudentComponent != null) {
                if (!!studentId) {
                    if (teacherStudentComponent.student.objectId === studentId) {
                        c.getChildByName("checkmark").active = true;
                    }
                } else {
                    c.getChildByName("checkmark").active = true;
                }
            }
        })
    }

    onAssignHWClicked(event) {
        this.showAssignHWDialog();
    }

    homeAssigned(studentId: string) {
        cc.log('homeAssigned', studentId);
        this.updateUI(studentId);
    }

    showAssignHWDialog(studentId = null, name = null) {
        const assignHw: cc.Node = cc.instantiate(this.assignHWPrefab);
        const assignHwComponent: AssignHomeWork = assignHw.getComponent(AssignHomeWork);
        assignHwComponent.parent = this.assignHWButton;
        assignHwComponent.studentId = studentId;
        const chimpleLabelComponent = assignHwComponent.text.getComponent(ChimpleLabel);
        if (studentId === null) {
            chimpleLabelComponent.string = Util.i18NText('Assign Home to All');
        } else if (studentId != null && name !== null) {
            chimpleLabelComponent.string = Util.i18NText('Assign Home to') + ' ' + name;
        }
        assignHwComponent.chapterId = Config.i.chapter.id;
        assignHwComponent.lessonId = Config.i.lesson.id;
        assignHwComponent.callBack = this.homeAssigned.bind(this);
        this.node.addChild(assignHw);
        this.assignHWButton.active = false;
    }

    onShareClicked() {
        const config = Config.i
        cc.sys.openURL(`https://bahama-stage.web.app/?courseId=${config.course.id}&chapterId=${config.chapter.id}&lessonId=${config.lesson.id}`)
    }
}
