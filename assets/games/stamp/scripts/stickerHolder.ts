const {ccclass, property} = cc._decorator;

@ccclass
export default class StickerHolder extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Node)
    bg: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
