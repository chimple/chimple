import Profile, { User, IN_LOGIN_FLOW } from "../../../common/scripts/lib/profile";
import { INVENTORY_DATA, INVENTORY_SAVE_CONSTANTS, REWARD_TYPES, Util, INVENTORY_ANIMATIONS } from "../../../common/scripts/util";
import Item from "./item";
import Config from "../../../common/scripts/lib/config";
import Start from "../../start/scripts/start";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Inventory extends cc.Component {

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property(cc.Node)
    doneButtonNode: cc.Node = null;

    @property(cc.Node)
    bgNode: cc.Node = null;

    @property(cc.Node)
    crossButtonNode: cc.Node = null;

    @property(cc.ScrollView)
    scrollViewNode: cc.ScrollView = null;

    @property()
    scrollValue: number = 100;

    @property(cc.Node)
    individualLayoutNode: cc.Node = null;

    currentScrollValue: number = 1000

    lastSelectedButton: number = 0;
    characterName: string = "bear"

    normalSprite: cc.SpriteFrame = null;
    onLoad() {
        try {
            this.characterName = User.getCurrentUser().currentCharacter;
        } catch (err) {
            console.log("error reading character name");
        }

        this.buildIndividualItems(INVENTORY_DATA[0])

        Util.loadFriend((friendNode: cc.Node) => {
            friendNode.name = `${User.getCurrentUser().currentCharacter}_dragon`
            friendNode.x = -270
            friendNode.y = -212
            console.log(this.node, " hello ");
            this.node.addChild(friendNode)
            Util.loadAccessoriesAndEquipAcc(friendNode.children[1], friendNode)
        })

        if (Profile.getItem(IN_LOGIN_FLOW) === 0) {
            this.doneButtonNode.active = false;
        }
        else {
            if (this.crossButtonNode != null)
                this.crossButtonNode.active = false;
            this.bgNode.active = true
        }
        // for testing only
        // Profile.createUser("AK", Language.ENGLISH, "", 12, Gender.BOY)
    }

    onDoneButtonClick(event) {
        this.doneButtonNode.getComponent(cc.Button).interactable = false
        Util.preloadStartScene(this.node, cc.director.getScene().getChildByName('Canvas').getChildByName('loading'))
        // Config.i.pushScene('menu/start/scenes/start', 'menu', null);
        User.getCurrentUser().openOnlyTheSelectedRewards("chimp")
        Profile.setItem(IN_LOGIN_FLOW, 0)
    }

    onInventoryButtonClick(event) {
        let nodeName = ("acc" + this.lastSelectedButton.toString())
        // reset last selected first
        if (this.lastSelectedButton > -1) {
            let color = cc.Color.BLACK;
            this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getChildByName("Background").color = color.fromHEX("#282C65")
            this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(this.lastSelectedButton.toString()).getChildByName("icon").color = color.fromHEX("#FFFFFF")
        }
        nodeName = ("acc" + event.currentTarget.name)
        let color = cc.Color.BLACK;
        this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(event.currentTarget.name).getChildByName("Background").color = color.fromHEX("#FFFFFF")
        this.node.getChildByName("acc_layout").getChildByName(nodeName).getChildByName(event.currentTarget.name).getChildByName("icon").color = color.fromHEX("#282C65FFFFFF")
        // recreate list
        this.buildIndividualItems(INVENTORY_DATA[parseInt(event.currentTarget.name)])
        this.lastSelectedButton = parseInt(event.currentTarget.name)
    }

    scrollRight() {
        const scrollView = this.node.getChildByName("scrollview").getComponent(cc.ScrollView)
        if (this.currentScrollValue < scrollView.getMaxScrollOffset().x + 1000)
            this.currentScrollValue += this.scrollValue
        const posInView = this.node.convertToNodeSpace(cc.v2(this.currentScrollValue, 0));

        scrollView.scrollToOffset(new cc.Vec2(Math.abs(posInView.x) - cc.winSize.width / 2, 0), 2.0);
    }

    scrollLeft() {
        if (this.currentScrollValue > 1000)
            this.currentScrollValue -= this.scrollValue
        const posInView = this.node.convertToNodeSpace(cc.v2(this.currentScrollValue, 0));
        const scrollView = this.node.getChildByName("scrollview").getComponent(cc.ScrollView)
        scrollView.scrollToOffset(new cc.Vec2(Math.abs(posInView.x) - cc.winSize.width / 2, 0), 2.0);
    }

    buildIndividualItems(items) {
        this.layoutNode.removeAllChildren();
        // create new list
        items.forEach((element, index) => {
            const item = cc.instantiate(this.itemPrefab);
            item.name = element;
            item.getChildByName("New Button").getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).getComponent(cc.Sprite).spriteFrame;
            item.getChildByName("New Button").height = this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).height
            item.getChildByName("New Button").width = this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).width
            const rewardItemName: number = User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[3]}-${this.characterName}-${element}`]
            let itemComp = item.getComponent(Item);
            if (!rewardItemName) {
                item.getChildByName("New Button").getChildByName("lock_icon").active = true
                itemComp.isLocked = true;
            }

            itemComp.onClickCallback = (name, isLocked) => {
                let [slot_name, armature_name] = name.split("-");
                if(isLocked) {
                    User.getCurrentUser().currentReward = [
                        REWARD_TYPES[3],
                        this.characterName,
                        slot_name,
                        armature_name
                    ]
                    Config.i.popAllScenes()
                    Config.i.pushScene('menu/start/scenes/start', 'menu', null, true);
                } else {

                    // update the armature
                    Inventory.updateCharacter(this.node.getChildByName(`${this.characterName}_dragon`).children[0].getComponent(dragonBones.ArmatureDisplay), INVENTORY_ANIMATIONS[this.lastSelectedButton], armature_name, slot_name);
    
                    // save to profile
                    let characterAndSlot = this.characterName.concat("-", slot_name)
                    User.getCurrentUser().updateInventory(characterAndSlot, armature_name);    
                }
            }
            item.getChildByName("New Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = element
            item.getChildByName("New Button").name = element
            this.layoutNode.addChild(item);

        });
        this.scrollViewNode.scrollToTop()
    }

    static updateCharacter(db: dragonBones.ArmatureDisplay, animationName: string, armature_name: any, slot_name: any) {
        var newHatName = armature_name;
        let factory = dragonBones.CCFactory.getInstance();
        let _armature = db.armature();
        _armature.getSlot(slot_name).childArmature = factory.buildArmature(newHatName);
        db.playAnimation(animationName, 1);
        if (slot_name === "left_shoe") {
            _armature.getSlot("right_shoe").childArmature = factory.buildArmature(newHatName);
        }
    }

    start() {

    }

    // update (dt) {}
}
