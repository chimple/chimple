import Config from "../../../common/scripts/lib/config";
import TeacherChapterMenuButton from "./teacherChapterMenuButton";
import {ParseApi} from "../../../common/scripts/services/parseApi";
import {CURRENT_SCHOOL_ID, CURRENT_SECTION_ID, CURRENT_SUBJECT_ID} from "../../../common/scripts/lib/constants";
import {ParseChapterAssignment} from "../../../common/scripts/domain/parseChapterAssignment";
import {ParseSubject} from "../../../common/scripts/domain/parseSubject";
import {ParseNetwork} from "../../../common/scripts/services/ParseNetwork";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TeacherCourseContent extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    chaptersLayout: cc.Node = null

    @property(cc.Prefab)
    chapterMenuButtonPrefab: cc.Prefab = null

    loading: cc.Node
    content: cc.Node

    static colors: Array<string> = [
        '#511F73',
        '#26A699',
        '#F29727',
        '#F24C3D'
    ]

    async onLoad() {
        const schoolId: string = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
        const sectionId: string = cc.sys.localStorage.getItem(CURRENT_SECTION_ID);
        let subjectId: string = '';

        const config = Config.i;
        const selectedParseSubject: ParseSubject[] = ParseApi.getInstance().allSubjects().filter(p => p.courseCode === config.course.id);

        if (Array.isArray(selectedParseSubject) && selectedParseSubject.length > 0) {
            subjectId = selectedParseSubject[0].objectId;
            ParseNetwork.getInstance().storeIntoCache(CURRENT_SUBJECT_ID, subjectId);
        }

        const chapterAssignments: ParseChapterAssignment[] = await ParseApi.getInstance().getChapterAssignment(
            schoolId, sectionId, subjectId
        );

        for (const chapter of config.course.chapters) {
            const finishedAssignment = chapterAssignments.filter(c => c.chapter === chapter.id);
            let chapterFinished: number = 0;
            if (finishedAssignment && finishedAssignment.length > 0) {
                chapterFinished = finishedAssignment[0].percentage;
            }
            const chapterMenuButton = cc.instantiate(this.chapterMenuButtonPrefab);
            const chapterMenuButtonComp = chapterMenuButton.getComponent(TeacherChapterMenuButton);
            chapterMenuButtonComp.completedLessons = chapterFinished;
            chapterMenuButtonComp.chapter = chapter;
            chapterMenuButtonComp.content = this.content;
            chapterMenuButtonComp.loading = this.loading;
            this.chaptersLayout.addChild(chapterMenuButton);
        }
        this.chaptersLayout.width = cc.winSize.width;
        this.chaptersLayout.parent.height = this.chaptersLayout.height;
        this.chaptersLayout.parent.width = cc.winSize.width;
        this.chaptersLayout.parent.parent.width = cc.winSize.width;
    }
}
