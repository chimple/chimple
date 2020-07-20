import Profile, { Gender, Language } from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserInput extends cc.Component {


  @property(cc.Node)
  holder: cc.Node = null;

  @property(cc.Prefab)
  block1: cc.Prefab = null;

  @property(cc.Prefab)
  block2: cc.Prefab = null;

  @property(cc.Prefab)
  block3: cc.Prefab = null;

  @property(cc.Prefab)
  block4: cc.Prefab = null;

  @property(cc.Prefab)
  editBox: cc.Prefab = null;

  @property({
    type: cc.AudioClip
  })
  nextButtonAudio: cc.AudioClip = null;


  static initAge: number;
  static initGender: String;
  static initName: string;
  static initLang: String;
  static initCamera: String;
  static imgPath: string = "";

  maxAge: number = 12
  prefabNumber: number = 1
  static blockSelect: cc.Node;
  static prevName: string
  static normalSprite: cc.SpriteFrame = null;
  nameLabel: cc.Node;
  userParam: String = '';
  nameLabelPos: cc.Vec3;
  offsetVal: number;
  static nextButtonBool: boolean = false

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    UserInput.blockSelect = cc.instantiate(this.editBox)
    if (UserInput.blockSelect != null) {
      this.holder.addChild(UserInput.blockSelect)
      this.nameLabel = this.holder.getChildByName('nameBox')
      this.nameLabel.on('text-changed', this.nameVal, this);
      this.nameLabel.on('editing-did-began', this.editBegan, this)
      this.nameLabel.on('editing-did-ended', this.editReturn, this)
    }
    this.nameLabelPos = this.nameLabel.position
  }

  nextButton() {
    UserInput.normalSprite = null
    if (UserInput.nextButtonBool) {
      if (this.prefabNumber <= 4) {
        this.holder.removeAllChildren();
        UserInput.blockSelect = cc.instantiate(this['block' + [this.prefabNumber]]);
        if (UserInput.blockSelect != null) {
          this.holder.addChild(UserInput.blockSelect)
        }
        this.prefabNumber = this.prefabNumber + 1;
      }
      else if (this.prefabNumber == 5) { //load homepage here with all the data obtained for new user
        this.saveAndCreateUser()
        cc.director.loadScene("welcomePage")
      }
    }
    else {
      this.nameLabel.getChildByName("warnUser").getComponent(cc.Label).string = "Enter a valid value"
    }
    Util.playSfx(this.nextButtonAudio)
  }

  nameVal(this.nameLabel) {
    cc.log("()" + this.nameLabel.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).string)
    cc.log("()" + this.nameLabel.getChildByName("TEXT_LABEL").getComponent(cc.Label).string)
    let nameEntered = this.nameLabel.getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
    UserInput.initName = nameEntered
    cc.log("userName" + UserInput.initName)
    if (UserInput.initName != '') {
      UserInput.nextButtonBool = true
    }
    else {
      UserInput.nextButtonBool = false
    }


  }
  editBegan(this.nameLabel) {
    this.offsetVal = cc.winSize.height / 5
    this.nameLabel.position = cc.v2(this.nameLabelPos.x, this.nameLabelPos.y + this.offsetVal)
  }

  editReturn(this.nameLabel) {
    this.nameLabel.position = cc.v2(this.nameLabelPos.x, this.nameLabelPos.y)
  }

  saveAndCreateUser() {
    let name = UserInput.initName
    let age = UserInput.initAge
    let imgLoc =UserInput.initCamera
    if (UserInput.initGender == 'MALE') {
      var genderval = Gender.BOY
    }
    else if (UserInput.initGender == 'FEMALE') {
      var genderval = Gender.GIRL
    }

    let language = this.getLanguage();
    // let camera = Profile.getUserData('camera');
    cc.log("=<>=" + UserInput.initAge)
    Profile.createUser(name, UserInput.imgPath, age, genderval);
  }
  getLanguage() {
    let getLang = UserInput.initLang;
    switch (getLang) {
      case 'ENGLISH': return Language.ENGLISH;
      case 'HINDI': return Language.HINDI;
    }


  }
}
