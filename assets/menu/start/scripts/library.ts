import Config from "../../../common/scripts/lib/config";

import Profile, { User } from "../../../common/scripts/lib/profile";

import LessonButton from "./lessonButton";

import { Util } from "../../../common/scripts/util";
import HeaderButton from "./headerButton";
import ChapterContent from "./chapterContent";
import { Course } from "../../../common/scripts/lib/convert";

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
        const courseProgress = User.getCurrentUser().courseProgressMap
        let first: boolean = true
        config.curriculum.forEach((course: Course, name: string) => {
            const headerButton = cc.instantiate(this.headerButtonPrefab)
            const headerButtonComp = headerButton.getComponent(HeaderButton)
            headerButtonComp.label.string = name
            Util.load(name + '/course/res/icons/' + name + '.png', (err, texture) => {
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
        })
    }

    renderBody(name: string, course: Course) {
        const config = Config.i
        config.course = name
        this.layout.removeAllChildren()
        let lessonContentNode: cc.Node = null
        for (const chapter of course.chapters) {
            const chapterContents = cc.instantiate(this.chapterContentsPrefab)
            const chapterContentsComp = chapterContents.getComponent(ChapterContent)
            chapterContentsComp.label.string = chapter.name
            this.layout.addChild(chapterContents)
            lessonContentNode = chapterContentsComp.layout
            for (const lesson of chapter.lessons) {
                const lessonButton = cc.instantiate(this.lessonButtonPrefab)
                const lessonButtonComp = lessonButton.getComponent(LessonButton)
                lessonButtonComp.courseName = name
                lessonButtonComp.chapter = chapter
                lessonButtonComp.lesson = lesson
                    lessonContentNode.addChild(lessonButton)
            }
            const lessonContentLayout = lessonContentNode.getComponent(cc.Layout)
            if (lessonContentLayout != null) lessonContentLayout.updateLayout()
            const chapterContentLayout = chapterContents.getComponent(cc.Layout)
            if (chapterContentLayout != null) chapterContentLayout.updateLayout()
        }
        // this.layout.children.forEach((child: cc.Node) => {
        //     const lessonContentLayout = child.getComponent(cc.Layout)
        //     if (lessonContentLayout != null) lessonContentLayout.updateLayout()
        // })
        const layoutComp = this.layout.getComponent(cc.Layout)
        layoutComp.updateLayout()
        this.layout.parent.height = this.layout.height
    }

    onBackClick() {
        Config.i.popScene()
    }

}
