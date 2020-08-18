import Drag from "../../../common/scripts/drag";
import ArrangeLetters from "./exchange";

import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragObj extends Drag {
  @property(cc.AudioClip)
  correctClip: cc.AudioClip = null;


  private _text: string = null;
  private _soundName: string = null;
  private _soundClip: cc.AudioClip = null;

  isCollisionEnable: boolean = false;
  goToOriginalPosition: boolean = true;
  originalLocationX: number;
  positionArray: Array<number> = [];
  currentXPos: Map<string, number> = null;
  done: boolean = false;
  tempOther: number;
  tempSelf: number;
  selfName: string;
  otherName: string;
  static tempArr: Map<string, number>;
  allSwapCorrect: Array<boolean> = [];

  onLoad() {
    cc.director.getCollisionManager().enabled = true;
    cc.macro.ENABLE_MULTI_TOUCH = false;
    for (let i = 0; i < ArrangeLetters.wordLength - 1; i++) {
      this.allSwapCorrect[i] = false;
    }
  }

  onTouchStart(touch: cc.Touch) {
    // this.playAudio(touch.currentTarget.name);
    this.goToOriginalPosition = true;
    this.isCollisionEnable = true;
    super.onTouchStart(touch);
  }

  onTouchMove(touch: cc.Touch) {
    super.onTouchMove(touch);
    this.node.setPosition(this.node.position.x, -cc.winSize.height / 4);
    touch.currentTarget.position.z = 1;
  }

  onTouchEnd(touch: cc.Touch) {
    super.onTouchEnd(touch);
    let actiona = cc.moveTo(
      0.1,
      cc.v2(
        ArrangeLetters.correctPosition.get(touch.currentTarget.name),
        -cc.winSize.height / 4
      )
    );
    this.node.runAction(actiona);
    this.checkIfMatch();
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    if (this.isCollisionEnable) {
      this.isCollisionEnable = false; //prevents return of both nodes & self is same as name of touch object.
      this.selfName = self.node.name;
      this.otherName = other.node.name;
      let actiona = cc.moveTo(
        0.1,
        cc.v2(
          ArrangeLetters.correctPosition.get(this.selfName),
          -cc.winSize.height / 4
        )
      );
      other.node.runAction(actiona);
      let temp = ArrangeLetters.correctPosition.get(this.selfName);
      ArrangeLetters.correctPosition.set(
        this.selfName,
        ArrangeLetters.correctPosition.get(this.otherName)
      );
      ArrangeLetters.correctPosition.set(this.otherName, temp);
    }
  }

  onCollisionExit(other: cc.Collider, self: cc.Collider) {}

  checkIfMatch() {
    for (let i = 0; i < ArrangeLetters.wordLength; i++) {
      if (
        ArrangeLetters.correctPosition.get(ArrangeLetters.letterArray[i]) <
        ArrangeLetters.correctPosition.get(ArrangeLetters.letterArray[i + 1])
      ) {
        this.allSwapCorrect[i] = true;
      }
    }
    this.done = this.allSwapCorrect.every((val, i, arr) => val === arr[0]);
    if (this.done) {
      this.effectsAfterMatch();
    }
  }

  playAudio(file: string) {
    Util.loadGameSound(file, function (clip) {
      if (clip != null) {
        cc.audioEngine.play(clip, false, 1);
      }
    });
  }
  effectsAfterMatch() {
    this.node.emit("correct");
    this.scheduleOnce(() => {
      this.node.emit("nextProblem");
    }, 4);
  }
}
