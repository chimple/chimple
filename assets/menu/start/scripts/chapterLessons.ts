import Config from "../../../common/scripts/lib/config";
import LessonButton from "./lessonButton";
import {User} from "../../../common/scripts/lib/profile";
import {Lesson} from "../../../common/scripts/lib/convert";

const {ccclass, property} = cc._decorator;

const HEADER_COLORS = {
    'en': '#FFBC00',
    'maths': '#42C0FF',
    'hi': '#009158',
    'puzzle': '#FF5500',
    'test-lit': '#FFBC00',
    'test-maths': '#42C0FF'
}

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

    @property(cc.Node)
    bgHolder: cc.Node = null;

    @property(cc.Node)
    header: cc.Node = null;

    static showAssignments: boolean = false

    onLoad() {

        this.bgHolder.removeAllChildren();
        if (!!User.getCurrentUser().currentBg) {
            this.setBackground(User.getCurrentUser().currentBg);
        } else {
            this.setBackground("camp");
        }

        const config = Config.i
        if (ChapterLessons.showAssignments) {
            this.label.string = 'Assignments'
            config.assignments.forEach((ass) => {
                const lesson = Config.i.allLessons.get(ass.lessonId)
                const lessonProgress = User.getCurrentUser().lessonProgressMap.get(ass.lessonId)
                if (lesson && !(lessonProgress && lessonProgress.date > ass.createAt)) {
                    lesson.assignmentId = ass.assignmentId;
                    this.createLessonButton(lesson, true)
                }
            })
        } else {
            this.label.string = config.chapter.name
            config.chapter.lessons.forEach((lesson, index) => {
                this.createLessonButton(lesson, (index == 0
                    || lesson.open
                    || User.getCurrentUser().lessonProgressMap.has(lesson.id)));
            })
        }
        this.layout.width = cc.winSize.width
        this.layout.parent.width = cc.winSize.width
        this.layout.parent.parent.width = cc.winSize.width
        this.layout.getComponent(cc.Layout).updateLayout()
        this.layout.parent.height = this.layout.height
        const color = HEADER_COLORS[config.course.id]
        if (color) this.header.color = new cc.Color().fromHEX(color)
    }

    private createLessonButton(lesson: Lesson, open: boolean) {
        const lessonButton = cc.instantiate(this.lessonButtonPrefab);
        const lessonButtonComp = lessonButton.getComponent(LessonButton);
        lessonButtonComp.lesson = lesson;
        lessonButtonComp.loading = this.loading;
        lessonButtonComp.open = open;
        this.layout.addChild(lessonButton);
    }

    private setBackground(bgprefabName: string) {
        cc.resources.load(`backgrounds/prefabs/${bgprefabName}`, (err, sp) => {
            let bgPrefabInstance = cc.instantiate(sp);
            // @ts-ignore
            bgPrefabInstance.y = 0
            // @ts-ignore
            bgPrefabInstance.x = 0
            // @ts-ignore
            this.bgHolder.addChild(bgPrefabInstance);
            // userButtonRef.getChildByName("Background").getChildByName("avatar").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
    }

    onBackClick() {
        Config.i.popScene()
    }
}
