import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragTheAlphabet extends cc.Component {


    @property(cc.Prefab)
    cakeBg: cc.Prefab = null;

    @property(cc.Prefab)
    cakeDrop: cc.Prefab = null;

    @property(cc.Prefab)
    cakeDrag: cc.Prefab = null;

    @property(cc.Node)
    layout: cc.Node = null;

    @property({ type: cc.AudioClip })
    correct: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    wrong: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    pick: cc.AudioClip = null;

    data: string[] = ["1", "1", "1", "cakeBg", "cakeDrop", "cakeDrag", "q", "a,d,f"];
    solution: string;
    choices: string;
    dragUnit: string;
    totalPieces: number = 0;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        const [level, worksheet, problem, background, dropUnit, dragUnit, solution, choices] = this.data;
        this.choices = choices;
        this.solution = solution;
        this.dragUnit = dragUnit;
        this.totalPieces++;

        let bg = cc.instantiate(this[background]);
        this.node.addChild(bg);

        this.layout.zIndex = 1;

        let drop = cc.instantiate(this[dropUnit]);
        drop.getChildByName("drop").name = this.solution;
        this.node.addChild(drop);
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
            let choice = cc.instantiate(this[this.dragUnit]);
            choice.on('DragTheAlphabetOnTouch', () => {
                cc.audioEngine.playEffect(this.pick, false);
                this.onTouchAudio(choices[i]);
                choice.getComponent(cc.Animation).stop;
            });
            choice.on('DragTheAlphabetChoiceMatch', this.onMatch.bind(this))
            choice.on('DragTheAlphabetChoiceNoMatch', () => {
                cc.audioEngine.playEffect(this.wrong, false);
                this.node.emit("wrong");
                choice.getComponent(cc.Animation).play;
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
        cc.audioEngine.playEffect(this.correct, false);
    }

    onTouchAudio(file: string) {
        Util.loadGameSound(file, function (clip) {
            if (clip != null) {
                cc.audioEngine.play(clip, false, 1);
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
