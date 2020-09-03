import { User } from "../../../common/scripts/lib/profile";

import Config from "../../../common/scripts/lib/config";

import { Course, Lesson, Chapter } from "../../../common/scripts/lib/convert";

import LessonButton from "./lessonButton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartContent extends cc.Component {
    @property(cc.Prefab)
    startLessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null;

    onLoad () {
        const courseProgress = User.getCurrentUser().courseProgressMap
        Config.i.curriculum.forEach((course: Course, name: string) => {
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

            const lessonButton = cc.instantiate(this.startLessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.courseName = name
            lessonButtonComp.chapter = currentChapter
            lessonButtonComp.lesson = currentLesson
            this.layout.addChild(lessonButton)
        })
    }
}
