import Config from "../../../common/scripts/lib/config";
import { User } from "../../../common/scripts/lib/profile";
import ChapterMenuButton from "./chapterMenuButton";
import StartContent from "./startContent";
import {Util} from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

const HEADER_COLORS = {
    'en': '#FFBC00',
    'maths': '#42C0FF',
    'hi': '#009158',
    'puzzle': '#FF5500',
    'test-lit': '#FFBC00',
    'test-maths': '#42C0FF'
}

@ccclass
export default class CourseChapters extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    chaptersLayout: cc.Node = null

    @property(cc.Prefab)
    chapterMenuButtonPrefab: cc.Prefab = null

    @property(cc.Label)
    title: cc.Label = null

    @property(cc.Node)
    loading: cc.Node = null

    @property(cc.Node)
    bgHolder: cc.Node = null;

    @property(cc.Node)
    header: cc.Node = null;

    onLoad() {
        this.setBackground()
        const config = Config.i
        this.title.string = Util.i18NText(config.course.name);
        for (const chapter of config.course.chapters) {
            if(chapter.id == config.course.id + '_quiz') continue
            const chapterMenuButton = cc.instantiate(this.chapterMenuButtonPrefab)
            const chapterMenuButtonComp = chapterMenuButton.getComponent(ChapterMenuButton)
            chapterMenuButtonComp.chapter = chapter
            this.chaptersLayout.addChild(chapterMenuButton)
        }
        this.chaptersLayout.width = cc.winSize.width
        this.chaptersLayout.parent.width = cc.winSize.width
        this.chaptersLayout.parent.parent.width = cc.winSize.width
        this.chaptersLayout.getComponent(cc.Layout).updateLayout()
        this.chaptersLayout.parent.height = this.chaptersLayout.height
        const color = HEADER_COLORS[config.course.id]
        if(color) this.header.color = new cc.Color().fromHEX(color)
    }

    private setBackground() {
        this.bgHolder.removeAllChildren();
        const bgprefabName = !!User.getCurrentUser().currentBg ? User.getCurrentUser().currentBg : 'camp'

        cc.resources.load(`backgrounds/prefabs/${bgprefabName}`, (err, sp) => {
            let bgPrefabInstance = cc.instantiate(sp);
            // @ts-ignore
            bgPrefabInstance.y = 0
            // @ts-ignore
            bgPrefabInstance.x = 0
            // @ts-ignore
            this.bgHolder.addChild(bgPrefabInstance);
            // userButtonRef.getChildByName("Background").getChildByName("avatar").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
    }

}
