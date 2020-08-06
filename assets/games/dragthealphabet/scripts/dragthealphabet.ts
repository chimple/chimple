import { Util } from "../../../common/scripts/util";
import DragTheAlphabetChoice from "./dragthealphabet_choice";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DragTheAlphabet extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab)
    cakeBg: cc.Prefab = null;

    @property(cc.Prefab)
    cakeDrop: cc.Prefab = null;

    @property(cc.Prefab)
    cakeDrag: cc.Prefab = null;

    data: Array<any> = ["1", "1", "1", "cakeBg", "cakeDrop", "cakeDrag","q","a,d,f"];
    fieldArr;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       this.fieldArr = this.data;
       console.log("came",this.data,this.fieldArr[3]);

       let bg = cc.instantiate(this[this.fieldArr[3]]);
       this.node.addChild(bg);

       let drop = cc.instantiate(this[this.fieldArr[4]]);
       this.node.addChild(drop);
       console
       DragTheAlphabetChoice.dropArea = drop.getBoundingBox();


       this.createChoices();    
    }

    createChoices(){
        let correct = this.fieldArr[6];
        let choices=[];
        choices.push(correct);
        this.fieldArr[7].split(",").forEach(element => {
            choices.push(element);            
        });

        let start = -250;
        Util.shuffle(choices);
        for(let i=0;i<choices.length;i++){
            let choice = cc.instantiate(this[this.fieldArr[5]]);
            let choiceComp = choice.getComponent(DragTheAlphabetChoice);
            choice.getChildByName("label").getComponent(cc.Label).string = choices[i];
            if(choices[i]==correct){
                console.log("love"+choices[i]);
                choice.name="correct";
            }
            this.node.addChild(choice);
            choice.x = start + i*180;
            choiceComp.homePos= choice.position;
        }  

    }
    start () {

    }

    // update (dt) {}
}
