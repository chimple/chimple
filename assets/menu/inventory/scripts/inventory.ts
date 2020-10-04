import { User } from "../../../common/scripts/lib/profile";
import { INVENTORY_DATA, INVENTORY_SAVE_CONSTANTS, REWARD_TYPES } from "../../../common/scripts/util";
import Item from "./item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Inventory extends cc.Component {

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property()
    scrollValue: number = 100;

    @property(cc.Node)
    individualLayoutNode: cc.Node = null;

    currentScrollValue: number = 1000

    @property(dragonBones.ArmatureDisplay)
    hatArmature: dragonBones.ArmatureDisplay = null;

    @property(dragonBones.ArmatureDisplay)
    handArmature: dragonBones.ArmatureDisplay = null;

    @property(dragonBones.ArmatureDisplay)
    glassArmature: dragonBones.ArmatureDisplay = null;

    @property(dragonBones.ArmatureDisplay)
    shoeArmature: dragonBones.ArmatureDisplay = null;

    @property(dragonBones.ArmatureDisplay)
    neckArmature: dragonBones.ArmatureDisplay = null;

    lastSelectedButton: number = 0;
    characterName: string = "bear"

    normalSprite: cc.SpriteFrame = null;
    animationNames = ["hat", "hand", "glass", "leg", "neck"]
    onLoad() {
        this.buildIndividualItems(INVENTORY_DATA[0])

        // load all hats here
        for (let i = 0; i < INVENTORY_DATA[0].length; i++) {
            this.hatArmature.armatureName = INVENTORY_DATA[0][i].split("-")[1];
        }
        // load all hand here
        for (let i = 0; i < INVENTORY_DATA[1].length; i++) {
            this.handArmature.armatureName = INVENTORY_DATA[1][i].split("-")[1];
        }

        // load all glasses here
        for (let i = 0; i < INVENTORY_DATA[2].length; i++) {
            this.glassArmature.armatureName = INVENTORY_DATA[2][i].split("-")[1];
        }

        // load all shoes here
        for (let i = 0; i < INVENTORY_DATA[3].length; i++) {
            this.shoeArmature.armatureName = INVENTORY_DATA[3][i].split("-")[1];
        }

        // load all neck here
        for (let i = 0; i < INVENTORY_DATA[4].length; i++) {
            this.neckArmature.armatureName = INVENTORY_DATA[4][i].split("-")[1];
        }

        try {
            this.characterName = User.getCurrentUser().currentCharacter;
        } catch (err) {
            console.log("error reading character name");
        }

        this.node.getChildByName(`${this.characterName}_dragon`).active = true;
        try {
            this.loadSavedCharacterAcc()
        } catch (err) {
            console.log("error loading inventory");
        }
        // for testing only
        // Profile.createUser("AK", Language.ENGLISH, "", 12, Gender.BOY)
    }

    loadSavedCharacterAcc() {
        INVENTORY_SAVE_CONSTANTS.forEach((key) => {
            console.log(" slotname ", key);
            let characterAndSlot = this.characterName.concat("-", key)
            var newHatName = User.getCurrentUser().inventory[characterAndSlot]
            let factory = dragonBones.CCFactory.getInstance();
            let _armature = this.node.getChildByName(`${this.characterName}_dragon`).getComponent(dragonBones.ArmatureDisplay).armature();
            if (newHatName != undefined) {
                _armature.getSlot(key).childArmature = factory.buildArmature(newHatName);
                if (key === "left_shoe") {
                    _armature.getSlot("right_shoe").childArmature = factory.buildArmature(newHatName);
                }
            }
        })
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

                itemComp.onClickCallback = (name) => {
                    let [slot_name, armature_name] = name.split("-");

                    // update the armature
                    var newHatName = armature_name;
                    let factory = dragonBones.CCFactory.getInstance();
                    let _armature = this.node.getChildByName(`${this.characterName}_dragon`).getComponent(dragonBones.ArmatureDisplay).armature();
                    _armature.getSlot(slot_name).childArmature = factory.buildArmature(newHatName);
                    this.node.getChildByName(`${this.characterName}_dragon`).getComponent(dragonBones.ArmatureDisplay).playAnimation(this.animationNames[this.lastSelectedButton], 1)
                    if (slot_name === "left_shoe") {
                        _armature.getSlot("right_shoe").childArmature = factory.buildArmature(newHatName);
                    }

                    // save to profile
                    let characterAndSlot = this.characterName.concat("-", slot_name)
                    User.getCurrentUser().updateInventory(characterAndSlot, armature_name);
                }
                item.getChildByName("New Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = element
                item.getChildByName("New Button").name = element
                this.layoutNode.addChild(item);
        });
    }

    start() {

    }

    // update (dt) {}
}
