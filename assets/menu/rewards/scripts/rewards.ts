import Config from '../../../common/scripts/lib/config'
import Profile, { User } from '../../../common/scripts/lib/profile';
import { LANDING_SCENE } from "../../../chimple";
import { CURRENT_STUDENT_ID } from "../../../common/scripts/lib/constants";
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

    saveConstants = ["character", "background", "achievement"]

    onLoad() {
        this.checkLockStatus(this.saveConstants);
    }

    checkLockStatus(saveItems: string[]) {
        saveItems.forEach((ele, index) => {
            let numberOfChildren = this.layoutHolder.children[index].children[0].children[0].childrenCount

            for (let i = 0; i < numberOfChildren; i++) {
                let eachElement = this.layoutHolder.children[index].children[0].children[0].children[i];
                let elementId = eachElement.getChildByName("id").getComponent(cc.Label).string;
                if (User.getCurrentUser().unlockedRewards[`${ele}-${elementId}`] === 0 || User.getCurrentUser().unlockedRewards[`${ele}-${elementId}`] === undefined) {
                    // make lock texture active
                }
                else if (User.getCurrentUser().unlockedRewards[`${ele}-${elementId}`] >= 1) {
                    // show according to level
                    // 1 - gold or unlock for bg and achmts , 3 - bronze
                }
            }
        })
    }

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

        }
        nodeName = ("indi_button_prefab" + event.currentTarget.name)
        this.lastSelectedButton = parseInt(event.currentTarget.name)

        // save to profile
        User.getCurrentUser().currentCharacter = customEventData.toString().trim();
        // switch scene
        Config.getInstance().pushScene("inventory", "menu");
    }

    onBgClick(event, customEventData) {
        let nodeName = ("bg_button_prefab" + this.lastSelectedButton.toString())
        // reset last selected first
        if (this.lastSelectedButton > -1) {

        }
        nodeName = ("bg_button_prefab" + event.currentTarget.name)
        this.lastSelectedButton = parseInt(event.currentTarget.name)

        // save to profile
        User.getCurrentUser().currentBg = customEventData.toString().trim();
    }

    onLogoutButtonClick(event) {
        User.setCurrentUser(null);
        Config.i.popAllScenes();
        if (cc.sys.localStorage.getItem(CURRENT_STUDENT_ID)) {
            // @ts-ignore
            currentSelectMode = SelectionMode.Section;
            Config.loadScene(LANDING_SCENE, 'private', null);
        } else {
            cc.director.loadScene("welcomePage")
        }
    }
}
