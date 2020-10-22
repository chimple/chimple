import { User, CourseProgress } from "../../../common/scripts/lib/profile";
import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import HeaderButton from "../../../common/scripts/headerButton";
import Header from "../../../common/scripts/header";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Drawer extends cc.Component {
    @property(cc.Node)
    courseLayout: cc.Node = null;

    @property(cc.Prefab)
    drawerButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    block: cc.Node = null

    onCourseClick: Function
    onHomeClick: Function
    onRightClick: Function
    private selectedHeaderButton: HeaderButton

    onLoad() {
        const config = Config.i
        this.courseLayout.x = - cc.winSize.width / 2 - 256
        const homeButton = cc.instantiate(this.drawerButtonPrefab)
        const homeButtonComp = homeButton.getComponent(HeaderButton)
        homeButtonComp.button.node.on('touchend', (event: cc.Event) => {
            if (event.target.getComponent(cc.Button).enabled) {
                Header.homeSelected = true
                const config = Config.i
                config.course = null
                config.chapter = null
                config.lesson = null
                this.selectHeaderButton(homeButtonComp)
                if (this.onHomeClick) this.onHomeClick()
                this.closeDrawer()
            }
        })
        homeButtonComp.label.string = Util.i18NText('Home')
        this.courseLayout.addChild(homeButton)
        homeButtonComp.selected.node.active = false
        if (Header.homeSelected) this.selectHeaderButton(homeButtonComp)
        User.getCurrentUser().courseProgressMap.forEach((val: CourseProgress, courseId: string) => {
            const drawerButton = cc.instantiate(this.drawerButtonPrefab)
            const drawerButtonComp = drawerButton.getComponent(HeaderButton)
            drawerButtonComp.selected.node.active = false
            this.courseLayout.addChild(drawerButton)
            const course = config.curriculum.get(courseId)
            drawerButtonComp.label.string = course.name
            Util.load(courseId + '/course/res/icons/' + courseId + '.png', (err: Error, texture) => {
                drawerButtonComp.sprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
            })
            drawerButtonComp.button.node.on('touchend', (event: cc.Event) => {
                if (event.target.getComponent(cc.Button).enabled) {
                    Header.homeSelected = false
                    this.selectHeaderButton(drawerButtonComp);
                    config.course = course;
                    if (this.onCourseClick) this.onCourseClick();
                    this.closeDrawer()
                }
            })
            if (!Header.homeSelected && config.course && config.course.id == course.id) {
                this.selectHeaderButton(drawerButtonComp);
            }
        })

        this.node.width = cc.winSize.width
        const spacing = Math.max(0, (this.courseLayout.width - (this.courseLayout.childrenCount * this.courseLayout.children[0].width)) / (this.courseLayout.childrenCount + 1))
        this.courseLayout.getComponent(cc.Layout).spacingX = spacing
        this.courseLayout.getComponent(cc.Layout).paddingLeft = spacing
        this.courseLayout.getComponent(cc.Layout).paddingRight = spacing
    }

    selectHeaderButton(newButton: HeaderButton) {
        if (this.selectedHeaderButton != null) {
            this.selectedHeaderButton.selected.node.active = false
            this.selectedHeaderButton.button.enabled = true
        }
        newButton.selected.node.active = true
        newButton.button.enabled = false
        this.selectedHeaderButton = newButton
    }

    onEnable() {
        this.block.active = true
        this.block.on('touchend', () => {
            this.closeDrawer()
        })
        new cc.Tween().target(this.courseLayout)
            .to(0.5, {x: - cc.winSize.width / 2}, { progress: null, easing: 'cubicInOut' })
            .start()
    }

    closeDrawer() {
        new cc.Tween().target(this.courseLayout)
        .to(0.5, {x: - cc.winSize.width / 2 - 256}, { progress: null, easing: 'cubicInOut' })
        .call(() => {
            this.node.active = false
        })
        .start()
    }
}
