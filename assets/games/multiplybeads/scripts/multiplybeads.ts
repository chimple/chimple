import Config from "../../../common/scripts/lib/config";
import catchError from "../../../common/scripts/lib/error-handler";
import { Util } from "../../../common/scripts/util";
import Game from "../../../common/scripts/game";
import Profile, { LANGUAGE } from "../../../common/scripts/lib/profile";
import { NUMBER_VOICE } from "../../../common/scripts/helper";


const { ccclass, property } = cc._decorator;
@ccclass
export default class MultiplyBeads extends Game {

    @property(cc.Prefab)
    dragPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    lamplabel: cc.Prefab = null;

    @property(cc.Prefab)
    progressMonitorPrefab: cc.Prefab = null;


    @property(cc.Prefab)
    dropPrefab: cc.Prefab = null; //Highlight when selected.

    @property(cc.Prefab)
    resLabel: cc.Prefab = null;

    @property(cc.Prefab)
    block1: cc.Prefab = null;

    @property(cc.Prefab)
    block2: cc.Prefab = null;

    @property(cc.Prefab)
    block3: cc.Prefab = null;

    @property(cc.Prefab)
    block4: cc.Prefab = null;

    @property(cc.Prefab)
    block5: cc.Prefab = null;

    @property(cc.Prefab)
    block6: cc.Prefab = null;

    @property(cc.Prefab)
    block7: cc.Prefab = null;

    @property(cc.Prefab)
    block8: cc.Prefab = null;

    @property(cc.Prefab)
    block9: cc.Prefab = null;

    @property(cc.Prefab)
    drop1: cc.Prefab = null;

    @property(cc.Prefab)
    drop2: cc.Prefab = null;

    @property(cc.Prefab)
    drop3: cc.Prefab = null;

    @property(cc.Prefab)
    drop4: cc.Prefab = null;

    @property(cc.Prefab)
    drop5: cc.Prefab = null;

    @property(cc.Prefab)
    drop6: cc.Prefab = null;

    @property(cc.Prefab)
    drop7: cc.Prefab = null;

    @property(cc.Prefab)
    drop8: cc.Prefab = null;

    @property(cc.Prefab)
    drop9: cc.Prefab = null;

    @property({
        type: cc.AudioClip
    })
    matchAud: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    pickAud: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    victoryAud: cc.AudioClip = null;

    //JSON
    totalPieces: number;
    preven: number = 0;
    level: string;
    worksheet: string;
    problem: string;
    multiplier: string;
    multiplicand: string;
    prod: string;

    //Send me location.
    x0: number;
    y0: number;
    xoff: number;
    yoff: number;
    xdrop: number;
    blockarr: Array<Node> = []
    fieldArr: Array<string>;
    a: number;
    atend: number;
    //Match
    dropArea: Map<string, cc.Rect>;
    noOfDrag: number;
    noOfDrop: number;
    imgname: string;
    imgnameb: string;
    tstore: string;
    originalLocation: cc.Rect;
    finalLocation: cc.Rect;
    numtomultiply: number;
    soundarr: Array<String>;
    finalval;
    temp;
    count: number = 0;
    auther: number;
    multarrp: Array<string>;
    //Animations
    resultt; tempresultt;
    st; faceAnim;
    firstDrag: cc.Node
    firstDrop: cc.Node

    // runs when scene is loaded
    @catchError()
    onLoad() {
        // this.node.addChild(cc.instantiate(this.progressMonitorPrefab));
        let fieldArr = Config.getInstance().data[0]
            .toString()
            .split(",")
            .map(field => (/^\d*\.?\d+$/.test(field) ? Number(field) : field));
        cc.log("field " + fieldArr);


        //  let imga,imgb;
        [
            this.level,
            this.worksheet,
            this.problem,
            this.multiplicand,
            this.multiplier,
            this.prod

        ] = fieldArr;
        this.noOfDrag = parseInt(this.multiplier);

        cc.log("led" + this.noOfDrag);
        this.noOfDrop = parseInt(this.multiplier);
        this.x0 = 200;
        this.y0 = 0;
        this.xoff = 0;
        this.yoff = 0;
        this.xdrop = -400;
        this.dropArea = new Map();


        let boxnam = this.multiplicand.toString();
        //@ts-ignore
        this.imgname = Config.dir + "games/multiplication/texture/box" + boxnam + "_multiplicationboard";
        //@ts-ignore
        this.imgnameb = Config.dir + "games/multiplication/texture/placeholder" + boxnam + "_multiplicationboard";
        this.numtomultiply = parseInt(this.multiplicand);
        this.totalPieces = this.noOfDrag;
        cc.log("lol" + this.imgname);
        cc.log("put")
        cc.log("led" + this.noOfDrag);
        this.createLamps();
        this.createDropArea();
        this.totalPieces = this.noOfDrop;


        //@ts-ignore
        var filea = Config.dir+ Profile.lang + '-help/' + NUMBER_VOICE + "d_" + this.multiplicand.toString() + '.mp3';
        var totalres = this.numtomultiply * this.noOfDrop;
        this.temp = this.noOfDrag;
        //@ts-ignore
        var filea = Config.dir + Profile.lang + '-help/' + NUMBER_VOICE + "d_" + this.multiplicand.toString() + '.mp3';
        //@ts-ignore
        var fileb = Config.dir + Profile.lang + '-help/' + NUMBER_VOICE + "times" + '.mp3';
        //@ts-ignore
        var filec = Config.dir + Profile.lang + '-help/' + NUMBER_VOICE + "d_" + this.multiplier.toString() + '.mp3';
        //@ts-ignore
        var fileeq = Config.dir + Profile.lang + '-help/' + NUMBER_VOICE + "equals" + '.mp3';
        //@ts-ignore
        var filefin = Config.dir + Profile.lang + '-help/' + NUMBER_VOICE + "d_" + totalres.toString() + '.mp3';
        this.soundarr = [filea, fileb, filec, fileeq, filefin];
        this.multarrp = [this.multiplicand, "X", this.multiplier, "=", this.prod];

        Util.showHelp(this.firstDrag, this.firstDrop)
        this.a = 1;

    }//end of onLoad() method

    @catchError()
    createLamps() {

        cc.log("drop ");
        let lampin = cc.instantiate(this['block' + [this.multiplicand]]);
        let xran = this.getRandomArbitrary(10, 20);
        lampin.position = cc.v2(this.x0, this.y0);
        if (this.numtomultiply > 6) {
            lampin.scale = 0.8
        }
        lampin.parent = this.node;
        let numa = 0
        lampin.name = numa.toString();
        this.firstDrag = lampin
        // // Getting Image
        // Util.load(this.imgname, (err, texture) => {
        //     console.log("err" + err);
        //     //lampin.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.imgname)
        //     lampin.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        // });

        lampin.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        lampin.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        lampin.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        lampin.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        let xbox = -500

        //Creating  all labels except multiplier label
        for (let i = 1; i <= 9; i++) {
            if (i != this.noOfDrag) {
                var labela = cc.instantiate(this.lamplabel);
                labela.position = cc.v2((-500 + (i * 100)), (this.y0 + 330));
                labela.parent = this.node;
                labela.getChildByName("numburr").getComponent(cc.Label).string = i.toString();
            }
            else {
                var labela = cc.instantiate(this.lamplabel);
                labela.position = cc.v2((-500 + (i * 100)), (this.y0 + 330));
                labela.parent = this.node;
                labela.getChildByName("numburr").getComponent(cc.Label).string = i.toString();
                labela.color = new cc.Color(255, 100, 100);

            }
        }
        //Result label
        this.resultt = cc.instantiate(this.resLabel);
        // if (this.noOfDrop > 7) {
        //     this.resultt.scaleX = 1.5;
        //     this.resultt.getChildByName("disp").scaleX = 0.7;
        // }
        this.resultt.position = cc.v2(0, -600);
        this.resultt.parent = this.node;
        let actiona = cc.moveTo(3, cc.v2(0, -300));
        this.resultt.runAction(actiona)


    }

    @catchError()
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    @catchError()
    createDropArea() {
        cc.log("drop");
        let dropin = cc.instantiate(this['drop' + [this.multiplicand]]);
        dropin.color = new cc.Color(255, 255, 100);
        dropin.position = cc.v2(this.xdrop, this.y0 + 50);
        if (this.numtomultiply > 6) {
            dropin.scale = 0.8;
        }
        dropin.parent = this.node;
        let numb = 0;


        this.dropArea.set(
            numb.toString(),
            dropin.getBoundingBox()
        );

        this.firstDrop = dropin
    }
    @catchError()
    resultDisplay() {
        new cc.Tween()
            .target(this.node)
            .to(1, {}, { progress: null, easing: "sineOutIn" })
            .call(() => {
                var labll = cc.instantiate(this.lamplabel)
                labll.position = cc.v2(0, 0)
                labll.parent = this.node

                this.onTouchAudio((this.soundarr[this.count]).toString());
            })
            .start();

    }
    @catchError()
    onTouchStart(touch: cc.Touch) {
        if (touch.getID() == 0 && touch.currentTarget.name != 'a') {
            this.originalLocation = touch.currentTarget.position
            Util.playSfx(this.pickAud);
            if (this.atend == 1) {
                this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.tempresultt + "+";
            }
        }
    }
    @catchError()
    onTouchMove(touch: cc.Touch) {
        if (touch.getID() == 0 && touch.currentTarget.name != "a") {
            this.tstore = touch.currentTarget.name;
            touch.currentTarget.position = touch.currentTarget.getParent().convertToNodeSpaceAR(touch.getLocation());
            this.auther = 1;

        }


    }
    @catchError()
    onTouchEnd(touch: cc.Touch) {
        if (touch.getID() == 0 && touch.currentTarget.name != 'a') {
            this.finalLocation = this.dropArea.get(this.tstore);
            if (this.dropArea.get(this.tstore).intersects(touch.currentTarget.getBoundingBox()) && this.auther == 1) {


                this.faceAnim = touch.currentTarget.getChildByName("face").getComponent(cc.Animation)
                this.faceAnim.play()

                //Unable to play animation infinte why?
                //this.faceAnim.wrapmode= cc.WrapMode.Loop;
                //this.faceAnim.repeatCount =Infinity;
                this.temp = this.temp - 1;
                this.atend = 1;
                // touch.currentTarget.getComponent('face')
                this.auther = 0;
                this.node.emit('correct');
                Util.playSfx(this.matchAud);
                let dropin;
                touch.currentTarget.position = cc.v2(this.xdrop, (this.y0 + 50));
                touch.currentTarget.name = "a";


                //Audio Clip
                // cc.log("lolol" + value)
                let value = (this.a * this.numtomultiply).toString()
                this.finalval = value
                let file = Config.dir + Profile.lang + '-help/' + NUMBER_VOICE + "d_" + value + '.mp3';
                this.a = this.a + 1;
                cc.log("audi" + file);


                // if(this.totalPieces==this.noOfDrop){
                // let actiona = cc.moveTo(1, cc.v2(0, -300));
                // this.resultt.runAction(actiona)
                // }
                this.resultt.getChildByName("disp").getComponent(cc.Label).string = (this.resultt.getChildByName("disp").getComponent(cc.Label).string) + this.numtomultiply;
                this.tempresultt = this.resultt.getChildByName("disp").getComponent(cc.Label).string
                if (this.noOfDrag != 1 && this.a != 2) {
                    this.resultt.getChildByName("disp").getComponent(cc.Label).string = (this.resultt.getChildByName("disp").getComponent(cc.Label).string) + "=" + value;

                }



                Util.load(
                    file,
                    (err, clip) => {
                        // if (!err && clip !== null) {
                            this.friend.speak(clip, () => {
                                this.match();
                            })
                            // var audioID = cc.audioEngine.play(clip, false, 1);
                            // cc.audioEngine.setFinishCallback(
                            //     audioID,
                            //     function () {
                            //         this.match();
                            //     }.bind(this)
                            // );
                        // }
                        // else {
                        //     new cc.Tween()
                        //         .target(this.node)
                        //         .to(1, {}, { progress: null, easing: "sineOutIn" })
                        //         .call(() => {
                        //             this.match();
                        //         })
                        //         .start();
                        // }
                    }
                );

                // this.match();

                if (this.temp > 0) { //I prevent extra drop area from being created when the last piece is matched.
                    //Instantiating drop Area after match

                    cc.log("drop" + this.temp);
                    dropin = cc.instantiate(this['drop' + [this.multiplicand]]);
                    dropin.color = new cc.Color(255, 255, 100);
                    this.xdrop = this.xdrop + 100
                    if (this.numtomultiply > 6) {
                        dropin.scale = 0.8;
                    }
                    dropin.position = cc.v2(this.xdrop, this.y0 + 50);
                    dropin.parent = this.node;
                    let numb = 0;

                    this.dropArea.set(
                        numb.toString(),
                        dropin.getBoundingBox()
                    );

                    //Drag obj after match

                    let lampin = cc.instantiate(this['block' + [this.multiplicand]]);

                    let xran = this.getRandomArbitrary(10, 20);
                    lampin.position = cc.v2((this.x0 + (this.temp * xran)), (this.y0) + xran);
                    if (this.numtomultiply > 6) {
                        lampin.scale = 0.8
                    }
                    lampin.parent = this.node;
                    let numa = 0
                    lampin.name = numa.toString();
                    lampin.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                    lampin.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
                    lampin.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
                    lampin.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);


                }
            } else {
                // touch.currentTarget.position = this.originalLocation;
                let actiona = cc.moveTo(0.5, cc.v2(this.originalLocation.x, this.originalLocation.y));
                touch.currentTarget.runAction(actiona);

                this.node.emit('wrong');

            }
        }
    }
    @catchError()
    onTouchAudio(filename) {

        if (!cc.audioEngine.isMusicPlaying()) {
            Util.load(
                filename,
                (err, clip) => {
                    // if (!err && clip !== null) {
                        if (this.count != 5) {
                            this.friend.speak(clip, () => {
                                this.count++;
                                this.match();
                            })
                            // var audioID = cc.audioEngine.play(clip, false, 1);
                            // cc.audioEngine.setFinishCallback(
                            //     audioID,
                            //     function () {
                            //         this.count++;
                            //         this.match();
                            //     }.bind(this)
                            // );
                        }
                    // }
                    // else {

                    //     new cc.Tween()
                    //         .target(this.node)
                    //         .to(1, {}, { progress: null, easing: "sineOutIn" })
                    //         .call(() => {
                    //             this.count++
                    //             this.match()

                    //         })
                    //         .start();
                    // }
                }
            );
        }
    }


    @catchError()
    match() {
        if (--this.totalPieces <= 0) {

            const config = Config.getInstance();

            if (this.preven == 0) {
                this.preven = 1;
                this.resultt.getChildByName("disp").getComponent(cc.Label).string = "";
            }

            //Operand
            // this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.numtomultiply;
            // this.resultt.getChildByName("disp").getComponent(cc.Label).string = (this.resultt.getChildByName("disp").getComponent(cc.Label).string) + "x"
            // this.resultt.getChildByName("disp").getComponent(cc.Label).string = (this.resultt.getChildByName("disp").getComponent(cc.Label).string) + this.noOfDrag;
            // this.resultt.getChildByName("disp").getComponent(cc.Label).string = (this.resultt.getChildByName("disp").getComponent(cc.Label).string) + "=";
            // var totalres = (this.numtomultiply * this.noOfDrag)
            // this.resultt.getChildByName("disp").getComponent(cc.Label).string = (this.resultt.getChildByName("disp").getComponent(cc.Label).string) + totalres.toString();

            if (this.count != 5) {
                this.resultt.getChildByName("disp").getComponent(cc.Label).string = this.resultt.getChildByName("disp").getComponent(cc.Label).string + this.multarrp[this.count] + "  ";
                // var labelaa=cc.instantiate(this.lamplabel)
                // labelaa.scale=1.2;
                // labelaa.position=cc.v2(-250 +(this.count*150), -320)
                // labelaa.parent=this.node
                // labelaa.getChildByName("numburr").getComponent(cc.Label).string = this.multarrp[this.count];
                // labelaa.getChildByName("numburr").opacity=255;
                this.onTouchAudio((this.soundarr[this.count]).toString());
                // this.resultDisplay();
            }

            if (this.count == 4) {
                new cc.Tween()
                    .target(this.node)
                    .to(2, {}, { progress: null, easing: "sineOutIn" })
                    .call(() => {


                        cc.log("chk" + this.totalPieces)
                        Util.playSfx(this.victoryAud);

                        //  config.nextProblem();
                        this.node.emit('nextProblem');
                        //End of setTimeout method
                    })
                    .start();
            }
        }
    }
}




