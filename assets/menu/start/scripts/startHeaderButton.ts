const {ccclass, property} = cc._decorator;

@ccclass
export default class StartHeaderButton extends cc.Component {
    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Sprite)
    selected: cc.Sprite

}
