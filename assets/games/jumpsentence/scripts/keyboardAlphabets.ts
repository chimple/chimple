import { Language } from "./language";
import Config from "../../../common/scripts/lib/config";
import { Case } from "./language";
import Alphabets from "./language";
import { catchError } from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;
const LINE_HEIGHT = 65;
const FONT_SIZE = 60;

@ccclass
export default class KeyboardAlphabets extends cc.Component {
  @property(cc.Label)
  protected keys: cc.Label[] = [];

  @property({ type: cc.Enum(Language) })
  language: Language = Language.English;

  @property({ type: cc.Enum(Case) })
  case: Case = Case.Lower;

  @catchError()
  onLoad() {
    switch (Config.i.course.lang) {
      case 'en': this.language = Language.English
        break;
      case 'ur': this.language = Language.Urdu
        break;
      case 'hi': this.language = Language.Hindi
    }
    let alphabets = Alphabets.GetAlphabets(this.language, this.case);
    this.keys.forEach((key, index) => {
      key.string = alphabets[index];
      key.fontSize = FONT_SIZE;
      key.lineHeight = LINE_HEIGHT;
    });
    if (this.keys.length == 0) {
      this.hideKeyboard()
    }
  }

  @catchError()
  hideKeyboard() {
    this.node.parent.active = false;
  }

  @catchError()
  public onClickSwitchCaseButton() {
    let caseButton = this.node.parent.parent.getChildByName("Case");
    if (this.case == Case.Lower) {
      caseButton.getChildByName("Upper Case").active = false;
      caseButton.getChildByName("Lower Case").active = true;
      this.case = Case.Upper;
      let alphabets = Alphabets.GetAlphabets(this.language, this.case);
      this.keys.forEach((key, index) => {
        key.string = alphabets[index];
      });
    } else if (this.case == Case.Upper) {
      caseButton.getChildByName("Lower Case").active = false;
      caseButton.getChildByName("Upper Case").active = true;
      this.case = Case.Lower;
      let alphabets = Alphabets.GetAlphabets(this.language, this.case);
      this.keys.forEach((key, index) => {
        key.string = alphabets[index];
      });
    }
  }

  start() { }

  // update (dt) {}
}
