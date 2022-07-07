import Profile, { User, MAX_USERS, CURRENTMODE, LANGUAGE, SFX_OFF } from "../../../../common/scripts/lib/profile";
import { Mode, MODE } from '../../../../common/scripts/lib/constants';
import Config, { ALL_LANGS, Lang, LANG_CONFIGS } from "../../../../common/scripts/lib/config";
import { Util } from "../../../../common/scripts/util";
import Chimple from "../../../../chimple";
import ChimpleLabel from "../../../../common/scripts/chimple-label";
import LanguageButton from "./languageButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WelcomePage extends cc.Component {
    @property(cc.Prefab)
    addButton: cc.Prefab = null;

    @property(cc.Prefab)
    userButton: cc.Prefab = null;

    @property(cc.Prefab)
    parentButtonPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    schoolButtonPrefab: cc.Prefab = null;

    @property(cc.Node)
    parentOrSettingNode: cc.Node = null;

    @property(cc.Node)
    languageDropDown: cc.Node = null;

    @property(cc.SpriteFrame)
    soundOn: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    soundOff: cc.SpriteFrame = null;

    @property(cc.Button)
    soundButton: cc.Button = null

    @property(cc.Node)
    languagelayout: cc.Node = null

    @property(cc.Prefab)
    languagePrefab: cc.Prefab = null

    @property(cc.Label)
    languageLabel: cc.Label = null;

    @property(cc.AudioClip)
    bgMusic: cc.AudioClip = null;

    user: User;

    static userArr;
    parentButtonNode: cc.Node;
    schoolButtonNode: cc.Node;
    addButtonRef: cc.Node;
    buttonArray: Array<string>;
    tempArray: Array<object>;
    soundStatus: boolean = false;
    langugeDropDownClicked: boolean = false
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        try {
            this.setSoundSlider()
            Util.playSfx(this.bgMusic, true, true);
            this.languageLabel.string = LANG_CONFIGS.get(Profile.lang).displayName;
            Util.loadi18NMapping(
                () => {
                    const lang = Profile.lang || Lang.ENGLISH
                    const langConfig = LANG_CONFIGS.get(lang)
                    if (!Config.i.hasLoadedTextFont(langConfig.font)) {
                        Config.i.loadFontDynamically(langConfig.font)
                    }
                    this.selectModes();
                    this.layoutManager();
                    Profile.initialize();
                }
            )
        } catch (error) {
            cc.log("error in welcome page load", error);
        }
    }

    setSoundSlider() {
        if (Profile.getItem(SFX_OFF)) {
            this.soundStatus = false;
            this.soundButtonToggle();
        }
    }
    soundButtonToggle() {
        this.soundStatus = !this.soundStatus;
        if (this.soundStatus) {
            cc.audioEngine.pauseMusic()
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundOff
            Profile.setItem(SFX_OFF, 1);
        } else {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundOn
            Profile.setItem(SFX_OFF, 0);
            Util.playSfx(this.bgMusic, true, true);
            cc.audioEngine.resumeMusic()
        }
    }

    languageSelector() {
        if (!this.langugeDropDownClicked) {
            this.languagelayout.destroyAllChildren()
            this.languageDropDown.active = true
            this.languageDropDown.height = ALL_LANGS.length * 60
            for (const data of ALL_LANGS) {
                const languageButton = cc.instantiate(this.languagePrefab)
                const languageButtonItem = languageButton.getComponent(LanguageButton)
                languageButtonItem.language = ALL_LANGS[ALL_LANGS.indexOf(data)]
                languageButtonItem.languageLable = this.languageLabel
                languageButtonItem.parentNode = this.parentButtonNode
                languageButtonItem.languageDropDownNode = this.languageDropDown
                languageButtonItem.schoolNode = this.schoolButtonNode
                languageButton.name = data
                languageButton.getComponentInChildren(cc.Label).string = LANG_CONFIGS.get(ALL_LANGS[ALL_LANGS.indexOf(data)]).displayName
                this.languagelayout.addChild(languageButton)
            }
            this.langugeDropDownClicked = true
        }
        else {
            this.langugeDropDownClicked = false
            this.languageDropDown.active = false
        }
    }

    selectModes() {
        let mode = parseInt(Profile.getValue(CURRENTMODE))
        const modes: number = mode;//MODE;
        switch (modes) {
            case Mode.School:
                // If mode is school, redirect to select section
                Config.i.pushScene('private/school/scenes/selectSections', 'private', null, true);
                break;
            case Mode.HomeConnect:
            case Mode.Home:
                // If mode is home, show front page with settings (parent) icon on top
                if (!!this.parentButtonPrefab)
                    this.parentButtonNode = cc.instantiate(this.parentButtonPrefab);
                const bg = this.parentButtonNode?.getChildByName("Background");
                if (bg) {
                    const label = bg.getChildByName("Label");
                    const chimpleLabelComponent = label.getComponent(ChimpleLabel);
                    chimpleLabelComponent.string = Util.i18NText("Parent");
                }
                this.parentOrSettingNode?.addChild(this.parentButtonNode);
                break;
            case Mode.None:
                // If mode is not set, show front page with school icon on top
                if (!!this.schoolButtonPrefab) {
                    this.schoolButtonNode = cc.instantiate(this.schoolButtonPrefab)
                    this.parentOrSettingNode?.addChild(this.schoolButtonNode)
                }
                break;
            default:
                // default what needs to be here
                if (!!this.schoolButtonPrefab) {
                    this.schoolButtonNode = cc.instantiate(this.schoolButtonPrefab)
                    this.parentOrSettingNode?.addChild(this.schoolButtonNode)
                }
                break;
        }
    }

    layoutManager() {
        try {
            const filteredUsers = User.getUsers().filter(e => (!e.isTeacher && e.age > 0)) || [];
            WelcomePage.userArr = filteredUsers;
            cc.log("=<>=" + WelcomePage.userArr.length);
            if (WelcomePage.userArr.length == 0) {
                let addBtn;
                if (!!this.addButton)
                    addBtn = cc.instantiate(this.addButton);
                if (!!this.node) {
                    this.node.getChildByName("plusbutton").addChild(addBtn);
                    this.node.getChildByName("messageLabel").getComponent(cc.Label).string = "";
                }
            }
            filteredUsers.forEach((e) => {
                cc.log(e);
                let userButtonRef;
                if (!!this.userButton)
                    userButtonRef = cc.instantiate(this.userButton);
                if (!!userButtonRef) {
                    userButtonRef.getChildByName("Label").getComponent(cc.Label).string = e.name;
                    // LOAD AVATAR
                    cc.resources.load(`avatars/${e.avatarImage}`, (err, sp) => {
                        try {
                            if (!err) {
                                // @ts-ignore
                                userButtonRef.getChildByName("Background").getChildByName("avatar").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                            }
                        } catch (error) {
                            cc.log('error in welcome page load avatars', error);
                        }
                    });
                    userButtonRef.name = e.id;
                    this.node?.getChildByName("userLayout").addChild(userButtonRef);
                }
            });
            let a = cc.sys.localStorage.getItem("userId");
        } catch (error) {
            cc.log('error in welcome page layoutManager', error)
        }
    }
}
