import Config from "../../../common/scripts/lib/config";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import LessonButton from "./lessonButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    onLoad() {
        const config = Config.i
        const courseProgress = User.getCurrentUser().courseProgressMap
        config.curriculum.forEach((course: Course, name: string) => {
            const currentLessonId = courseProgress.get(name).currentLessonId
            let currentLesson: Lesson = null
            let currentChapter: Chapter = null
            course.chapters.some((chapter) => {
                currentLesson = chapter.lessons.find(lesson => lesson.id == currentLessonId)
                if (currentLesson != null) {
                    currentChapter = chapter
                    return true
                }
            })
            if (currentLesson == null) {
                currentChapter = course.chapters[0]
                currentLesson = currentChapter.lessons[0]
            }

            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.courseName = name
            lessonButtonComp.chapter = currentChapter
            lessonButtonComp.lesson = currentLesson
            this.layout.addChild(lessonButton)
        })
    }

    onLibraryClick() {
        Config.i.pushScene('menu/start/scenes/library', 'menu')
    }

    onProfileClick() {
        Config.i.pushScene('menu/inventory/scenes/inventory', 'menu')
    }
}
