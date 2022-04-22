import Config, { ASSIGNMENT_COURSE_ID } from "../../../common/scripts/lib/config";
import ChapterLessons, { ChapterLessonType } from "./chapterLessons";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartHeaderButton extends cc.Component {
    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Sprite)
    selected: cc.Sprite

    @property(cc.Button)
    moreButton: cc.Button

    onMoreClick() {
        if (Config.i.course.id == ASSIGNMENT_COURSE_ID) {
            ChapterLessons.showType = ChapterLessonType.Assignments
            Config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')
        } else {
            Config.i.pushScene('menu/start/scenes/courseChapters', 'menu')
        }
    }

}
