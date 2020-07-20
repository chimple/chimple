import KeyboardButton from "./keyboardbutton";
import { catchError } from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EmptyBox extends cc.Component {
  @property(cc.Prefab)
  labelPrefab: cc.Prefab = null;

  public myCharacter: string = "";
  collidedObject: cc.Node;
  isDone: boolean;
  characterIndex: number = -1;

  @catchError()
  onLoad() {
    cc.director.getCollisionManager().enabled = true;
    this.isDone = false;
  }

  // onCollisionEnter(other, self) {
  //     console.log("Collision Started");
  // }

  // onCollisionStay(other, self){
  //     // console.log("Is Touch Ended? " + other.node.getComponent(KeyboardButton).isTouchEnded)
  //     let button = other.node;
  //     other.node.getComponent(KeyboardButton).isProcessing = true;
  //     cc.log(this.myCharacter + " " + button.getChildByName("Label").getComponent(cc.Label).string + " isTouchEnded? " + button.getComponent(KeyboardButton).isTouchEnded
  //            + " isDone? " + this.isDone);
  //     if((button.getComponent(KeyboardButton).isTouchEnded) && (this.myCharacter == button.getChildByName("Label").getComponent(cc.Label).string) && !this.isDone){
  //         this.isDone = true;
  //         cc.log("Dropping the Correct Character")
  //         this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(other.node.getComponent(cc.Sprite).spriteFrame.getTexture());
  //         let label = cc.instantiate(this.labelPrefab);
  //         label.getComponent(cc.Label).string = button.getChildByName("Label").getComponent(cc.Label).string;
  //         label.parent = this.node;
  //         cc.log("Setting opacity of " + other.node.name + " to 0");
  //         other.node.opacity = 0;
  //         var callback = cc.callFunc(this.onBacktoOriginalPlace, other);
  //         var action = cc.sequence(cc.moveTo(0.05, other.node.getComponent(KeyboardButton).myOriginalLocation), callback);
  //         other.node.runAction(action);
  //         this.collidedObject = other.node;
  //         // this.node.active = false;
  //         //Move other.node to it's original place invisibly
  //     }
  //     else{
  //         cc.log("Setting processing to false");
  //         other.node.getComponent(KeyboardButton).isProcessing = false;
  //     }
  //     //Move other.node to it's original place visibly
  // }

  // onCollisionExit(other, self){
  //     console.log("Done colliding");
  // }

  // onBacktoOriginalPlace(other: cc.Node){
  //     cc.log("Setting back opacity of " + other.name + " to 1 original place " + other.position);

  //     other.opacity = 255;
  // }
  // update (dt) {}
}
