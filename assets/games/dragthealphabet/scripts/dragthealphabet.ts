import { Util } from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragTheAlphabet extends cc.Component {

    @property(cc.Prefab)
    cakeBg: cc.Prefab = null;

    @property(cc.Prefab)
    cakeDrag: cc.Prefab = null;

    @property(cc.Prefab)
    flowerDrag: cc.Prefab = null;
 
    @property(cc.Node)
    layout: cc.Node = null;

    @property({ type: cc.AudioClip })
    pick: cc.AudioClip = null;

    theme: string;
    solution: string;
    choices: string;
    totalPieces: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        const [level, worksheet, problem, theme, solution, choices] = Config.i.data[0];
        this.theme = theme;
        this.choices = choices;
        this.solution = solution;
        this.totalPieces++;

        let bg = cc.instantiate(this["cakeBg"]);
        this.node.addChild(bg);

        this.layout.zIndex = 1;

        bg.getChildByName("drop").getChildByName("drop_collider").name = this.solution;
        this.createChoices();
    }

    createChoices() {
        let choices = [];
        choices.push(this.solution);
        this.choices.split(",").forEach(element => {
            choices.push(element);
        });

        Util.shuffle(choices);
        for (let i = 0; i < choices.length; i++) {
            let choice = cc.instantiate(this[this.theme + "Drag"]);
            choice.on('DragTheAlphabetOnTouch', () => {
                cc.audioEngine.playEffect(this.pick, false);
                this.onTouchAudio(choices[i]);
            });
            choice.on('DragTheAlphabetChoiceMatch', this.onMatch.bind(this))
            choice.on('DragTheAlphabetChoiceNoMatch', () => {
                this.node.emit("wrong");
            });
            choice.getChildByName("label").getComponent(cc.Label).string = choices[i];
            let temp = new cc.Node();
            temp.addChild(choice);
            temp.name = choices[i];
            this.layout.insertChild(temp, i)
            choice.name = choices[i];
        }
    }

    onMatch() {
        this.node.emit("correct");
        this.match();
    }

    onTouchAudio(file: string) {
        Util.loadsLetter(file.toLowerCase(), (clip) => {
            try {
                if (!!clip)
                    Util.play(clip, false);
            } catch (error) {
                console.log("Failed playing sound");
            }
        });
    }

    match() {
        if (--this.totalPieces <= 0) {
            this.node.emit("nextProblem");
        }
    }

    onDestroy() {
        cc.audioEngine.stopAllEffects();
    }
}
