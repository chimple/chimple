import Game from "../../../common/scripts/game";
import Config from "../../../common/scripts/lib/config";
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

    @property(cc.Node)
    progressBar: cc.Node=null;
    
    @property(cc.ProgressBar)
    prgbar:cc.ProgressBar=null;

    currentConfig: BalloonpopConfig = null;

    static correctLetter:string;
    static letterNo:number;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        let display = cc.instantiate(this.displayCard);
        this.node.addChild(display);

        this.currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        display.getChildByName('label').getComponent(cc.Label).string=this.currentConfig.answer;       
        Balloonpop.correctLetter=this.currentConfig.answer;
        Balloonpop.letterNo=this.currentConfig.clickOnAnswer;

        this.friendPos.scale = 0.5;
        this.friendPos.setPosition((-(cc.winSize.width/2)+(cc.winSize.height/8)),(-(cc.winSize.height/2)+(cc.winSize.height/30)))

        cc.tween(display)
        .to(1, { scale: 0.5}, {easing: "quintInOut"}).call(()=>{
            display.runAction(
                cc.sequence(
                    cc.spawn(
                        cc.moveTo(1, cc.v2((-(cc.winSize.width/2)+(cc.winSize.height/8)),(-(cc.winSize.height/2)+(cc.winSize.height/2.5))), 0),
                        cc.scaleTo(0.5, 0.10)
                    ),
                    cc.scaleTo(0.5, 0.10),
                    cc.callFunc(this.createBallon,this,this.name)
                ),
            )
        })
        .start();
    }
    
    public createBallon(){
        for(let i = 1; i<10; i++){
            let ballon = cc.instantiate(this.balloon);
            this.node.addChild(ballon);
            ballon.getComponentInChildren(cc.Label).string = this.currentConfig.options[Math.floor(0 + Math.random() * (this.currentConfig.options.length - 0))]
            ballon.setPosition((-(cc.winSize.width/2)+(cc.winSize.height/8))+((ballon.width)*(i)), -480);
            ballon.color=cc.color(Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255))
            ballon.addComponent(cc.RigidBody).gravityScale = -0.5 + Math.random() * (-0.1 - (-0.5));
        }
    }

    createSingleBallon(xPos:number){            
        let ballon = cc.instantiate(this.balloon);
        this.node.addChild(ballon);
        ballon.getComponentInChildren(cc.Label).string = this.currentConfig.options[Math.floor(0 + Math.random() * (this.currentConfig.options.length - 0))]
        ballon.setPosition(xPos, -550);
        ballon.color=cc.color(Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255))
        ballon.addComponent(cc.RigidBody).gravityScale = -0.5 + Math.random() * (-0.1 - (-0.5));
   
    }

    displayProgressBar(){
        this.progressBar.active=true;        
        this.progressBar.setPosition((-(cc.winSize.width/2)+(cc.winSize.height/8)),(-(cc.winSize.height/2)+(cc.winSize.height/1.5)));
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
