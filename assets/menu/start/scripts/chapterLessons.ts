import Config from "../../../common/scripts/lib/config";
import LessonButton from "./lessonButton";
import { LessonProgress, User } from "../../../common/scripts/lib/profile";
import { Lesson } from "../../../common/scripts/lib/convert";
import { REWARD_TYPES, Util } from "../../../common/scripts/util";
import Start from "./start";
import Loading from "../../../common/scripts/loading";
import LessonController from "../../../common/scripts/lessonController";
import { ServiceConfig } from "../../../common/scripts/services/ServiceConfig";

const { ccclass, property } = cc._decorator;

const HEADER_COLORS = {
    'en': '#FFBC00',
    'maths': '#42C0FF',
    'hi': '#009158',
    'puzzle': '#FF5500',
    'test-lit': '#FFBC00',
    'test-maths': '#42C0FF'
}

export enum ChapterLessonType {
    Library,
    Assignments,
    Featured
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

    @property(cc.Node)
    whatsappNode: cc.Node = null

    @property(cc.Node)
    otpDialogNode: cc.Node = null


    static showType: ChapterLessonType = ChapterLessonType.Library

    async onLoad() {
        this.node.getChildByName('block').active = true;
        this.bgHolder.removeAllChildren();
        if (!!User.getCurrentUser().currentBg) {
            this.setBackground(User.getCurrentUser().currentBg);
        } else {
            this.setBackground("camp");
        }

        const config = Config.i
        switch (ChapterLessons.showType) {
            case ChapterLessonType.Assignments:
                if (User.getCurrentUser().isConnected) {
                    this.loading.active = true;
                    this.label.string = 'Assignments'
                    let assignments: any = config.getAssignmentLessonsTodo();
                    // if (assignments.length == 0 || assignments == undefined) {
                    const user = User.getCurrentUser();
                    assignments = await ServiceConfig.getI().handle.listAssignments(user.id)
                    config.assignments = assignments;
                    assignments = config.getAssignmentLessonsTodo();
                    // }
                    assignments.forEach((les) => {
                        this.createLessonButton(les, true)
                    })
                    this.loading.active = false;
                } else {
                    this.label.string = 'Connect To Class'
                    // this.whatsappNode.active = true
                    // this.otpDialogNode.active = true;
                }
                break;
            case ChapterLessonType.Featured:
                this.label.string = 'Featured'
                config.featuredLessons.forEach((les) => {
                    const lessonProgress = User.getCurrentUser().lessonProgressMap.get(les.id)
                    if (!lessonProgress) {
                        const lesson = Config.i.allLessons.get(les.id)
                        if (lesson) {
                            this.createLessonButton(lesson, true)
                        } else {
                            const course = config.curriculum.get(les.course)
                            if (course) {
                                les.chapter = {
                                    id: course.id + '_featured',
                                    lessons: [],
                                    name: course.name,
                                    image: '',
                                    course: course
                                }
                            }
                            this.createLessonButton(les, true)
                        }
                    }
                })
                break;
            case ChapterLessonType.Library:
            default:
                this.label.string = config.chapter.name
                config.chapter.lessons.forEach((lesson, index) => {
                    this.createLessonButton(lesson, lesson.chapter.course.id == 'reward' ?
                        User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[4]}-${config.chapter.id}-${lesson.id}`] == 1
                        : (index == 0
                            || lesson.open
                            || User.getCurrentUser().lessonProgressMap.has(lesson.id)));
                })
                break;
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
        lessonButtonComp.showScoreStars = ChapterLessons.showType !== ChapterLessonType.Assignments
        this.layout.addChild(lessonButton);
    }

    private setBackground(bgprefabName: string) {
        cc.resources.load(`backgrounds/prefabs/${bgprefabName}`, (err, sp) => {
            // @ts-ignore
            let bgPrefabInstance: cc.Node = cc.instantiate(sp);
            // @ts-ignore
            bgPrefabInstance.y = 0
            // @ts-ignore
            bgPrefabInstance.x = 0
            // @ts-ignore
            if (!!this.bgHolder && bgPrefabInstance != null) {

                this.bgHolder.addChild(bgPrefabInstance);
            }
            // userButtonRef.getChildByName("Background").getChildByName("avatar").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
    }

    onBackClick() {
        Config.i.popScene()
    }

    onWhatsappClick() {
        cc.sys.openURL("https://wa.me/919845206203?text=" + User.getCurrentUser().id);
    }
    start() {
        this.node.getChildByName('block').active = false
    }
}

