import UserInput from "./userInput";
const { ccclass, property } = cc._decorator;
import LanguageSelectButton from "./languageSelectButton";
import { Util } from "../../../common/scripts/util";

@ccclass
export default class LanguageSelectLayout extends cc.Component {
  @property(cc.Prefab)
  langadd: cc.Prefab = null;

  @property(cc.Prefab)
  langtitle: cc.Prefab = null;
  //Add languages here
  languages: Array<String> = ["ENGLISH", "HINDI", "URDU", "SWAHILI","GUJRATI","CHINESE","FRENCH","GERMAN"];
  langtitleRef: cc.Node;
  static selectedLang = "";
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    UserInput.nextButtonBool = false;
    // this.langtitleRef = cc.instantiate(this.langtitle);
    // this.langtitleRef.parent = this.node;
    // this.langtitleRef.name = "test";
    // this.langtitleRef.getComponent(cc.Label).string = "Select a Language ";
    this.languages.forEach((element) => {
      let langSelectButton = cc.instantiate(this.langadd);
      langSelectButton.name =  Util.i18NText(element.toString());
      langSelectButton
        .getChildByName("Background")
        .getChildByName("Label")
        .getComponent(cc.Label).string = Util.i18NText(element.toString());
        this.node.getChildByName("view").getChildByName("content").addChild(langSelectButton);
    });
  }
}
