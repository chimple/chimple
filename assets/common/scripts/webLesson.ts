import LessonController from "./lessonController";

import Loading from "./loading";

import { Util } from "./util";
import Config from "./lib/config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebLesson extends cc.Component {
    onLoad () {
        const params = new URLSearchParams(window.location.search)
        const courseId = params.get('courseId')
        const chapterId = params.get('chapterId')
        const lessonId = params.get('lessonId')
        const config = Config.i
        config.isMicroLink = true
        config.loadSingleCourseJson(courseId, () => {
            config.course = config.curriculum.get(courseId)
            config.chapter = config.course.chapters.find((c) => c.id == chapterId)
            config.lesson = config.chapter.lessons.find((l) => l.id == lessonId)
            LessonController.preloadLesson(this.node, (err: Error) => {
                if(err) {
                    console.log(err)
                } else {
                    Config.loadScene('common/scenes/lessonController')
                }
            })    
        })
    }
}
