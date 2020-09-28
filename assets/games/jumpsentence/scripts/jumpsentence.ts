import Config, { Direction } from "../../../common/scripts/lib/config";
import BridgeBuilder from "./BridgeBuilder";
import { Util } from "../../../common/scripts/util";
import KeyboardAlphabets from "./keyboardAlphabets";
import { catchError } from "../../../common/scripts/lib/error-handler";
import Game from "../../../common/scripts/game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpSentence extends Game {
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
  lockedKeyboard: cc.Node = null;

  @property(cc.Node)
  unlockedKeyboard: cc.Node = null;

  @property(cc.Prefab)
  bridgePrefab: cc.Prefab = null;

  @property(cc.Node)
  friendPos: cc.Node = null;

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
      this.friendPos.scaleX = -0.3;
    }
  }

  @catchError()
  placeCharNode() {
    this.friendPos.x = (cc.winSize.width / 2 - 120) * (this._isRTL ? 1 : -1);
    this.node.getChildByName("Wooden Log").x = this.friendPos.x;
  }

  @catchError()
  ChooseKeyboardType() {
    if (Config.i.course.lang == "en") {
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
      this.friend.stopAnimation("jumping2")

      new cc.Tween()
        .target(this.friendPos)
        .call(() => {
          this.friend.playAnimation("jumping2", 1)
        })
        .to(2, { x: this._isRTL ? -50 : 50 }, { progress: null, easing: "sineOut" })
        .delay(0.5)
        .call(() => {
          this.friend.playAnimation("jumping2", 1)
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
  PlayAudioOnGameEnd() {
    cc.log("Playing Audio On Game End");
    this.friend.speakExtra(() => {
      this.scheduleOnce(() => {
        this.node.emit("nextProblem");
      }, 3)
    })
  }

  @catchError()
  public onClickPlayAudio() {
    Util.loadGameSound(this.soundFile, (clip) => {
      if (clip != null) {
        this.friend.extraClip = clip
      }
    });
  }

  @catchError()
  onDestroy() {
    JumpSentence.updatedSentence = null;
  }

}
