import Config from "../../../common/scripts/lib/config";
import { User } from "../../../common/scripts/lib/profile";
import ChapterMenuButton from "./chapterMenuButton";
import StartContent from "./startContent";

const {ccclass, property} = cc._decorator;

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

    onLoad() {
        this.setBackground()
        const config = Config.i
        this.title.string = config.course.name
        const isPreQuiz = !User.getCurrentUser().courseProgressMap.get(config.course.id).currentChapterId
        if (isPreQuiz) {
            this.chaptersLayout.addChild(StartContent.createPreQuizButton(config.course, this.lessonButtonPrefab, this.loading))
        }
        for (const chapter of config.course.chapters) {
            const chapterMenuButton = cc.instantiate(this.chapterMenuButtonPrefab)
            const chapterMenuButtonComp = chapterMenuButton.getComponent(ChapterMenuButton)
            chapterMenuButtonComp.chapter = chapter
            chapterMenuButtonComp.open = !isPreQuiz
            this.chaptersLayout.addChild(chapterMenuButton)
        }
        this.chaptersLayout.width = cc.winSize.width
        this.chaptersLayout.parent.width = cc.winSize.width
        this.chaptersLayout.parent.parent.width = cc.winSize.width
        this.chaptersLayout.getComponent(cc.Layout).updateLayout()
        this.chaptersLayout.parent.height = this.chaptersLayout.height
    }

    private setBackground() {
        this.bgHolder.removeAllChildren();
        const bgprefabName = !!User.getCurrentUser().currentBg ? User.getCurrentUser().currentBg : 'forest'

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
