
const { ccclass, property } = cc._decorator;


@ccclass
export default class DragTheAlphabetChoice extends cc.Component {
  homePos: cc.Vec3 = null;
  name: string;
  static dropArea: cc.Rect;

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
    cc.log("Came child", this.node);
    let delta = new cc.Vec3(touch.getDelta().x, touch.getDelta().y, 0);
    this.node.setPosition(this.node.position.add(delta));
  }

  revokeTouchEventOn(value): void {
    if (!value) {
      this.node.off("touchstart", this.onTouchStart, this);
      this.node.off("touchend", this.onTouchEnd, this);
      this.node.off("touchmove", this.onTouchMove, this);
      this.node.off("touchcancel", this.onTouchEnd, this);
    } else {
      this.node.on("touchstart", this.onTouchStart, this);
      this.node.on("touchend", this.onTouchEnd, this);
      this.node.on("touchmove", this.onTouchMove, this);
      this.node.on("touchcancel", this.onTouchEnd, this);
    }
  }

  onTouchEnd(touch: cc.Touch) {
    cc.log("touchend " + touch.getID()+ DragTheAlphabetChoice.dropArea);

    if (this.node.getBoundingBox().intersects(DragTheAlphabetChoice.dropArea) && this.node.name == "correct") {
      //game over
    }
    else {
      this.revokeTouchEventOn(0);
      new cc.Tween()
        .target(this.node)
        .to(
          1.5,
          { x: this.homePos.x, y: this.homePos.y },
          { progress: null, easing: "quadOut" }
        )
        .call(()=> this.revokeTouchEventOn(1))
        .start();
    }
  }
}
