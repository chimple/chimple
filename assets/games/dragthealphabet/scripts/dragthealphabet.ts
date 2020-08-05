import { Util } from "../../../common/scripts/util";
import DragTheAlphabetChoice from "./dragthealphabet_choice";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DragTheAlphabet extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab)
    cakeToppingBg: cc.Prefab = null;

    @property(cc.Prefab)
    cakeToppingDrop: cc.Prefab = null;

    @property(cc.Prefab)
    cakeToppingDrag: cc.Prefab = null;

    data: Array<any> = ["1","1","1","a",["w","e","r"],"sound1.mp3","sound2.mp3"];
    fieldArr;
 

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       this.fieldArr = this.data;
       console.log("came",this.data);

       let bg = cc.instantiate(this.cakeToppingBg);
       this.node.addChild(bg);

       let drop = cc.instantiate(this.cakeToppingDrop);
       this.node.addChild(drop);
       drop.y-=100;

       this.createChoices();    

    }

    createChoices(){
        let correct = this.fieldArr[3];
        let choices=[];
        choices.push(correct);
        this.fieldArr[4].forEach(element => {
            choices.push(element);
        });
        let start = -300;
        Util.shuffle(choices);
        for(let i=0;i<choices.length;i++){
            let choice = cc.instantiate(this.cakeToppingDrag);
            let choiceComp = choice.getComponent(DragTheAlphabetChoice);
            choice.getChildByName("label").getComponent(cc.Label).string = choices[i];
            this.node.addChild(choice);
            choice.x = start + i*180;
            if(choice[i]==correct){
                choice.name="correct";
            }
        }  

    }
    start () {

    }

    // update (dt) {}
}
