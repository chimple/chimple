import Game from "../../../common/scripts/game";
import Config from "../../../common/scripts/lib/config";


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

    currentConfig: BalloonpopConfig = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        let display = cc.instantiate(this.displayCard);
        this.node.addChild(display);

        this.currentConfig = this.processConfiguration(Config.getInstance().data[0]);

        this.friendPos.scale = 0.5;

        cc.tween(display)
        .to(1, { scale: 0.5}, {easing: "quintInOut"}).call(()=>{
            display.runAction(
                cc.sequence(
                    cc.spawn(
                        cc.moveTo(1, cc.v2(-600, -50), 0),
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
            ballon.setPosition(-512 + Math.random() * (512 - (-512)), -480);
            ballon.color=cc.color(Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255),Math.round((Math.random() * (255 - 50) + 50)%255))
            ballon.addComponent(cc.RigidBody).gravityScale = -0.5 + Math.random() * (-0.1 - (-0.5));
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
