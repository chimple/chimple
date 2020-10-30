import Config, { Direction } from "../../../common/scripts/lib/config";
import Label from "./label";
import { Util } from "../../../common/scripts/util";
import { catchError } from "../../../common/scripts/lib/error-handler";
import Game from "../../../common/scripts/game";
const { ccclass, property } = cc._decorator;

const FONT_SIZE = 45;

@ccclass
export default class Tag extends Game {
  @property(cc.Prefab)
  dropNodePrefab: cc.Prefab = null;

  @property(cc.Prefab)
  queNodePrefab: cc.Prefab = null;

  @property(cc.Prefab)
  label0Prefab: cc.Prefab = null;

  @property(cc.Prefab)
  label1Prefab: cc.Prefab = null;

  @property(cc.Prefab)
  label2Prefab: cc.Prefab = null;

  @property(cc.Prefab)
  label3Prefab: cc.Prefab = null;

  @property(cc.Prefab)
  label4Prefab: cc.Prefab = null;

  @property(cc.Prefab)
  label5Prefab: cc.Prefab = null;

  @property({
    type: cc.AudioClip
  })
  labelAudio: cc.AudioClip = null;

  @property(cc.Node)
  truck: cc.Node = null;

  quePos: Map<string, cc.Vec2>;
  queAudio: Map<string, string>;
  totalPieces: number = 0;
  complete: number = 0;
  labelActive: string;

  // LIFE-CYCLE CALLBACKS:

  @catchError()
  onLoad() {
    // this.friend.isFace = true
    this.node.opacity = 0;
    this.totalPieces--;
    this.quePos = new Map();
    this.queAudio = new Map();
    let fieldArr = Config.getInstance().data[0];
    let bgName = fieldArr[3];
    let firstDrag: cc.Node = null;
    let firstDrop: cc.Node = null;

    Util.loadTexture(bgName, texture => {
      this.node.opacity = 255;
      let temp = new cc.SpriteFrame(texture);
      temp.setRect(new cc.Rect(30, 30, 790, 650));
      this.node
        .getChildByName("truck")
        .getChildByName("container")
        .getComponent(cc.Sprite).spriteFrame = temp;

      this.node
        .getChildByName("truck")
        .getChildByName("container").opacity = 255;
      var animClip;

      for (let i = 3, id = 0; i < fieldArr.length - 1; i++ , id++) {
        if ("" == fieldArr[i + 1]) {
          break;
        } else {
          const dropBox = cc.instantiate(this.dropNodePrefab);
          let name = "";
          //     let name = fieldArr[++i];
          //   cc.log("check index of"+name.indexOf("/"))
          let arr = fieldArr[++i].split("/");
          for (let l = 0; l < arr.length; l++) {
            name = name.concat(arr[l]);
          }
          let itemPos = fieldArr[++i].split(".");

          let audio = fieldArr[i + 1];
          this.queAudio.set(name, audio);
          dropBox.name = "dropBox_" + name;
          dropBox.getChildByName("drop_label_labelling").height += 20;
          dropBox.getChildByName("drop_label_labelling").width += 15;
          this.node
            .getChildByName("truck")
            .getChildByName("container")
            .addChild(dropBox);
          dropBox.opacity = 0;
          // let bgWorld = this.node
          // .getChildByName("background")
          // .convertToNodeSpaceAR(cc.Vec2.ZERO);
          dropBox.position = cc.v3(
            +itemPos[0] / 2.27 - 340,
            -+itemPos[1] / 1.92 - 490
          );
          if (id == 0) {
            firstDrop = dropBox;
          }
          animClip = dropBox
            .getChildByName("drop_label_labelling")
            .getComponent(cc.Animation);

          setTimeout(() => {
            if (this.node != null) {
              animClip = dropBox
                .getChildByName("drop_label_labelling")
                .getComponent(cc.Animation);
              animClip.play();
              Util.playSfx(this.labelAudio);
              dropBox.opacity = 255;
            }
          }, Math.random() * 3000 + 2000);
        }
      }

      const truckX = this.truck.x;
      new cc.Tween()
        .target(this.truck)
        .set({ x: cc.winSize.width })
        .to(3, { x: truckX }, { progress: null, easing: "quadOut" })
        .call(() => {
          const anim = this.truck.getComponent(cc.Animation);
          anim.stop();
          for (let i = 3, id = 0; i < fieldArr.length - 1; i += 2, id++) {
            if (fieldArr[i + 1] == "") {
              break;
            } else {
              const queLabel = cc.instantiate(this.queNodePrefab);
              let queBox;
              switch (id % 6) {
                case 0:
                  queBox = cc.instantiate(this.label0Prefab);
                  break;
                case 1:
                  queBox = cc.instantiate(this.label1Prefab);
                  break;
                case 2:
                  queBox = cc.instantiate(this.label2Prefab);
                  break;
                case 3:
                  queBox = cc.instantiate(this.label3Prefab);
                  break;
                case 4:
                  queBox = cc.instantiate(this.label4Prefab);
                  break;
                case 5:
                  queBox = cc.instantiate(this.label5Prefab);
              }
              let name = "";
              let arr = fieldArr[++i].split("/");
              for (let l = 0; l < arr.length; l++) {
                name = name.concat(arr[l]);
              }
              queLabel.name = "text";
              queLabel.getComponent(cc.Label).string = fieldArr[i];
              queLabel.getComponent(cc.Label).fontSize = FONT_SIZE;
              queBox.name = name;
              this.complete++;
              queBox.addChild(queLabel);
              queBox.height += 20;
              queBox.width += 15;
              if (id == 0) {
                firstDrag = queBox;
              }
              const labelComp = queBox.getComponent(Label);
              queBox.name = name;
              this.node.addChild(queBox);
              queLabel.zIndex = 1;
              queBox.position = cc.v2(
                (0.75 * cc.winSize.width) / 2,
                queBox.y - id * 85 - 100
              );

              labelComp.homePos = queBox.position;
              labelComp.audioName = this.queAudio.get(name);
              if (Config.i.direction == Direction.RTL) {
                //urdu
                queLabel.getComponent(cc.Label).horizontalAlign =
                  cc.Label.HorizontalAlign.RIGHT;
                queBox.scaleX = -1;
                queBox.getChildByName("text").scaleX = -1;
              }
            }
          }
        })
        .start();
      this.scheduleOnce(() => {
        Util.showHelp(firstDrag, firstDrop);
        this.node.getComponentsInChildren(Label).forEach(e => {
          e.handleNodeTouch("on");
        });
      }, 5);
    });
  }

  @catchError()
  match() {
    if (this.complete == 0 && --this.totalPieces <= 0) {
      cc.log("label game finish");
      new cc.Tween()
        .target(this.truck)
        .delay(1)
        .to(
          1.5,
          { x: this.truck.x - cc.winSize.width },
          { progress: null, easing: "quadOut" }
        )
        .call(() => this.node.emit("nextProblem"))
        .start();
    }
  }

  @catchError()
  onDestroy() {
    cc.audioEngine.stopAllEffects();
  }

  @catchError()
  onTouchAudio(musicName: string) {
    Util.loadGameSound(musicName, (clip) => {
      if (clip) this.friend.speak(clip)
    });
  }
}
