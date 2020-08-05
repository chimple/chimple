import { TouchEvents } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragTheAlphabetChoice extends cc.Component {
  homePos: cc.Vec2 = null;
  name: string;
  audioName: string;

  onLoad() {
    this.node.on("touchstart", this.onTouchStart, this);
    this.node.on('touchend', this.onTouchEnd, this);
    this.node.on('touchmove', this.onTouchMove, this);
    this.node.on('touchcancel', this.onTouchEnd, this);
  }

  onDestroy() {
    this.node.off("touchstart", this.onTouchStart, this);
    this.node.off("touchend", this.onTouchEnd, this);
    this.node.off("touchmove", this.onTouchMove, this);
    this.node.off("touchcancel", this.onTouchEnd, this);
  }


  onTouchStart(touch: cc.Touch) {
    cc.log("Came child");

    if (touch.getID() == 0) {
    }
  }

  onTouchMove(touch: cc.Touch) {
    cc.log("Came child",this.node);
      let delta = new cc.Vec3(touch.getDelta().x, touch.getDelta().y, 0);
      this.node.setPosition(this.node.position.add(delta));
  }

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

  onTouchEnd(touch: cc.Touch) {
    cc.log("touchend " + touch.getID());

  }
}
