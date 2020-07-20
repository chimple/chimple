import Config from "../../../common/scripts/lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Worksheets extends cc.Component {
    @property(cc.Node)
    button: cc.Node = null

    onLoad() {
        const config = Config.getInstance();
        const worksheets: number = config.totalWorksheets;
        for (let index = 1; index <= worksheets; index++) {
            const node = index == 1 ? this.button : cc.instantiate(this.button)
            const label = node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label)
            label.string = index.toString();
            node.on('click', () => {
                this.node.getChildByName('Layout').children.forEach(but => {
                    const butComp = but.getComponent(cc.Button)
                    butComp.interactable = false
                })
                config.worksheet = index
                config.problem = 0
                config.totalProblems = 0
                config.loadAssembleScene(true)
            }, this);
            if (index != 1) {
                this.node.getChildByName('Layout').addChild(node);
            }
        }
    }

}
