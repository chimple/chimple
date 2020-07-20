import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";


const { ccclass, property } = cc._decorator;

@ccclass
export default class window extends cc.Component {

  @property(cc.Prefab)
  dragPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  blinds: cc.Prefab = null;

  @property(cc.Prefab)
  window: cc.Prefab = null;

  @property({
    type: cc.AudioClip
  })
  linestartaud: cc.AudioClip = null;

  @property({
    type: cc.AudioClip
  })
  linebackaud: cc.AudioClip = null;

  @property({
    type: cc.AudioClip
  })
  victoryaud: cc.AudioClip = null;

  @property({
    type: cc.AudioClip
  })
  correctaud: cc.AudioClip = null;







  noOfWindows: number;
  orgAddr: Array<string>;
  ansarray: Array<string>;
  qarray: Array<string>;
  makegameagain: Array<string>;
  x0: number;

  temparray: Array<string>;
  temparr: Array<string>;
  y0: number;
  xoff: number;
  yoff: number;
  dropArea: Map<string, cc.Rect>;
  dropAreab: Map<string, cc.Rect>;







  //For Matching logic

  //target: Map<cc.Vec2,cc.Rect> ;
  originalLocation: cc.Rect;
  finalLocation: cc.Rect;
  finalLocationb: cc.Rect;
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
  currentTouchID: number;
  lineStartPoint: cc.Vec2;
  lineEndPoint: cc.Vec2;
  // newDragpos: Map<string,cc.Vec2>;
  auther: number;
  authmov: number;
  delDupes: string;
  blindlocation: cc.Vec2;

  touchmMovID: number;
  touchStartID: number;
  firstDrag: cc.Node
  firstDrop: cc.Node

  //Audio Clip

  @catchError()
  onLoad() {
    const data = Config.getInstance().data[0]

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
    this.y0 = -265;
    this.xoff = 600;
    this.yoff = 140;
    this.dropArea = new Map();  // map initialize
    this.dropAreab = new Map();  // map initialize
    this.currentTouchID = -1;
    this.createWindows();
    this.createWindowsb();
    this.auther = 1;
    this.authmov = 1;

    this.makegameagain = ["a", "b", "c", "d"]

    this.drawing = this.node.getChildByName('linedraw').getComponent(cc.Graphics);
    Util.showHelp(this.firstDrag, this.firstDrop)
    this.node.children.forEach((f) => { cc.log(" nodes" + f.name) })
  }

  @catchError()
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
      Util.loadTexture(this.qarray[i], (texture, err) => {
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
      dragBox.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
      if (i == 3) {
        this.firstDrag = windowin;
        
      }

      //storing window leftside data
      this.dropAreab.set(
        i.toString(),
        windowin.getBoundingBox()
      );

      // cc.log("llol" + this.makegameagain[i]);


    }


  }
  @catchError()
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
      this.selectedObject = windowinb;
      //Taking all locations at which the windowb is instantiated into a map variable

      windowinb.parent = this.node;
      cc.log("<>", this.temparray);
      //Getting Images
      Util.loadTexture(this.temparray[i], (texture, err) => {
        console.log(this.temparray[i] + err);
        // windowinb.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.qarray[i])
        windowinb.getChildByName("dyna").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
      });

      //invisible dragPrefab for drag drop logic.
      windowinb.name = i.toString(); //Left to right matching the right side windows data are stored in a map variable
      this.dropArea.set(
        this.orgAddr[i],
        windowinb.getBoundingBox()
      );
    //  windowinb.name = this.ansarray[i].toString();

      //Right to left matching
      let dragBoxb = cc.instantiate(this.dragPrefab)
      dragBoxb.position = cc.v2((this.x0 + this.xoff), ((this.y0 - 30) + (i * this.yoff)));
      dragBoxb.parent = this.node;

      // let a = parseInt(this.orgAddr[i], 10);

      dragBoxb.name = (this.orgAddr[i]);
      if(parseInt(this.orgAddr[i])==3){
        this.firstDrop = windowinb;
        }

      cc.log("yol" + dragBoxb.name);
      dragBoxb.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      dragBoxb.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      dragBoxb.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      dragBoxb.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);


    }


  }
  @catchError()
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


@catchError()
  onTouchStart(touch: cc.Touch) {

    if (touch.currentTarget.name == this.delDupes) {
      this.scheduleOnce(function () {
        touch.currentTarget.removeFromParent(true);
        this.auther = 1;
      }, 0.1);

    }
    cc.log("go" + touch.currentTarget.name);
    if (this.auther == 1 && touch.getID() == 0) {   //Got this value from on Load method.
      this.auther = 0;
      this.originalLocation = touch.currentTarget.position;
      this.lineStartPoint = touch.currentTarget.position;
      cc.log("trialsa" + this.originalLocation);
    }
    //this.blindlocation=touch.currentTarget.position;

    cc.log("nam" + this.originalLocation);
    // this.tstore = touch.currentTarget.name;
    cc.log("touch start", this.tstore);
    this.drawing.lineWidth = 20;
    // this.lineStartPoint = touch.getLocation();
    this.authmov = 1

  }



@catchError()
  onTouchMove(touch: cc.Touch) {
    if (touch.getID() == 0) {
      this.tstore = touch.currentTarget.name
      cc.log("high" + this.tstore);
      cc.log("movv" + touch.getID())
      touch.currentTarget.position = touch.currentTarget.getParent().convertToNodeSpaceAR(touch.getLocation());
      //this.moveLocation=touch.currentTarget.position;
      cc.log("pos" + touch.currentTarget.position);
      this.lineEndPoint = touch.currentTarget.position;
      this.lineType = true;
      //final
      // this.scheduleOnce(function(){
      //   Util.play(this.linestartaud, false);
      // },3);
      this.authmov = 1;
      // touch.currentTarget.name="1";


    }
  }
  @catchError()
  onTouchEnd(touch: cc.Touch) {

    cc.log("starting" + touch.getStartLocation())
    touch.currentTarget.off;
    this.finalLocationb = this.dropAreab.get(this.tstore);
    this.finalLocation = this.dropArea.get(this.tstore);
    this.lineType = false;
    this.authmov = 0;
    this.auther = 1;
    cc.log("name onEnd" + touch.currentTarget.position);
    if (this.dropArea.get(this.tstore).intersects(touch.currentTarget.getBoundingBox()) && this.finalLocation.x > -200 && this.originalLocation.x < -200) {
      this.node.emit('correct');
      cc.log("ringer" + this.finalLocation)
      this.finalLocationb = this.dropAreab.get(this.tstore);
      cc.log("centaur" + this.dropArea.get(this.tstore).intersects(touch.currentTarget.getBoundingBox()));
      cc.log("got");
      this.finalLocation = this.dropArea.get(this.tstore);
      cc.log("In touchend" + this.finalLocation);
      this.delDupes = touch.currentTarget.name;
      let blind = cc.instantiate(this.blinds);
      blind.position = cc.v2(this.originalLocation.x, this.originalLocation.y + 26);
      blind.parent = this.node;
      let blind1 = cc.instantiate(this.blinds)
      blind1.position = cc.v2(300, (this.finalLocation.y + 59));
      blind1.parent = this.node;
      this.match();
      //Util.play(this.correctaud, false);
      this.auther = 1;
      this.scheduleOnce(function () {
        touch.currentTarget.removeFromParent(true);
      }, 0.1);
    }
    else if (this.dropAreab.get(this.tstore).intersects(touch.currentTarget.getBoundingBox()) && this.originalLocation.x > 200) {
      this.node.emit('correct');
      this.delDupes = touch.currentTarget.name;
      let blind = cc.instantiate(this.blinds);
      blind.position = cc.v2(this.originalLocation.x, this.originalLocation.y + 26);
      blind.parent = this.node;
      let blind1 = cc.instantiate(this.blinds)
      blind1.position = cc.v2(-300, (this.finalLocationb.y + 59));
      blind1.parent = this.node;
      this.match();
    //  Util.play(this.correctaud, false);
      this.auther = 1;
      this.scheduleOnce(function () {
        touch.currentTarget.removeFromParent(true);
      }, 0.1)
    }

    else if (this.authmov == 0 && touch.getID() == 0) {
      cc.log("endd" + touch.getID())
      // let action = cc.moveTo(1, this.originalLocation);
      // touch.currentTarget.runAction(action);
      touch.currentTarget.position = this.originalLocation;
      this.node.emit('wrong');
      this.auther = 1;
      cc.log("not  got");
     // Util.play(this.linebackaud, false);
      this.node.children.forEach((f) => {
        cc.log("bird nodes" + f.name)
        // if(f.name == "1"){
        //   f.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        //   f.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        //   f.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        // }
      })
    }
  }
@catchError()
  update() {

    this.drawing.clear();
    switch (this.lineType) {
      case false: cc.log("Don't Draw");
        break;
      case true:
        cc.log("Drawing Line.................")
        this.drawing.moveTo(this.lineStartPoint.x,this.lineStartPoint.y);
        this.drawing.lineTo(this.lineEndPoint.x, this.lineEndPoint.y);
        this.drawing.stroke();
        this.drawing.lineWidth = 10;
        this.drawing.strokeColor = cc.Color.RED;
        break;
    }
  }
@catchError()
  match() {
    const config = Config.getInstance();

    if (--this.totalPieces <= 0) {

      cc.log("chk" + this.totalPieces)

      // config.nextProblem();
      this.node.emit('nextProblem');
      //End of setTimeout method

    }
  }

}
