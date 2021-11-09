import Game from "../../../common/scripts/game";
import LessonController from "../../../common/scripts/lessonController";
import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import BalloonBurst from "./balloon-burst";


const {ccclass, property} = cc._decorator;

export interface BalloonpopConfig {
    level: string,
    worksheet: string,
    problem: string,
    problemCount: string,
    answer: string,
    clickOnAnswer: number,
    options: Array<string>,
    audio: string
}

@ccclass
export default class Balloonpop extends Game {

    @property(cc.Prefab)
    balloon: cc.Prefab = null;

    @property(cc.Prefab)
    displayCard: cc.Prefab = null;

    @property(cc.Prefab)
    backgroundPlatform: cc.Prefab = null;

    @property(cc.Node)
    progressBar: cc.Node=null;
    
    @property(cc.ProgressBar)
    prgbar:cc.ProgressBar=null;

    currentConfig: BalloonpopConfig = null;

    static correctLetter:string;
    static letterNo:number;
    maxBalloon: number;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        let display = cc.instantiate(this.displayCard);
        let bgPlatfrom = cc.instantiate(this.backgroundPlatform);
        this.node.addChild(bgPlatfrom);
        bgPlatfrom.scale = 1;
        bgPlatfrom.setPosition(-(cc.winSize.width/2)+(cc.winSize.height/25), -390);  
    
        this.node.addChild(display);

        this.currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        display.getChildByName('label').getComponent(cc.Label).string=this.currentConfig.answer;       
        Balloonpop.correctLetter=this.currentConfig.answer;
        Balloonpop.letterNo=this.currentConfig.clickOnAnswer;

        this.friendPos.scale = 0.5;
        this.friendPos.setPosition((-(cc.winSize.width/2)+(cc.winSize.height/8)),(-(cc.winSize.height/2)+(cc.winSize.height/6.7)))

        cc.tween(display)
        .to(1, { scale: 0.5}, {easing: "quintInOut"}).call(()=>{
            this.playAudio()
            display.runAction(
                cc.sequence(
                    cc.spawn(
                        cc.moveTo(1, cc.v2((-(cc.winSize.width/2)+(cc.winSize.height/8)),(-(cc.winSize.height/2)+(cc.winSize.height/1.9))), 0),
                        cc.scaleTo(0.5, 0.08)
                    ),
                    cc.scaleTo(0.5, 0.08),
                    cc.callFunc(this.displayLetterInProgressBar,this,display),
                    cc.callFunc(this.displayProgressBar,this,this.name),
                    cc.callFunc(this.createBallon,this,this.name)
                ),
            )
        })
        .start();
    }
    
    public createBallon(){
        this.maxBalloon=Math.floor((cc.winSize.width/160));
        cc.log(this.maxBalloon + "<------");
        for(let i = 1; i<this.maxBalloon; i++){
            let ballon = cc.instantiate(this.balloon);
            this.node.addChild(ballon);
            ballon.getComponentInChildren(cc.Label).string = this.currentConfig.options[Math.floor(0 + Math.random() * (this.currentConfig.options.length - 0))]
            ballon.setPosition((-(cc.winSize.width/2)+(cc.winSize.height/8))+((ballon.width)*(i)), -480);
            let currentColor = cc.color(Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255));
            ballon.getChildByName("balloon_texture").color = currentColor;
            ballon.addComponent(cc.RigidBody).gravityScale = -0.2 + Math.random() * (-0.1 - (-0.2));
            ballon.getChildByName("burst_node").color = currentColor;
            
        }
    }

    createSingleBallon(xPos:number){
        if (this.node.children.length < 20) {
            let ballon = cc.instantiate(this.balloon);
            this.node.addChild(ballon);
            ballon.getComponentInChildren(cc.Label).string = this.currentConfig.options[Math.floor(0 + Math.random() * (this.currentConfig.options.length - 0))]
            ballon.setPosition((-(cc.winSize.width/2)+(cc.winSize.height/8))+((ballon.width)) * Math.floor((1 + Math.random() * (this.maxBalloon -1))), -550);
            let currentColor = cc.color(Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255))
            ballon.getChildByName("balloon_texture").color = currentColor;
            if (BalloonBurst.wrongMoves >= 2) {
                ballon.addComponent(cc.RigidBody).gravityScale = -0.05 + Math.random() * (-0.1 - (-0.05));
            } else {
                ballon.addComponent(cc.RigidBody).gravityScale = -0.2 + Math.random() * (-0.1 - (-0.2))
            }
            ballon.getChildByName("burst_node").color = currentColor;
        }        
    }

    playAudio() {
        if((this.currentConfig.answer >= "1" && this.currentConfig.answer <= "99")){
            Util.loadNumericSound(this.currentConfig.answer, (clip) => {
                if(clip != null){
                    LessonController.getFriend().speak(clip);
                }
            });
        } else {
            Util.loadsLetter(this.currentConfig.answer.toLowerCase(), (clip) =>{
                if(clip != null){
                    LessonController.getFriend().speak(clip);
                }
            });
        }
    }

    displayProgressBar(){
        this.progressBar.active=true;        
        this.progressBar.setPosition((-(cc.winSize.width/2)+(cc.winSize.height/8)),(-(cc.winSize.height/2)+(cc.winSize.height/1.4)));
        this.prgbar.progress=0.0;
    }

    displayLetterInProgressBar(disp){
        disp.getChildByName('frontFace').active=false;
        disp.getChildByName('shadowFace').active=false;
        disp.getChildByName('label').color=cc.Color.WHITE;
       // disp.getChildByName('label').getComponent(cc.Label).fontSize=1000;
    }

    letterProgress(){
        this.prgbar.progress=BalloonBurst.letterBursted;
        if(this.prgbar.progress>=1){
            BalloonBurst.letterBursted=0;
            this.node.pauseSystemEvents(true)
            this.node.emit('correct')
            this.node.emit('nextProblem')  
        }
    }

    onDestroy(){
        BalloonBurst.letterBursted=0;
        this.node.destroy();
    }

    private processConfiguration(data: any[] = []): BalloonpopConfig | null {
        const configurations: any[] = [].concat(...data);
        let [
            level,
            worksheet,
            problem,
            problemCount,
            answer,
            clickOnAnswer,
            options,
            audio
        ] = configurations;
        options = options.split(',');
        return {
            level,
            worksheet,
            problem,
            problemCount,
            answer,
            clickOnAnswer,
            options,
            audio
        };
    }

}
