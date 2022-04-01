import config from "../../../common/scripts/lib/config";
import Config from "../../../common/scripts/lib/config";
import ChapterLessons, { ChapterLessonType } from "../../start/scripts/chapterLessons";
const { ccclass, property } = cc._decorator;


@ccclass
export default class DairyRewards extends cc.Component {

    onLoad() {

    }

    private onHomeClick() {
        this.node.getChildByName('homeicon').getComponent(cc.Button).interactable = false;
        Config.i.pushScene('menu/start/scenes/start', 'menu');
    }

    private onStoryReadingClick() {
        // this.node.getChildByName('homeicon').getComponent(cc.Button).interactable = false;
        // Config.i.pushScene('menu/start/scenes/start', 'menu');
    }

    private onCharacterModificationClick() {
        this.node.getChildByName('characterModificationBG').getComponent(cc.Button).interactable = false;
        Config.i.pushScene("menu/inventory/scenes/inventory", "menu");
    }

    private onStickerPaintingClick() {
        this.node.getChildByName('stickerPaintingBG').getComponent(cc.Button).interactable = false;
        Config.i.pushScene('menu/rewards/scenes/stickerBookList', 'menu')
    }

    private onFunGameActivityClick() {
        this.node.getChildByName('funGameActivityBG').getComponent(cc.Button).interactable = false;
        config.i.course = config.i.curriculum.get('puzzle')
        config.i.chapter = config.i.course.chapters.find((c) => c.id == 'puzzle02')
        config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')
    }

    private onBadgesCollectionClick() {
        this.node.getChildByName('badgesCollectionBG').getComponent(cc.Button).interactable = false;
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
    }

}
