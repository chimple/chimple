import Config from "../../../common/scripts/lib/config";
import ChapterContent from "./chapterContent";
import LessonButton from "./lessonButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CourseContent extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Prefab)
    chapterContentPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    onLoad() {
        const config = Config.i
        this.layout.removeAllChildren()
        let lessonContentNode: cc.Node = null
        for (const chapter of config.curriculum.get(config.course).chapters) {
            const chapterContents = cc.instantiate(this.chapterContentPrefab)
            const chapterContentsComp = chapterContents.getComponent(ChapterContent)
            chapterContentsComp.label.string = chapter.name
            this.layout.addChild(chapterContents)
            lessonContentNode = chapterContentsComp.layout
            for (const lesson of chapter.lessons) {
                const lessonButton = cc.instantiate(this.lessonButtonPrefab)
                const lessonButtonComp = lessonButton.getComponent(LessonButton)
                lessonButtonComp.courseName = config.course
                lessonButtonComp.chapter = chapter
                lessonButtonComp.lesson = lesson
                lessonContentNode.addChild(lessonButton)
            }
            const lessonContentLayout = lessonContentNode.getComponent(cc.Layout)
            if (lessonContentLayout != null) lessonContentLayout.updateLayout()
            const chapterContentLayout = chapterContents.getComponent(cc.Layout)
            if (chapterContentLayout != null) chapterContentLayout.updateLayout()
        }
        const layoutComp = this.layout.getComponent(cc.Layout)
        layoutComp.updateLayout()
        this.layout.parent.height = this.layout.height

    }
}
