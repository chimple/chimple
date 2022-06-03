import {User, Gender} from "../../../../common/scripts/lib/profile";
import Config from "../../../../common/scripts/lib/config";
import AvatarSelect from "./avatar_select";
import {Util} from "../../../../common/scripts/util";
import RemoveUserPopup from "./remove_user_popup";
import WelcomePage from "../../loginnew/scripts/welcomePage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EditProfile extends cc.Component {

    @property(cc.EditBox)
    userNameBox: cc.EditBox = null;

    @property(cc.Sprite)
    userImg: cc.Sprite = null;

    @property(cc.Node)
    ageSelect: cc.Node = null;

    @property(cc.Node)
    boySelect: cc.Node = null;

    @property(cc.Node)
    girlSelect: cc.Node = null;

    @property(cc.Label)
    ageLabel: cc.Label = null;

    @property(cc.Label)
    genderLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    chooseAvatarLabel: cc.Label = null;

    @property(cc.Label)
    teacherLabel: cc.Label = null;

    @property(cc.Node)
    avatarSelect: cc.Node = null;

    @property(cc.Prefab)
    teacherItem: cc.Prefab = null;

    @property(cc.Node)
    teacherNode: cc.Node = null;

    user: User;
    selectedAge: number;
    teacherNodeToRemove: cc.Node = null;

    onLoad() {
        let uid = cc.sys.localStorage.getItem("userToEdit");
        this.user = User.getUser(uid);
        console.log("came in edit profile", this.user);
        this.userNameBox.string = this.user.name;
        this.loadUserImageOrAvatar(this.user)
        this.onSelectGirlOrBoy(this.user.gender);
        this.initializeAge(this.user.age);
        this.avatarSelect.getComponent(AvatarSelect).user = this.user;
        this.initializeTeachersList();
        this.i18n();
    }

    i18n() {
        this.ageLabel.string = Util.i18NText("Age   :");
        this.genderLabel.string = Util.i18NText("Gender  :");
        this.nameLabel.string = Util.i18NText("Name   :");
        this.chooseAvatarLabel.string = Util.i18NText("Choose your avatar");
        this.teacherLabel.string = Util.i18NText("Class  :");
    }

    initializeTeachersList() {
        const key = `teacher_for_student_${this.user.id}`;
        const teachersForStudent: string[] = JSON.parse(cc.sys.localStorage.getItem(key) || '[]');
        teachersForStudent.forEach((e, index) => {
            let node = cc.instantiate(this.teacherItem);
            node.getChildByName('label').getComponent(cc.Label).string = e;
            // let clickEventHandler = new cc.Component.EventHandler();
            // clickEventHandler.target = this.node;
            // clickEventHandler.component = "editprofile";
            // clickEventHandler.handler = "showRemovePopup";
            // clickEventHandler.customEventData = node.uuid;
            // node.getChildByName('cross').getComponent(cc.Button).clickEvents.push(clickEventHandler);
            this.teacherNode.addChild(node);
        });
    }

    showRemovePopup(e, data) {
        let node = this.teacherNode.getChildByUuid(data);
        this.node.getChildByName("remove").getComponent(RemoveUserPopup).isTeacher = true;
        this.node.getChildByName("remove").active = true;
        this.teacherNodeToRemove = node;
        //todo
    }

    deleteTeacher() {
        if (this.teacherNodeToRemove) {
            this.teacherNode.removeChild(this.teacherNodeToRemove);
            this.teacherNode.getComponent(cc.Layout).updateLayout();
        }
    }

    loadUserImageOrAvatar(currentUser) {
        if (currentUser.imgPath && currentUser.imgPath != '' && currentUser.imgPath.length > 0) {
            cc.loader.load(currentUser.imgPath, function (err, texture) {
                if (!err) {
                    let temp = new cc.SpriteFrame(texture)
                    this.userImg.spriteFrame = temp;
                }
            });
        } else {
            if(currentUser.avatarImage && currentUser.avatarImage.length > 0) {
                cc.resources.load(`avatars/${currentUser.avatarImage}`, (err, sp) => {
                    // @ts-ignore
                    this.userImg.spriteFrame = new cc.SpriteFrame(sp);
                });
            }
        }
    }

    initializeAge(age: Number) {
        this.ageSelect.getChildByName(age.toString()).getChildByName("Active").active = true;

    }

    onClickAvatarEdit() {
        this.node.getChildByName("main_screen").active = false;
        this.avatarSelect.active = true;
    }

    onEditName(e) {
        let value = this.userNameBox.node.getChildByName("text").getComponent(cc.Label).string;
        this.user.name = value;
    }

    onClickAge(e, data) {
        for (let i = 0; i < this.ageSelect.childrenCount; i++) {
            this.ageSelect.children[i].getChildByName("Active").active = false;
        }
        e.target.getChildByName("Active").active = true;
        this.selectedAge = parseInt(data);
        this.user.age = this.selectedAge;
    }

    onClickGenderSelect(event, data) {
        if (data == "Boy") {
            this.user.gender = Gender.BOY;
            this.onSelectGirlOrBoy(Gender.BOY);
        } else {
            this.user.gender = Gender.GIRL;
            this.onSelectGirlOrBoy(Gender.GIRL);
        }
    }

    onSelectGirlOrBoy(value: Gender) {
        cc.log(value);
        if (value == Gender.BOY) {
            this.girlSelect.active = false;
            this.boySelect.active = true;
        } else if (value == Gender.GIRL) {
            this.girlSelect.active = true;
            this.boySelect.active = false;
        }
    }

    onClickDeleteBtn() {
        WelcomePage.userArr.length--;
        this.node.getChildByName("remove").active = true;
    }

    deleteUser() {
        User.deleteUser(this.user.id);
        Config.getInstance().popScene();
    }

    onClickBackBtn() {
        Config.getInstance().popScene();
    }
}

