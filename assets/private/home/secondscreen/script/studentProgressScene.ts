import {Chapter} from "../../../../common/scripts/lib/convert";
import {User} from "../../../../common/scripts/lib/profile";
import StudentProgress from "./studentProgress";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StudentProgressScene extends cc.Component {
    @property(cc.Prefab)
    studentProgressPrefab: cc.Prefab = null

    @property(cc.Node)
    studentProgressNode: cc.Node = null

    static user: User;

    onLoad() {
        const studentProgress = cc.instantiate(this.studentProgressPrefab)
        const studentProgressComp = studentProgress.getComponent(StudentProgress)
        studentProgressComp.user = StudentProgressScene.user
        studentProgressComp.getChapterProgress = this.getChapterProgress.bind(this)
        studentProgressComp.getLessonProgressMap = this.getLessonProgressMap.bind(this)
        studentProgressComp.shouldShowAssignment = this.shouldShowAssignment.bind(this);
        this.studentProgressNode.addChild(studentProgress)
    }

    getChapterProgress(chapter: Chapter): number {
        const completedLessons = chapter.lessons.filter((les) => {
            const lessonProgress = StudentProgressScene.user.lessonProgressMap.get(les.id)
            if (lessonProgress && lessonProgress.score >= 0) return true
        }).length
        const totalLessons = chapter.lessons.length
        return completedLessons / totalLessons
    }

    getLessonProgressMap(chapter: Chapter, callback: Function) {
        callback(StudentProgressScene.user.lessonProgressMap)
    }

    shouldShowAssignment(): boolean {
        return false;
    }
}
