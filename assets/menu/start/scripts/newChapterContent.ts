import Config from "../../../common/scripts/lib/config";
import ChapterContent from "./chapterContent";
import LessonButton from "./lessonButton";
import ChapterMenuButton from "./chapterMenuButton";
import CourseContent from "./courseContent";

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

    static colors: Array<string> = [
        '#511F73',
        '#26A699',
        '#F29727',
        '#F24C3D'
    ]

    onLoad() {
        const config = Config.i
        this.label.string = config.chapter.name
        for (const lesson of config.chapter.lessons) {
            // const chapterContents = cc.instantiate(this.chapterContentPrefab)
            // chapterContents.width = cc.winSize.width
            // const chapterContentsComp = chapterContents.getComponent(ChapterContent)
            // chapterContentsComp.label.string = chapter.name
            // this.chaptersLayout.addChild(chapterContents)
            // lessonContentNode = chapterContentsComp.layout
            // lessonContentNode.width = cc.winSize.width
            // for (const lesson of chapter.lessons) {
            //     const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            //     const lessonButtonComp = lessonButton.getComponent(LessonButton)
            //     lessonButtonComp.course = config.course
            //     lessonButtonComp.chapter = chapter
            //     lessonButtonComp.lesson = lesson
            //     lessonButtonComp.loading = this.loading
            //     lessonContentNode.addChild(lessonButton)
            // }
            // const lessonContentLayout = lessonContentNode.getComponent(cc.Layout)
            // if (lessonContentLayout != null) lessonContentLayout.updateLayout()
            // const chapterContentLayout = chapterContents.getComponent(cc.Layout)
            // if (chapterContentLayout != null) chapterContentLayout.updateLayout()
            // chapterContents.color = new cc.Color().fromHEX(CourseContent.colors[colorIndex++ % CourseContent.colors.length])
            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.lesson = lesson
            lessonButtonComp.loading = this.loading
            this.chaptersLayout.addChild(lessonButton)
        }
        // const layoutComp = this.chaptersLayout.getComponent(cc.Layout)
        // layoutComp.updateLayout()
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
