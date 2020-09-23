import Config, { Direction } from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import PhonicTractorDrag from "./phonictractor_drag";
import { catchError } from "../../../common/scripts/lib/error-handler";
import Game from "../../../common/scripts/game";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PhonicTractor extends Game {
  @property(cc.Node)
  truckNode: cc.Node = null;

  @property(cc.Prefab)
  trolleyPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  boxPrefab: cc.Prefab = null;

  @property({
    type: cc.AudioClip
  })
  metalAudio: cc.AudioClip = null;

  @property({
    type: cc.AudioClip
  })
  truckInAudio: cc.AudioClip = null;

  @property({
    type: cc.AudioClip
  })
  truckOutAudio: cc.AudioClip = null;

  answer: string;
  wordAudio: Map<string, string>;
  initialPlace: cc.Vec2;
  trolley: Array<cc.Node> = [];
  word: Array<string>;
  box: cc.Node = null;
  count: number = 1;
  totalPieces: number = 0;
  completed: Array<string>;
  temp: string;
  finishTruckMoveTo: number = -2000;
  firstDrag: cc.Node = null;
  firstDrop: cc.Node = null;
  _isRTL: boolean = false;

  @catchError()
  onLoad() {
    cc.director.getCollisionManager().enabled = true
    this._isRTL = Config.i.direction == Direction.RTL;
    this.friend.isFace = true
    this.totalPieces++;
    this.completed = [];
    this.wordAudio = new Map();
    let fieldArr = Config.getInstance().data[0].toString()
      .split(",");
    let word1,
      word2,
      word3,
      problemCount,
      level,
      worksheet,
      problem,
      audio,
      audio1,
      audio2,
      audio3;
    [
      level,
      worksheet,
      problem,
      problemCount,
      this.answer,
      this.temp,
      word1,
      audio1,
      word2,
      audio2,
      word3,
      audio3
    ] = fieldArr;

    if(word2 == null) word2 = ""
    if(audio2 == null) audio2 = ""
    if(word3 == null) word3 = ""
    if(audio3 == null) audio3 = ""
    
    this.truckNode.x = cc.winSize.width / 2;
    this.word = [word1];
    if (word2 != "") {
      this.word.push(word2);
    }
    if (word3 != "") {
      this.word.push(word3);
    }

    if (this._isRTL) {
      this.truckNode.x = -cc.winSize.width / 2;
      this.finishTruckMoveTo = 2000;
    }

    this.wordAudio.set(this.answer, this.temp);
    this.wordAudio.set(word1, audio1);
    this.wordAudio.set(word2, audio2);
    this.wordAudio.set(word3, audio3);
    console.log("words" + this.word);
    this.onTouchAudio(this.wordAudio.get(this.answer));
    let truckOffset;
    this.instantiateTrolley(0);
    if (word2.length != 0) {
      this.count++;
      this.instantiateTrolley(1);
    }
    if (word3.length != 0) {
      this.count++;
      this.instantiateTrolley(2);
    }

    if (Config.i.direction == Direction.RTL) {
      this.truckNode.scaleX = -1;
      truckOffset = (this.count - 1) * 100 + 310;
    } else {
      truckOffset = -(this.count - 1) * 100 - 310;
    }

    new cc.Tween()
      .target(this.truckNode)
      .call(() => {
        Util.playSfx(this.truckInAudio);
      })
      .to(2.1, { x: truckOffset }, { progress: null, easing: t => t })
      .call(() => {
        let i = 0;
        this.trolley.forEach(e => {
          i++;
          new cc.Tween()
            .target(e)
            .call(() => {
              Util.playSfx(this.metalAudio);
            })
            .to(
              0.5,
              { position: cc.v2(e.position.x + i * 40, e.position.y) }, ////// first tween
              { progress: null, easing: "easeOutInElastic" }
            )
            .start();
        });

        this.showOptions();
      })
      .start();

    this.node
      .getChildByName("board")
      .getChildByName("answer_label")
      .getComponent(cc.Label).string = this.answer;
  }

  // @catchError()
  // onTouchAudioCaller(touch) {
  //   this.onTouchAudio(this.wordAudio.get(this.answer));
  // }

  @catchError()
  instantiateTrolley(i: number) {
    this.trolley[i] = cc.instantiate(this.trolleyPrefab);
    this.trolley[i].parent = this.truckNode;
    this.trolley[i].position = cc.v3(this.trolley[i].position.x + i * 190, -75, 0);
    this.trolley[i].getChildByName("drop_area").name = this.word[i]
    if (i == 0) {
      this.firstDrop = this.trolley[i];
    }
  }

  @catchError()
  showOptions() {
    let firstDragData = this.word[0];
    let arr = this.word;
    if (Math.random() > 0.3) {
      arr = Util.shuffle(this.word) as Array<string>;
    }
    for (let i = 0; i < this.count; i++) {
      let dragBox = cc.instantiate(this.boxPrefab);
      const dragComp = dragBox.getComponent(PhonicTractorDrag)
      if (dragComp != null) {
        dragComp.label.string = arr[i]
      }
      if (arr[i] == firstDragData) {
        this.firstDrag = dragBox;
      }
      dragBox.name = arr[i];
      const tempNode = new cc.Node()
      tempNode.addChild(dragBox)
      tempNode.name = arr[i]
      this.node.getChildByName("New Layout").addChild(tempNode);
      dragBox.on('phonicTractorMatch', this.onMatch.bind(this))
      dragBox.on('phonicTractorNoMatch', () => this.node.emit("wrong"))
      if (this._isRTL) {
        let newNode = new cc.Node()
        newNode.name = 'shouldFlip'
        dragBox.addChild(newNode)
      }
    }
    Util.loadGameSound(this.wordAudio.get(this.answer),  (err, clip) => {
      if (clip != null) {
        this.friend.extraClip = clip
      }
      Util.showHelp(this.firstDrag, this.firstDrop);
    });
  }

  @catchError()
  onTouchAudio(file: string) {
    Util.loadGameSound(file, (err, clip) => {
      if (clip != null) {
        this.friend.speak(clip)
      }
    });
  }

  @catchError()
  onMatch() {
    this.node.emit("correct");
    if (--this.count == 0) {

      new cc.Tween()
        .target(this.truckNode)
        .delay(1)
        .call(() => {
          this.friend.speakExtra()
          // this.onTouchAudio(this.wordAudio.get(this.answer));
          // this.node
          //   .getChildByName("board")
          //   .getChildByName("speaker_button_workkicker")
          //   .getComponent(cc.Button).enabled = false;
        })
        .delay(1)
        .call(() => {
          var j = 0;
          Util.playSfx(this.metalAudio);
          this.trolley.forEach(e => {
            j++;
            new cc.Tween() // 2nd tween
              .target(e)
              .to(
                0.5,
                { position: cc.v2(e.position.x - j * 40, e.position.y) },
                { progress: null, easing: "sineOut" }
              )
              .start();
          });
        })
        .delay(1)
        .call(() => {
          Util.playSfx(this.truckOutAudio);
        })
        .to(
          2,
          { x: this.finishTruckMoveTo },
          { progress: null, easing: t => t }
        )
        .call(() => this.match())
        .start();
    }
  }

  @catchError()
  match() {
    if (--this.totalPieces <= 0) {
      this.node.emit("nextProblem");
    }
  }

  @catchError()
  onDestroy() {
    cc.audioEngine.stopAllEffects();
  }
}
