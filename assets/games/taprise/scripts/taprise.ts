import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TapRise extends cc.Component {
  @property(cc.Prefab)
  bubble: cc.Prefab = null;



  //JSON
  ai: number = 0;
  nameOfGame: string;
  lev: string;
  description: string;
  level: string;
  worksheet: string;
  problem: string;
  objb: string;
  fieldArr: Array<string>;
  countArr: Array<number> = [0, 10, 10, 1]; //no of times to touch to destroy one obj
  tap: Array<number> = [0, 1, 1, 100]; //no of objects to destroy per level
  noobj: number;

  touchcount: number = 0;
  destroyCount: number = 0;
  touchArray: Array<number> = [0, 0, 0, 0, 0];
  objin;
  shouldTouch: boolean = true;
  shouldGen: boolean = true;

  x: number;
  y: number;
  levelint: number;
  randonval: number;
  auth: Map<string, number>;
  finalLocation: cc.Vec2;
  charNode;
  destroyed: number;
  namee; problemint;
  endofgame: number = 0;
  firstDrag: cc.Node
  firstDrop: cc.Node
  timing: number;
  genval: number = 0;
  getN: string;
  auther: number = 1;
  friendName: string;
  onLoad() {
    let fieldArr = Config.getInstance().data[0]
      .toString()
      .split(",")
      .map(field => (/^\d*\.?\d+$/.test(field) ? Number(field) : field));
    cc.log("field " + fieldArr);
    //@ts-ignore
    [this.nameOfGame, this.lev, this.description, this.level, this.worksheet, this.problem, this.objb] = fieldArr;
    this.noobj = parseInt(this.objb);
    cc.log("obj" + this.noobj);
    for (let ai = 0; this.ai < this.noobj; this.ai++) {
      this.generateObj(ai);
    }
    this.x = 0;
    this.y = 100;
    this.levelint = parseInt(this.level);
    cc.log("lvl" + this.levelint);
    this.problemint = parseInt(this.problem)
    Util.showHelp(this.firstDrag, this.firstDrop)

  } //end of onLoad() method
  generateObj(indexx: number) {
    Util.loadFriend((friendNode: cc.Node) => {
      this.friendName = friendNode.name
      console.log(this.genval, "ai");
      this.objin = cc.instantiate(this.bubble);
      let yi = this.getRandomArbitrary(-170, 170);
      this.objin.parent = this.node;
      if (this.ai == 0) {
        this.firstDrag = this.objin;
        this.firstDrop = this.objin;
      }
      this.objin.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      this.objin.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      this.objin.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

      const characterNode = this.objin.getChildByName('charnode')
      if (characterNode != null) {
        friendNode.getComponent(cc.Button).interactable = false
        characterNode.addChild(friendNode)
        Util.loadAccessoriesAndEquipAcc(friendNode.children[1], characterNode.getChildByName(friendNode.name))
        console.log(friendNode)
        let xcor = -400 + (this.genval * 200)
        cc.log("xcor" + xcor)
        this.objin.position = cc.v2(xcor, yi);
        this.objin.name = this.genval.toString();
        this.genval = this.genval + 1;
      }
    })


  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


  onTouchStart(touch: cc.Touch) {
    //@ts-ignore
    let touchObj = touch.currentTarget
    if (this.shouldTouch && this.shouldGen && touch.getID() == 0) {

      cc.log("yx" + touchObj.y);
      this.namee = touchObj.name
      if (this.levelint != 3) {
        let actiondx = cc.moveTo(2, cc.v2(touchObj.x, touchObj.y = touchObj.y + 10));
        touchObj.runAction(actiondx);
      }
      this.shouldTouch = false

      if (touchObj.name != 'a' && this.endofgame != 1) {
        touchObj.zIndex = 1;
        this.node.emit("correct");
        this.charNode = touchObj.getChildByName("charnode");
        cc.log("qw" + this.touchArray[this.namee]);
        cc.log("namee" + this.namee);

        if (this.levelint != 3) {


          touchObj.getChildByName("cardParticlea").opacity = 255;
          touchObj.getChildByName("cardParticleb").opacity = 255;
          touchObj.getChildByName("flyboard").getComponent(cc.Animation).play()
          setTimeout(() => {
            touchObj.getChildByName("cardParticlea").opacity = 0;
            touchObj.getChildByName("cardParticleb").opacity = 0;
            touchObj.getChildByName("flyboard").getComponent(cc.Animation).stop()
          }, 500)
          setTimeout(() => {
            this.shouldTouch = true
          }, 700)


          this.timing = 0.3;
          let xran = this.getRandomArbitrary(1, 5);
          var labval = "labcenter";
          cc.log(labval + "xran");
          const labvalNode = touchObj.getChildByName(labval);
          if (labvalNode != null) {
            labvalNode.getComponent(cc.Label).string = (this.touchArray[
              parseInt(this.namee)
            ] = this.touchArray[parseInt(this.namee)] + 1).toString();
            cc.log("result" + this.touchArray[parseInt(this.namee)]);
            if (this.touchArray[parseInt(this.namee)] == 10) {
              touchObj.getChildByName("res").getComponent(cc.Label).string = (this.problemint * 10).toString();
              let actionfly = cc.moveTo(3, cc.v2(0, 1500));

              touchObj.runAction(actionfly);
              touchObj.getChildByName("cardParticlea").opacity = 255;
              touchObj.getChildByName("cardParticleb").opacity = 255;
            }
          }
        }
        else if (this.levelint == 3) {
          this.timing = 0.7


        }
        //Setting labels back to empty
        new cc.Tween()
          .target(this.node)
          .to(this.timing, {}, { progress: null, easing: "sineOutIn" })
          .call(() => {
            const labvalNode = touchObj.getChildByName(labval);
            if (labvalNode != null) {
              labvalNode.getComponent(cc.Label).string = "";
            }
          })
          .start();
      }
    }
  }
  onTouchEnd(touch: cc.Touch) {
    //@ts-ignore
    let touchEndObj = touch.currentTarget
    let animation = touchEndObj.children[0].children[0].children[0].getComponent(dragonBones.ArmatureDisplay)
    touchEndObj.children[0].children[0].children[0].getComponent(dragonBones.ArmatureDisplay).playAnimation('joy', 1)
    touchEndObj.zIndex = 0;
    if ((this.touchArray[parseInt(this.namee)] == this.countArr[this.levelint] && this.levelint != 3) && this.endofgame != 1) {
      cc.log("this" + this.touchArray[parseInt(this.namee)]);
      if (this.levelint != 3) {
        this.shouldTouch = true
        touchEndObj.getChildByName("flyboard").getComponent(cc.Animation).play()
        touchEndObj.getChildByName("cardParticle").opacity = 255;

      }
      animation.playAnimation('joy')
      touchEndObj.name = 'a';
      this.destroyCount++;

      if (this.destroyCount == this.tap[this.levelint]) {
        this.endofgame = 1;
        cc.log("charge" + this.destroyCount + this.tap[this.levelint]);

        new cc.Tween()
          .target(this.node)
          .to(0.5, {}, { progress: null, easing: "sineOutIn" })
          .call(() => {
            this.node.emit("nextProblem");
          })
          .start();
      }
    }
    else if (this.levelint == 3 && touchEndObj.name != 'a' && this.endofgame != 1) {


      if (this.shouldGen) {
        this.shouldGen = false;
        let runtime
        if (this.touchcount % 10 == 0) {
          runtime = 3
        }
        else {
          runtime = 2
        }

        let actiona = cc.moveTo(runtime, cc.v2(0, 1000));

        setTimeout(() => {
          this.shouldGen = true
          this.shouldTouch = true
        }, 2000)

        touchEndObj.runAction(actiona);

        touchEndObj.zIndex = 3;
        touchEndObj.name = 'a';
        if (this.touchcount % 10 == 0) {
          touchEndObj.getChildByName("cardParticle").opacity = 255;
          touchEndObj.getChildByName("flyboard").getComponent(cc.Animation).play()
        }
        touchEndObj.getChildByName("cardParticlea").opacity = 255;
        touchEndObj.getChildByName("cardParticleb").opacity = 255;
        touchEndObj.getChildByName("flyboard").getComponent(cc.Animation).play()
        let me = 100
        cc.log("me" + me);
        this.timing = 0.7
        var labval = "labcenter"
        cc.log(labval + "labval");
        const labvalNode = touchEndObj.getChildByName(labval);
        if (labvalNode != null) {

          this.touchcount = this.touchcount + 1;
          if (this.touchcount % 10 != 0) {
            labvalNode.getComponent(cc.Label).string = (this.touchcount).toString();
            touchEndObj.getChildByName("res").getComponent(cc.Label).string = (this.touchcount).toString();
          }
          if (this.touchcount % 10 == 0) {
            touchEndObj.getChildByName("res").getComponent(cc.Label).string = (this.touchcount).toString();
          }
        }
        new cc.Tween()
          .target(this.node)
          .to(2, {}, { progress: null, easing: "sineOutIn" })
          .call(() => {
            this.auther = 1
            this.shouldTouch = true
            let i = parseInt(this.namee);
            cc.log("imi" + i);
            this.objin = cc.instantiate(this.bubble);
            let yi = this.getRandomArbitrary(-250, 250);
            let xi = -300 + (i * 150) + this.getRandomArbitrary(-70, 100)
            this.objin.position = cc.v2(xi, yi);
            this.objin.parent = this.node;
            this.objin.name = i.toString();
            Util.loadFriend((friendNode: cc.Node) => {
              const characterNode = this.objin.getChildByName('charnode')
              if (characterNode != null) {
                characterNode.addChild(friendNode)
                Util.loadAccessoriesAndEquipAcc(friendNode.children[1], characterNode.getChildByName(friendNode.name))
                animation.playAnimation('joy')
              }
            })

            this.objin.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.objin.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.objin.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          })
          .start();


        this.destroyCount++;
        if (this.destroyCount == this.tap[this.levelint]) {
          cc.log("charge" + this.destroyCount + this.tap[this.levelint]);
          this.endofgame = 1;
          new cc.Tween()
            .target(this.node)
            .to(0.5, {}, { progress: null, easing: "sineOutIn" })
            .call(() => {
              this.node.emit("nextProblem");
            })
            .start();
        }

      }
    }
  }
}
}