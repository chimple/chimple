import Config, { Direction } from "../../../common/scripts/lib/config";
import Tag from "./tag";
import { catchError } from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Label extends cc.Component {
  homePos: cc.Vec2 = null;
  name: string;
  audioName: string;

  @catchError()
  onDestroy() {
    this.node.off("touchstart", this.onTouchStart, this);
    this.node.off("touchend", this.onTouchEnd, this);
    this.node.off("touchmove", this.onTouchMove, this);
    this.node.off("touchcancel", this.onTouchEnd, this);
  }

  @catchError()
  scaleLabel(scaleFactor: number) {
    if (Config.i.direction == Direction.RTL) {
      //urdu
      this.node.scaleX = -scaleFactor;
      this.node.getChildByName("text").scaleX = -1;
    } else {
      this.node.scale = scaleFactor;
    }
  }

  @catchError()
  onTouchStart(touch: cc.Touch) {
    if (touch.getID() == 0) {
      this.scaleLabel(1.1);
      this.node.parent.getComponent(Tag).onTouchAudio(this.audioName);
    }
  }

  @catchError()
  onTouchMove(touch: cc.Touch) {
    if (touch.getID() == 0) {
        this.node.setPosition(this.node.position.add(touch.getDelta()));
    }
  }

  @catchError()
  handleNodeTouch(handle: string): void {
    if (handle == "off") {
      this.node.off("touchstart", this.onTouchStart, this);
      this.node.off("touchend", this.onTouchEnd, this);
      this.node.off("touchmove", this.onTouchMove, this);
      this.node.off("touchcancel", this.onTouchEnd, this);
    } else if (handle == "on") {
      this.node.on("touchstart", this.onTouchStart, this);
      this.node.on("touchend", this.onTouchEnd, this);
      this.node.on("touchmove", this.onTouchMove, this);
      this.node.on("touchcancel", this.onTouchEnd, this);
    }
  }

  @catchError()
  onTouchEnd(touch: cc.Touch) {
    cc.log("touchend " + touch.getID());
    this.handleNodeTouch("off");
    const parentComp = this.node.parent.getComponent(Tag);
    let isWrong = false;
    this.node.parent
      .getChildByName("truck")
      .getChildByName("container")
      .children.forEach(e => {
        if (e != null && e.name != "dropBox_" + this.node.name) {
          if (e.getBoundingBoxToWorld().contains(touch.getLocation())) {
            isWrong = true;
          }
        }
      });
    if (isWrong) {
      this.node.parent.emit("wrong");
    }
    if (
      this.node.parent
        .getChildByName("truck")
        .getChildByName("container")
        .getChildByName("dropBox_" + this.node.name) != null &&
      this.node.parent
        .getChildByName("truck")
        .getChildByName("container")
        .getChildByName("dropBox_" + this.node.name)
        .getBoundingBoxToWorld()
        .contains(touch.getLocation())
    ) {
      cc.log("hi");
      const dropBox = this.node.parent
        .getChildByName("truck")
        .getChildByName("container")
        .getChildByName("dropBox_" + this.node.name);
      this.scaleLabel(1);
      this.node.parent = null;
      this.node.parent = dropBox.parent;
      this.node.position = dropBox.position;
      dropBox.removeFromParent(false);
      // this.node.position = this.node.parent.convertToNodeSpaceAR(
      //   this.node.parent
      //     .getChildByName("truck")
      //     .getChildByName("container")
      //     .getChildByName("dropBox_" + this.node.name)
      //     .convertToWorldSpaceAR(cc.Vec2.ZERO)
      // );

      // temp.position = this.node.parent.getChildByName("container")
      //   .getChildByName("dropBox_" + this.node.name)
      //   .getBoundingBox().center;
      // this.node.parent
      //   .getChildByName("truck")
      //   .getChildByName("container")
      //   .getChildByName("dropBox_" + this.node.name)
      //   .removeFromParent(false);
      this.node.parent.parent.parent.emit("correct");
      parentComp.complete--;
      parentComp.match();
    } else {
      this.scaleLabel(1);
      new cc.Tween()
        .target(this.node)
        .to(
          0.7,
          { position: this.homePos },
          { progress: null, easing: "sineOut" }
        )
        .call(() => {
          this.handleNodeTouch("on");
        })
        .start();
    }
  }
}
