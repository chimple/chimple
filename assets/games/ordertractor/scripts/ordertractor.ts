import { Util } from "../../../common/scripts/util";
import NumberTrainDrag from "./numbertrainDrag";
import Config from "../../../common/scripts/lib/config";
import NumberTrainDrop from "./numbertrainDrop";
import Drag from "../../../common/scripts/drag";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OrderTractor extends cc.Component {
    @property(cc.Prefab)
    drag: cc.Prefab = null

    @property(cc.Prefab) 
    outerDrop: cc.Prefab = null

    @property(cc.Node)
    choices: cc.Node = null

    @property(cc.Node)
    train: cc.Node = null

    @property(cc.AudioClip)
    trainClip: cc.AudioClip = null

    @property(cc.AudioClip)
    metalClink:cc.AudioClip = null

    @property(cc.Node)
    friendPos: cc.Node = null

    friend: dragonBones.ArmatureDisplay = null

    empty: number = 0

    onLoad() {
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
            this.friendPos.addChild(friendNode)
            this.friend.playAnimation('face_eating', 1)
        })
        this.node.on('numbertrainMatch', this.onMatch.bind(this))
        this.node.on('numbertrainNoMatch', () => {
            this.node.emit('wrong')
            if (this.friend != null) this.friend.playAnimation('face_wrong', 1)
        })

        const [oldLevel, worksheet, oldProblem, level, reverseStr] = Config.getInstance().data[0];
        const reverse = reverseStr == 'true'
        const ordered: Array<number> = this.generateNumbers(parseInt(level))
        if (reverse) {
            ordered.reverse()
        }
        this.empty = ordered.length
        var firstDrag: cc.Node = null
        var firstDrop: cc.Node = null
        ordered.forEach((val: number, index: number) => {
            const bogey = cc.instantiate(this.outerDrop)
            const layout = bogey.getChildByName('layout')
            if (layout != null) {
                const drop = layout.getChildByName('drop')
                if (drop != null) {
                    drop.name = val.toString()
                    const dropComp = drop.getComponent(NumberTrainDrop)
                    dropComp.order = reverse ? ordered.length - index : index + 1
                    if (index == 0) {
                        firstDrop = drop
                    }
                }
            }
            const tempNode = new cc.Node()
            tempNode.width = bogey.width
            tempNode.height = bogey.height
            tempNode.addChild(bogey)
            this.train.addChild(tempNode)
            new cc.Tween().target(bogey)
                .set({ x: (index + 1) * 20 })
                .delay(2)
                .to(1, { x: 0 }, { progress: null, easing: 'sineIn' })
                .start()
        })
        Util.shuffle(ordered)
        ordered.forEach(((val) => {
            const drag = cc.instantiate(this.drag)
            drag.name = val.toString()
            const dragComp = drag.getComponent(NumberTrainDrag)
            dragComp.num.string = val.toString()
            dragComp.numbertrain = this.node
            const tempNode = new cc.Node()
            tempNode.width = drag.width
            tempNode.height = drag.height
            tempNode.addChild(drag)
            this.choices.addChild(tempNode)
            if (drag.name == firstDrop.name) {
                firstDrag = drag
            }
        }))
        const trainX = this.train.x
        new cc.Tween().target(this.train)
            .call(() => {
                Util.playSfx(this.trainClip);
            })
            .set({ x: trainX + cc.winSize.width })
            .to(3, { x: trainX }, { progress: null, easing: 'backOut' })
            .call(() => {
                Util.playSfx(this.metalClink);
              })
            .call(() => {
                
                Drag.letDrag = true
                Util.showHelp(firstDrag, firstDrop)
            })
            .start()
    }

    @catchError()
    onMatch() {
        this.node.emit('correct')
        if (this.friend != null) this.friend.playAnimation('face_happy', 1)
        if (--this.empty <= 0) {
            Drag.letDrag = false
            new cc.Tween().target(this.train)
                .delay(1)
                .call(() => {
                    Util.playSfx(this.trainClip);
                })
                .to(1, { x: this.train.x - cc.winSize.width }, { progress: null, easing: 'backIn' })
                .call(() => {
                    this.node.emit('nextProblem')
                })
                .start()
        }
    }

    generateNumbers(level: number): Array<number> {
        switch (level) {
            case 1:
                return [1, 2, 3, 4, 5]
            case 2:
                return [6, 7, 8, 9, 10]
            case 3:
                return this.generateIncrementals(2, 4)
            case 4:
                return [2, 4, 6, 8, 10]
            case 5:
                return this.generateRandoms(1, 10)
            case 6:
                return this.generateIncrementals(11, 16)
            case 7:
                return this.generateIncrementals(6, 16)
            case 8:
                return this.generateRandoms(1, 20)
            case 9:
                return this.generateIncrementals(10, 12, 2)
            case 10:
                return this.generateMultiples(3, 1, 20)
            case 11:
                return this.generateIncrementals(20, 46)
            case 12:
                return this.generateMultiples(5, 20, 50)
            case 13:
                return this.generateMultiples(3, 20, 50)
            case 14:
                return this.generateMultiples(10, 1, 100)
            case 15:
                return this.generateRandoms(1, 50)
            case 16:
                return this.generateIncrementals(60, 96)
            case 17:
                return this.generateMultiples(5, 1, 100)
            case 18:
                return this.generateRandoms(60, 100)
            default:
                return this.generateRandoms(1, 100)
        }
    }

    generateIncrementals(min: number, max: number, incr: number = 1) {
        const num = Math.floor(Math.random() * (max - min)) + min
        return [num, num + 1 * incr, num + 2 * incr, num + 3 * incr, num + 4 * incr]
    }

    generateMultiples(mul: number, min: number, max: number): Array<number> {
        const minBase = Math.ceil(min / mul)
        const maxBase = Math.floor(max / mul) - 4
        const base = Math.floor(Math.random() * (maxBase - minBase)) + minBase
        return [base * mul, (base + 1) * mul, (base + 2) * mul, (base + 3) * mul, (base + 4) * mul]
    }

    generateRandoms(min: number, max: number) {
        const arr: Array<number> = []
        while (arr.length < 5) {
            const num = Math.floor(Math.random() * (max - min)) + min
            if (arr.find((val) => {
                return val == num
            }) != num) {
                arr.push(num)
            }
        }
        return arr.sort((a: number, b: number) => {
            return a - b
        })
    }
}
