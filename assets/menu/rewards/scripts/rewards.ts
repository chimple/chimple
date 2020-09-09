import Config from '../../../common/scripts/lib/config'
import Profile, { User } from '../../../common/scripts/lib/profile';
const { ccclass, property } = cc._decorator;

@ccclass
export default class Rewards extends cc.Component {

    @property(cc.Node)
    layoutHolder: cc.Node = null;
    normalSprite: cc.SpriteFrame = null;
    lastSelectedButton: number = -1;
    leftSideNormalSprite: cc.SpriteFrame = null;

    @property(cc.Node)
    sideLayoutNode: cc.Node = null;

    onLoad() { }

    onContentClick(event, customEventData) {
        for (let i = 0; i < 3; i++) {
            if (parseInt(customEventData) === i) {
                this.layoutHolder.getChildByName(i.toString()).active = true
                let color = cc.Color.BLACK;
                this.sideLayoutNode.children[i].getChildByName("Background").color = color.fromHEX("#17ADEC")
                this.sideLayoutNode.children[i].getChildByName("Background").children[0].color = color.fromHEX("#17ADEC")
            }
            else {
                this.layoutHolder.getChildByName(i.toString()).active = false
                let color = cc.Color.BLACK;
                this.sideLayoutNode.children[i].getChildByName("Background").color = color.fromHEX("#FFFFFF")
                this.sideLayoutNode.children[i].getChildByName("Background").children[0].color = color.fromHEX("#FFFFFF")
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
        User.getCurrentUser().currentCharacter = customEventData.toString().trim();
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
        User.getCurrentUser().currentBg = customEventData.toString().trim();
    }
}
