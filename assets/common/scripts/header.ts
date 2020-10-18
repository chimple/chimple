import HeaderButton from "./headerButton";

import Config from "./lib/config";

import { User, CourseProgress } from "./lib/profile";

import { Util } from "./util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Header extends cc.Component {
    @property(cc.Node)
    courseLayout: cc.Node = null;

    @property(cc.Prefab)
    headerButtonPrefab: cc.Prefab = null

    @property()
    showHome = true

    @property(cc.Node)
    homePos: cc.Node = null

    @property(cc.Node)
    rightPos: cc.Node = null

    onCourseClick: Function
    onHomeClick: Function
    onRightClick: Function
    user: User
    private selectedHeaderButton: HeaderButton
    static homeSelected: boolean = true

    onLoad() {
        const config = Config.i
        this.user.courseProgressMap.forEach((val: CourseProgress, courseId: string) => {
            const headerButton = cc.instantiate(this.headerButtonPrefab)
            const headerButtonComp = headerButton.getComponent(HeaderButton)
            headerButtonComp.selected.node.active = false
            this.courseLayout.addChild(headerButton)
            const course = config.curriculum.get(courseId)
            headerButtonComp.label.string = course.name
            Util.load(courseId + '/course/res/icons/' + courseId + '.png', (err: Error, texture) => {
                headerButtonComp.sprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
            })
            headerButtonComp.button.node.on('touchend', (event: cc.Event) => {
                if (event.target.getComponent(cc.Button).enabled) {
                    Header.homeSelected = false
                    this.selectHeaderButton(headerButtonComp);
                    config.course = course;
                    if (this.onCourseClick) this.onCourseClick();
                }
            })
            if (!Header.homeSelected && config.course && config.course.id == course.id) {
                this.selectHeaderButton(headerButtonComp);
            }
        })
        if (this.showHome) {
            const homeButton = cc.instantiate(this.headerButtonPrefab)
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
                }
            })
            homeButtonComp.label.string = Util.i18NText('Home')
            this.homePos.addChild(homeButton)
            homeButtonComp.selected.node.active = false
            if (Header.homeSelected) this.selectHeaderButton(homeButtonComp)
        }
        if (this.onRightClick) this.rightPos.on('touchend', this.onRightClick)
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

}
