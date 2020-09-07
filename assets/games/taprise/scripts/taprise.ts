import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TapRise extends cc.Component {
  @property(cc.Prefab)
  bubble: cc.Prefab = null;
  @property(cc.Node)
  friendPos: cc.Node = null

  friend: dragonBones.ArmatureDisplay


  @property({
    type: cc.AudioClip
  })
  touchAudio: cc.AudioClip = null;



  //JSON
  ai: number = 0;
  nameOfGame: string;
  lev:string;
  description:string;
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
  objin; db; dc;
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

@catchError()
  onLoad() {





    let fieldArr = Config.getInstance().data[0]
      .toString()
      .split(",")
      .map(field => (/^\d*\.?\d+$/.test(field) ? Number(field) : field));
    cc.log("field " + fieldArr);

    //  let imga,imgb;
    //@ts-ignore
    [this.nameOfGame,this.lev,this.description,this.level, this.worksheet, this.problem, this.objb] = fieldArr;
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
@catchError()
  generateObj(indexx) {

    cc.log("boop");

    // const dog = characterNode.getComponent(dragonBones.ArmatureDisplay).armature().animation

    Util.loadFriend((friendNode: cc.Node) => {

      console.log(this.genval, "ai");
      this.objin = cc.instantiate(this.bubble);
      let yi = this.getRandomArbitrary(-170, 170);
      //let xi = this.getRandomArbitrary(,350);


      this.objin.parent = this.node;



      if (this.ai == 0) {
        this.firstDrag = this.objin;
        this.firstDrop = this.objin;
      }

      this.objin.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      this.objin.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      this.objin.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);



      const characterNode = this.objin.getChildByName('charnode')
      // this.node.getChildByName(this.ai.toString()).addChild(friendNode)
      if (characterNode != null) {

        this.dc = friendNode.getComponent(dragonBones.ArmatureDisplay)
        characterNode.addChild(friendNode)
        let xcor = -400 + (this.genval * 200)
        cc.log("xcor" + xcor)
        this.objin.position = cc.v2(xcor, yi);
        this.objin.name = this.genval.toString();
        this.genval = this.genval + 1;
        // friendNode.scale = this.getRandomArbitrary(1,2);
        // characterNode.position = cc.v2(-300 + this.ai * 170, this.getRandomArbitrary(-200, 100));
        //db.playAnimation('popup', 1)
        //friendNode.parent = this.objin

      }
    })


  }
  @catchError()
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


@catchError()
  onTouchStart(touch: cc.Touch) {

    if (this.shouldTouch && this.shouldGen && touch.getID() == 0) {
      //@ts-ignore
      cc.log("yx" + touch.currentTarget.y);
      this.namee = touch.currentTarget.name
      if (this.levelint != 3) {
        //@ts-ignore
        let actiondx = cc.moveTo(2, cc.v2(touch.currentTarget.x, touch.currentTarget.y = touch.currentTarget.y + 10));
        //@ts-ignore
        touch.currentTarget.runAction(actiondx);
      }
      this.shouldTouch = false



      //@ts-ignore
      if (touch.currentTarget.name != 'a' && this.endofgame != 1) {
        //@ts-ignore
        //touch.currentTarget.scale = touch.currentTarget.scale + 0.07;
        //@ts-ignore
        touch.currentTarget.zIndex = 1;
        //@ts-ignore


        //this.touchArray[parseInt(this.namee)]= 1;
        this.node.emit("correct");
        //@ts-ignore
        this.charNode = touch.currentTarget.getChildByName("charnode");
        // const dog = this.charNode
        //   .getComponent(dragonBones.ArmatureDisplay)
        //   .armature().animation;
        // dog.stop();
        // dog.play("transform", 1);

        cc.log("qw" + this.touchArray[this.namee]);
        cc.log("namee" + this.namee);

        if (this.levelint != 3) {

          //@ts-ignore
          touch.currentTarget.getChildByName("cardParticlea").opacity = 255;
          //@ts-ignore
          touch.currentTarget.getChildByName("cardParticleb").opacity = 255;
          //@ts-ignore
          touch.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).play()
          setTimeout(() => {
            //@ts-ignore
            touch.currentTarget.getChildByName("cardParticlea").opacity = 0;
            //@ts-ignore
            touch.currentTarget.getChildByName("cardParticleb").opacity = 0;
            touch.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).stop()
          }, 500)
          setTimeout(() => {
          this.shouldTouch = true
          },700)


          this.timing = 0.3;
          let xran = this.getRandomArbitrary(1, 5);
          var labval = "labcenter";
          cc.log(labval + "xran");
          //@ts-ignore
          const labvalNode = touch.currentTarget.getChildByName(labval);
          if (labvalNode != null) {
            labvalNode.getComponent(cc.Label).string = (this.touchArray[
              parseInt(this.namee)
            ] = this.touchArray[parseInt(this.namee)] + 1).toString();
            cc.log("result" + this.touchArray[parseInt(this.namee)]);
            if (this.touchArray[parseInt(this.namee)] == 10) {
              //@ts-ignore
              touch.currentTarget.getChildByName("res").getComponent(cc.Label).string = (this.problemint * 10).toString();
              let actionfly = cc.moveTo(3, cc.v2(0, 1500));

              //@ts-ignore
              touch.currentTarget.runAction(actionfly);
              //@ts-ignore
              touch.currentTarget.getChildByName("cardParticlea").opacity = 255;
              //@ts-ignore
              touch.currentTarget.getChildByName("cardParticleb").opacity = 255;
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
            //@ts-ignore
            const labvalNode = touch.currentTarget.getChildByName(labval);
            if (labvalNode != null) {
              labvalNode.getComponent(cc.Label).string = "";
            }
          })
          .start();
      }
    }
  }
@catchError()
  onTouchEnd(touch: cc.Touch) {
    if(touch.getID() == 0){
    //touch.currentTarget.position 
    //@ts-ignore
    cc.log("lol" + touch.currentTarget.name);

    //@ts-ignore
    touch.currentTarget.zIndex = 0;
    if ((this.touchArray[parseInt(this.namee)] == this.countArr[this.levelint] && this.levelint != 3) && this.endofgame != 1) {
      cc.log("this" + this.touchArray[parseInt(this.namee)]);
      if (this.levelint != 3) {
        this.shouldTouch = true
        //@ts-ignore
        touch.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).play()
        //@ts-ignore
        touch.currentTarget.getChildByName("cardParticle").opacity = 255;

      }
      //this.dc.playAnimation('popup',1)
      //@ts-ignore
      touch.currentTarget.name = 'a';
      this.destroyCount++;

      if (this.destroyCount == this.tap[this.levelint]) {
        this.endofgame = 1;
        cc.log("charge" + this.destroyCount + this.tap[this.levelint]);

        //    const dogg =this.charNode
        new cc.Tween()
          .target(this.node)
          .to(0.5, {}, { progress: null, easing: "sineOutIn" })
          .call(() => {
            this.node.emit("nextProblem");
          })
          .start();
      }
    }
    //@ts-ignore
    else if (this.levelint == 3 && touch.currentTarget.name != 'a' && this.endofgame != 1) {


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
        //@ts-ignore
        touch.currentTarget.runAction(actiona);

        //@ts-ignore
        touch.currentTarget.zIndex = 3;
        //@ts-ignore
        touch.currentTarget.name = 'a';
        if (this.touchcount % 10 == 0) {
          //@ts-ignore
          touch.currentTarget.getChildByName("cardParticle").opacity = 255;
          touch.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).play()

        }
        //@ts-ignore
        touch.currentTarget.getChildByName("cardParticlea").opacity = 255;
        //@ts-ignore
        touch.currentTarget.getChildByName("cardParticleb").opacity = 255;
        //@ts-ignore
        touch.currentTarget.getChildByName("flyboard").getComponent(cc.Animation).play()
        let me = 100
        cc.log("me" + me);
        this.timing = 0.7
        //let xran = this.getRandomArbitrary(1, 5);
        var labval = "labcenter"
        cc.log(labval + "labval");
        //@ts-ignore
        const labvalNode = touch.currentTarget.getChildByName(labval);
        if (labvalNode != null) {

          this.touchcount = this.touchcount + 1;
          if (this.touchcount % 10 != 0) {
            labvalNode.getComponent(cc.Label).string = (this.touchcount).toString();
            touch.currentTarget.getChildByName("res").getComponent(cc.Label).string = (this.touchcount).toString();


          }
          if (this.touchcount % 10 == 0) {
            //@ts-ignore
            touch.currentTarget.getChildByName("res").getComponent(cc.Label).string = (this.touchcount).toString();

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
                this.db = friendNode.getComponent(dragonBones.ArmatureDisplay)

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
          //    const dogg =this.charNode
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