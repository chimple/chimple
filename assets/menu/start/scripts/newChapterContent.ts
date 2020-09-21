import Config from "../../../common/scripts/lib/config";
import ChapterContent from "./chapterContent";
import LessonButton from "./lessonButton";
import ChapterMenuButton from "./chapterMenuButton";
import CourseContent from "./courseContent";
import { User } from "../../../common/scripts/lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewChapterContent extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    chaptersLayout: cc.Node = null

    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Prefab)
    courseContentPrefab: cc.Prefab = null

    loading: cc.Node
    content: cc.Node

    onLoad() {
        const config = Config.i
        this.label.string = config.chapter.name
        config.chapter.lessons.forEach((lesson, index) => {
            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.lesson = lesson
            lessonButtonComp.chapter = config.chapter
            lessonButtonComp.course = config.course
            lessonButtonComp.loading = this.loading
            this.chaptersLayout.addChild(lessonButton)
            lessonButtonComp.open = (index == 0 || User.getCurrentUser().lessonProgressMap.has(lesson.id))
        })
        this.chaptersLayout.width = cc.winSize.width
        this.chaptersLayout.parent.height = this.chaptersLayout.height
        this.chaptersLayout.parent.width = cc.winSize.width
        this.chaptersLayout.parent.parent.width = cc.winSize.width
    }

    onBackClick(event: cc.Event, customEventData) {
        const node = event.target.parent
        const nodeComp = node.getComponent(NewChapterContent)
        nodeComp.content.removeAllChildren()
        const courseContent = cc.instantiate(nodeComp.courseContentPrefab)
        const courseContentComp = courseContent.getComponent(CourseContent)
        courseContentComp.loading = nodeComp.loading
        courseContentComp.content = nodeComp.content
        nodeComp.content.addChild(courseContent)
    }
}
