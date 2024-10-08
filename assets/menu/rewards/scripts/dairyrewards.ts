import config from "../../../common/scripts/lib/config";
import Config from "../../../common/scripts/lib/config";
import ChapterLessons, { ChapterLessonType } from "../../start/scripts/chapterLessons";
import Rewards from "./rewards";
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
        this.node.getChildByName('storyReadingBG').getComponent(cc.Button).interactable = false;
        Config.i.setRewardChapter('story')
        config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')
    }

    private onCharacterModificationClick() {
        this.node.getChildByName('characterModificationBG').getComponent(cc.Button).interactable = false;
        Rewards.contentDecisionFlag = '0'
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
        // Config.i.pushScene("menu/inventory/scenes/inventory", "menu");
    }

    private onStickerPaintingClick() {
        this.node.getChildByName('stickerPaintingBG').getComponent(cc.Button).interactable = false;
        Config.i.setRewardChapter('sticker')
        config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')
    }

    private onFunGameActivityClick() {
        this.node.getChildByName('funGameActivityBG').getComponent(cc.Button).interactable = false;
        Config.i.setRewardChapter('platformer')
        config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')
    }

    private onBackgroundCollectionClick() {
        this.node.getChildByName('backgroundCollectionBG').getComponent(cc.Button).interactable = false;
        Rewards.contentDecisionFlag = '1'
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
    }

    private onBadgesCollectionClick() {
        this.node.getChildByName('badgesCollectionBG').getComponent(cc.Button).interactable = false;
        Rewards.contentDecisionFlag = '2'
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
    }

}
