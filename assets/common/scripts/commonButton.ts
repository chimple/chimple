import { Util } from "./util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CommonButton extends cc.Component {
    @property
    text: string = 'hello';

    @property(cc.Label)
    label: cc.Label = null

    onLoad () {
        this.label.string = Util.i18NText(this.text)
    }

    start() {
        this.node.width = this.label.node.width + 48
    }
}
