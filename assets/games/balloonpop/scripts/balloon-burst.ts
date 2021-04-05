import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import Balloonpop from "./balloonpop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BalloonBurst extends Drag {

    static letterBursted:number=0;
    
    onEnable() {
        this.enableTouch();
    }

    enableTouch() {
        this.node.on('touchstart', this.onTouchStart, this);
    }

    onTouchStart(touch: cc.Touch){
        if(this.node.getChildByName("label")!=null){
            this.node.getChildByName("label").destroy();
            this.node.getChildByName("balloon_texture").destroy();
            let letter = this.node.getComponentInChildren(cc.Label).string;
            if((letter >= "1" && letter <= "99")){
                Util.loadNumericSound(letter, (clip) => {
                    if(clip != null){
                        Util.play(clip);
                    }
                });
            } else {
                Util.loadsLetter(letter.toLowerCase(), (clip) =>{
                    if(clip != null){
                        Util.play(clip);
                    }
                });
            }
            this.burstBalloonAnimation();
            this.node.parent.getComponent("balloonpop").createSingleBallon(this.node.x);
            if(this.node.getComponentInChildren(cc.Label).string===Balloonpop.correctLetter){                            
                BalloonBurst.letterBursted= BalloonBurst.letterBursted+(1/Balloonpop.letterNo);
                this.node.parent.getComponent("balloonpop").letterProgress();
                this.node.parent.emit("correct")
            } else {
                if(BalloonBurst.letterBursted > 0) {
                    BalloonBurst.letterBursted = BalloonBurst.letterBursted-(1/Balloonpop.letterNo)
                    this.node.parent.getComponent("balloonpop").letterProgress();
                }
                this.node.parent.emit("wrong");
            }
        }
    }

    burstBalloonAnimation(){
        let balloonAnimation = this.node.getComponent(cc.Animation);
        if(balloonAnimation!=null){
            balloonAnimation.play();
        }
    }

    update (dt) {
        if(this.node.position.y>cc.winSize.height/2){
            this.node.parent.getComponent("balloonpop").createSingleBallon(this.node.x);
            this.node.destroy();
        }
    }
}
