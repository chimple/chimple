import Config from "../../../common/scripts/lib/config";
import { User, CourseProgress } from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";
import StartHeaderButton from "./startHeaderButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartHeader extends cc.Component {
    @property(cc.Node)
    courseLayout: cc.Node = null;

    @property(cc.Prefab)
    headerButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    rightPos: cc.Node = null

    onCourseClick: Function
    onHomeClick: Function
    onRightClick: Function
    user: User
    private selectedHeaderButton: StartHeaderButton
    static homeSelected: boolean = true
    firstSelected: boolean = true

    onLoad() {
        const config = Config.i
        this.user.courseProgressMap.forEach((val: CourseProgress, courseId: string) => {
            const headerButton = cc.instantiate(this.headerButtonPrefab)
            const headerButtonComp = headerButton.getComponent(StartHeaderButton)
            headerButtonComp.selected.node.active = false
            this.courseLayout.addChild(headerButton)
            if(this.firstSelected)
            {
                this.selectHeaderButton(headerButtonComp)
                this.firstSelected=false
            }
            const course = config.curriculum.get(courseId)
            headerButtonComp.label.string = Util.i18NText(course.name);
            Util.load(courseId + '/course/res/icons/' + courseId + '.png', (err: Error, texture) => {
                headerButtonComp.sprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
            })
            headerButtonComp.button.node.on('touchend', (event: cc.Event) => {
                if (event.target.getComponent(cc.Button).enabled) {
                    StartHeader.homeSelected = false
                    this.selectHeaderButton(headerButtonComp);
                    config.course = course;
                    if (this.onCourseClick) this.onCourseClick();
                }
            })
            if (!StartHeader.homeSelected && config.course && config.course.id == course.id) {
                this.selectHeaderButton(headerButtonComp);
            }
        })
        if (this.onRightClick) this.rightPos.on('touchend', this.onRightClick)
        this.node.width = cc.winSize.width
        const spacing = Math.max(0, (this.courseLayout.width - (this.courseLayout.childrenCount * this.courseLayout.children[0].width)) / (this.courseLayout.childrenCount + 1))
        this.courseLayout.getComponent(cc.Layout).spacingX = spacing
        this.courseLayout.getComponent(cc.Layout).paddingLeft = spacing
        this.courseLayout.getComponent(cc.Layout).paddingRight = spacing
    }

    selectHeaderButton(newButton: StartHeaderButton) {
        if (this.selectedHeaderButton != null) {
            this.selectedHeaderButton.selected.node.active = false
            this.selectedHeaderButton.button.enabled = true
        }
        newButton.selected.node.active = true
        newButton.button.enabled = false
        this.selectedHeaderButton = newButton
    }

}
