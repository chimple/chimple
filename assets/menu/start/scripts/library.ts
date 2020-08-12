import Config from "../../../common/scripts/lib/config";

import Profile from "../../../common/scripts/lib/profile";

import LessonButton from "./lessonButton";

import { Util } from "../../../common/scripts/util";
import HeaderButton from "./headerButton";
import ChapterContents from "./chapterContents";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Library extends cc.Component {
    @property(cc.Node)
    layout: cc.Node = null

    @property(cc.Node)
    header: cc.Node = null

    @property(cc.Prefab)
    chapterContentsPrefab: cc.Prefab = null

    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Prefab)
    headerButtonPrefab: cc.Prefab = null

    onLoad() {
        const config = Config.i
        const courseProgress = Profile.getCurrentUser().courseProgress
        let first: boolean = true
        for (let [name, course] of Object.entries(config.courses)) {
            const headerButton = cc.instantiate(this.headerButtonPrefab)
            const headerButtonComp = headerButton.getComponent(HeaderButton)
            headerButtonComp.label.string = name
            Util.load(name + '/common/res/icons/' + name + '.png', (err, texture) => {
                if (!err) {
                    headerButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
            headerButtonComp.button.node.on('click', () => {
                this.renderBody(name, course)
            })
            this.header.addChild(headerButton)
            if (first) {
                this.renderBody(name, course)
                first = false
            }
        }
    }

    renderBody(name, course) {
        const config = Config.i
        this.layout.removeAllChildren()
        let category: string = null
        let lessonContentNode: cc.Node = null
        for (const lesson of course.lessons) {
            if (lesson.category != category) {
                category = lesson.category
                const chapterContents = cc.instantiate(this.chapterContentsPrefab)
                const chapterContentsComp = chapterContents.getComponent(ChapterContents)
                chapterContentsComp.label.string = category
                this.layout.addChild(chapterContents)
                lessonContentNode = chapterContentsComp.layout
            }
            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.label.string = lesson.name
            Util.load(name + '/' + lesson.id + '/' + lesson.id + '.png', (err, texture) => {
                if (!err) {
                    lessonButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
            lessonButtonComp.button.node.on('click', () => {
                config.lesson = lesson.id
                config.pushScene('common/scenes/lesson')
            })
            lessonContentNode.addChild(lessonButton)
        }
        this.layout.children.forEach((child: cc.Node) => {
            const lessonContentLayout = child.getComponent(cc.Layout)
            if (lessonContentLayout != null) lessonContentLayout.updateLayout()
        })
        const layoutComp = this.layout.getComponent(cc.Layout)
        layoutComp.updateLayout()
        this.layout.parent.height = this.layout.height
    }

}
