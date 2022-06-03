import {Util} from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";
import {Chapter, Course, Lesson} from "../../../common/scripts/lib/convert";
import Loading from "../../../common/scripts/loading";
import {STUDENT_PROGRESS_FOR_LESSON} from "../../school/scripts/landing";
import LessonIcon from "../../../common/scripts/lessonIcon";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TeacherLessonButton extends cc.Component {

    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Prefab)
    lessonIconPrefab: cc.Prefab

    @property(cc.Sprite)
    completedSprite: cc.Sprite

    @property(cc.Sprite)
    downloadSprite: cc.Sprite

    course: Course
    chapter: Chapter
    lesson: Lesson
    loading: cc.Node
    open: boolean = false;
    assignmentAvailable: boolean = false;

    async onLoad() {
        const config = Config.i
        if (this.lesson != null && this.course != null && this.lesson != null) {
            this.label.string = this.lesson.name
            const lessonIcon = cc.instantiate(this.lessonIconPrefab)
            const lessonIconComp = lessonIcon.getComponent(LessonIcon)
            lessonIconComp.lesson = this.lesson
            lessonIconComp.open = true
            this.button.node.insertChild(lessonIcon, 0)
            
            this.button.node.on('touchend', () => {
                config.course = this.course
                config.chapter = this.chapter;
                config.lesson = this.lesson;
                this.loading.getComponent(Loading).allowCancel = true
                this.loading.active = true
                config.pushScene(STUDENT_PROGRESS_FOR_LESSON, 'private');
            })
            this.completedSprite.node.active = this.assignmentAvailable;
        }
    }
}
