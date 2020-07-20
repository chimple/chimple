import Profile, { MAX_AGE } from "../../../common/scripts/lib/profile";
import UserInput from "./userInput";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AgeSelect extends cc.Component {
  maxAge: number = MAX_AGE;
  selectedAge: string;
  ageNum: number;

  onLoad() {
    this.selectedAge = "";
    this.ageNum = 0;
    UserInput.nextButtonBool = false;
  }
 
  ageVal(event) {
    this.ageNum = Math.ceil(
      event.getComponent(cc.Slider).progress * this.maxAge
    );
    event.node
      .getChildByName("Handle")
      .getChildByName("ageLabel")
      .getComponent(cc.Label).string = this.ageNum.toString(); // Setting label
    this.selectedAge = this.ageNum.toString();
    event.node.getChildByName("warning").getComponent(cc.Label).string = "";
    UserInput.nextButtonBool = true;
    UserInput.initAge = this.ageNum;
    cc.log(UserInput.initAge);
  }

}
