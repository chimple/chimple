import Config from "../../../common/scripts/lib/config";
import Profile, { availLanguages, CONTACT, EMAIL, LANGUAGE, MUSIC_OFF, PASSWORD, SFX_OFF } from "../../../common/scripts/lib/profile";
import UserComponent from "./usercomponent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SecondScreen extends cc.Component {

    @property(cc.Node)
    userNode: cc.Node = null;

    @property(cc.Node)
    settingNode: cc.Node = null;

    @property(cc.Node)
    profileNode: cc.Node = null;

    @property(cc.Node)
    helpNode: cc.Node = null;

    @property(cc.Node)
    soundHandle: cc.Node = null;

    @property(cc.Node)
    musicHandle: cc.Node = null;

    @property(cc.Label)
    languageLabel: cc.Label = null;

    @property(cc.Prefab)
    userPrefab: cc.Prefab = null;

    @property(cc.Node)
    popUpNode: cc.Node = null;

    @property(cc.Layout)
    userLayout: cc.Layout = null;

    @property(cc.Node)
    snackBar: cc.Node = null;

    soundToggle: boolean = false;
    musicToggle: boolean = false;
    isContactPopUp: boolean = true;
    label_1: cc.Label;
    label_2: cc.Label;

    onLoad() {
        this.setMusicSlider();
        this.setSoundSlider();
        this.languageLabel.string = Profile.getValue(LANGUAGE);
        this.makeUsers();
    }

    makeUsers() {
        Profile.getUsers().forEach((e) => {
            let user = cc.instantiate(this.userPrefab);
            let userComp = user.getComponent(UserComponent);
            userComp.user = e;
            if (e.imgPath != '') {
                cc.loader.load(e.imgPath, function (err, texture) {
                    if (!err){
                        let temp = new cc.SpriteFrame(texture)
                        user.getChildByName("Avatar").getChildByName("Img").getComponent(cc.Sprite).spriteFrame = temp;
                    }
                });
            }
            this.userLayout.node.addChild(user);
        })
    }


    onClickOpenPopUp(e, data: string) {
        this.profileNode.getChildByName("Contact Button").active = false;
        this.popUpNode.active = true;
        this.popUpNode.getChildByName("title").getComponent(cc.Label).string = data;
        this.popUpNode.getChildByName("editbox1").getComponent(cc.EditBox).string = "";
        this.popUpNode.getChildByName("editbox2").getComponent(cc.EditBox).string = "";
        this.label_1 = this.popUpNode.getChildByName("editbox1").getChildByName("placeholder").getComponent(cc.Label);
        this.label_2 = this.popUpNode.getChildByName("editbox2").getChildByName("placeholder").getComponent(cc.Label);

        let email = Profile.getValue(EMAIL);
        let contact = Profile.getValue(CONTACT);
        let password = Profile.getValue(PASSWORD);

        if (data != "Contact Number") {
            this.label_1.string = email ? email : "Add Email";
            this.label_2.string = password ? password : "Add Password";
            this.isContactPopUp = false;
            this.popUpNode.getChildByName("editbox2").getComponent(cc.EditBox).enabled = true;
        }
        else {
            this.label_1.string = contact ? contact : "Add Contact No";
            this.label_2.string = "OTP";
            this.popUpNode.getChildByName("editbox2").getComponent(cc.EditBox).enabled = false;
            this.isContactPopUp = true;
        }
    }

    onClickAddEmailOrContact(e, data) {         // done event trigger
        let value = e.node.getChildByName("text").getComponent(cc.Label).string;
        if (!this.isContactPopUp) {
            if (data == "button1") {
                Profile.setValue(EMAIL, value);
            }
            else {
                Profile.setValue(PASSWORD, value);
            }
        }
        else {
            if (data == "button1") {
                if (isNaN(value)) {
                    this.snackBar.active = true;
                    this.snackBar.getChildByName("label").getComponent(cc.Label).string = "Cannot save contact,Only numbers allowed!"
                    setTimeout(() => {
                        this.snackBar.active = false;
                    }, 2000)
                }
                else {
                    Profile.setValue(CONTACT, value);
                }
            }
            else {
                //OTP
            }
        }
    }

    onClickClosePopUp() {
        this.profileNode.getChildByName("Contact Button").active = true; // to avoid cascaded touch
        this.popUpNode.active = false;
    }


    setMusicSlider() {
        const musicOff = Profile.getValue(MUSIC_OFF);
        if (musicOff == "true") {
            this.musicButtonToggle()
        }
    }

    setSoundSlider() {
        const sfxOff = Profile.getValue(SFX_OFF);
        if (sfxOff == "true") {
            this.musicButtonToggle()
        }
    }

    tabNavigator(event, value: string) {
        this.settingNode.parent.children.forEach((e) => {
            e.active = false;
        });
        event.target.parent.children.forEach(e => e.getChildByName("Active Tab").active = false);
        event.target.getChildByName("Active Tab").active = true;

        switch (value) {
            case "User": this.userNode.active = true;
                break;
            case "Help": this.helpNode.active = true;
                break;
            case "Setting": this.settingNode.active = true;
                break;
            case "Profile": this.profileNode.active = true;
        }
    }

    soundButtonToggle() {
        if (this.soundToggle) {
            this.soundToggle = !this.soundToggle;
            this.soundHandle.x = -92;
            this.changeSliderLabel("Off", this.soundHandle.parent);
            Profile.setValue(MUSIC_OFF, "true")
        }
        else {
            this.soundToggle = !this.soundToggle;
            this.soundHandle.x = 95;
            this.changeSliderLabel("On", this.soundHandle.parent);
            Profile.setValue(MUSIC_OFF, "true")

        }
    }


    musicButtonToggle() {
        if (this.musicToggle) {
            this.musicToggle = !this.musicToggle;
            this.musicHandle.x = -92;
            this.changeSliderLabel("Off", this.musicHandle.parent);
            Profile.setValue(SFX_OFF, "true")
            cc.audioEngine.stopMusic()
        }
        else {
            this.musicToggle = !this.musicToggle
            this.musicHandle.x = 95;
            this.changeSliderLabel("On", this.musicHandle.parent)
            Profile.setValue(SFX_OFF, "false")
            // Util.playSfx(activeComp.bgMusic, true, true);
        }
    }


    languageSelector() {
        let len = availLanguages.length;
        let index = availLanguages.indexOf(Profile.getValue(LANGUAGE));
        let selectedLanguage = availLanguages[(index + 1) % len];
        this.languageLabel.string = selectedLanguage;
        Profile.setValue(LANGUAGE, selectedLanguage)
    }

    openHelpUri(e, data) {
        if (data == "Visit") {
            Config.getInstance().pushScene('webViewer');
        }
        else if (data == "Email") {
            cc.sys.openURL("mailto:help@chimple.org")
        }
        else {
            cc.sys.openURL("tel:+91-70912 70679")
        }
    }

    changeSliderLabel(v, node) {
        if (v == "Off") {
            node.getChildByName("Off").active = 1;
            node.getChildByName("On").active = 0;
        }
        else {
            node.getChildByName("Off").active = 0
            node.getChildByName("On").active = 1;
        }
    }
    onClickBackButton() {
        cc.director.loadScene("welcomePage")
    }

    start() {
    }

    // update (dt) {}
}


