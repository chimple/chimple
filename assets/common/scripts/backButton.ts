import Config from "./lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackButton extends cc.Component {
    extraFunction: Function = null

    onLoad() {
        this.node.once('touchend', () => {
            this.node.getComponent(cc.Button).interactable = false;
            if(this.extraFunction) this.extraFunction()
            Config.i.popScene()
        })
    }
}

