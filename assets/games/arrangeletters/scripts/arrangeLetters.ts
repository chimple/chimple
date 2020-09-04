import { Util } from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ArrangeLetters extends cc.Component {

  @property(cc.Prefab)
  playground: cc.Prefab = null;

  @property(cc.Prefab)
  playground2: cc.Prefab = null;

  @property(cc.Prefab)
  ball2: cc.Prefab = null;

  @property(cc.Prefab)
  ball: cc.Prefab = null;

  // data: Array<Array<string>> = [
  //   ["1", "1", "1", "playground", "ball2", "a,p,s,l"],
  //   ["1", "1", "1", "playground2", "ball2", "c,a,t"],
  // ];
  level: string;
  worksheet: string;
  problem: string;
  backgroundName: string;
  objectName: string;
  word: string;
  correctLetterArray: Array<string>;
  static correctPosition: Map<string, number>
  static wordLength:number 
  static letterArray:Array<string>

  onLoad() {
    [
      this.level,
      this.worksheet,
      this.problem,
      this.backgroundName,
      this.objectName,
      this.word,
    ] = Config.getInstance().data[0];

    this.correctLetterArray = this.word.split(",");
    ArrangeLetters.correctPosition = new Map();
    ArrangeLetters.wordLength = this.correctLetterArray.length
    this.loadBackground();
    this.makeDragObjects();
    ArrangeLetters.letterArray = this.word.split(",");
  }

  makeDragObjects() {
    var shuffledArray = Util.shuffle(this.correctLetterArray);
    for (let i = 0; i < this.correctLetterArray.length; i++) {
      let dragObj = cc.instantiate(this[this.objectName]);
      dragObj.parent = this.node;
      dragObj.name = shuffledArray[i];
      if (this.correctLetterArray.length > 4) {
        dragObj.width = 0.7 * dragObj.width;
        dragObj.height = 0.7 * dragObj.height;
      }
      dragObj.position = cc.v3(
        -cc.winSize.width / 2.8 + i * cc.winSize.width / this.correctLetterArray.length,
        -cc.winSize.height / 4
      );
      ArrangeLetters.correctPosition.set(dragObj.name,dragObj.position.x)
      dragObj.getChildByName("objLabel").getComponent(cc.Label).string = shuffledArray[i];
    }
  }


  loadBackground() {
    let loadbg = cc.instantiate(this[this.backgroundName]);
    this.node.addChild(loadbg);
  }

}