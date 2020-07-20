import Config from "../../../common/scripts/lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameButton extends cc.Component {
    @property
    gameName: string = null;

    @property
    gameScene: string = null;

    game: string = null;

    onButtonClick(event, customEventData) {
        const config = Config.getInstance();
        config.game = this.game;
        config.pushScene('menu/home/scenes/levels');
    }

    onLoad() {
        this.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = this.game;
        this.node.getChildByName('Background').getChildByName('LocalName').getComponent(cc.Label).string = this.gameName;
    }
}
