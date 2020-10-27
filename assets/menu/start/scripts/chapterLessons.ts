import Config from "../../../common/scripts/lib/config";
import LessonButton from "./lessonButton";
import { User } from "../../../common/scripts/lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChapterLessons extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Node)
    loading: cc.Node = null

    @property(cc.Node)
    bgHolder: cc.Node = null;


    onLoad() {

        this.bgHolder.removeAllChildren();
        if (!!User.getCurrentUser().currentBg) {
            this.setBackground(User.getCurrentUser().currentBg);
        } else {
            this.setBackground("forest");
        }

        const config = Config.i
        this.label.string = config.chapter.name
        config.chapter.lessons.forEach((lesson, index) => {
            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.lesson = lesson
            lessonButtonComp.loading = this.loading
            lessonButtonComp.open = (index == 0
                || lesson.open
                || User.getCurrentUser().lessonProgressMap.has(lesson.id))
            this.layout.addChild(lessonButton)
        })
        this.layout.width = cc.winSize.width
        this.layout.parent.width = cc.winSize.width
        this.layout.parent.parent.width = cc.winSize.width
        this.layout.getComponent(cc.Layout).updateLayout()
        this.layout.parent.height = this.layout.height
    }

    private setBackground(bgprefabName: string) {
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

    onBackClick() {
        Config.i.popScene()
    }
}
