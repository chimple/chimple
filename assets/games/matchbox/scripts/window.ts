import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class window extends cc.Component {

  @property(cc.Prefab)
  dragPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  blinds: cc.Prefab = null;

  @property(cc.Prefab)
  window: cc.Prefab = null;

  @property(cc.AudioClip)
  qcorrect: cc.AudioClip = null;

  @property(cc.AudioClip)
  linebackaud: cc.AudioClip = null;

  @property(cc.AudioClip)
  linestartaud: cc.AudioClip = null;

  @property(cc.AudioClip)
  victoryaud: cc.AudioClip = null;

  noOfWindows: number;
  orgAddr: Array<string>;
  ansarray: Array<string>;
  qarray: Array<string>;

  x0: number;

  temparray: Array<string>;
  temparr: Array<string>;
  y0: number;
  xoff: number;
  yoff: number;
  dropArea: Map<string, cc.Rect>;
  



  //Blinds
  xtin: number;
  ytin: number;
  xtfin: number;
  ytfin: number;
  flagger: number;

  //For Matching logic

  //target: Map<cc.Vec2,cc.Rect> ;
  originalLocation: cc.Rect;
  finalLocation: cc.Rect;
  moveLocation: cc.Rect;
  selectedObject: cc.Node;
  tstore: string;
  //selectedObjectString: string;

  //JSONofAbis?
  totalPieces: number = 4;
  level: number;
  worksheet: number;
  problem: number;
  nowin: number;
  drawing: cc.Graphics;
  lineType: boolean;

  lineStartPoint: cc.Vec2;
  lineEndPoint: cc.Vec2;

  //Audio Clip

  onLoad() {
    Config.getInstance().loadGameJson((data: []) => {

      let fieldArr = data
        .toString()
        .split(",")
        .map(field => (/^\d*\.?\d+$/.test(field) ? Number(field) : field));
      cc.log("love " + fieldArr);

      let imga1, imga2, imga3, imga4, imgc1, imgc2, imgc3, imgc4;
      [
        this.level,
        this.worksheet,
        this.problem,
        this.nowin,
        imga1,
        imga2,
        imga3,
        imga4,
        imgc1,
        imgc2,
        imgc3,
        imgc4
      ] = fieldArr;
      this.qarray = [imga1, imga2, imga3, imga4];
      this.ansarray = [imgc1, imgc2, imgc3, imgc4];
      cc.log("qarray" + this.qarray);
      cc.log("ansarray" + this.ansarray);
      this.x0 = -300;
      this.y0 = -300;
      this.xoff = 600;
      this.yoff = 150;
      this.dropArea = new Map();  // map initialize

      this.createWindows();
      this.createWindowsb();

    });


    this.drawing = this.node.getChildByName('linedraw').getComponent(cc.Graphics);
    

  }


  createWindows() {
    for (let i = 0; i < 4; i++) {
      cc.log("This is just a test");
      let windowin = cc.instantiate(this.window);
      var dragBox = cc.instantiate(this.dragPrefab);
      windowin.position = cc.v2((this.x0), (this.y0 + (i * this.yoff)));
      dragBox.position = cc.v2((this.x0), (this.y0 - 30 + (i * this.yoff)));
      windowin.parent = this.node;
      dragBox.parent = this.node;

      //Getting Image 
      Util.load(this.qarray[i], (err, texture) => {
        console.log(this.qarray[i] + err);
        // windowin.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.qarray[i])
        windowin.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
      });
      //STOP
      // let url=cc.url.raw(this.qarray[i]); //file names in string looping to add image
      // windowin.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(url);
       dragBox.name = i.toString();
      dragBox.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      dragBox.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      dragBox.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

  }
  createWindowsb() {
    this.orgAddr = [];
    this.temparr = [];
    this.temparray = [...this.ansarray];
    this.ansarray;//storing original array
    this.temparray = this.shuffle(this.temparray); //Storing the shuffled larray back in temp array
    cc.log("bogo" + this.temparray);
    cc.log("bogo" + this.ansarray);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        cc.log("printj" + j)
        if (this.temparray[i] == this.ansarray[j]) {
          this.orgAddr[i] = j.toString();
        }
      }

    }
    cc.log("bogo" + this.orgAddr)

    for (let i = 0; i < 4; i++) {

      let windowinb = cc.instantiate(this.window);
      windowinb.position = cc.v2((this.x0 + this.xoff), (this.y0 + (i * this.yoff)));
      this.selectedObject=windowinb;
      //Taking all locations at which the windowb is instantiated into a map variable

      windowinb.parent = this.node;
      cc.log("<>", this.temparray);
      //Getting Images
      Util.load(this.temparray[i], (err, texture) => {
        console.log(this.temparray[i] + err);
        // windowinb.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.qarray[i])
        windowinb.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
      });


      //invisible dragPrefab for drag drop logic.
      windowinb.name = i.toString();
      this.dropArea.set(
        this.orgAddr[i],
        windowinb.getBoundingBoxToWorld()
      );
      windowinb.name = this.ansarray[i].toString();


    }


  }

  shuffle(array) {

    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;

    }
    return array;

  }



  onTouchStart(touch: cc.Touch) {
    
    this.originalLocation = touch.currentTarget.position;
    cc.log("nam" + this.originalLocation);
    // this.dragBox.position = touch.gposition;
    this.tstore = touch.currentTarget.name;
    cc.log("touch start", this.tstore);
    this.drawing.lineWidth = 20;
    this.lineStartPoint = touch.getLocation();

  }
  onTouchMove(touch: cc.Touch) {
    touch.currentTarget.position = touch.currentTarget.getParent().convertToNodeSpaceAR(touch.getLocation());
    //this.moveLocation=touch.currentTarget.position;
    cc.log("pos" + touch.currentTarget.position);
    this.lineEndPoint = touch.getLocation();
    this.lineType = true;
    //final
    //cc.audioEngine.play(this.music,false,10)
    // if(touch.currentTarget.position !=this.finalLocation)
    // {
    //   drawing.node.off
    // }



  }
  onTouchEnd(touch: cc.Touch) {

    this.lineType = false;

    cc.log("name onEnd" + touch.currentTarget.position);
  
    if (this.dropArea.get(this.tstore).containsRect(touch.currentTarget.getBoundingBoxToWorld())) {
      cc.log("got");
      this.finalLocation = this.dropArea.get(this.tstore);
      cc.log("In touchend" + this.finalLocation);
      let blind = cc.instantiate(this.blinds);
      blind.position = cc.v2(this.originalLocation.x, this.originalLocation.y + 17);
      blind.parent = this.node;
      let blind1 = cc.instantiate(this.blinds)
      blind1.position = cc.v2(300,(this.finalLocation.y-327));
      blind1.parent = this.node;
      this.match();
      cc.audioEngine.play(this.qcorrect, false, 7)
      
      //  touch.currentTarget.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
      //  touch.currentTTarget.off(cc.Node.EventType.TOUCH_START,this.onTouchMove,this);
      //  touch.currentTarget.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    else {
      let action = cc.moveTo(1, this.originalLocation);
      touch.currentTarget.runAction(action);
      cc.log("not  got");
      cc.audioEngine.play(this.linebackaud, false, 7)
    }
  }

  update() {
    this.drawing.clear();
    switch (this.lineType) {
      case false: cc.log("Don't Draw");
        break;
      case true:
        cc.log("Drawing Line.................")
        this.drawing.moveTo(this.lineStartPoint.x, this.lineStartPoint.y);
        this.drawing.lineTo(this.lineEndPoint.x, this.lineEndPoint.y);
        this.drawing.stroke();
        this.drawing.lineWidth = 10;
        this.drawing.strokeColor = cc.Color.BLUE;
        break;
    }
  }

  match() {
    const config = Config.getInstance();
    if (--this.totalPieces <= 0) {
      let delayInMilliseconds = 3000;
      cc.audioEngine.play(this.victoryaud, false, 7)
      cc.log("chk" + this.totalPieces)
      setTimeout(function () {
        config.nextProblem();
      }, delayInMilliseconds)  //End of setTimeout method

    }
  }

}
