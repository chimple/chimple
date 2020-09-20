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
    flowerBg: cc.Prefab = null;

    @property(cc.Prefab)
    flowerDrag: cc.Prefab = null;

    @property(cc.Prefab)
    sandcastleBg: cc.Prefab = null;

    @property(cc.Prefab)
    sandcastleDrag: cc.Prefab = null;

    @property(cc.Node)
    layout: cc.Node = null;

    @property({ type: cc.AudioClip })
    pick: cc.AudioClip = null;

    @property(cc.Node)
    friendNode: cc.Node = null

    friend: dragonBones.ArmatureDisplay = null
    theme: string;
    solution: string;
    choices: string;
    totalPieces: number = 0;
    firstDrag: cc.Node = null;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        const [level, worksheet, problem, theme, solution, choices] = Config.i.data[0];
        this.theme = theme;
        this.choices = choices;
        this.solution = solution;
        this.totalPieces++;

        let bg = cc.instantiate(this[theme + "Bg"]);
        this.node.addChild(bg);
        this.layout.zIndex = 1;

        bg.getChildByName("drop").getChildByName("drop_collider").name = this.solution;
        this.createChoices();

        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay);
            this.friendNode.addChild(friendNode)
            this.friendNode.zIndex = 1;
            let pos = -cc.winSize.width / 2 + 200;
            this.friendNode.x = pos - 300;
            new cc.Tween()
                .target(this.friendNode)
                .call(() => {
                    this.friend.playAnimation("jumping2", 1)
                })
                .to(2, { x: pos }, { progress: null, easing: "sineOut" })
                .call(() => {
                    this.onTouchAudio(this.solution);
                    this.friend.playAnimation("popup", 1);
                })
                .start();
            this.friendNode.on('touchstart', () => {
                this.onTouchAudio(this.solution);
                this.friend.playAnimation("popup", 1);
            });
        })
        Util.showHelp(this.firstDrag, bg.getChildByName("drop").getChildByName("drop_collider"));

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
            this.firstDrag = choice.name == this.solution ? temp : null;
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
