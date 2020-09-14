import Config from "../../../common/scripts/lib/config";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import LessonButton from "./lessonButton";
import HeaderButton from "./headerButton";
import { Util } from "../../../common/scripts/util";
import ChapterContent from "./chapterContent";
import StartContent from "./startContent";
import CourseContent from "./courseContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {
    @property(cc.Node)
    content: cc.Node = null

    @property(cc.Prefab)
    startContentPrefab: cc.Node = null

    @property(cc.Prefab)
    courseContentPrefab: cc.Node = null

    @property(cc.Node)
    header: cc.Node = null

    @property(cc.Prefab)
    headerButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    homeButton: cc.Node = null

    @property(cc.Node)
    loading: cc.Node = null;

    selectedHeaderButton: HeaderButton

    onLoad() {
        this.loading.width = cc.winSize.width
        const config = Config.i
        let index = 0
        User.getCurrentUser().courseProgressMap.forEach(() => {
            const headerButton = cc.instantiate(this.headerButtonPrefab)
            const headerButtonComp = headerButton.getComponent(HeaderButton)
            headerButtonComp.label.string = ''
            headerButtonComp.sprite.spriteFrame = null
            headerButtonComp.selected.node.active = false
            this.header.insertChild(headerButton, ++index)
        })
        this.homeButton.getComponent(HeaderButton).button.node.on('click', () => {
            this.onHomeClick()
        })
        this.header.width = cc.winSize.width
        this.header.getComponent(cc.Layout).spacingX = Math.max(0, cc.winSize.width / (index + 2) - this.homeButton.width)
        index = 0
        config.loadCourseJsons(this.node, () => {
            config.curriculum.forEach((course: Course, name: string) => {
                const headerButton = this.header.children[++index]
                const headerButtonComp = headerButton.getComponent(HeaderButton)
                headerButtonComp.label.string = name
                Util.load(name + '/course/res/icons/' + name + '.png', (err, texture) => {
                    if (!err) {
                        headerButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                    }
                })
                headerButtonComp.button.node.on('click', () => {
                    this.selectHeaderButton(headerButtonComp)
                    config.courseId = name
                    config.course = course
                    this.content.removeAllChildren()
                    const courseContent = cc.instantiate(this.courseContentPrefab)
                    const courseContentComp = courseContent.getComponent(CourseContent)
                    courseContentComp.loading = this.loading
                    courseContentComp.content = this.content
                    this.content.addChild(courseContent)
                })
            })
            this.onHomeClick()
            this.loading.active = false
        })
    }

    onHomeClick() {
        this.selectHeaderButton(this.homeButton.getComponent(HeaderButton))
        this.content.removeAllChildren()
        const startContent = cc.instantiate(this.startContentPrefab)
        const startContentComp = startContent.getComponent(StartContent)
        startContentComp.loading = this.loading
        this.content.addChild(startContent)
    }

    onProfileClick() {
        Config.i.pushScene('menu/inventory/scenes/inventory', 'menu')
    }

    selectHeaderButton(newButton: HeaderButton) {
        if (this.selectedHeaderButton != null) this.selectedHeaderButton.selected.node.active = false
        newButton.selected.node.active = true
        this.selectedHeaderButton = newButton
    }
}
