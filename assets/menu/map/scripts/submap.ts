import Config from "../../../common/scripts/lib/config";
import Balloon from "../../../common/scripts/balloon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Submap extends cc.Component {
    @property(cc.Prefab)
    balloonPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    onLoad() {
        const config = Config.getInstance()
        config.currentLevelGames().forEach((val) => {
            const game = val[0]
            const gameLevel = parseInt(val[1])
            const balloon = cc.instantiate(this.balloonPrefab)
            balloon.scale = 0.5
            const balloonComp = balloon.getComponent(Balloon)
            balloonComp.game = game
            balloonComp.label.string = config.gameConfigs[game].name
            if (config.gameConfigs[game].color != null) {
                balloonComp.color = new cc.Color().fromHEX(config.gameConfigs[game].color);
            }
            balloonComp.chimp = balloon //TODO: need to revamp chimp in balloon
            balloonComp.onClickCallback = () => {
                config.setGame(game, gameLevel);
                config.pushScene('common/scenes/lesson')
            }
            this.layout.addChild(balloon)
        })
    }
}
