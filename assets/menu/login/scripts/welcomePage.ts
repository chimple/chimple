import Profile, { MAX_USERS, User } from "../../../common/scripts/lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WelcomePage extends cc.Component {
  @property(cc.Prefab)
  addButton: cc.Prefab = null;

  @property(cc.Prefab)
  userButton: cc.Prefab = null;

  user: User;

  static userArr;
  addButtonRef: cc.Node;
  buttonArray: Array<string>;
  tempArray: Array<object>;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.layoutManager();
    Profile.initialize();
  }
  layoutManager() {
    WelcomePage.userArr = Profile.getUsers();
    cc.log("=<>=" + WelcomePage.userArr.length);
    if (WelcomePage.userArr.length < MAX_USERS) {
      this.addButtonRef = cc.instantiate(this.addButton);
      this.node.getChildByName("userLayout").addChild(this.addButtonRef);
      this.node.getChildByName("messageLabel").getComponent(cc.Label).string = "";
    }
    Profile.getUsers().forEach((e) => {
      cc.log(e);
      let userButtonRef = cc.instantiate(this.userButton);
      userButtonRef.getChildByName("Label").getComponent(cc.Label).string = e.name;

      if (e.imgPath != "") {
        cc.loader.load(e.imgPath, function (err, texture) {
          if (!err) {
            let temp = new cc.SpriteFrame(texture);
            userButtonRef
              .getChildByName("Background")
              .getChildByName("avatar")
              .getChildByName("icon")
              .getComponent(cc.Sprite).spriteFrame = temp;
          }
        });
      }
      userButtonRef.name = e.id;
      this.node.getChildByName("userLayout").addChild(userButtonRef);
    });
    let a = cc.sys.localStorage.getItem("userId");
  }
}
