import Config from "../../../common/scripts/lib/config";
import GameButton from "./gameButton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Games extends cc.Component {
    @property(cc.Prefab)
    gameButtonPrefab: cc.Prefab = null;

    onLoad() {
        const config = Config.getInstance();
        const games = []
        for (const game in config.gameConfigs) {
            games.push(game)
        }
        games.sort()
        games.forEach(game => {
            const element = config.gameConfigs[game];
            const gameButton = cc.instantiate(this.gameButtonPrefab);
            const gameButtonComp = gameButton.getComponent(GameButton);
            gameButtonComp.gameName = element.name;
            gameButtonComp.gameScene = element.scene;
            gameButtonComp.game = game;
            this.node.getChildByName('Layout').addChild(gameButton);
        })
    }
}
