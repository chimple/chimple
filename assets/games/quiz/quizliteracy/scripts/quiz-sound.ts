import ccclass = cc._decorator.ccclass;
import { Util } from "../../../../common/scripts/util";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";
import {
  QuizMathsConfig,
  WORD_PROBLEM,
} from "../../quizmaths/scripts/quiz-maths";

@ccclass
export default class QuizSound extends cc.Component {
  private _isSoundPlaying = false;
  private _soundClip = null;
  private _normalSpriteFrame: cc.SpriteFrame = null;
  private _pressedSpriteFrame: cc.SpriteFrame = null;
  private _numericSound: string = null;
  private _quizConfig: QuizLiteracyConfig | QuizMathsConfig = null;

  @catchError()
  protected onLoad(): void {
    let button = this.node.getComponent(cc.Button);
    this._normalSpriteFrame = button.normalSprite;
    this._pressedSpriteFrame = button.pressedSprite;
    this.scheduleOnce(() => {
      this.soundOnLoad();
    }, 0.5);
  }

  @catchError()
  private playSound(node: cc.Node) {
    let button = node.getComponent(cc.Button);
    if (!this._isSoundPlaying) {
      this._isSoundPlaying = true;
      button.normalSprite = this._pressedSpriteFrame;
      if (this._soundClip) {
        console.log(
          "if (this._soundClip) {",
          this._quizConfig,
          this._soundClip
        );

        // console.log("if (this.quizConfig.type===WORD_PROBLEM) {",this.quizConfig.type,WORD_PROBLEM,this.quizConfig.type===WORD_PROBLEM);

        if (this._quizConfig.type === WORD_PROBLEM) {
          Util.loadAudioFromInternet(this._soundClip, () => {
            this._isSoundPlaying = false;
            button.normalSprite = this._normalSpriteFrame;
          });
          return;
        }
        Util.speak(this._soundClip, () => {
          this._isSoundPlaying = false;
          button.normalSprite = this._normalSpriteFrame;
        });
      } else if (this._numericSound) {
        Util.speakEquation([this._numericSound], (index) => {
          this._isSoundPlaying = false;
          button.normalSprite = this._normalSpriteFrame;
        });
      }
    }
  }

  @catchError()
  stopSound() {
    this._isSoundPlaying = false;
    cc.audioEngine.stopAllEffects();
    let button = this.node.getComponent(cc.Button);
    button.normalSprite = this._normalSpriteFrame;
  }

  @catchError()
  soundOnLoad() {
    this.playSound(this.node);
  }

  @catchError()
  onButtonClick(event, customEventData) {
    let node = event.target;
    this.stopSound();
    this.playSound(node);
  }

  set soundClip(n) {
    this._soundClip = n;
  }

  set numericSound(n: string) {
    this._numericSound = n;
  }

  set quizConfig(n: QuizLiteracyConfig | QuizMathsConfig) {
    this._quizConfig = n;
  }

  protected onDestroy(): void {
    // cc.audioEngine.stopAllEffects();
    // cc.audioEngine.stopMusic();
  }
}
