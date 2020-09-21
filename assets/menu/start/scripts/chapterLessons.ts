import Config from "../../../common/scripts/lib/config";
import LessonButton from "./lessonButton";
import { User } from "../../../common/scripts/lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChapterLessons extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Node)
    loading: cc.Node = null

    onLoad() {
        this.loading.active = false
        const config = Config.i
        this.label.string = config.chapter.name
        config.chapter.lessons.forEach((lesson, index) => {
            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.lesson = lesson
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
