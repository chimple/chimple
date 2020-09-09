import Item from "./item";
import Profile, { User } from "../../../common/scripts/lib/profile";

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

    @property(cc.Label)
    characterNameLabel: cc.Label = null;

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


    inventoryData = [
        ["hat1", "hat1-hat1", "hat1-hat2", "hat1-hat3", "hat1-hat4", "hat1-hat5", "hat1-hat6", "hat1-hat7", "hat1-hat8", "hat1-hat9", "hat1-hat10"],
        ["hand", "handacc-hand1", "handacc-hand2", "handacc-hand3", "handacc-hand4", "handacc-hand5", "handacc-hand6", "handacc-hand7", "handacc-hand8"],
        ["glasses", "glassacc-glass1", "glassacc-glass2", "glassacc-glass3", "glassacc-glass4", "glassacc-glass5", "glassacc-glass6", "glassacc-glass7", "glassacc-glass8", "glassacc-glass9", "glassacc-glass10"],
        // ["shoes", "right_shoe-shoe1", "right_shoe-shoe2", "right_shoe-shoe3", "right_shoe-shoe4", "right_shoe-shoe5", "right_shoe-shoe6", "right_shoe-shoe7", "right_shoe-shoe8", "right_shoe-shoe9", "right_shoe-shoe10"],
        ["shoes", "left_shoe-shoe1", "left_shoe-shoe2", "left_shoe-shoe3", "left_shoe-shoe4", "left_shoe-shoe5", "left_shoe-shoe6", "left_shoe-shoe7", "left_shoe-shoe8", "left_shoe-shoe9", "left_shoe-shoe10"],
        ["neck", "neck_acc-neck1", "neck_acc-neck2", "neck_acc-neck3", "neck_acc-neck4", "neck_acc-neck5", "neck_acc-neck6", "neck_acc-neck7", "neck_acc-neck8", "neck_acc-neck9", "neck_acc-neck10"]
    ];

    saveConstants = ["hat1", "handacc", "glassacc", "left_shoe", "neck_acc"]
    animationNames = ["hat", "hand", "glass", "leg", "neck"]
    onLoad() {
        this.buildIndividualItems(this.inventoryData[0])

        // load all hats here 
        for (let i = 1; i < this.inventoryData[0].length; i++) {
            this.hatArmature.armatureName = this.inventoryData[0][i].split("-")[1];
        }
        // load all hand here 
        for (let i = 1; i < this.inventoryData[1].length; i++) {
            this.handArmature.armatureName = this.inventoryData[1][i].split("-")[1];
        }

        // load all glasses here 
        for (let i = 1; i < this.inventoryData[2].length; i++) {
            this.glassArmature.armatureName = this.inventoryData[2][i].split("-")[1];
        }

        // load all shoes here 
        for (let i = 1; i < this.inventoryData[3].length; i++) {
            this.shoeArmature.armatureName = this.inventoryData[3][i].split("-")[1];
        }

        // load all neck here 
        for (let i = 1; i < this.inventoryData[4].length; i++) {
            this.neckArmature.armatureName = this.inventoryData[4][i].split("-")[1];
        }

        try {
            this.characterName = User.getCurrentUser().currentCharacter;
        } catch (err) {
            console.log("error reading character name");
        }

        // update character name
        this.characterNameLabel.getComponent(cc.Label).string = this.characterName;
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
        this.saveConstants.forEach((key) => {
            let characterAndSlot = this.characterName.concat("-", key)
            var newHatName = User.getCurrentUser().inventory[characterAndSlot]
            let factory = dragonBones.CCFactory.getInstance();
            let _armature = this.node.getChildByName(`${this.characterName}_dragon`).getComponent(dragonBones.ArmatureDisplay).armature();
            _armature.getSlot(key).childArmature = factory.buildArmature(newHatName);
            if (key === "left_shoe") {
                _armature.getSlot(key).childArmature = factory.buildArmature(this.characterName.concat("-", "right_shoe"));
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
        this.buildIndividualItems(this.inventoryData[parseInt(event.currentTarget.name)])
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
            if (index != 0) {
                const item = cc.instantiate(this.itemPrefab);
                item.name = element;
                item.getChildByName("New Button").getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).getComponent(cc.Sprite).spriteFrame;
                item.getChildByName("New Button").height = this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).height
                item.getChildByName("New Button").width = this.node.getChildByName("button_textures").getChildByName(element.split("-")[0]).getChildByName(element.split("-")[1]).width
                // if (User.getCurrentUser().unlockedInventory[`${items[0]}-${index}`] === "false" || User.getCurrentUser().unlockedInventory[`${items[0]}-${index}`] === undefined) {
                //     item.getChildByName("New Button").getChildByName("lock_icon").active = true
                // }
                let itemComp = item.getComponent(Item);

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
                    User.getCurrentUser().inventory[characterAndSlot] = armature_name;
                }
                // if (User.getCurrentUser().unlockedInventory[`${items[0]}-${index}`] === "false" || User.getCurrentUser().unlockedInventory[`${items[0]}-${index}`] === undefined) {
                //     itemComp.isLocked = true;
                // }
                item.getChildByName("New Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = element
                item.getChildByName("New Button").name = element
                this.layoutNode.addChild(item);
            }
        });
    }

    start() {

    }

    // update (dt) {}
}
