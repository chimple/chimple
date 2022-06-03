import {LessonProgress, User} from "../../../../common/scripts/lib/profile";
import {Chapter} from "../../../../common/scripts/lib/convert";
import LessonIndicator from "./lessonIndicator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChapterProgressBar extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null

    @property(cc.Node)
    expand: cc.Node = null

    @property(cc.Node)
    layout: cc.Node = null

    @property(cc.Prefab)
    lessonIndicatorPrefab: cc.Prefab = null

    parent: cc.Node = null

    @property(cc.SpriteFrame)
    goldStar: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    grayStar: cc.SpriteFrame = null

    chapter: Chapter
    completedRatio: number
    getLessonProgressMap: Function
    user: User;
    shouldShowAssignment: Function
    subjectId: string = null;

    private isExpanded: boolean = false

    onLoad() {
        this.progressBar.progress = this.completedRatio
    }

    onExpandClick() {
        this.isExpanded = !this.isExpanded
        if (this.isExpanded) {
            this.getLessonProgressMap(this.chapter, (lessonProgressMap: Map<string, LessonProgress>) => {
                this.chapter.lessons.forEach((les) => {
                    const lessonIndicator = cc.instantiate(this.lessonIndicatorPrefab)
                    const lessonIndicatorComp = lessonIndicator.getComponent(LessonIndicator)
                    lessonIndicatorComp.popUpParent = this.parent;
                    lessonIndicatorComp.chapter = this.chapter;
                    lessonIndicatorComp.subjectId = this.subjectId;
                    lessonIndicatorComp.lesson = les;
                    lessonIndicatorComp.user = this.user;
                    lessonIndicatorComp.label.string = les.name
                    lessonIndicatorComp.showAssignment = !!this.shouldShowAssignment ? this.shouldShowAssignment() : false;
                    if (lessonProgressMap.has(les.id)) {
                        const score = lessonProgressMap.get(les.id).score
                        if (score >= 0) {
                            lessonIndicatorComp.star1.spriteFrame = score > 25 ? this.goldStar : this.grayStar
                            lessonIndicatorComp.star2.spriteFrame = score > 50 ? this.goldStar : this.grayStar
                            lessonIndicatorComp.star3.spriteFrame = score > 75 ? this.goldStar : this.grayStar
                        }
                    }
                    this.layout.addChild(lessonIndicator)
                })
            })
            // this.layout.active = false
        } else {
            this.layout.removeAllChildren()
            this.layout.height = 0
        }
        new cc.Tween().target(this.expand)
            .to(0.2, {angle: this.isExpanded ? -90 : 0}, {progress: null, easing: 'backOut'})
            // .call(() => {
            //     this.layout.active = true
            // })
            .start()
    }
}
