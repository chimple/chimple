import { Util } from "./util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CommonButton extends cc.Component {
    @property
    text: string = 'hello';

    onLoad () {
        const bg = this.node.children[0]
        const label = bg.children[0]
        const labelComp = label.getComponent(cc.Label)
        labelComp.string = Util.i18NText(this.text)
    }
}
