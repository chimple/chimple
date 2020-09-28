import Config from '../../../common/scripts/lib/config';
import WhatIsThisChoice from './whatisthisChoice';
import catchError from '../../../common/scripts/lib/error-handler';
import { Util } from '../../../common/scripts/util';
import Game from '../../../common/scripts/game';
const { ccclass, property } = cc._decorator;

export enum PictureMeaningType {
    Sentence,
    Picture
}

export class PictureMeaningData {
    index: number
    type: PictureMeaningType
    text: string
    pic: string
    sound: string

    constructor(index: number, type: PictureMeaningType, text: string, pic: string, sound: string) {
        this.index = index
        this.type = type
        this.text = text
        this.pic = pic
        this.sound = sound
    }
}

@ccclass
export default class PictureMeaning extends Game {
    @property(cc.Node)
    choiceLayout: cc.Node = null;

    @property(cc.Node)
    answerNode: cc.Node = null;

    @property(cc.Prefab)
    imageAnswerButtonPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    imageChoiceButtonPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    textAnswerButtonPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    textChoiceButtonPrefab: cc.Prefab = null;

    @property(cc.Animation)
    trafficLight: cc.Animation = null

    @property(cc.Node)
    fullLayout: cc.Node = null;

    type: PictureMeaningType

    @catchError()
    onLoad() {
        const [level, worksheet, problem, mode, answer, answerPic, answerSound, wrongAnswer1, wrongAnswer1Pic, wrongAnswer1Sound, wrongAnswer2, wrongAnswer2Pic, wrongAnswer2Sound] = Config.getInstance().data[0]
        this.type = mode == 'S' ? PictureMeaningType.Sentence : PictureMeaningType.Picture
        var choiceNodes = []
        const correctChoiceNode = this.setupNode(0, this.type, answer, answerPic, answerSound)
        choiceNodes.push(correctChoiceNode)
        choiceNodes.push(this.setupNode(1, this.type, wrongAnswer1, wrongAnswer1Pic, wrongAnswer1Sound))
        choiceNodes.push(this.setupNode(2, this.type, wrongAnswer2, wrongAnswer2Pic, wrongAnswer2Sound))
        choiceNodes = Util.shuffleByMapSortMap(choiceNodes)
        choiceNodes.forEach(choiceNode => {
            this.choiceLayout.addChild(choiceNode)
        })
        const layoutComp = this.choiceLayout.getComponent(cc.Layout)
        if (layoutComp != null) {
            layoutComp.type = this.type == PictureMeaningType.Sentence ? cc.Layout.Type.HORIZONTAL : cc.Layout.Type.VERTICAL
        }
        Util.showHelp(correctChoiceNode, correctChoiceNode)
    }

    private setupNode(index: number, type: PictureMeaningType, text: string, pic: string, sound: string): cc.Node {
        const answerData = new PictureMeaningData(index, type, text, pic, sound)
        const choiceData = new PictureMeaningData(index, type == PictureMeaningType.Sentence ? PictureMeaningType.Picture : PictureMeaningType.Sentence, text, pic, sound)

        const answerNode = this.createAnswer(answerData)
        this.answerNode.addChild(answerNode)
        if (index == 0) {
            this.answerNode.height = answerNode.height
            this.answerNode.width = answerNode.width
        } else {
            answerNode.y = cc.winSize.height
            answerNode.zIndex = 1
        }
        const choiceNode = this.createChoice(choiceData, answerNode)
        choiceNode.on('whatisthisCorrect', this.onMatch.bind(this))
        choiceNode.on('whatisthisWrong', this.onNoMatch.bind(this))
        return choiceNode
    }

    private onNoMatch() {
        this.node.emit('wrong')
        this.trafficLight.play('red_signal')
    }

    private onMatch() {
        this.node.emit('correct')
        this.trafficLight.play('green_signal')
        // const fullLayoutY = this.fullLayout.y
        this.choiceLayout.children.forEach(val => {
            const comp = val.getComponent(WhatIsThisChoice)
            if (comp != null) {
                if (comp.data.index != 0) {
                    new cc.Tween().target(val)
                        .delay(0.5)
                        .by(0.5, { x: this.type == PictureMeaningType.Picture ? -cc.winSize.width : 0, y: this.type == PictureMeaningType.Sentence ? -cc.winSize.height : 0 }, { progress: null, easing: 'quadOut' })
                        // .delay(3)
                        // .call(() => {
                        //     val.removeFromParent()
                        // })
                        .start()
                }
            }
        })
        new cc.Tween().target(this.friendPos)
            .delay(4)
            .call(() => {
                // this.fullLayout.y += 50
                this.fullLayout.getComponent(cc.Layout).spacingY = 150
                // this.answerNode.height += 100
                // this.choiceLayout.getComponent(cc.Layout).paddingTop = 100
                if (this.friend != null)
                    this.friend.playAnimation('skating', 1)
            })
            .to(2, { x: cc.winSize.width }, null)
            .call(() => {
                this.node.emit('nextProblem')
            })
            .start()
    }

    private createAnswer(data: PictureMeaningData): cc.Node {
        const answerNode = cc.instantiate(data.type == PictureMeaningType.Sentence ? this.textAnswerButtonPrefab : this.imageAnswerButtonPrefab);
        if (data.type == PictureMeaningType.Picture) {
            const button = answerNode.getComponent(cc.Button)
            button.interactable = false
        }
        const answerComp = answerNode.getComponent(WhatIsThisChoice)
        if (answerComp != null) {
            answerComp.data = data
        }
        return answerNode
    }

    private createChoice(data: PictureMeaningData, answerNode: cc.Node): cc.Node {
        const choiceNode = cc.instantiate(data.type == PictureMeaningType.Sentence ? this.textChoiceButtonPrefab : this.imageChoiceButtonPrefab);
        choiceNode.name = data.type == PictureMeaningType.Sentence ? data.text : data.pic
        const choiceComp = choiceNode.getComponent(WhatIsThisChoice)
        if (choiceComp != null) {
            choiceComp.data = data
            choiceComp.answerNode = answerNode
        }
        return choiceNode
    }
}
