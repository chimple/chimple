import { Gender } from "../../../../common/scripts/lib/profile";
import CollectUserInfo from './collectUserInfo';
const { ccclass, property } = cc._decorator;

@ccclass
export default class AgeAndGender extends cc.Component {
    @property(cc.Node)
    ageNode: cc.Node = null;

    @property(cc.Node)
    genderNode: cc.Node = null;

    lastSelectedGender: number = -1;
    normalSprite: cc.SpriteFrame = null;

    lastSelectedAge: number = -1;
    normalAgeSprite: cc.SpriteFrame = null;

    @property(cc.Label)
    nextButtonLabel: cc.Label = null;

    onAgeClick(event) {
        for (let i = 0; i < this.ageNode.childrenCount; i++) {
            this.ageNode.children[i].getChildByName("tick").active = false
        }
        event.target.getChildByName("tick").active = true
        this.node.getParent().getParent().getComponent(CollectUserInfo).userAge = parseInt(event.currentTarget.name);
        this.node.getParent().getParent().getComponent(CollectUserInfo).enableButton()
        this.node.getParent().getParent().getComponent(CollectUserInfo).enableNextButton = true

    }

    onGenderClick(event) {
        let nodeName = ("indiegenderprefab" + this.lastSelectedGender.toString())
        // reset last selected first
        if (this.lastSelectedGender > -1) {
            this.genderNode.getChildByName(nodeName).getChildByName(this.lastSelectedGender.toString()).getComponent(cc.Button).pressedSprite = this.genderNode.getChildByName(nodeName).getChildByName(this.lastSelectedGender.toString()).getComponent(cc.Button).normalSprite
            this.genderNode.getChildByName(nodeName).getChildByName(this.lastSelectedGender.toString()).getComponent(cc.Button).normalSprite = this.normalAgeSprite
            this.genderNode.getChildByName(nodeName).getChildByName(this.lastSelectedGender.toString()).getChildByName("tick").active = false
        }
        nodeName = ("indiegenderprefab" + event.currentTarget.name)
        this.normalAgeSprite = this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite
        this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite = this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite
        this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite = this.normalAgeSprite
        this.genderNode.getChildByName(nodeName).getChildByName(event.currentTarget.name).getChildByName("tick").active = true
        this.lastSelectedGender = parseInt(event.currentTarget.name)
        if (this.lastSelectedGender === 0) {
            this.node.getParent().getParent().getComponent(CollectUserInfo).userGender = Gender.BOY
        } else if (this.lastSelectedGender === 1) {
            this.node.getParent().getParent().getComponent(CollectUserInfo).userGender = Gender.GIRL
        }
    }
}

