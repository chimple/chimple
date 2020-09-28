import EmptyBox from "./emptyBox";
import JumpSentence from "./jumpsentence";
import BridgeBuilder from "./BridgeBuilder";
import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import { catchError } from "../../../common/scripts/lib/error-handler";
import LessonController from "../../../common/scripts/lessonController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class KeyboardButton extends cc.Component {
  public isTouchEnded: boolean;
  public isProcessing: boolean;
  public myOriginalLocation: cc.Vec2;
  collidingBox: cc.Node;
  isDone: boolean;
  bridgeComp: BridgeBuilder;

  private _soundClip: cc.AudioClip = null;

  @property(cc.Prefab)
  labelPrefab: cc.Prefab = null;

  @property(cc.SpriteFrame)
  fillSprite: cc.SpriteFrame = null;

  @property({ type: Boolean })
  hindiKeyBoard: boolean = false;

  @catchError()
  onLoad() {
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;
    this.node.on("touchstart", this.onTouchStart, this);
    this.node.on("touchmove", this.onTouchMove, this);
    this.node.on("touchend", this.onTouchEnd, this);
    this.node.on("touchcancel", this.onTouchEnd, this);
    this.bridgeComp = this.node.parent.parent.parent.getComponent(BridgeBuilder);
    let text = this.node.getChildByName("Label").getComponent(cc.Label).string;
    if (
      Config.i.course.lang == "en" &&
      (text == this.bridgeComp.firstDragData.toUpperCase() ||
        text == this.bridgeComp.firstDragData.toLowerCase())
    ) {
      this.bridgeComp.showHelp(this.node);
    }
    let temp = this.node.getChildByName("Label").getComponent(cc.Label).string;
    let reg = new RegExp("[a-z]|[A-Z]");
    if (Config.i.course.lang == "en" && reg.test(temp)) {  // To seperate Hindi voice
      Util.loadsLetter(temp.toLowerCase(), (clip) => {
        this._soundClip = clip
      });
    }
  }

  @catchError()
  onCollisionStay(other, self) {
    cc.log(
      "Colliding with empty box expecting " +
      other.node.getComponent(EmptyBox).myCharacter +
      " getting : " +
      this.node.getChildByName("Label").getComponent(cc.Label).string
    );

    if (this.collidingBox && other.node.name != this.collidingBox.name) {
      this.onCollisionExit(other, self);
    }
    // let logs = "Expecting " + other.node.getComponent(EmptyBox).myCharacter + " getting " + this.node.getChildByName("Label").getComponent(cc.Label).string;
    // this.node.getParent().getParent().getParent().getChildByName("debugLabel").getComponent(cc.Label).string = logs
    this.collidingBox = other.node;
    if (
      this.collidingBox.getComponent(EmptyBox).myCharacter ===
      this.node.getChildByName("Label").getComponent(cc.Label).string
    ) {
      this.collidingBox.getChildByName("Glow Box").opacity = 255;
      this.isProcessing = true;
      this.isDone = false;
      this.collidingBox = other.node;
    } else {
      this.isProcessing = false;
    }
  }

  @catchError()
  onCollisionExit(other, self) {
    if (this.collidingBox) {
      this.collidingBox.getChildByName("Glow Box").opacity = 0;
    }
    this.isProcessing = false;
  }

  @catchError()
  onTouchStart(touch: cc.Touch) {
    if (touch.getID() == 0) {
      this.myOriginalLocation = this.node.position;
      cc.log("Original Location " + this.myOriginalLocation);
      this.isTouchEnded = false;
      this.isProcessing = false;
      try {
        if (!!this._soundClip) LessonController.getFriend().speak(this._soundClip)
      } catch (error) {
        console.log("Failed playing sound");
      }
    }
    // cc.log("Touch Started");
  }

  @catchError()
  onTouchMove(touch: cc.Touch) {
    // cc.log("Touch Moving");
    if (touch.getID() == 0) {
      this.node.position = this.node.position.add(touch.getDelta());

      if (this.isProcessing) {
        cc.log(
          "Empty Box Chr " +
          this.collidingBox.getComponent(EmptyBox).myCharacter +
          "label " +
          this.node.getChildByName("Label").getComponent(cc.Label).string +
          "!is Done " +
          !this.isDone
        );
        if (
          this.collidingBox.getComponent(EmptyBox).myCharacter ===
          this.node.getChildByName("Label").getComponent(cc.Label).string &&
          !this.isDone
        ) {
          if (
            this.collidingBox.name == "Empty Box" ||
            this.collidingBox.name == "Capsule Empty"
          ) {
            cc.log("came active " + this.collidingBox.children[0]);
            this.collidingBox.getChildByName("Glow Box").opacity = 255;
          } else {
            this.collidingBox.getChildByName("Glow Box").opacity = 0;
          }
        }
      }
    }
  }

  @catchError()
  onTouchEnd(touch: cc.Touch) {
    // cc.log("Touch Ended");
    if (touch.getID() == 0) {
      if (this.isProcessing) {
        console.log(this.collidingBox.getComponent(EmptyBox).characterIndex, " This is myindex ");
        if (
          this.collidingBox.getComponent(EmptyBox).myCharacter ===
          this.node.getChildByName("Label").getComponent(cc.Label).string &&
          !this.isDone
        ) {
          if (Config.i.course.lang == "en") {
            this.node.parent.parent.parent.emit("correct");
          } else {
            this.node.parent.emit("correct");
          }
          this.isDone = true;
          this.bridgeComp.joinBridge(this.collidingBox, this.node.getChildByName("Label").getComponent(cc.Label).string);
          var callback = cc.callFunc(this.onBacktoOriginalPlace, this);
          cc.log(
            "Setting Back to Original Location on Touch End after success"
          );
          var action = cc.sequence(
            cc.moveTo(0.05, this.myOriginalLocation),
            callback
          );
          //Add additional Animations
          this.node.runAction(action);
          this.node.position = this.myOriginalLocation;
        }
      } else {
        this.isProcessing = false;
        cc.log(
          "Setting Back to Original Location on Touch End if not colliding"
        );
        this.node.position = this.myOriginalLocation;
        if (Config.i.course.lang == "en") {
          this.node.parent.parent.parent.emit("wrong");
        } else {
          this.node.parent.emit("wrong");
        }
      }
    }
  }

  @catchError()
  onBacktoOriginalPlace() {
    cc.log("Setting Back Opacity to Opaque");
    this.node.opacity = 255;
    this.collidingBox.getComponent(cc.BoxCollider).enabled = false;
    if (this.hindiKeyBoard) {
      cc.log("came hindi touch end");
      this.node.parent.getComponent(JumpSentence).decreaseCharacterByOne();
    } else {
      this.node
        .getParent()
        .getParent()
        .getParent()
        .getComponent(JumpSentence)
        .decreaseCharacterByOne();
    }
  }
}
