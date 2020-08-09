import { Util } from "../../../common/scripts/util";
import { LAYOUT } from "../../blender/scripts/blender";
import DragTheAlphabetChoice from "./dragthealphabet_choice";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragTheAlphabet extends cc.Component {


    @property(cc.Prefab)
    cakeBg: cc.Prefab = null;

    @property(cc.Prefab)
    cakeDrop: cc.Prefab = null;

    @property(cc.Prefab)
    cakeDrag: cc.Prefab = null;

    data: string[] = ["1", "1", "1", "cakeBg", "cakeDrop", "cakeDrag", "q", "a,d,f"];
    solution: string;
    choices: string;
    dragUnit: string;
    layout: cc.Node;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        const [level, worksheet, problem, background, dropUnit, dragUnit, solution, choices] = this.data;
        this.choices = choices;
        this.solution = solution;
        this.dragUnit = dragUnit;

        let bg = cc.instantiate(this[background]);
        this.node.addChild(bg);

        this.layout = new cc.Node();
        let layoutComp = this.layout.addComponent(cc.Layout);
        layoutComp.type= cc.Layout.Type.HORIZONTAL;
        this.layout.position = new cc.Vec3(0,100,0);
        layoutComp.updateLayout();

        this.node.addChild(this.layout);

        let drop = cc.instantiate(this[dropUnit]);
        drop.name = this.solution;
        this.node.addChild(drop);
        this.createChoices();
    }

    createChoices() {
        let choices = [];
        choices.push(this.solution);
        this.choices.split(",").forEach(element => {
            choices.push(element);
        });

        let start = -250;
        Util.shuffle(choices);
        for (let i = 0; i < choices.length; i++) {
            let choice = cc.instantiate(this[this.dragUnit]);
            choice.on('DragTheAlphabetChoiceMatch', this.onMatch.bind(this))
            choice.on('DragTheAlphabetChoiceNoMatch', () => this.node.emit("wrong"))
            choice.getChildByName("label").getComponent(cc.Label).string = choices[i];
            choice.x = start + i * 180;
            let temp =  new cc.Node();
            temp.addChild(choice);
            temp.name = choices[i];
            temp.zIndex=1;
            this.layout.addChild(temp);
            choice.name = choices[i];
         //   this.node.addChild(choice);
        }
    }

    onMatch() {
        console.log('nik matched ')
        this.node.emit("correct");
    }
}
