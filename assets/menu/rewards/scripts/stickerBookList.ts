import config from "../../../common/scripts/lib/config";
import Config from "../../../common/scripts/lib/config";
import ChapterLessons, { ChapterLessonType } from "../../start/scripts/chapterLessons";
const { ccclass, property } = cc._decorator;


@ccclass
export default class StickerBookList extends cc.Component {

    @property(cc.Prefab)
    stickerIconPrefab: cc.Prefab = null

    @property(cc.Node)
    stickerBookIconScrollView: cc.Node = null

    config = config.i

    onLoad() {

        for (let i = 0; i < this.config.stickerBook.length; i++) {
            const stickerBookIcon = cc.instantiate(this.stickerIconPrefab)
            stickerBookIcon.name = i.toString()
            this.stickerBookIconScrollView.addChild(stickerBookIcon)

        }
        this.stickerBookIconScrollView.width = 1024
        this.stickerBookIconScrollView.parent.width = this.stickerBookIconScrollView.width
        this.stickerBookIconScrollView.parent.parent.width = this.stickerBookIconScrollView.width
        this.stickerBookIconScrollView.getComponent(cc.Layout).updateLayout()
        this.stickerBookIconScrollView.parent.height = this.stickerBookIconScrollView.height

    }

    private onDairyRewardClick() {
        this.node.getChildByName('dairyRewardIcon').getComponent(cc.Button).interactable = false;
        config.i.popScene();
    }

}
