import MissingNumberDrag from "./missingnumberdrag";
import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import Drag from "../../../common/scripts/drag";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SequenceBox extends cc.Component {
    @property(cc.Prefab)
    singleCard: cc.Prefab = null

    @property(cc.Prefab)
    singleDrop: cc.Prefab = null

    @property(cc.Prefab)
    longCard: cc.Prefab = null

    @property(cc.Prefab)
    longDrop: cc.Prefab = null

    @property(cc.Prefab)
    box: cc.Prefab = null

    @property(cc.Node)
    choices: cc.Node = null

    @property(cc.Node)
    boxes: cc.Node = null

    @property(cc.AudioClip)
    dropClip: cc.AudioClip = null

    answer: string = null
    answerBox: cc.Node = null
    empty: number = 0

    @catchError()
    onLoad() {
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        this.node.on('missingNumberMatch', this.onMatch.bind(this))
        this.node.on('missingNumberNoMatch', () => {
            this.node.emit('wrong')
        })

        const [level, worksheet, problem, q1, q2, q3, q4, suggest, answer] = Config.getInstance().data[0];
        var series: Array<string> = [q1, q2, q3, q4]
        var audioClips: Array<cc.AudioClip> = []
        this.answer = answer
        var delay = 0
        var firstDrop: cc.Node = null
        series.forEach((element, index) => {
            const newBox = cc.instantiate(this.box)
            if (element == '?') {
                const layout = newBox.getChildByName('layout')
                if (suggest == 'NA') {
                    this.answer.split('').forEach(digit => {
                        this.createDropBox(this.singleDrop, digit, layout)
                    })
                } else {
                    this.createDropBox(this.longDrop, this.answer, layout)
                }
                firstDrop = layout.children[layout.childrenCount - 1]
                this.answerBox = newBox
            } else {
                const label = newBox.getChildByName('label')
                const labelComp = label.getComponent(cc.Label)
                labelComp.string = element
            }
            this.boxes.addChild(newBox)
            if (element != '?' && parseInt(element) <= 100) {
                Util.loadNumericSound(element, (clip: cc.AudioClip) => {
                    audioClips[index] = clip
                })
            } else {
                audioClips[index] = null
            }
            delay += 0.5
            new cc.Tween().target(newBox)
                .set({ y: cc.winSize.height })
                .delay(delay)
                .to(0.5, { y: 0 }, { progress: null, easing: 'cubicIn' })
                .call(() => {
                    Util.playSfx(this.dropClip);
                })
                .delay(delay + 2)
                .call(() => {
                    if (audioClips[index] != null) {
                        Util.play(audioClips[index], false)
                    }
                    new cc.Tween().target(newBox)
                        .to(0.25, { scale: 1.1 }, { progress: null, easing: 'sineOut' })
                        .to(0.25, { scale: 1 }, { progress: null, easing: 'sineIn' })
                        .call(() => {
                            if (index + 1 == series.length) {
                                Util.showHelp(firstDrag, firstDrop)
                                Drag.letDrag = true
                            }
                        })
                        .start()
                })
                .start()
        })
        const suggestions: Array<string> = []
        if (suggest == 'NA') {
            for (let index = 0; index < 10; index++) {
                suggestions.push(index.toString())
            }
        } else {
            suggest.split(',').forEach(el => {
                suggestions.push(el.trim())
            })
        }
        var firstDrag: cc.Node = null
        suggestions.forEach(element => {
            const card = cc.instantiate(suggest == 'NA' ? this.singleCard : this.longCard)
            card.name = element
            const dragComp = card.getComponent(MissingNumberDrag)
            dragComp.missingNumber = this.node
            dragComp.label.string = element
            const tempNode = new cc.Node()
            tempNode.width = card.width
            tempNode.height = card.height
            tempNode.addChild(card)
            this.choices.addChild(tempNode)
            if (element == firstDrop.name) {
                firstDrag = card
            }
        })
    }

    private createDropBox(dropPrefab: cc.Prefab, digit: string, layout: cc.Node) {
        this.empty++;
        const drop = cc.instantiate(dropPrefab)
        drop.name = digit;
        layout.addChild(drop);
    }

    @catchError()
    onMatch() {
        this.node.emit('correct')
        if (--this.empty <= 0) {
            this.answerBox.getChildByName('layout').active = false
            const label = this.answerBox.getChildByName('label')
            const labelComp = label.getComponent(cc.Label)
            labelComp.string = this.answer
            const particle = this.answerBox.getChildByName('particlesystem')
            if (particle != null) {
                const particleSystem = particle.getComponent(cc.ParticleSystem)
                particleSystem.resetSystem()
                this.scheduleOnce(() => {
                    particleSystem.stopSystem()
                    Util.loadFriend((friendNode: cc.Node) => {
                        const characterNode = this.answerBox.getChildByName('character_node')
                        if (characterNode != null) {
                            characterNode.addChild(friendNode)
                            const db = friendNode.getComponent(dragonBones.ArmatureDisplay)
                            if (db != null) db.playAnimation('popup', 1)
                            const anim = this.answerBox.getComponent(cc.Animation)
                            anim.on('finished', () => {
                                this.node.emit('nextProblem')
                            })
                            anim.play()
                        }
                    })
                }, 3)
            }
        }
    }
}
