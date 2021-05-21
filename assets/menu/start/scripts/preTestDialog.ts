import LessonController from "../../../common/scripts/lessonController";
import Config from "../../../common/scripts/lib/config";
import { Lesson } from "../../../common/scripts/lib/convert";
import Loading from "../../../common/scripts/loading";
import { Util } from "../../../common/scripts/util";
import ChapterLessons, { ChapterLessonType } from "./chapterLessons";
import Start from "./start";

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
