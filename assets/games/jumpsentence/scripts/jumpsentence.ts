import Config, { Direction } from "../../../common/scripts/lib/config";
import BridgeBuilder from "./BridgeBuilder";
import { Util } from "../../../common/scripts/util";
import KeyboardAlphabets from "./keyboardAlphabets";
import { catchError } from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpSentence extends cc.Component {
  level: number;
  worksheet: number;
  problemNo: number;
  problem: string;
  soundFile: string;
  upperCase: string;
  keyboardType: string;
  matches: Array<string>;
  charactersLeft: number;
  static updatedSentence: string = "";
  soundClip: cc.AudioClip = null;
  _isRTL: boolean = false;
  callCount: number;

  cacheAudioClip: cc.AudioClip;
  isGameFinished: boolean;

  @property(cc.Node)
  caseButtonNode: cc.Node = null;

  @property(cc.Node)
  audioNode: cc.Node = null;

  @property(cc.Node)
  lockedKeyboard: cc.Node = null;

  @property(cc.Node)
  unlockedKeyboard: cc.Node = null;

  @property(cc.Prefab)
  bridgePrefab: cc.Prefab = null;

  @property(cc.Node)
  charNode: cc.Node = null;

  friend: dragonBones.ArmatureDisplay = null

  @catchError()
  onLoad() {
    this._isRTL = Config.i.direction == Direction.RTL
    const data = Config.getInstance().data[0];
    // "[They are sad.]"
    // "A [dog] is[ ]under[ ]the[ ]b."
    // "She[ ]wants[ ]to[ ]@be[ ]a[ ]nurse[.]"
    // "It is a bus[.]"
    // ["14","2","1","A [dog] is[ ]under[ ]the[ ]b.","A_dog_is_under_the_box.mp3","n","unlocked"];
    this.callCount = 1;
    let fieldArr = data
      .toString()
      .split(",")
      .map(field => (/^\d*\.?\d+$/.test(field) ? Number(field) : field));
    //@ts-ignore
    [this.level, this.worksheet, this.problemNo, this.problem, this.soundFile, this.upperCase, this.keyboardType
    ] = fieldArr;
    cc.log("sound file " + this.soundFile + "F_arr " + fieldArr);
    JumpSentence.updatedSentence = this.problem;
    this.StartGame();
  }

  @catchError()
  private StartGame() {
    this.checkRTLAndChange();
    this.node.getComponent(BridgeBuilder).Build(this.problem);
    this.ChooseKeyboardType();
    this.onClickPlayAudio();
    this.placeCharNode();
  }

  @catchError()
  checkRTLAndChange() {
    if (this._isRTL) {
      this.node.getChildByName("Bridge").x = -100;
      this.caseButtonNode.x = -426;
      this.charNode.scaleX = -0.3;
    }
  }

  @catchError()
  placeCharNode() {
    Util.loadFriend((friendNode: cc.Node) => {
      this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
      this.charNode.addChild(friendNode)
      this.friend.playAnimation('idle', 1)
      this.charNode.x = (cc.winSize.width / 2 - 120) * (this._isRTL ? 1 : -1);
      this.node.getChildByName("Wooden Log").x = this.charNode.x;
    })

  }

  @catchError()
  ChooseKeyboardType() {
    if (Config.dir == "en/") {
      if (this.keyboardType == "locked") {
        this.lockedKeyboard.active = true;
        this.unlockedKeyboard.active = false;
      } else {
        this.lockedKeyboard.active = false;
        this.unlockedKeyboard.active = true;
        this.caseButtonNode.active = true;
        if (this.upperCase == "y") {
          this.unlockedKeyboard.getChildByName("Alphabets").getComponent(KeyboardAlphabets).onClickSwitchCaseButton();
        }
      }
    } else {
      this.node.getComponent(BridgeBuilder).createChoiceBoxes();
    }
  }

  @catchError()
  public SetCharacters(noOfCharacters: number) {
    this.charactersLeft = noOfCharacters;
    cc.log("Characters Left " + this.charactersLeft);
  }

  @catchError()
  public decreaseCharacterByOne() {
    this.charactersLeft -= 1;
    if (this.charactersLeft == 0) {
      if (this.friend != null) this.friend.armature().animation.stop("jumping2")

      new cc.Tween()
        .target(this.charNode)
        .call(() => {
          if (this.friend != null) this.friend.playAnimation("jumping2", 1)
        })
        .to(2, { x: this._isRTL ? -50 : 50 }, { progress: null, easing: "sineOut" })
        .delay(0.5)
        .call(() => {
          if (this.friend != null) this.friend.playAnimation("jumping2", 1)
        })
        .to(
          2,
          { x: (cc.winSize.width / 2 + 150) * (this._isRTL ? -1 : 1) },
          { progress: null, easing: "sineOut" }
        )
        .start();

      //Game Over, Initiate
      this.isGameFinished = true;
      this.PlayAudioOnGameEnd();
    }
  }

  @catchError()
  private DelayBySeconds(seconds: number, delayCompleteCallback: Function) {
    cc.log("In delay function......");
    var callback = cc.callFunc(delayCompleteCallback, this);
    var delayOnCompletion = cc.sequence(cc.delayTime(seconds), callback);
    this.node.runAction(delayOnCompletion);
  }

  @catchError()
  PlayAudioOnGameEnd() {
    cc.log("Playing Audio On Game End");
    this.onClickPlayAudio();
  }

  @catchError()
  NextGame() {
    if (--this.callCount == 0) {
      cc.log("Moving on to Next Problem");
      this.node.emit("nextProblem");
    }
  }

  @catchError()
  public onClickPlayAudio() {
    cc.log("Audio Play Button " + this.audioNode.name);
    let audioPlayButton = this.audioNode.getComponent(cc.Button);
    audioPlayButton.interactable = false;

    Util.loadGameSound(this.soundFile, (clip) => {
      var audioID = -1
      if (clip != null) {
        this.soundClip = clip
        audioID = cc.audioEngine.play(this.soundClip, false, 1)

      }
      if (audioID >= 0) {
        cc.audioEngine.setFinishCallback(audioID, () => {
          if (this.isGameFinished) {
            this.DelayBySeconds(3, this.NextGame);
          }
          audioPlayButton.getComponent(cc.Button).interactable = true;
        });
      }
      else {
        if (this.isGameFinished) {
          this.DelayBySeconds(3, this.NextGame);
        }
        audioPlayButton.getComponent(cc.Button).interactable = true;
      }
    });
  }

  @catchError()
  onDestroy() {
    JumpSentence.updatedSentence = null;
  }

}
