import TenboxDrop from "./tenboxDrop";
import TenboxSub from "./tenboxSub";
import Config from "../../../common/scripts/lib/config";
import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import TenBoxChoiceDrag from "./tenboxChoiceDrag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tenbox extends cc.Component {
    @property(cc.Prefab)
    numberDrag: cc.Prefab = null

    @property(cc.Prefab)
    numberDrop: cc.Prefab = null

    @property(cc.Prefab)
    tenboxDrop: cc.Prefab = null

    @property(cc.Prefab)
    tenboxSub: cc.Prefab = null

    @property(cc.Node)
    numberDragLayout: cc.Node = null

    @property(cc.Node)
    problemLayout: cc.Node = null

    @property(cc.Node)
    boxLayout: cc.Node = null

    empty: number = 0

    @catchError()
    onLoad() {
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        this.node.on('missingNumberMatch', this.onMatch.bind(this))
        this.node.on('missingNumberNoMatch', () => {
            this.node.emit('wrong')
        })
        const [level, worksheet, problem, category, question, answerStr] = Config.getInstance().data[0]
        const answer = parseInt(answerStr)

        if (category == 'SUB') {
            const operands = question.split('-')
            this.addTenBoxes(true, parseInt(operands[0]), 2, 0)
            this.addTenBoxes(false, parseInt(operands[1]), 2, 1)
        } else {
            const operands = question.split('+')
            operands.forEach((val, index) => {
                this.addTenBoxes(true, parseInt(val), operands.length, index)
            })
        }

        for (let index = 0; index < 10; index++) {
            const card = cc.instantiate(this.numberDrag)
            card.name = index.toString()
            const dragComp = card.getComponent(TenBoxChoiceDrag)
            dragComp.missingNumber = this.node
            dragComp.label.string = index.toString()
            const tempNode = new cc.Node()
            tempNode.width = card.width
            tempNode.height = card.height
            tempNode.addChild(card)
            this.numberDragLayout.addChild(tempNode)
        }

        const label = this.problemLayout.getChildByName('label')
        if (label != null) {
            const labelComp = label.getComponent(cc.Label)
            labelComp.string = question + '='
        }
        if (answer > 9) {
            this.createDropBox(this.numberDrop, Math.floor(answer / 10).toString(), this.problemLayout)
            this.createDropBox(this.numberDrop, (answer % 10).toString(), this.problemLayout)
        } else {
            this.createDropBox(this.numberDrop, answer.toString(), this.problemLayout)
        }
        const firstDrag = this.numberDragLayout.children[answer % 10]
        const firstDrop = this.problemLayout.children[this.problemLayout.childrenCount - 1]
        Util.showHelp(firstDrag, firstDrop)
        Drag.letDrag = true
    }

    addTenBoxes(add: boolean, count: number, totalBoxes: number, boxNum: number) {
        if(count > 10) {
            const drop1 = this.createTenBox(add, 10, boxNum, totalBoxes)
            drop1.y = drop1.height / 2 + 10
            this.boxLayout.addChild(drop1)
            const drop2 = this.createTenBox(add, count - 10, boxNum, totalBoxes)
            drop2.y = - drop1.height / 2 - 10
            this.boxLayout.addChild(drop2)
        } else {
            this.boxLayout.addChild(this.createTenBox(add, count, boxNum, totalBoxes))
        }
    }

    private createTenBox(add: boolean, count: number, boxNum: number, totalBoxes: number) :cc.Node {
        const drop = cc.instantiate(add ? this.tenboxDrop : this.tenboxSub)
        const box = drop.getChildByName('layout')
        if(add) {
            const boxComp = box.getComponent(TenboxDrop)
            boxComp.count = count    
        } else {
            const boxComp = box.getComponent(TenboxSub)
            boxComp.count = count
        }
        drop.x = (1 / 2 + boxNum - totalBoxes / 2) * (drop.width + 20)
        return drop
    }

    private createDropBox(dropPrefab: cc.Prefab, digit: string, layout: cc.Node) {
        this.empty++
        const drop = cc.instantiate(dropPrefab)
        drop.name = digit
        layout.addChild(drop)
    }

    onMatch() {
        this.node.emit('correct')
        if (--this.empty <= 0) {
            this.node.emit('nextProblem')
        }
    }
}
