import Drag from "../../../common/scripts/drag";
import ArrangeLetters from "./arrangeLetters";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragObj extends Drag {
  @property(cc.AudioClip)
  correctClip: cc.AudioClip = null;

  @property(cc.RichText)
  richTextNode: cc.RichText = null;

  private _text: string = null;
  private _soundName: string = null;
  private _soundClip: cc.AudioClip = null;

  isCollisionEnable: boolean = false;
  originalLocation: cc.Vec2;
  onLoad() {
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDebugDraw = true;
  }
  get text(): string {
    return this._text;
  }

  set text(newVal) {
    this._text = newVal;
    this.richTextNode.string = newVal;
  }

  get soundName(): string {
    return this._soundName;
  }

  set soundName(newVal) {
    this._soundName = newVal;
    Util.loadGameSound(this._soundName, (clip) => {
      this._soundClip = clip;
    });
  }

  onTouchStart(touch: cc.Touch) {
    this.isCollisionEnable = true;

    this.originalLocation = touch.currentTarget.position;
    cc.log("<>" + this.originalLocation);
    super.onTouchStart(touch);
    if (this._soundClip != null) {
      Util.play(this._soundClip, false);
    }
  }

  onTouchMove(touch: cc.Touch) {
    super.onTouchMove(touch);
    this.node.setPosition(this.node.position.x, -cc.winSize.height / 4);
  }

  onTouchEnd(touch: cc.Touch) {
    super.onTouchEnd(touch);
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    cc.log(other.node.x);
    if (this.isCollisionEnable != false) {
      other.node.x = this.originalLocation.x;
      this.isCollisionEnable = false;
    }
  }

  onCollisionExit(other: cc.Collider, self: cc.Collider) {}

 
}
