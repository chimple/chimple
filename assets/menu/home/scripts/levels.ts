import Config from "../../../common/scripts/lib/config";
import Balloon from "../../../common/scripts/balloon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Levels extends cc.Component {
    @property(cc.Node)
    button: cc.Node = null

    @property(cc.Prefab)
    balloonPrefab: cc.Prefab = null

    @property(cc.Node)
    chimp: cc.Node = null

    @property(cc.Node)
    layout: cc.Node = null

    onLoad() {
        const config = Config.getInstance();
        const levels: number = config.gameConfigs[config.game].levels;
        for (let index = 1; index <= levels; index++) {
            const node = index == 1 ? this.button : cc.instantiate(this.button)
            const label = node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label)
            label.string = config.game === 'story' ?
                config.gameConfigs[config.game].levelLabels[index] : index.toString();
            node.on('click', () => {
                this.layout.children.forEach(but => {
                    const butComp = but.getComponent(cc.Button)
                    butComp.interactable = false
                })
                const bal = cc.instantiate(this.balloonPrefab)
                bal.y = - cc.winSize.height / 2
                const balloonComp = bal.getComponent(Balloon);
                if (balloonComp != null) {
                    balloonComp.chimp = this.chimp;
                    balloonComp.game = config.game
                    balloonComp.level = index
                    if (config.gameConfigs[config.game].color != null) {
                        balloonComp.color = new cc.Color().fromHEX(config.gameConfigs[config.game].color)
                    }
                    balloonComp.label.string = config.gameConfigs[config.game].name;
                    balloonComp.onClickCallback = () => {
                        config.setGame(config.game, index)
                        config.loadGameJson(() => {
                            config.pushScene('menu/home/scenes/worksheets')
                        })
                        // config.loadAssembleScene(true)
                    }
                    this.node.addChild(bal)
                }
            }, this);
            if (index != 1) {
                this.layout.addChild(node);
            }
        }
    }

}
