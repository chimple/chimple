import Config from "../../../common/scripts/lib/config";
import Profile, { GENDER, Gender, User, MAX_AGE } from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EditProfile extends cc.Component {

    @property(cc.Node)
    userName: cc.Node = null;

    @property(cc.Sprite)
    userImg: cc.Sprite = null;

    @property(cc.Slider)
    ageSlider: cc.Slider = null;

    @property(cc.Node)
    boySelect: cc.Node = null;

    @property(cc.Node)
    girlSelect: cc.Node = null;

    user: User;
    selectedAge: number;

    onLoad() {
        let uid = cc.sys.localStorage.getItem("userToEdit");
        this.user = Profile.getUser(uid);
        console.log("came in edit profile", this.user);
        this.userName.getComponent(cc.Label).string = this.user.name;
        this.onSelectGirlOrBoy(this.user.gender);
        this.ageSlider.progress = this.user.age / MAX_AGE;  ////@@// to add
        if (this.user.imgPath != '') {
            cc.loader.load(this.user.imgPath, function (err, texture) {
                if (!err){
                    let temp = new cc.SpriteFrame(texture)
                    this.userImg.spriteFrame = temp;
                }
            });
        }
    }

    onClickCamera() {
        Util.takePictureFromCamera((value) => {
            if (value != null) {
                cc.loader.load(value, (err, texture) => {
                    console.log("Got back ", texture);
                    if (!err) {
                        let temp = new cc.SpriteFrame(texture)
                        this.userImg.spriteFrame = temp;
                        this.user.setImgPath = value;
                    }
                });
            }
        });
    }

    ageVal(event) {
        let age = Math.ceil(event.getComponent(cc.Slider).progress * MAX_AGE);
        event.node
            .getChildByName("Handle")
            .getChildByName("ageLabel")
            .getComponent(cc.Label).string = age.toString(); // Setting label
        this.selectedAge = age;
    }


    onClickGenderSelect(event, data) {
        if (data == "Boy") {
            this.user.setGender = Gender.BOY;
            this.onSelectGirlOrBoy(Gender.BOY);
        }
        else {
            this.user.setGender = Gender.GIRL;
            this.onSelectGirlOrBoy(Gender.GIRL);
        }
    }

    onSelectGirlOrBoy(value: Gender) {
        if (value == Gender.BOY) {
            this.girlSelect.active = false;
            this.boySelect.active = true;
        }
        else {
            this.girlSelect.active = true;
            this.boySelect.active = false;
        }
    }

    onClickDelete() {
        Profile.deleteUser(this.user.id);
        Config.getInstance().popScene();
    }

    onClickBackBtn() {
        this.user.setAge = this.selectedAge; // adaded here to avoid unnecessary updates
        Config.getInstance().popScene();
    }
}


