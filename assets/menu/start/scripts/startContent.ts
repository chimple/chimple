import Config from "../../../common/scripts/lib/config";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import LessonButton from "./lessonButton";
import { Util } from "../../../common/scripts/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartContent extends cc.Component {
    @property(cc.Prefab)
    startLessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null;

    loading: cc.Node

    onLoad () {
        const buttons: Array<cc.Node> = []
        Config.i.curriculum.forEach((course: Course, name: string) => {
            course.chapters.forEach((chapter: Chapter) => {
                const firstClosedIndex = chapter.lessons.findIndex((lesson, index) => {
                    return !(index == 0
                        || lesson.open
                        || User.getCurrentUser().lessonProgressMap.has(lesson.id))
                })
                const lesson = chapter.lessons[firstClosedIndex == -1 ? 0 : firstClosedIndex - 1]
                buttons.push(this.createButton(lesson, chapter, course));
            })
        })
        Util.shuffle(buttons)
        buttons.forEach((node: cc.Node) => {
            this.layout.addChild(node)
        })
    }

    private createButton(lesson: Lesson, chapter: Chapter, course: Course) : cc.Node {
        const lessonButton = cc.instantiate(this.startLessonButtonPrefab);
        const lessonButtonComp = lessonButton.getComponent(LessonButton);
        lessonButtonComp.lesson = lesson;
        lessonButtonComp.chapter = chapter;
        lessonButtonComp.course = course;
        lessonButtonComp.loading = this.loading;
        lessonButtonComp.open = true
        return lessonButton
    }
}
