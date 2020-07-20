import UserInput from "./userInput";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GenderSelect extends cc.Component {




  genderVal(event) {
    cc.log(UserInput.prevName)
    if(UserInput.normalSprite!=null){
      UserInput.blockSelect.getChildByName(UserInput.prevName).getComponent(cc.Button).normalSprite=UserInput.normalSprite
    }
    cc.log("$" + event.currentTarget.name +"rr"+UserInput.blockSelect.name);
    UserInput.normalSprite = UserInput.blockSelect.getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite
    UserInput.blockSelect.getChildByName(event.currentTarget.name).getComponent(cc.Button).normalSprite =   UserInput.blockSelect.getChildByName(event.currentTarget.name).getComponent(cc.Button).pressedSprite
    UserInput.initGender = event.currentTarget.name;
    cc.log("gender" + UserInput.initGender);
    UserInput.prevName = event.currentTarget.name;
  }
}
