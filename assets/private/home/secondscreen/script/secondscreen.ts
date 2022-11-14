import Config, { ALL_LANGS, LANG_CONFIGS } from "../../../../common/scripts/lib/config";
import { CUSTOM_HOT_UPDATE_SERVER, PROD_HOT_UPDATE_SERVER } from "../../../../common/scripts/lib/constants";
import Profile, {
    CONTACT,
    DIALING_CODE,
    EMAIL,
    IS_OTP_VERIFIED,
    LANGUAGE,
    MUSIC_OFF,
    SFX_OFF,
    User
} from "../../../../common/scripts/lib/profile";
import { Util } from "../../../../common/scripts/util";
import UtilLogger from "../../../../common/scripts/util-logger";
import WelcomePage from "../../loginnew/scripts/welcomePage";
import UserComponent from "./usercomponent";

const { ccclass, property } = cc._decorator;

const EMAIL_VALIDATION_RE = /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|)$/;
const EMAIL_ERR = "Invalid Email Address";
const CONTACT_ERR = "Invalid Phone Number";
const HOT_UPDATE_SERVER_ERR = "Invalid Hot Update Server";


@ccclass
export default class SecondScreen extends cc.Component {

    @property(cc.Prefab)
    addButton: cc.Prefab = null;

    @property(cc.Node)
    userNode: cc.Node = null;

    @property(cc.AudioClip)
    bgMusic: cc.AudioClip = null;

    @property(cc.Node)
    settingNode: cc.Node = null;

    @property(cc.Node)
    profileNode: cc.Node = null;

    @property(cc.Node)
    helpNode: cc.Node = null;

    @property(cc.Node)
    contactNode: cc.Node = null;

    @property(cc.Node)
    soundHandle: cc.Node = null;

    @property(cc.Node)
    musicHandle: cc.Node = null;

    @property(cc.Label)
    languageLabel: cc.Label = null;

    @property(cc.Prefab)
    userPrefab: cc.Prefab = null;

    @property(cc.Label)
    verifyLabel: cc.Label = null;

    @property(cc.Layout)
    userLayout: cc.Layout = null;

    @property(cc.EditBox)
    contactEditBox: cc.EditBox = null;

    @property(cc.Label)
    dialingCodeLabel: cc.Label = null;

    @property(cc.Node)
    notifier: cc.Node = null;

    @property(cc.Node)
    tabLayout: cc.Node = null;

    soundOff: boolean = false;
    musicOff: boolean = false;
    dialingCode: string;
    isEmailInvalid: boolean = false;
    isContactInvalid: boolean = false;
    contactFieldValue: string = "";
    isContactVerified: boolean = false;
    isDebugUser: boolean = false;


    onLoad() {
        if (Profile.getItem(IS_OTP_VERIFIED) === 1) {
            this.verifyLabel.node.parent.getComponent(cc.Button).interactable = false;
        }
        Util.playSfx(this.bgMusic, true, true);
        this.setMusicSlider();
        this.setSoundSlider();
        this.languageLabel.string = LANG_CONFIGS.get(Profile.lang).displayName;
        this.makeUsers();
        this.initializeProfileData();
        this.i18n();
    }

    i18n() {
        this.tabLayout.children[0].getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("User");
        this.tabLayout.children[1].getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Profile");
        this.tabLayout.children[2].getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Setting");
        this.tabLayout.children[3].getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Contact");
        this.tabLayout.children[4].getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Help");
        this.profileNode.getChildByName("email").getChildByName("label").getComponent(cc.Label).string = Util.i18NText("Email :");
        this.profileNode.getChildByName("contact").getChildByName("label").getComponent(cc.Label).string = Util.i18NText("Phone number :");
        this.contactNode.getChildByName("Contact Us").getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Contact Us");
        this.contactNode.getChildByName("Follow Us").getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Follow Us");
        this.contactNode.getChildByName("email_btn").getChildByName("button").getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Email");
        this.contactNode.getChildByName("web_btn").getChildByName("button").getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Visit");
        this.contactNode.getChildByName("call_btn").getChildByName("button").getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("WhatsApp");
        this.contactNode.getChildByName("Instagram").getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Instagram");
        this.contactNode.getChildByName("Facebook").getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Facebook");
        this.contactNode.getChildByName("Twitter").getChildByName("Label").getComponent(cc.Label).string = Util.i18NText("Twitter");
        this.settingNode.getChildByName("language").getChildByName("Key Label").getComponent(cc.Label).string = Util.i18NText("App Language :");
        this.settingNode.getChildByName("sound_toggle").getChildByName("Key Label").getComponent(cc.Label).string = Util.i18NText("Sound :");
        this.settingNode.getChildByName("hot_update").getChildByName("notifier").getChildByName("url").getComponent(cc.Label).string = ""
        this.verifyLabel.string = this.isContactVerified ? Util.i18NText("verified") : Util.i18NText("verify");
        this.setWarningMsg()
    }

    setContactVerifiedStatus() {
        if (Profile.getItem(IS_OTP_VERIFIED) === 1) {
            this.isContactVerified = true;
            this.verifyLabel.string = Util.i18NText("verified");
            this.verifyLabel.node.parent.getComponent(cc.Button).interactable = false;
        } else {
            this.verifyLabel.string = Util.i18NText("verify");
            this.isContactVerified = false;
            this.verifyLabel.node.parent.getComponent(cc.Button).interactable = this.contactEditBox.string.length !== 0;
        }
    }

    setWarningMsg() {
        this.notifier.getChildByName("email").getComponent(cc.Label).string = this.isEmailInvalid ? Util.i18NText(EMAIL_ERR) : "";
        this.notifier.getChildByName("contact").getComponent(cc.Label).string = this.isContactInvalid ? Util.i18NText(CONTACT_ERR) : "";
    }

    makeUsers() {
        User.getUsers().forEach((e, index) => {
            if (!e.isTeacher) {
                cc.log("users", e.name)
                let user = cc.instantiate(this.userPrefab);
                let userComp = user.getComponent(UserComponent);
                userComp.user = e;
                if (index % 2 == 0) user.getComponent(cc.Sprite).enabled = true
                this.loadUserImageOrAvatar(e, user.getChildByName("Avatar").getChildByName("Img"));
                this.userLayout.node.addChild(user);
            }
            if (e.debug) this.isDebugUser = true;
        })
        if (WelcomePage.userArr.length < 3 && WelcomePage.userArr.length != 0) {
            let addBtn = cc.instantiate(this.addButton);
            addBtn.x = -420
            this.userLayout.node.addChild(addBtn);

        }
        this.settingNode.getChildByName("hot_update").active = this.isDebugUser && cc.sys.isNative;
    }

    loadUserImageOrAvatar(user: User, userNode: cc.Node) {
        if (user.imgPath && user.imgPath != '') {
            cc.loader.load(user.imgPath, function (err, texture) {
                if (!err) {
                    let temp = new cc.SpriteFrame(texture)
                    userNode.getComponent(cc.Sprite).spriteFrame = temp;
                }
            });
        } else {
            cc.resources.load(`avatars/${user.avatarImage}`, (err, sp) => {
                // @ts-ignore
                userNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
            });
        }
    }

    initializeProfileData() {
        this.dialingCode = Profile.getValue(DIALING_CODE);
        let email = Profile.getValue(EMAIL);
        let contact = Profile.getValue(CONTACT);
        this.dialingCodeLabel.string = this.dialingCode;
        if (email) {
            this.profileNode.getChildByName("email").getChildByName("editbox1").getComponent(cc.EditBox).string = email;
        }
        if (contact) {
            contact = contact.substring(this.dialingCode.length);
            this.contactEditBox.string = contact;
            this.contactFieldValue = contact;
        }
        this.setContactVerifiedStatus();
        this.settingNode.getChildByName("hot_update").getComponentInChildren(cc.EditBox).string = Profile.getValue(CUSTOM_HOT_UPDATE_SERVER) ?? PROD_HOT_UPDATE_SERVER
    }

    validateEmail(mail: string): boolean {
        return EMAIL_VALIDATION_RE.test(mail);
    }

    onClickAddEmailOrContact(e, data) {         // done event trigger
        let value = e.node.getChildByName("text").getComponent(cc.Label).string;
        if (data == "button1") {
            if (this.validateEmail(value)) {
                Profile.setValue(EMAIL, value);
                this.isEmailInvalid = false;
            } else {
                this.isEmailInvalid = true;
            }
        } else {
            this.contactFieldValue = value;
            if (value.length > 3 || value.length === 0) {
                if (this.dialingCode + value != Profile.getValue(CONTACT)) {
                    Profile.setItem(IS_OTP_VERIFIED, 0);
                    this.setContactVerifiedStatus();
                }
                Profile.setValue(CONTACT, this.dialingCode + value);
                this.isContactInvalid = false;
                if (Profile.getItem(IS_OTP_VERIFIED) === 0) {
                    this.verifyLabel.node.parent.getComponent(cc.Button).interactable = this.contactEditBox.string.length !== 0;
                }
            } else {
                this.isContactInvalid = true;
                this.verifyLabel.node.parent.getComponent(cc.Button).interactable = false;
            }
        }
        this.setWarningMsg();
        this.node.emit('closeCountryCodeView');
    }


    setMusicSlider() {
        if (Profile.getItem(MUSIC_OFF)) {
            this.musicOff = false;
            this.musicButtonToggle();
        }
    }

    setSoundSlider() {
        if (Profile.getItem(SFX_OFF)) {
            this.soundOff = false;
            this.soundButtonToggle();
        }
    }

    tabNavigator(event, value: string) {
        this.settingNode.parent.children.forEach((e) => {
            e.active = false;
        });
        event.target.parent.children.forEach(e => e.getChildByName("Active Tab").active = false);
        event.target.getChildByName("Active Tab").active = true;

        switch (value) {
            case "User":
                this.userNode.active = true;
                break;
            case "Contact":
                this.contactNode.active = true;
                break;
            case "Help":
                this.helpNode.active = true;
                break;
            case "Setting":
                this.settingNode.active = true;
                break;
            case "Profile":
                this.profileNode.active = true;
        }
        if (!this.profileNode.active) {
            this.node.emit('closeCountryCodeView');
        }
    }

    soundButtonToggle() {
        this.soundOff = !this.soundOff;
        if (this.soundOff) {
            cc.audioEngine.pauseMusic()
            this.soundHandle.x = -146;
            this.changeSliderLabel("Off", this.soundHandle.parent);
            Profile.setItem(SFX_OFF, 1);
        } else {
            cc.audioEngine.resumeMusic()
            this.soundHandle.x = 145;
            this.changeSliderLabel("On", this.soundHandle.parent);
            Profile.setItem(SFX_OFF, 0);
            Util.playSfx(this.bgMusic, true, true);
        }
    }

    verifyPhoneNumber(event) {
        cc.director.getScene().getChildByName("Canvas").getChildByName("otpDialog").active = true;
        cc.log(Profile.getValue(CONTACT));
        UtilLogger.requestOtp(Profile.getValue(CONTACT));
        this.node.emit('closeCountryCodeView');
    }

    musicButtonToggle() {
        this.musicOff = !this.musicOff;
        if (this.musicOff) {
            this.musicHandle.x = -146;
            this.changeSliderLabel("Off", this.musicHandle.parent);
            Profile.setItem(MUSIC_OFF, 1);
        } else {
            this.musicHandle.x = 145;
            this.changeSliderLabel("On", this.musicHandle.parent);
            Profile.setItem(MUSIC_OFF, 0);
        }
    }

    languageSelector() {
        let len = ALL_LANGS.length;
        let index = ALL_LANGS.indexOf(Profile.lang);
        // release font
        const langConfig = LANG_CONFIGS.get(ALL_LANGS[index]);
        Config.i.releaseFont(langConfig.font);
        let selectedLanguage = ALL_LANGS[(index + 1) % len];
        const fontToLoad = LANG_CONFIGS.get(selectedLanguage).font;
        Config.i.loadFontDynamically(fontToLoad, () => {
            this.languageLabel.string = LANG_CONFIGS.get(selectedLanguage).displayName;
            Profile.setValue(LANGUAGE, selectedLanguage);
            Util.removeAlli18NMapping();
            Util.loadi18NMapping(() => this.i18n());  //todo-update this node also in callback
        });
    }

    openHelpUri(e, data) {
        if (data == "Visit") {
            cc.sys.openURL("http://www.chimple.org/");
        } else if (data == "Email") {
            cc.sys.openURL("mailto:help@chimple.org");
        } else {
            cc.sys.openURL("https://wa.me/918904515444");
        }
    }

    changeSliderLabel(v, node) {
        if (v == "Off") {
            node.getChildByName("Off").active = 1;
            node.getChildByName("On").active = 0;
        } else {
            node.getChildByName("Off").active = 0
            node.getChildByName("On").active = 1;
        }
    }

    onClickFollow(e, data) {
        switch (data) {
            case "instagram":
                cc.sys.openURL("https://instagram.com/chimple_learning?igshid=5zxspthzcdm6");
                break;
            case "twitter":
                cc.sys.openURL("https://twitter.com/chimple_org?s=09");
                break;
            case "facebook":
                cc.sys.openURL("https://www.facebook.com/chimple/");
                break;
        }
    }

    onClickBackButton() {
        cc.director.loadScene("welcomePage");
    }

    async onClickHotUpdate() {
        const errorLabel = this.settingNode.getChildByName("hot_update").getChildByName("notifier").getChildByName("url").getComponent(cc.Label);
        let hotUpdateServerUrl = this.settingNode.getChildByName("hot_update").getComponentInChildren(cc.EditBox).string?.trim();
        cc.log("hot hot server URl", hotUpdateServerUrl);
        if (!hotUpdateServerUrl) {
            errorLabel.string = HOT_UPDATE_SERVER_ERR;
            return;
        } else {
            errorLabel.string = "";
        }
        if (hotUpdateServerUrl[hotUpdateServerUrl.length - 1] !== "/") hotUpdateServerUrl += "/"
        const updateButton = this.settingNode.getChildByName("hot_update").getComponentInChildren(cc.Button)
        updateButton.interactable = false;
        const updateButtonlabel = updateButton.getComponentInChildren(cc.Label);
        updateButtonlabel.string = "Checking..."
        let result;
        try {
            result = await new Promise((resolve, reject) => {
                const xhr = cc.loader.getXMLHttpRequest();
                const requestUrl = hotUpdateServerUrl + "version.manifest";
                xhr.open("GET", requestUrl, true);
                xhr.timeout = 60000;
                xhr.send();
                xhr.onload = evt => {
                    cc.log("xhr on load", xhr);
                    cc.log("xhr on sttus", xhr.status, xhr.status >= 200 && xhr.status < 300)
                    resolve(xhr.status >= 200 && xhr.status < 300);
                };
                xhr.onerror = evt => {
                    resolve(false);
                };
                xhr.ontimeout = evt => {
                    resolve(false);
                };
            })
        } catch (error) {
            cc.log('result error');
        }
        cc.log("result", result);

        updateButtonlabel.string = "Update"
        updateButton.interactable = true;
        if (!result) {
            cc.log("on false result", result, errorLabel);
            errorLabel.string = HOT_UPDATE_SERVER_ERR;
            return;
        }
        errorLabel.string = ""
        cc.log("on true result", result, errorLabel);
        Util.changeHotUpdateServer(hotUpdateServerUrl);
    }
}
