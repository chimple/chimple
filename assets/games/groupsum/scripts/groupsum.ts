import Ball from "./ball";
import Config from "../../../common/scripts/lib/config";
import { Util, TouchEvents } from "../../../common/scripts/util";
import { catchError } from "../../../common/scripts/lib/error-handler";
import Game from "../../../common/scripts/game";

const { ccclass, property } = cc._decorator;

export const GROUND = 50;
const GROUND_TUB = 200;

@ccclass
export default class GroupSum extends Game {
  public Callback: () => void;

  @property({
    type: cc.AudioClip
  })
  ballAudio: cc.AudioClip = null;

  @property(cc.AudioClip)
  clearAudio: cc.AudioClip = null;

  @property(cc.Prefab)
  ballPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  boxPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  tubPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  helpLabelPrefab: cc.Prefab = null;

  totalCount: number;
  mode: string;
  boxIndex: Array<number> = [3, 4, 5, 6, 7, 8];
  tub1Count: number;
  tub2Count: number = 0;
  groundBallCount: number = 0;
  boxHomePos: Map<string, cc.Vec2>;
  ballCurrentPlace: Map<string, string>;
  finishCount: number;
  totalPieces: number = 0;
  notCompare: string;
  showAnswer: boolean;
  audioName: Array<string>;
  count: number = 0;
  isScrolling: boolean = false;
  draggedBall: string = "";
  firstDrag: cc.Node = null;
  firstDrop: cc.Node = null;
  hasScrollComplete = false;

  @catchError()
  onLoad() {
    const data = Config.getInstance().data[0];
    //const data = ["10", "2", "3", "6", "+", "3", "=", "9", "false", "false"];
    cc.director.getPhysicsManager().enabled = true;
    this.animAudio("problem_clear");
    this.totalPieces++;
    cc.log(data);
    this.boxHomePos = new Map();
    this.ballCurrentPlace = new Map();
    this.audioName = [];
    let fieldArr = data.toString().split(",");
    this.mode = fieldArr[8] == "true" ? "subtraction" : "addition";
    this.showAnswer = fieldArr[9] == "true" ? true : false;
    this.tub1Count = +fieldArr[3];
    this.tub2Count = +fieldArr[5];
    this.groundBallCount = +fieldArr[5];
    this.totalCount = this.tub1Count + this.tub2Count;
    this.finishCount = this.showAnswer ? 3 : 5;
    this.firstDrop = new cc.Node();

    let ac = 3;
    while (ac < 8) {
      this.audioName.push(fieldArr[ac]);
      ac++;
    }
    var tub1;
    var tub2;
    cc.log(fieldArr[3] + fieldArr[4] + fieldArr[8] + this.mode);
    let tubY = -cc.winSize.height / 2 + GROUND_TUB + GROUND;
    if (this.mode == "addition") {
      tub1 = cc.instantiate(this.tubPrefab);
      tub1.name = "tub1";
      this.node.addChild(tub1);
      tub2 = cc.instantiate(this.tubPrefab);
      tub2.name = "tub2";
      this.node.addChild(tub2);
      tub1.getComponent(cc.RigidBody).node.position = cc.v2(-300, tubY);
      tub1
        .getChildByName("colliderLine")
        .getComponent(cc.RigidBody).node.position = cc.v2(0, tubY);
      tub2.getComponent(cc.RigidBody).node.position = cc.v2(300, tubY);
      tub2
        .getChildByName("colliderLine")
        .getComponent(cc.RigidBody).node.position = cc.v2(0, tubY);
      this.firstDrop.parent = tub1;
      this.firstDrop.y += tub1.y + 380;
    } else {
      tub1 = cc.instantiate(this.tubPrefab);
      tub1.name = "tub1";
      /// if resize needed make another prefab
      this.node.addChild(tub1);
      tub1.getComponent(cc.RigidBody).node.position = cc.v2(0, tubY);
      tub1
        .getChildByName("colliderLine")
        .getComponent(cc.RigidBody).node.position = cc.v2(0, tubY);
      this.firstDrop.parent = tub1;
      this.firstDrop.position = cc.v2(-350, -150);
    }

    //////////// ball
    const box1Rect = this.node.getChildByName("tub1").getBoundingBox();

    let loopLen = this.totalCount;

    if (this.mode == "subtraction") {
      loopLen = +fieldArr[3];
    }

    for (let i = 0, j = box1Rect.y + 45; i < loopLen; i++) {
      const ball = cc.instantiate(this.ballPrefab);
      const ballComp = ball.getComponent(Ball);
      this.node.addChild(ball);
      if (i == 0) {
        this.firstDrag = ball;
      }
      if (this.mode == "subtraction") {
        ballComp.mode = this.mode;
        ballComp.name = i.toString();
        ballComp.homeName = "tub1";
        ballComp.box1Rect = box1Rect;
        if (i % 6 == 5) {
          j += 10 + ball.height;
        }
        ball.position = cc.v2(box1Rect.x + (i % 6) * (ball.width - 5) + 130, j);
        ballComp.homePos = ball.position;
      } else {
        ball.position = cc.v2(
          Math.random() * cc.winSize.width - cc.winSize.width / 2,
          -cc.winSize.height / 2 + 80
        );
        ballComp.homePos = ball.position;
        ballComp.homeName = "ground";
        ballComp.mode = this.mode;
        ballComp.name = i.toString();
        ballComp.box1Rect = box1Rect;
        ballComp.box2Rect = this.node.getChildByName("tub2").getBoundingBox();
      }
    }

    /// help boxes
    const helpLabel1 = cc.instantiate(this.helpLabelPrefab);
    const helpLabel2 = cc.instantiate(this.helpLabelPrefab);
    const helpLabel3 = cc.instantiate(this.helpLabelPrefab);
    const helpLabel4 = cc.instantiate(this.helpLabelPrefab);
    helpLabel1.getComponent(cc.Label).string = fieldArr[3];
    helpLabel2.getComponent(cc.Label).string = fieldArr[5]; // down
    helpLabel3.getComponent(cc.Label).string = fieldArr[3]; // top
    helpLabel4.getComponent(cc.Label).fontSize = 35;
    if (this.mode == "subtraction") {
      helpLabel1.getComponent(cc.Label).fontSize = 35;
      helpLabel1.opacity = 0;
      helpLabel3.parent = tub1;
      helpLabel3.position = cc.v2(box1Rect.origin.x - 7, box1Rect.height - 70);
      helpLabel1.parent = tub1;
      helpLabel1.name = "help1";
      helpLabel4.parent = tub1;
      helpLabel4.name = "help4";
      helpLabel1.position = cc.v2(
        box1Rect.width / 2 - 80,
        box1Rect.height / 2 - 80
      );
      helpLabel4.position = cc.v2(100, -box1Rect.height / 2 - 20); // ground guy
      helpLabel2.parent = tub1;
      helpLabel2.position = cc.v2(-310, -75);
      helpLabel2.zIndex = 1;
    } else {
      helpLabel1.parent = this.node;
      helpLabel1.position = box1Rect.center;
      helpLabel2.parent = this.node;
      helpLabel2.position = this.node
        .getChildByName("tub2")
        .getBoundingBox().center;
    }

    let slot = new cc.Node();
    this.node.addChild(slot);
    slot.position = cc.v2(0, 0);
    slot.name = "box_slot";

    ///// down box  1
    for (let i = 0, j = 3; i < 5; i++ , j++) {
      const box = cc.instantiate(this.boxPrefab);
      slot.addChild(box);
      box.position = cc.v2(-300 + i * 150, -460);
      box.name = fieldArr[j];
      if (
        this.showAnswer &&
        (fieldArr[j] == "=" || fieldArr[j] == "+" || fieldArr[j] == "-")
      ) {
        box.getChildByName("label").getComponent(cc.Label).string = fieldArr[j];
        box.name = fieldArr[j] + "_operator";
      }
    }

    this.boxIndex = this.shuffle(this.boxIndex);
    var random = Math.round(this.getRandom(1, 9));
    while (
      random == +fieldArr[3] ||
      random == +fieldArr[5] ||
      random == +fieldArr[7]
    ) {
      random = Math.round(this.getRandom(1, 9));
    }
    this.notCompare = random.toString();

    /// down box2
    for (let i = 0, j = 3; i < 6; i++) {
      const box = cc.instantiate(this.boxPrefab);
      slot.addChild(box);
      box.position = cc.v2(-300 + i * 150 - 60, -600);
      if (this.boxIndex[i] != 8) {
        box.getChildByName("label").getComponent(cc.Label).string =
          fieldArr[this.boxIndex[i]];
        this.boxHomePos.set(
          "choice_" + i.toString() + fieldArr[this.boxIndex[i]],
          box.position
        );
        box.name = "choice_" + i.toString() + fieldArr[this.boxIndex[i]];
      } else {
        box
          .getChildByName("label")
          .getComponent(cc.Label).string = random.toString();
        box.name = "choice_" + i.toString() + random.toString();
        this.boxHomePos.set(
          "choice_" + i.toString() + random.toString(),
          box.position
        );
      }
      box.on(TouchEvents.TOUCH_START, this.onTouchStarted, this);
      box.on(TouchEvents.TOUCH_MOVE, this.onTouchMoved, this);
      box.on(TouchEvents.TOUCH_END, this.onTouchEnded, this);
      box.on(TouchEvents.TOUCH_CANCEL, this.onTouchEnded, this);
    }
    Util.showHelp(this.firstDrag, this.firstDrop);
  }

  @catchError()
  shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  @catchError()
  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  @catchError()
  playBallAudio() {
    if (!cc.audioEngine.isMusicPlaying()) {
      Util.playSfx(this.ballAudio);
    }
  }

  @catchError()
  animAudio(musicName: string) {
    if (!cc.audioEngine.isMusicPlaying()) {
      Util.playSfx(this.clearAudio);
    }
    //   try {
    //   if (!cc.audioEngine.isMusicPlaying()) {
    //     var file = BAHAMA_DIR + "sound/" + musicName;
    //     Util.load(file, function(err, clip) {
    //       cc.log("check sound " + clip);
    //       if (!err && clip !== null) {
    //         var audioID = cc.audioEngine.play(clip, false, 1);
    //       }
    //     });
    //   }
    // } catch (error) {
    //   cc.log("error audio -" + error);
    // }
  }

  @catchError()
  onDestroy() {
    cc.audioEngine.stopAllEffects();
  }

  ///////////////////////////  finish

  @catchError()
  checkFinishCtl(shouldCheckFinish: boolean, isDrag: boolean) {
    this.Callback = function () {
      this.checkFinish(true);
    };
    if (this.Callback) {
      this.unscheduleAllCallbacks(); //shouldCheckFinish=false => unschedule all callbacks
    }
    if (shouldCheckFinish) {
      if (isDrag) {
        this.checkFinish(false);
      } else {
        this.scheduleOnce(this.Callback, 0.5);
      }
    }
  }

  @catchError()
  checkFinish(shouldScroll: boolean) {
    let collider1 = this.node.getChildByName("tub1").getChildByName("collider");
    let collider2;
    if (this.mode == "addition") {
      collider2 = this.node.getChildByName("tub2").getChildByName("collider");
    }

    cc.log(
      "final fn " +
      shouldScroll +
      this.draggedBall +
      "Count: " +
      cc.director.getPhysicsManager().testAABB(
        this.node
          .getChildByName("tub1")
          .getChildByName("collider")
          .getBoundingBoxToWorld()
      ).length +
      " diff_1 " +
      cc.director.getPhysicsManager().testAABB(
        this.node
          .getChildByName("tub1")
          .getChildByName("collider")
          .getChildByName("diff_1")
          .getBoundingBoxToWorld()
      ).length +
      " diff2 " +
      cc.director.getPhysicsManager().testAABB(
        this.node
          .getChildByName("tub1")
          .getChildByName("collider")
          .getChildByName("diff_2")
          .getBoundingBoxToWorld()
      ).length
    );

    let tub1Count = this.ballsInTub(collider1);
    if (this.mode == "subtraction") {
      if (this.tub1Count - tub1Count == 0) {
        this.node.getChildByName("tub1").getChildByName("help1").opacity = 0;
        this.node.getChildByName("tub1").getChildByName("help4").opacity = 0;
      } else {
        this.node.getChildByName("tub1").getChildByName("help1").opacity = 255;
        this.node.getChildByName("tub1").getChildByName("help4").opacity = 255;
        this.node
          .getChildByName("tub1")
          .getChildByName("help1")
          .getComponent(cc.Label).string = tub1Count.toString();
        this.node
          .getChildByName("tub1")
          .getChildByName("help4")
          .getComponent(cc.Label).string = (
            this.tub1Count - tub1Count
          ).toString();
      }

      if (tub1Count == this.tub1Count - this.groundBallCount && shouldScroll) {
        this.scrollScene();
      }
    } else if (
      shouldScroll &&
      this.tub1Count == tub1Count &&
      this.tub2Count == this.ballsInTub(collider2)
    ) {
      this.scrollScene();
    }
  }

  @catchError()
  ballsInTub(tubCollider: cc.Node): number {
    let collideBalls = cc.director
      .getPhysicsManager()
      .testAABB(tubCollider.getBoundingBoxToWorld());
    let ballsOut = cc.director
      .getPhysicsManager()
      .testAABB(tubCollider.getChildByName("diff_1").getBoundingBoxToWorld())
      .concat(
        cc.director
          .getPhysicsManager()
          .testAABB(
            tubCollider.getChildByName("diff_2").getBoundingBoxToWorld()
          )
      );
    return collideBalls.length - ballsOut.length;
  }

  @catchError()
  scrollScene() {
    if (!this.isScrolling) {
      this.isScrolling = true;
      this.node.getComponentsInChildren(Ball).forEach(e => {
        e.handleNodeTouch("off");
      });
      let target = this.node.getChildByName("box_slot");
      new cc.Tween()
        .target(target)
        .to(
          2,
          { position: cc.v2(target.x, target.y + 745) }, ////// first tween
          { progress: null, easing: "bounceOut" }
        )
        .call(() => (this.hasScrollComplete = true))
        .start();
    }
  }

  @catchError()
  onTouchStarted(touch) {
    if (touch.getID() == 0 && this.hasScrollComplete) {
      touch.currentTarget.scale = 1.1;
    }
  }

  @catchError()
  onTouchMoved(touch) {
    if (touch.getID() == 0 && this.hasScrollComplete) {
      touch.currentTarget.position = touch.currentTarget.position.add(
        touch.getDelta()
      );
    }
  }

  @catchError()
  onTouchEnded(touch) {
    let touchedName = touch.currentTarget
      .getChildByName("label")
      .getComponent(cc.Label).string;

    let dropRect;
    let isRight = false;
    this.node.getChildByName("box_slot").children.forEach(e => {
      if (
        e.name == touchedName &&
        e.getBoundingBox().contains(touch.currentTarget)
      ) {
        e.name = "done" + e.name;
        dropRect = e.getBoundingBox();
        isRight = true;
      }
    });

    if (touchedName != this.notCompare && isRight) {
      this.node.emit("correct");
      touch.currentTarget.scale = 1;
      touch.currentTarget.position = dropRect.center;
      touch.currentTarget.name = "done_" + touchedName;
      touch.currentTarget.off(
        cc.Node.EventType.TOUCH_START,
        this.onTouchStarted,
        this
      );
      touch.currentTarget.off(
        cc.Node.EventType.TOUCH_MOVE,
        this.onTouchMoved,
        this
      );
      touch.currentTarget.off(
        cc.Node.EventType.TOUCH_END,
        this.onTouchEnded,
        this
      );
      touch.currentTarget.off(
        cc.Node.EventType.TOUCH_CANCEL,
        this.onTouchEnded,
        this
      );
      if (--this.finishCount == 0) {
        this.node.getChildByName("box_slot").children.forEach(e => {
          if (e.name.startsWith("choice")) {
            e.off("touchstart", this.onTouchStarted, this);
            e.off("touchmove", this.onTouchMoved, this);
            e.off("touchend", this.onTouchEnded, this);
            e.off("touchcancel", this.onTouchEnded, this);
          }
        });

        this.scheduleOnce(() => {
          Util.speakEquation(this.audioName, index => {
            if (index + 1 == this.audioName.length) {
              this.node.emit("nextProblem");
            }
          });
        }, 1);
      }
      touch.currentTarget.scale = 1;
    } else {
      this.node.emit("wrong");
      new cc.Tween()
        .target(touch.currentTarget)
        .to(
          0.3,
          { position: this.boxHomePos.get(touch.currentTarget.name), scale: 1 }, ////// first tween
          { progress: null, easing: t => t }
        )
        .start();
    }
  }
}
