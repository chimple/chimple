import Config from "../../../common/scripts/lib/config";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import LessonButton from "./lessonButton";
import HeaderButton from "./headerButton";
import { Util } from "../../../common/scripts/util";
import ChapterContent from "./chapterContent";

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

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null

    selectedHeaderButton: HeaderButton

    onLoad() {
        const config = Config.i
        config.curriculum.forEach((course: Course, name: string) => {
            const headerButton = cc.instantiate(this.headerButtonPrefab)
            const headerButtonComp = headerButton.getComponent(HeaderButton)
            headerButtonComp.label.string = name
            headerButtonComp.selected.node.active = false
            Util.load(name + '/course/res/icons/' + name + '.png', (err, texture) => {
                if (!err) {
                    headerButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
            headerButtonComp.button.node.on('click', () => {
                this.selectHeaderButton(headerButtonComp)
                config.course = name
                this.content.removeAllChildren()
                this.content.addChild(cc.instantiate(this.courseContentPrefab))
            })
            this.header.insertChild(headerButton, 1)
        })
        this.homeButton.getComponent(HeaderButton).button.node.on('click', () => {
            this.onHomeClick()
        })
        this.header.width = cc.winSize.width
        this.header.getComponent(cc.Layout).spacingX = Math.max(0, cc.winSize.width / (config.curriculum.size + 2) - this.homeButton.width)
        this.onHomeClick()
    }

    onHomeClick() {
        this.selectHeaderButton(this.homeButton.getComponent(HeaderButton))
        this.content.removeAllChildren()
        this.content.addChild(cc.instantiate(this.startContentPrefab))
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
