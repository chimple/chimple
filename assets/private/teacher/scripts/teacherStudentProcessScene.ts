import {LessonProgress, User} from "../../../common/scripts/lib/profile";
import StudentProgress from "../../home/secondscreen/script/studentProgress";
import {Chapter} from "../../../common/scripts/lib/convert";
import {ParseChapterProgress} from "../../../common/scripts/domain/parseChapterProgress";
import {ParseApi, ProgressReport, StudentLessonInfo} from "../../../common/scripts/services/parseApi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TeacherStudentProcessScene extends cc.Component {
    @property(cc.Prefab)
    studentProgressPrefab: cc.Prefab = null;

    @property(cc.Node)
    studentProgressNode: cc.Node = null;

    static user: User;

    chapterProgresses: ParseChapterProgress[] = [];

    curChapter: Chapter = null;

    async onLoad() {
        //"nyGSvCTKbC"
        this.chapterProgresses = await ParseApi.getInstance().getChapterProgressByStudent(
            TeacherStudentProcessScene.user.id
        );

        const studentProgress = cc.instantiate(this.studentProgressPrefab)
        const studentProgressComp = studentProgress.getComponent(StudentProgress)
        studentProgressComp.user = TeacherStudentProcessScene.user
        studentProgressComp.getChapterProgress = this.getChapterProgress.bind(this)
        studentProgressComp.getLessonProgressMap = this.getLessonProgressMap.bind(this)
        studentProgressComp.shouldShowAssignment = this.shouldShowAssignment.bind(this)
        this.studentProgressNode.addChild(studentProgress);
    }

    getChapterProgress(chapter: Chapter): number {
        this.curChapter = chapter;
        const progressByChapter = this.chapterProgresses.filter((cp) => cp.chapter == chapter.id);
        if (!!progressByChapter && progressByChapter.length > 0) {
            let tCompleted = 0;
            progressByChapter.forEach(
                c => {
                    tCompleted += c.percentComplete
                }
            )
            const completion =  {percentageComplete: tCompleted};
            return completion.percentageComplete;
        } else {
            return 0;
        }
    }

    shouldShowAssignment(): boolean {
        return true;
    }


    getLessonProgressMap(chapter: Chapter, callback: Function) {
        return (async (callback) => {
            const query: ProgressReport = {
                chapterId: chapter.id,
                studentInfos: [TeacherStudentProcessScene.user.id]
            };

            const studentLessonInfos: StudentLessonInfo[] = await ParseApi.getInstance().getProgressForChapter(query);
            let pMap: Map<string, LessonProgress> = new Map<string, LessonProgress>();
            studentLessonInfos.forEach(s => {
                const p: LessonProgress = {} as LessonProgress;
                p.score = s.assessment || 0
                pMap.set(s.lesson, p);
            });
            TeacherStudentProcessScene.user.lessonProgressMap = pMap;
            callback(TeacherStudentProcessScene.user.lessonProgressMap)
        })(callback)
    }


}
