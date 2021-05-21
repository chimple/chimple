import ChapterLessons, { ChapterLessonType } from "../../menu/start/scripts/chapterLessons";
import Start from "../../menu/start/scripts/start";
import LessonController from "./lessonController";
import Config from "./lib/config";
import { Lesson } from "./lib/convert";
import Loading from "./loading";
import { Util } from "./util";


const {ccclass, property} = cc._decorator;

@ccclass
export default class PreTestDialog extends cc.Component {

    @property(cc.Node)
    loading: cc.Node = null

    courseId: any
    chapter: any

    onClickYes() {
        var lessons: Lesson[];
        const config = Config.i;
        const course = config.curriculum.get(this.courseId);
        lessons = [Start.preQuizLesson(course)];
        config.lesson = lessons[0];
        config.chapter = lessons[0].chapter;
        config.course = lessons[0].chapter.course;
        this.node.getChildByName("dialog_box").active = false;
        this.node.getChildByName("block").active = false;
        this.loading.getComponent(Loading).allowCancel = true;
        this.loading.active = true;
        LessonController.preloadLesson(this.node.parent, (err: Error) => {
            if (ChapterLessons.showType != ChapterLessonType.Assignments && !Config.isMicroLink) {
                config.chapter = this.chapter;
            }
            if (err) {
                this.loading.getComponent(Loading).addMessage(Util.i18NText('Error downloading content. Please connect to internet and try again'), true, true);
            } else {
                if (this.loading && this.loading.activeInHierarchy) {
                    config.pushScene('common/scenes/lessonController');
                }
            }
        });
    }

    onClickNo() {
        if (Config.isMicroLink) {
            Config.isMicroLink = false;
        }
        this.node.removeFromParent(true);
    }
}
