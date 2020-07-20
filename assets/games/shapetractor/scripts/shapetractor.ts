import PatternTrainDrag from "./patterntrainDrag"
import Config from "../../../common/scripts/lib/config";
import Drag from "../../../common/scripts/drag";
import catchError from "../../../common/scripts/lib/error-handler";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator

const patterns = [
    'dummy',
    'circle',
    'hexagon',
    'octagon',
    'oval',
    'parallelogram',
    'pentagon',
    'rectangle',
    'rhombus',
    'square',
    'star',
    'trapezoid',
    'triangle'
]

const threeCarBogeyWidth = 444

@ccclass
export default class ShapeTractor extends cc.Component {
    @property(cc.Prefab)
    drag: cc.Prefab = null

    @property(cc.Prefab)
    drop: cc.Prefab = null

    @property(cc.Prefab)
    trainBogey: cc.Prefab = null

    @property(cc.SpriteFrame)
    threeCarBogey: cc.SpriteFrame = null

    @property(cc.Node)
    choices: cc.Node = null

    @property(cc.Node)
    train: cc.Node = null

    @property(cc.AudioClip)
    trainClip: cc.AudioClip = null

    @property(cc.Node)
    friendPos: cc.Node = null

    @property(cc.SpriteFrame)
    circle: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    hexagon: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    octagon: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    oval: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    parallelogram: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    pentagon: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    rectangle: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    rhombus: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    square: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    star: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    trapezoid: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    triangle: cc.SpriteFrame = null

    friend: dragonBones.ArmatureDisplay = null
    empty: number = 0

    firstDrag: cc.Node = null
    firstDrop: cc.Node = null

    @catchError()
    onLoad() {
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
            this.friendPos.addChild(friendNode)
            this.friend.playAnimation('face_eating', 1)
        })
        this.node.on('patterntrainMatch', this.onMatch.bind(this))
        this.node.on('patterntrainNoMatch', () => {
            this.node.emit('wrong')
            if(this.friend != null) this.friend.playAnimation('face_wrong', 1)
        })

        const [levelStr, worksheet, problemStr] = Config.getInstance().data[0]
        const level = parseInt(levelStr)
        const problem = parseInt(problemStr)
        const seq = this.generatePatterns(level, problem)
        const pattern = level >= 4 ? Math.floor(Math.random() * (patterns.length - 1)) + 1 : 0

        seq.forEach((val, index) => {
            this.addBogey(val, index, pattern)
        })

        var selections = level >= 4 ? [1, 2, 3] : seq[0]
        selections = selections.filter((val, index) => selections.indexOf(val) === index)
        while (selections.length < seq[0].length) {
            const rand = Math.floor(Math.random() * (patterns.length - 1)) + 1
            if (selections.indexOf(rand) == -1) {
                selections.push(rand)
            }
        }
        Util.shuffle(selections)
        selections.forEach(((val) => {
            const drag = cc.instantiate(this.drag)
            drag.name = val.toString()
            const dragComp = drag.getComponent(PatternTrainDrag)
            dragComp.pattern.spriteFrame = this[patterns[pattern > 0 ? pattern : val]]
            if (pattern > 0) {
                dragComp.pattern.node.scale = 1 / val
            }
            dragComp.patterntrain = this.node
            const tempNode = new cc.Node()
            tempNode.width = drag.width
            tempNode.height = drag.height
            tempNode.addChild(drag)
            this.choices.addChild(tempNode)
            if(drag.name == this.firstDrop.name && this.firstDrag == null) {
                this.firstDrag = drag
            }
        }))
        const trainX = this.train.x
        new cc.Tween().target(this.train)
            .set({ x: trainX + cc.winSize.width })
            .to(3, { x: trainX }, { progress: null, easing: 'backOut' })
            .call(() => {
                Drag.letDrag = true
                Util.showHelp(this.firstDrag, this.firstDrop)
            })
            .start()
    }

    private addBogey(first: number[], index: number, pattern: number) {
        const bogey = cc.instantiate(this.trainBogey)
        const cargo = bogey.getChildByName('cargo')
        if(first.length == 3) {
            const car = bogey.getChildByName('car')
            if(car != null) {
                const carComp = car.getComponent(cc.Sprite)
                carComp.spriteFrame = this.threeCarBogey
                car.width = threeCarBogeyWidth
                bogey.width = threeCarBogeyWidth
            }
        }
        if (cargo != null) {
            first.forEach((val: number) => {
                if (val > 0) {
                    const drag = cc.instantiate(this.drag)
                    const dragComp = drag.getComponent(PatternTrainDrag)
                    dragComp.allowDrag = false
                    dragComp.pattern.spriteFrame = this[patterns[pattern > 0 ? pattern : val]]
                    if (pattern > 0) {
                        dragComp.pattern.node.scale = 1 / val
                    }
                    cargo.addChild(drag)
                } else {
                    const drop = cc.instantiate(this.drop)
                    if (drop != null) {
                        drop.name = (-val).toString()
                    }
                    cargo.addChild(drop)
                    if(this.firstDrop == null) {
                        this.firstDrop = drop
                    }
                }
            })
        }
        this.train.addChild(bogey)
        new cc.Tween().target(bogey)
            .set({ x: (index + 1) * 40 })
            .delay(2)
            .to(1, { x: 0 }, { progress: null, easing: 'sineIn' })
            .start()
    }

    @catchError()
    onMatch() {
        this.node.emit('correct')
        if(this.friend != null) this.friend.playAnimation('face_happy', 1)
        if (--this.empty <= 0) {
            Drag.letDrag = false
            new cc.Tween().target(this.train)
                .delay(1)
                .to(1, { x: this.train.x - cc.winSize.width }, { progress: null, easing: 'backIn' })
                .call(() => {
                    this.node.emit('nextProblem')
                })
                .start()
        }
    }

    generatePatterns(level: number, iteration: number): Array<Array<number>> {
        switch (level) {
            case 1:
                this.empty = 1
                if (iteration == 1) {
                    const rand = Math.floor(Math.random() * (patterns.length - 1)) + 1
                    return this.generateSequence(2, 2, rand, rand + 1)
                } else {
                    return this.generateSequence(2, 2, 1, patterns.length)
                }
            case 2:
                this.empty = 1
                return this.generateSequence(3, 2, 1, patterns.length)
            case 3:
                this.empty = 2
                return this.generateSequence(3, 2, 1, patterns.length)
            case 4:
                this.empty = 2
                return this.generateSequence(2, 3, 1, 4)
            case 5:
                this.empty = 3
                return this.generateSequence(3, 2, 1, 4)
        }
    }

    generateSequence(numCargo: number, numBogey: number, min: number, max: number): Array<Array<number>> {
        var numEmpty = this.empty
        var seq: Array<Array<number>> = []
        const pattern: Array<number> = []
        for (let index = 0; index < numCargo; index++) {
            pattern.push(Math.floor(Math.random() * (max - min)) + min)
        }
        seq.push(pattern)
        for (let index = 0; index < numBogey - 1; index++) {
            seq.push([...pattern])
        }
        const lastBogey = seq[seq.length - 1]
        while (numEmpty > 0) {
            const index = Math.floor(Math.random() * numCargo)
            if (lastBogey[index] > 0) {
                lastBogey[index] *= -1
                numEmpty--
            }
        }
        return seq
    }
}
