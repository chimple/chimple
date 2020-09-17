import Config from "./lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackButton extends cc.Component {
    onLoad() {
        this.node.on('click', () => {
            Config.i.popScene()
        })
    }
}

