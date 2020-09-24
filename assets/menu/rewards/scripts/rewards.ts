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
        this.checkCharacterLockStatus();
        this.checkBgLockStatus();
        this.checkAchievementsLockStatus();
    }

    checkCharacterLockStatus() {
        let numberOfChildren = this.layoutHolder.children[0].children[0].children[0].childrenCount
        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[0].children[0].children[0].children[i];
            let elementId = eachElement.getChildByName("id").getComponent(cc.Label).string;
            if (User.getCurrentUser().unlockedRewards[`${this.saveConstants[0]}-${elementId}`] === 0 || User.getCurrentUser().unlockedRewards[`${this.saveConstants[0]}-${elementId}`] === undefined) {
                // make lock texture active
                eachElement.getChildByName("lock").active = true
                eachElement.getComponent(cc.Button).interactable = false
            }
            if (eachElement.getComponent(cc.Button).clickEvents[0].customEventData === User.getCurrentUser().currentCharacter) {
                // make edit button and selected show
                eachElement.getChildByName("tick").active = true
                eachElement.getChildByName("edit").active = true
            }
        }
    }

    checkBgLockStatus() {
        let numberOfChildren = this.layoutHolder.children[1].children[0].children[0].childrenCount

        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[1].children[0].children[0].children[i];
            let elementId = eachElement.getChildByName("id").getComponent(cc.Label).string;
            if (User.getCurrentUser().unlockedRewards[`${this.saveConstants[1]}-${elementId}`] === 0 || User.getCurrentUser().unlockedRewards[`${this.saveConstants[1]}-${elementId}`] === undefined) {
                // make lock texture active
                eachElement.getComponent(cc.Button).interactable = false
                eachElement.getChildByName("lock").active = true;
            }
            if (eachElement.getComponent(cc.Button).clickEvents[0].customEventData === User.getCurrentUser().currentBg) {
                // make edit button and selected show
                eachElement.getChildByName("tick").active = true
                eachElement.getChildByName("edit").active = true
            }
        }
    }

    checkAchievementsLockStatus() {
        let numberOfChildren = this.layoutHolder.children[2].children[0].children[0].childrenCount

        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[2].children[0].children[0].children[i];
            let elementId = eachElement.getChildByName("id").getComponent(cc.Label).string;
            if (User.getCurrentUser().unlockedRewards[`${this.saveConstants[2]}-${elementId}`] === 0 || User.getCurrentUser().unlockedRewards[`${this.saveConstants[2]}-${elementId}`] === undefined) {
                // make lock texture active
                eachElement.getChildByName("lock").active = true;
                eachElement.getChildByName("achievementnode").children[0].active = true
            } else {
                // enable it
                // 1 - bronze 2 - silver 3- gold
                let acvmtNumber = User.getCurrentUser().unlockedRewards[`${this.saveConstants[2]}-${elementId}`];
                eachElement.getChildByName("achievementnode").children[acvmtNumber].active = true
            }
        }
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
        let nodeName = ("indi_button_prefab" + this.lastSelectedButton.toString())
        // reset last selected first
        if (this.lastSelectedButton > -1) {

        }
        nodeName = ("indi_button_prefab" + event.currentTarget.name)
        this.lastSelectedButton = parseInt(event.currentTarget.name)

        // save to profile
        User.getCurrentUser().currentCharacter = customEventData.toString().trim();

        // unselect show and edit button show
        let numberOfChildren = this.layoutHolder.children[0].children[0].children[0].childrenCount
        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[0].children[0].children[0].children[i];
            eachElement.getChildByName("tick").active = false;
            eachElement.getChildByName("edit").active = false;
        }

        // make this selected one
        event.currentTarget.getChildByName("tick").active = true
        event.currentTarget.getChildByName("edit").active = true
    }

    onEditButtonClicked(event, customEventData) {
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

        /// remove already selected 
        let numberOfChildren = this.layoutHolder.children[1].children[0].children[0].childrenCount
        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[1].children[0].children[0].children[i];
            eachElement.getChildByName("tick").active = false;
        }
        // add current selected
        event.currentTarget.getChildByName("tick").active = true
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
