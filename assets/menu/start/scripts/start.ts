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

    onLoad() {
        const config = Config.i
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
                config.course = name
                this.content.removeAllChildren()
                this.content.addChild(cc.instantiate(this.courseContentPrefab))
            })
            this.header.insertChild(headerButton, 1)
            this.onHomeClick()
        })
    }

    onHomeClick() {
        this.content.removeAllChildren()
        this.content.addChild(cc.instantiate(this.startContentPrefab))
    }

    onProfileClick() {
        Config.i.pushScene('menu/inventory/scenes/inventory', 'menu')
    }
}
