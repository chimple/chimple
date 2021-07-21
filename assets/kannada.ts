const {ccclass, property} = cc._decorator;

@ccclass
export default class Kannada extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.width = 256
    }

    start () {
        this.node.width = 256
    }

    // update (dt) {}
}
