import { Util } from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";
import Game from "../../../common/scripts/game";
import LessonController from "../../../common/scripts/lessonController";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ArrangeLetters extends Game {

  @property(cc.Prefab)
  playground: cc.Prefab = null;

  @property(cc.Prefab)
  playground2: cc.Prefab = null;

  @property(cc.Prefab)
  ball2: cc.Prefab = null;

  @property(cc.Prefab)
  ball: cc.Prefab = null;

  @property(cc.Prefab)
  imagePrefab:cc.Prefab = null;

  level: string;
  worksheet: string;
  problem: string;
  backgroundName: string;
  objectName: string;
  word: string;
  correctLetterArray: Array<string>;
  static correctPosition: Map<string, number>;
  static wordLength:number;
  static letterArray:Array<string>;
  wordAudioFileName:string;
  imageFileName:string;
  isSoundPlaying:boolean = false;

  
  onLoad() {
    [ 
      this.level,
      this.worksheet,
      this.problem,
      this.backgroundName,
      this.objectName,
      this.word,
      this.wordAudioFileName,
      this.imageFileName
    ] = Config.getInstance().data[0];
    
    this.correctLetterArray = this.word.split(",");
    ArrangeLetters.correctPosition = new Map();
    ArrangeLetters.wordLength = this.correctLetterArray.length
    this.loadBackground();
    this.makeDragObjects();
    ArrangeLetters.letterArray = this.word.split(",");
    this.startGameSound();
    this.node.getChildByName('friendPos').zIndex = 1
    this.node.getChildByName('friendPos').scale = 0.5
    Util.playGameSound(this.wordAudioFileName,()=>{})
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
    let imgVal = cc.instantiate(this.imagePrefab);
    this.node.addChild(imgVal);
    Util.loadTexture(this.imageFileName, (texture, err) => {
    imgVal.getChildByName("image").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
    });
  }

  startGameSound() {
    Util.loadGameSound(this.wordAudioFileName, (clip) => {
      if (clip != null) {
        this.friend.extraClip = clip
      }
    })
  }
  

}