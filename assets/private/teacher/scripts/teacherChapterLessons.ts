import Config from "../../../common/scripts/lib/config";
import {User} from "../../../common/scripts/lib/profile";
import TeacherLessonButton from "./teacherLessonButton";
import {CURRENT_SCHOOL_ID} from "../../../common/scripts/lib/constants";
import {ParseAssignmentForChapter} from "../../../common/scripts/domain/parseAssignmentForChapter";
import {ParseApi} from "../../../common/scripts/services/parseApi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TeacherChapterLessons extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Node)
    loading: cc.Node = null

    async onLoad() {
        const config = Config.i
        const schoolId: string = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
        const assignmentsForChapter: ParseAssignmentForChapter[] = await ParseApi.getInstance().getAssignmentsForChapterForWholeClass(schoolId, config.chapter.id);
        this.label.string = config.chapter.name
        config.chapter.lessons.forEach((lesson, index) => {
            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(TeacherLessonButton)
            lessonButtonComp.lesson = lesson
            const ac = assignmentsForChapter.filter(ac => ac.lesson === lesson.id);
            lessonButtonComp.assignmentAvailable = !!ac && ac.length > 0;
            lessonButtonComp.chapter = config.chapter
            lessonButtonComp.course = config.course
            lessonButtonComp.loading = this.loading
            lessonButtonComp.open = (index == 0
                || lesson.open
                || User.getCurrentUser().lessonProgressMap.has(lesson.id))
            this.layout.addChild(lessonButton)
        })
        this.layout.width = cc.winSize.width
        this.layout.parent.height = this.layout.height
        this.layout.parent.width = cc.winSize.width
        this.layout.parent.parent.width = cc.winSize.width
    }

    onBackClick() {
        Config.i.popScene()
    }
}
