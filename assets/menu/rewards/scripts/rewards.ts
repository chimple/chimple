import Config from '../../../common/scripts/lib/config'
import Profile, { User } from '../../../common/scripts/lib/profile';
import { LANDING_SCENE } from "../../../chimple";
import { CURRENT_STUDENT_ID, LOGGED_IN_USER, EXAM, MIN_PASS } from "../../../common/scripts/lib/constants";
import { REWARD_TYPES } from '../../../common/scripts/util';
import { Course, Chapter, Lesson } from '../../../common/scripts/lib/convert';
import Achievement from '../../../common/scorecard/scripts/achievement';
const { ccclass, property } = cc._decorator;


@ccclass
export default class Rewards extends cc.Component {

    @property(cc.Node)
    layoutHolder: cc.Node = null;

    @property(cc.Prefab)
    achievementPrefab: cc.Prefab = null;

    normalSprite: cc.SpriteFrame = null;
    lastSelectedButton: number = -1;
    leftSideNormalSprite: cc.SpriteFrame = null;

    @property(cc.Node)
    sideLayoutNode: cc.Node = null;


    onLoad() {
        this.checkCharacterLockStatus();
        this.checkBgLockStatus();
        this.checkAchievementsLockStatus();
    }

    checkCharacterLockStatus() {
        let numberOfChildren = this.layoutHolder.children[0].children[0].children[0].children[0].childrenCount
        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[0].children[0].children[0].children[0].children[i];
            let elementId = eachElement.name;
            if (User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[0]}-${elementId}`] === 0 || User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[0]}-${elementId}`] === undefined) {
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
        let numberOfChildren = this.layoutHolder.children[1].children[0].children[0].children[0].childrenCount
        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[1].children[0].children[0].children[0].children[i];
            let elementId = eachElement.name;
            if (User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[1]}-${elementId}`] === 0 || User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[1]}-${elementId}`] === undefined) {
                // make lock texture active
                eachElement.getComponent(cc.Button).interactable = false
                eachElement.getChildByName("lock").active = true;
            }
            if (eachElement.getComponent(cc.Button).clickEvents[0].customEventData === User.getCurrentUser().currentBg) {
                // make edit button and selected show
                eachElement.getChildByName("tick").active = true
            }
        }
    }

    checkAchievementsLockStatus() {
        // let numberOfChildren = this.layoutHolder.children[2].children[0].children[0].childrenCount

        // for (let i = 0; i < numberOfChildren; i++) {
        //     let eachElement = this.layoutHolder.children[2].children[0].children[0].children[i];
        //     let elementId = eachElement.getChildByName("id").getComponent(cc.Label).string;
        //     if (User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[2]}-${elementId}`] === 0 || User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[2]}-${elementId}`] === undefined) {
        //         // make lock texture active
        //         eachElement.getChildByName("lock").active = true;
        //         eachElement.getChildByName("achievementnode").children[0].active = true
        //     } else {
        //         // enable it
        //         // 1 - bronze 2 - silver 3- gold
        //         let acvmtNumber = User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[2]}-${elementId}`];
        //         eachElement.getChildByName("achievementnode").children[acvmtNumber].active = true
        //     }
        // }
        const achievementsNode = this.layoutHolder.children[2].children[0].children[0]
        const lessonProgressMap = User.getCurrentUser().lessonProgressMap
        Config.i.curriculum.forEach((course: Course) => {
            course.chapters.forEach((chapter: Chapter) => {
                chapter.lessons.forEach((lesson: Lesson) => {
                    if(lesson.type == EXAM 
                        && lessonProgressMap.has(lesson.id) 
                        && lessonProgressMap.get(lesson.id).score > MIN_PASS) {
                            const achievement = cc.instantiate(this.achievementPrefab)
                            const achievementComp = achievement.getComponent(Achievement)
                            achievementComp.image = lesson.image
                            achievementComp.courseId = course.id
                            achievementComp.score = lessonProgressMap.get(lesson.id).score
                            achievementsNode.addChild(achievement)
                    }
                })
            })
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
        Config.getInstance().pushScene("menu/inventory/scenes/inventory", "menu");
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
            cc.sys.localStorage.removeItem(LOGGED_IN_USER);
            // @ts-ignore
            currentSelectMode = SelectionMode.Section;
            Config.loadScene(LANDING_SCENE, 'private', null);
        } else {
            cc.director.loadScene("welcomePage")
        }
    }
}
