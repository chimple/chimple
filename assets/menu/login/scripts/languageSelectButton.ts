import { Util } from "../../../common/scripts/util";
import LanguageSelectLayout from "./languageSelectLayout";
import UserInput from "./userInput";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LanguageSelectButton extends cc.Component {

  @property({
    type: cc.AudioClip
})
langButtonAudio: cc.AudioClip = null;


  languageSelectCallback(event) {
    Util.playSfx(this.langButtonAudio)
    if (UserInput.normalSprite != null) {
      UserInput.blockSelect
        .getChildByName("view")
        .getChildByName("content")
        .getChildByName(UserInput.prevName)
        .getComponent(cc.Button).normalSprite = UserInput.normalSprite;
    }
    UserInput.normalSprite = UserInput.blockSelect
      .getChildByName("view")
      .getChildByName("content")
      .getChildByName(event.currentTarget.name)
      .getComponent(cc.Button).normalSprite;
    UserInput.blockSelect
      .getChildByName("view")
      .getChildByName("content")
      .getChildByName(event.currentTarget.name)
      .getComponent(
        cc.Button
      ).normalSprite = UserInput.blockSelect
      .getChildByName("view")
      .getChildByName("content")
      .getChildByName(event.currentTarget.name)
      .getComponent(cc.Button).pressedSprite;
    UserInput.nextButtonBool = true;
    cc.log(event.currentTarget.name);
    UserInput.initLang = event.currentTarget.name;
    LanguageSelectLayout.selectedLang = event.currentTarget.name;
    UserInput.prevName = event.currentTarget.name;
    cc.log(UserInput.initLang);
  }
}
