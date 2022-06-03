import Header from "../../../../common/scripts/header";
import Config from "../../../../common/scripts/lib/config";
import {User} from "../../../../common/scripts/lib/profile";
import {Chapter} from "../../../../common/scripts/lib/convert";
import ChapterProgressBar from "./chapterProgressBar";
import {ParseSubject} from "../../../../common/scripts/domain/parseSubject";
import {ParseApi} from "../../../../common/scripts/services/parseApi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StudentProgress extends cc.Component {
    @property(cc.Node)
    header: cc.Node = null

    @property(cc.Prefab)
    headerPrefab: cc.Prefab = null

    @property(cc.Prefab)
    chapterProgressPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    @property(cc.Node)
    loading: cc.Node = null

    user: User
    getChapterProgress: Function
    getLessonProgressMap: Function
    shouldShowAssignment: Function

    onLoad() {
        const config = Config.i
        config.loadCourseJsons(this.user, this.node, () => {
            const firstCourseId = this.user.courseProgressMap.keys().next().value
            config.course = config.curriculum.get(firstCourseId)
            const headerNode = cc.instantiate(this.headerPrefab)
            const headerComp = headerNode.getComponent(Header)
            headerComp.showHome = false
            headerComp.user = this.user
            headerComp.onCourseClick = this.onCourseClick.bind(this)
            this.header.addChild(headerNode)
            this.onCourseClick()
        })
    }

    onCourseClick() {
        const config = Config.i
        this.layout.removeAllChildren()

        config.curriculum.get(config.course.id).chapters.forEach((chapter: Chapter) => {
            const chapterProgress = cc.instantiate(this.chapterProgressPrefab)
            const parseSubject: ParseSubject[] = ParseApi.getInstance().allSubjects().filter(p => p.courseCode === config.course.id);
            const chapterProgressComp = chapterProgress.getComponent(ChapterProgressBar)
            chapterProgressComp.parent = this.node;
            chapterProgressComp.subjectId = Array.isArray(parseSubject) && parseSubject.length === 1 ? parseSubject[0].objectId : null;
            chapterProgressComp.label.string = chapter.name
            chapterProgressComp.chapter = chapter
            chapterProgressComp.user = this.user
            chapterProgressComp.getLessonProgressMap = this.getLessonProgressMap
            chapterProgressComp.completedRatio = this.getChapterProgress(chapter)
            chapterProgressComp.shouldShowAssignment = this.shouldShowAssignment;
            this.loading.active=false;
            this.layout.addChild(chapterProgress)
        })
    }
}
