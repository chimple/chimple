import Config from "../../../common/scripts/lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackButton extends cc.Component {
    // onLoad() {
        // this.node.zIndex = 2
    // }

    onButtonClick(event, customEventData) {
        Config.getInstance().popScene()
    }
}

