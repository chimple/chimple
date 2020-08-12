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
  goToOriginalPosition: boolean = true;
  originalLocationX: number;
  positionArray: Array<number> = [];
  currentXPos: Map<string, number> = null;
  done: String;
  tempOther:number;
  tempSelf:number;
  selfName;otherName;
  static tempArr:Map<string,number>
  
  onLoad() {
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDebugDraw = true;
  }

  onTouchStart(touch: cc.Touch) {
    this.goToOriginalPosition = true
    this.isCollisionEnable = true;
    // this.originalLocationX = this.node.position.x; //take location 1st or when touch start
    this.originalLocationX = touch.currentTarget.position.x
    // cc.log("<>" + this.node.parent.children);
    // cc.log("<>"+this.originalLocationX)
    super.onTouchStart(touch);
 
  }

  onTouchMove(touch: cc.Touch) {
    super.onTouchMove(touch);
    this.node.setPosition(this.node.position.x, -cc.winSize.height / 4);
    touch.currentTarget.position.z = 1
  }

  onTouchEnd(touch: cc.Touch) {
    super.onTouchEnd(touch);
      cc.log(ArrangeLetters.correctPosition)
      cc.log("need to runback")
      let actiona = cc.moveTo(0.1, cc.v2(ArrangeLetters.correctPosition.get(touch.currentTarget.name), -cc.winSize.height/4));
      this.node.runAction(actiona)
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {

  }

  onCollisionExit(other: cc.Collider, self: cc.Collider) {
    if(this.isCollisionEnable){
      this.isCollisionEnable = false;
      this.selfName = self.node.name
      this.otherName = other.node.name
      let actiona = cc.moveTo(0.1, cc.v2(ArrangeLetters.correctPosition.get(this.selfName), -cc.winSize.height/4));
      other.node.runAction(actiona)
      let temp = ArrangeLetters.correctPosition.get(this.selfName)
      ArrangeLetters.correctPosition.set(this.selfName,ArrangeLetters.correctPosition.get(this.otherName))
      ArrangeLetters.correctPosition.set(this.otherName,temp)
      self.node.x = ArrangeLetters.correctPosition.get(this.selfName)
      self.node.off;
      self.node.on;
      
    }
    

  }
  
  checkIfMatch() {
   
  }
  
}
