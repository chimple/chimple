import Config from '../../../common/scripts/lib/config'
import Profile from '../../../common/scripts/lib/profile';
const { ccclass, property } = cc._decorator;

@ccclass
export default class Rewards extends cc.Component {

    @property(cc.Node)
    layoutHolder: cc.Node = null;
    normalSprite: cc.SpriteFrame = null;
    lastSelectedButton: number = -1;

    leftSideNormalSprite: cc.SpriteFrame = null;
    leftSideLastSelectedButton: number = -1;

    onLoad() {
        this.layoutHolder.getChildByName("0").active = true
        this.node.getChildByName("side_buttons_layout").children["0"].opacity = 255
    }

    start() { }

    onContentClick(event, customEventData) {
        for (let i = 0; i < 3; i++) {
            if (parseInt(customEventData) === i) {
                this.layoutHolder.getChildByName(i.toString()).active = true
                // reset last selected first
                if (this.leftSideLastSelectedButton > -1) {
                    this.node.getChildByName("side_buttons_layout").children[this.leftSideLastSelectedButton].getComponent(cc.Button).pressedSprite = this.node.getChildByName("side_buttons_layout").children[this.leftSideLastSelectedButton].getComponent(cc.Button).normalSprite
                    this.node.getChildByName("side_buttons_layout").children[this.leftSideLastSelectedButton].getComponent(cc.Button).normalSprite = this.leftSideNormalSprite
                }
                this.leftSideNormalSprite = this.node.getChildByName("side_buttons_layout").children[i].getComponent(cc.Button).normalSprite
                this.node.getChildByName("side_buttons_layout").children[i].getComponent(cc.Button).normalSprite = this.node.getChildByName("side_buttons_layout").children[i].getComponent(cc.Button).pressedSprite
                this.node.getChildByName("side_buttons_layout").children[i].getComponent(cc.Button).pressedSprite = this.leftSideNormalSprite
                this.leftSideLastSelectedButton = i
            }
            else {
                this.layoutHolder.getChildByName(i.toString()).active = false
            }

        }
    }

    onCharacterClick(event, customEventData) {
        console.log("hello character");
        let nodeName = ("indi_button_prefab" + this.lastSelectedButton.toString())
        // reset last selected first
        if (this.lastSelectedButton > -1) {
            this.layoutHolder.getChildByName("0").getChildByName("view").getChildByName("0").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getComponent(cc.Button).pressedSprite = this.layoutHolder.getChildByName("0").getChildByName("view").getChildByName("0").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getComponent(cc.Button).normalSprite
            this.layoutHolder.getChildByName("0").getChildByName("view").getChildByName("0").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getComponent(cc.Button).normalSprite = this.normalSprite
        }
        nodeName = ("indi_button_prefab" + event.currentTarget.name)
        this.normalSprite = this.layoutHolder.getChildByName("0").getChildByName("view").getChildByName("0").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite
        this.layoutHolder.getChildByName("0").getChildByName("view").getChildByName("0").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite = this.layoutHolder.getChildByName("0").getChildByName("view").getChildByName("0").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite
        this.layoutHolder.getChildByName("0").getChildByName("view").getChildByName("0").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite = this.normalSprite
        this.lastSelectedButton = parseInt(event.currentTarget.name)

        // save to profile
        Profile.getCurrentUser().setCurrentCharacter(customEventData.toString().trim());
        // switch scene
        Config.getInstance().pushScene("inventory");
    }

    onBgClick(event, customEventData) {
        let nodeName = ("bg_button_prefab" + this.lastSelectedButton.toString())
        // reset last selected first
        if (this.lastSelectedButton > -1) {
            this.layoutHolder.getChildByName("1").getChildByName("view").getChildByName("1").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getComponent(cc.Button).pressedSprite = this.layoutHolder.getChildByName("1").getChildByName("view").getChildByName("1").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getComponent(cc.Button).normalSprite
            this.layoutHolder.getChildByName("1").getChildByName("view").getChildByName("1").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getComponent(cc.Button).normalSprite = this.normalSprite
        }
        nodeName = ("bg_button_prefab" + event.currentTarget.name)

        // this.normalSprite = this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite
        this.normalSprite = this.layoutHolder.getChildByName("1").getChildByName("view").getChildByName("1").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite
        // this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite = this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite
        this.layoutHolder.getChildByName("1").getChildByName("view").getChildByName("1").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite = this.layoutHolder.getChildByName("1").getChildByName("view").getChildByName("1").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite
        // this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite = this.normalSprite
        this.layoutHolder.getChildByName("1").getChildByName("view").getChildByName("1").getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite = this.normalSprite
        this.lastSelectedButton = parseInt(event.currentTarget.name)

        // save to profile
        Profile.getCurrentUser().setCurrentBg(customEventData.toString().trim());
    }
}
