import Drag from "../../../common/scripts/drag";
import DropCow from "./dropObj";
import DragHay from "./dragObj";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ArrangeLetters extends cc.Component {
  
  @property(cc.Prefab)
  dropObj: cc.Prefab = null
 
  @property(cc.Prefab)
  playground: cc.Prefab = null;
  
  @property(cc.Prefab)
  playground2: cc.Prefab = null;
  
  @property(cc.Prefab)
  ball2: cc.Prefab = null;

  @property(cc.Prefab)
  ball: cc.Prefab = null;

  data: Array<Array<string>> = [
    ["1", "1", "1", "playground", "ball", "cat"],
    ["1", "1", "1", "playground2", "ball2", "cat"],
  ];
  level: string;
  worksheet: string;
  problem: string;
  backgroundName: string;
  objectName: string;
  word: string;
  correctLetterArray:Array<string>;
  
  onLoad() {
    [
      this.level,
      this.worksheet,
      this.problem,
      this.backgroundName,
      this.objectName,
      this.word,
    ] = this.data[1];
   
    this.correctLetterArray = this.word.split('')
    this.loadBackground();
    this.makeDragObjects();

  }

  makeDragObjects() {
    var shuffledArray = Util.shuffle(this.correctLetterArray)
    for (let i = 0; i < this.correctLetterArray.length; i++) {
      let dragObj = cc.instantiate(this[this.objectName]);
      dragObj.parent = this.node;
      dragObj.position =cc.v3(-cc.winSize.width/3 + i*250 ,-cc.winSize.height/4 );
      dragObj.getChildByName('objLabel').getComponent(cc.RichText).string = shuffledArray[i];
      cc.log(dragObj.children);
    }
  }
   
  loadBackground(){
    let loadbg = cc.instantiate(this[this.backgroundName]);
    this.node.addChild(loadbg)
   }


}
