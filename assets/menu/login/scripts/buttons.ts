import Config from "../../../common/scripts/lib/config";
import Profile, { MAX_USERS } from "../../../common/scripts/lib/profile";
import WelcomePage from "./welcomePage";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Buttons extends cc.Component {
  userNumber: number;
  // LIFE-CYCLE CALLBACKS:

  addButtonCallback() {
    if (WelcomePage.userArr.length < MAX_USERS) {
      Config.loadScene("userInputScene");
    } else {
      cc.log(">>" + "max reached");
    }
  }
  userButtonCallback() {
    Profile.getUsers().forEach((element) => {
      if (this.node.name == element.id) {
        Profile.setCurrentUser(element);
      }
    });
    Config.loadScene("home");
  }

  onClickParentButton() {
    Config.getInstance().pushScene("profilePage");
  }

  // update (dt) {}
}
