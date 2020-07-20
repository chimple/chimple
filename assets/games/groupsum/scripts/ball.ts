import GroupSum, { GROUND } from "./groupsum";
import { catchError } from "../../../common/scripts/lib/error-handler";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {
  homePos: cc.Vec2 = null;
  homeName: string;
  mode: string;
  box1Rect: cc.Rect = null;
  box2Rect: cc.Rect = null;
  name: string;
  hasTouchEnd: boolean = false;
  touchedBallName: string;
  hasTouchCanceled: boolean = false;
  hasPlacedBallWrong: boolean = false;
  hasTouchMoved: boolean = false;

  @catchError()
  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    this.node.on("touchstart", this.onTouchStart, this);
    this.node.on("touchend", this.onTouchCancel, this);
    this.node.on("touchmove", this.onTouchMove, this);
    this.node.on("touchcancel", this.onTouchCancel, this);
  }

  @catchError()
  onDestroy() {
    this.node.off("touchstart", this.onTouchStart, this);
    this.node.off("touchmove", this.onTouchMove, this);
    this.node.off("touchend", this.onTouchCancel, this);
    this.node.off("touchcancel", this.onTouchCancel, this);
  }

  @catchError()
  onTouchStart(touch: cc.Touch) {
    if (touch.getID() == 0) {
      this.node.getComponent(cc.PhysicsCircleCollider).sensor = true;
      this.hasTouchEnd = false;
      this.touchedBallName = this.node.name;
      this.node.getComponent(cc.RigidBody).active = false;
      this.node.parent.getComponent(GroupSum).draggedBall = this.node.name;
      this.node.parent.getComponent(GroupSum).checkFinishCtl(false, true);
      this.node.zIndex = 1;
    }
  }

  @catchError()
  onTouchMove(touch: cc.Touch) {
    if (touch.getID() == 0) {
      this.hasTouchMoved = true;
      this.node
        .getComponent(cc.RigidBody)
        .node.setPosition(this.node.position.add(touch.getDelta()));
      if (this.node.position.y < -cc.winSize.height / 2 + 60) {
        this.touchFinished(touch);
        this.hasTouchCanceled = true;
        this.node.off("touchmove", this.onTouchMove, this);
      }
    }
  }

  @catchError()
  onTouchCancel(touch: cc.Touch) {
    if (!this.hasTouchCanceled) {
      this.touchFinished(touch);
    } else {
      cc.log("hi new test ");
      this.hasTouchCanceled = false;
      this.node.on("touchmove", this.onTouchMove, this);
    }
  }

  @catchError()
  touchFinished(touch) {
    let tub = this.node.parent.getChildByName("tub1");
    if (this.node.y < tub.getPosition().y - tub.height / 2) {
      //  cc.log("callback Child 1 " + this.node.y);
      this.node.parent.getComponent(GroupSum).checkFinishCtl(true, false);
    } else {
      // cc.log("callback Child 2 " + this.node.y);
      this.node.parent.getComponent(GroupSum).checkFinishCtl(false, false);
    }
    this.node.getComponent(cc.PhysicsCircleCollider).sensor = false;
    this.node.getComponent(cc.RigidBody).active = true;
    this.hasTouchEnd = true;
    if (this.hasTouchMoved) {
      this.hasTouchMoved = false;
      if (
        this.node
          .getBoundingBoxToWorld()
          .intersects(
            tub.getChildByName("covering collider").getBoundingBoxToWorld()
          )
      ) {
        this.hasPlacedBallWrong = true;
      } else if (this.node.parent.getChildByName("tub2") != null) {
        if (
          this.node.getBoundingBoxToWorld().intersects(
            this.node.parent
              .getChildByName("tub2")
              .getChildByName("covering collider")
              .getBoundingBoxToWorld()
          )
        ) {
          this.hasPlacedBallWrong = true;
        }
      }
    }
    this.node.parent.getComponent(GroupSum).draggedBall = "";
  }

  // called from parent
  @catchError()
  handleNodeTouch(handle: string): void {
    if (handle == "off") {
      this.node.off("touchstart", this.onTouchStart, this);
      this.node.off("touchend", this.onTouchCancel, this);
      this.node.off("touchmove", this.onTouchMove, this);
      this.node.off("touchcancel", this.onTouchCancel, this);
    } else if (handle == "on") {
      this.node.on("touchstart", this.onTouchStart, this);
      this.node.on("touchend", this.onTouchCancel, this);
      this.node.on("touchmove", this.onTouchMove, this);
      this.node.on("touchcancel", this.onTouchCancel, this);
    }
  }

  @catchError()
  onBeginContact(contact, selfCollider, otherCollider) {
    let velocity = selfCollider.node.getComponent(cc.RigidBody).linearVelocity
      .y;
    cc.log("wrong" + this.hasPlacedBallWrong);
    if (this.hasPlacedBallWrong) {
      if (otherCollider.node.name == "colliderLine") {
        contact.disabled = false;
        this.hasPlacedBallWrong = false;
      } else if (
        otherCollider.node.name.startsWith("tub") ||
        otherCollider.node.name == "ball"
      ) {
        contact.disabled = true;
      }
    }

    if (this.hasTouchEnd) {
      if (velocity < -110 && !contact.disabled) {
        this.node.parent.getComponent(GroupSum).playBallAudio();
      }
      // cc.log(
      //   "velocity : " +
      //     selfCollider.node.getComponent(cc.RigidBody).linearVelocity.y
      // );
      if (velocity > -21) {
        this.node.parent.getComponent(GroupSum).checkFinishCtl(true, false);
      }
    }
  }
}
