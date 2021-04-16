import Config from '../../../common/scripts/lib/config'
import Profile, { CURRENTMODE, User } from '../../../common/scripts/lib/profile';
import { LANDING_SCENE } from "../../../chimple";
import { CURRENT_STUDENT_ID, LOGGED_IN_USER, EXAM, MIN_PASS } from "../../../common/scripts/lib/constants";
import { REWARD_TYPES, REWARD_CHARACTERS, REWARD_BACKGROUNDS } from '../../../common/scripts/util';
import { Course, Chapter, Lesson } from '../../../common/scripts/lib/convert';
import Achievement from '../../../common/scorecard/scripts/achievement';
import { SECTION_LIST } from '../../../private/school/scripts/landing';
const { ccclass, property } = cc._decorator;


@ccclass
export default class Rewards extends cc.Component {

    @property(cc.Node)
    layoutHolder: cc.Node = null;

    @property(cc.Prefab)
    achievementPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    characterPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    bgsPrefab: cc.Prefab = null;

    @property(cc.Material)
    grayMaterial: cc.Material

    normalSprite: cc.SpriteFrame = null;
    lastSelectedButton: number = -1;
    leftSideNormalSprite: cc.SpriteFrame = null;

    @property(cc.Node)
    sideLayoutNode: cc.Node = null;
    characterColors: string[] = ['#F7D7BA', '#F9E5C5', '#FDD8B4', '#8CC757', '#A5E6F5', '#C0AACF', '#44FFFD', '#F3B866', '#3AC7D0', '#EDB957', '#B2DBCC']

    onLoad() {
        for (let i = 0; i < 3; i++) {
            this.layoutHolder.children[i].width = cc.winSize.width - 290
            this.layoutHolder.children[i].children[0].width = cc.winSize.width - 290
            this.layoutHolder.children[i].children[0].children[0].children[0].width = cc.winSize.width - 290
        }
        this.loadCharacters();
        this.loadBgs();
        this.checkAchievementsLockStatus();
    }

    loadCharacters() {
        REWARD_CHARACTERS.forEach((character, index) => {
            cc.resources.load(`char_icons/${character}_icon`, (err, sp) => {
                if (!err) {
                    let charPrefab = cc.instantiate(this.characterPrefab)
                    if (charPrefab != null) {
                        // @ts-ignore
                        charPrefab.getChildByName("characternode").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                        let color = cc.Color.BLACK;
                        charPrefab.getChildByName("character_icon_color").color = color.fromHEX(this.characterColors[index]);
                        this.registerButton(charPrefab, "onCharacterClick", character);
                        this.registerButton(charPrefab.getChildByName("edit"), "onEditButtonClicked", character);
                        if(User.getCurrentUser() != null) {
                            if (User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[0]}-${character}`] === 0 || User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[0]}-${character}`] === undefined) {
                                // make greyscale
                                charPrefab.getChildByName("character_icon_color").getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
                                charPrefab.getChildByName("character_icon_bg").getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
                                charPrefab.getChildByName("characternode").getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
                                charPrefab.getComponent(cc.Button).interactable = false
                            }
                            if (character === User.getCurrentUser().currentCharacter) {
                                // make edit button and selected show
                                charPrefab.getChildByName("tick").active = true
                                charPrefab.getChildByName("edit").active = true
                            }
                        }
                        const characterNode = this.layoutHolder.children[0].children[0].children[0].children[0]
                        characterNode.addChild(charPrefab);
                    }
                }
            });
        })
    }

    loadBgs() {
        REWARD_BACKGROUNDS.forEach((bg) => {
            let bgPrefab = cc.instantiate(this.bgsPrefab)
            cc.resources.load(`backgrounds/textures/bg_icons/background-${bg}`, (err, sp) => {
                bgPrefab.name = bg;
                // @ts-ignore
                bgPrefab.getChildByName("backgroundnode").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                this.registerButton(bgPrefab, "onBgClick", bg);
                if(User.getCurrentUser() != null) {
                    if (User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[1]}-${bg}`] === 0 || User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[1]}-${bg}`] === undefined) {
                        // make lock texture active
                        bgPrefab.getComponent(cc.Button).interactable = false
                        // make greyscale
                        bgPrefab.getChildByName("backgroundnode").getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
                        // bgPrefab.getChildByName("lock").active = true;
                    }
                    if (bg === User.getCurrentUser().currentBg) {
                        // make edit button and selected show
                        bgPrefab.getChildByName("tick").active = true
                    }
                }

            });
            const bgNode = this.layoutHolder.children[1].children[0].children[0].children[0]
            bgNode.addChild(bgPrefab);
        })
    }

    registerButton(buttonNode: cc.Node, functionName: string, customData: string) {
        let clickEditEventHandler = new cc.Component.EventHandler();
        clickEditEventHandler.target = this.node;
        clickEditEventHandler.component = "rewards";
        clickEditEventHandler.handler = functionName;
        clickEditEventHandler.customEventData = `${customData}`;

        let button = buttonNode.getComponent(cc.Button);
        button.clickEvents.push(clickEditEventHandler);
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
        const achievementsNode = this.layoutHolder.children[2].children[0].children[0].children[0]
        const lessonProgressMap = User.getCurrentUser().lessonProgressMap
        Config.i.curriculum.forEach((course: Course) => {
            course.chapters.forEach((chapter: Chapter) => {
                chapter.lessons.forEach((lesson: Lesson) => {
                    if (lesson.type == EXAM
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
                this.layoutHolder.getChildByName(i.toString()).getComponent(cc.ScrollView).scrollToTop();
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

        // unselect show and edit button show
        let numberOfChildren = this.layoutHolder.children[0].children[0].children[0].children[0].childrenCount
        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[0].children[0].children[0].children[0].children[i];
            eachElement.getChildByName("tick").active = false;
            eachElement.getChildByName("edit").active = false;
        }

        // make this selected one
        event.currentTarget.getChildByName("tick").active = true
        event.currentTarget.getChildByName("edit").active = true

        if (User.getCurrentUser().currentCharacter === customEventData.toString().trim()) {
            // switch scene
            Config.getInstance().pushScene("menu/inventory/scenes/inventory", "menu");
        }

        // save to profile
        User.getCurrentUser().currentCharacter = customEventData.toString().trim();
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
        let numberOfChildren = this.layoutHolder.children[1].children[0].children[0].children[0].childrenCount
        for (let i = 0; i < numberOfChildren; i++) {
            let eachElement = this.layoutHolder.children[1].children[0].children[0].children[0].children[i];
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
            // currentSelectMode = SelectionMode.Section;
            Config.loadScene(SECTION_LIST, 'private', null);
        } else {
            if(Profile.getValue(CURRENTMODE) == 3){
            
                Config.loadScene(SECTION_LIST, 'private', null);
            }
            else{
              cc.director.loadScene("welcomePage")
            }
        }
    }
}
