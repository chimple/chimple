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
    chaptersLayout: cc.Node = null

    static colors: Array<string> = [
        '#511F73',
        '#26A699',
        '#F29727',
        '#F24C3D'
    ]

    onLoad() {
        const config = Config.i
        this.chaptersLayout.removeAllChildren()
        let lessonContentNode: cc.Node = null
        let colorIndex = 0
        for (const chapter of config.curriculum.get(config.course).chapters) {
            const chapterContents = cc.instantiate(this.chapterContentPrefab)
            chapterContents.width = cc.winSize.width
            const chapterContentsComp = chapterContents.getComponent(ChapterContent)
            chapterContentsComp.label.string = chapter.name
            this.chaptersLayout.addChild(chapterContents)
            lessonContentNode = chapterContentsComp.layout
            lessonContentNode.width = cc.winSize.width
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
            chapterContents.color = new cc.Color().fromHEX(CourseContent.colors[colorIndex++ % CourseContent.colors.length])
        }
        const layoutComp = this.chaptersLayout.getComponent(cc.Layout)
        layoutComp.updateLayout()
        this.chaptersLayout.parent.height = this.chaptersLayout.height
        this.chaptersLayout.parent.width = cc.winSize.width
        this.chaptersLayout.parent.parent.width = cc.winSize.width
    }
}
