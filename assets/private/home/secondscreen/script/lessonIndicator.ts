import {AssignHomeWork} from "../../../teacher/scripts/assignHomeWork";
import {Util} from "../../../../common/scripts/util";
import ChimpleLabel from "../../../../common/scripts/chimple-label";
import Config from "../../../../common/scripts/lib/config";
import {Chapter, Lesson} from "../../../../common/scripts/lib/convert";
import {User} from "../../../../common/scripts/lib/profile";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LessonIndicator extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    star1: cc.Sprite = null;

    @property(cc.Sprite)
    star2: cc.Sprite = null;

    @property(cc.Sprite)
    star3: cc.Sprite = null;

    @property(cc.Prefab)
    assignHWPrefab: cc.Prefab = null;

    subjectId: string;
    chapter: Chapter;
    lesson: Lesson;
    user: User;
    popUpParent: cc.Node;
    showAssignment: boolean = false;

    protected onLoad() {
        const assignHW = this.node.getChildByName('assignHW')
        if (!!assignHW) assignHW.active = this.showAssignment;
    }

    onAssignHomeWorkClick(event) {
        this.showAssignHWDialog();
    }

    showAssignHWDialog() {
        const assignHw: cc.Node = cc.instantiate(this.assignHWPrefab);
        const assignHwComponent: AssignHomeWork = assignHw.getComponent(AssignHomeWork);
        assignHwComponent.parent = this.popUpParent;
        assignHwComponent.studentId = this.user.id;
        const chimpleLabelComponent = assignHwComponent.text.getComponent(ChimpleLabel);
        chimpleLabelComponent.string = Util.i18NText('Assign Home');
        assignHwComponent.chapterId = this.chapter.id;
        assignHwComponent.lessonId = this.lesson.id;
        assignHwComponent.subjectId = this.subjectId;
        assignHw.setPosition(cc.v2(0, 0))
        this.popUpParent.addChild(assignHw);
    }
}
