import AlphaDrag from "./alphaDrag";
import Config,{Direction} from "../../../common/scripts/lib/config";
import NumberDisplay from "./numberDisplay";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import Drag from "../../../common/scripts/drag";

const { ccclass, property } = cc._decorator;

const colors: Array<string> = [
    '#5BC0EB',
    '#FDE74C',
    '#9BC53D',
    '#55934',
    '#A7921',
    '#540D6E',
    '#EE4266',
    '#FFD23F',
    '#3BCEAC',
    '#0EAD69'
]

enum PuzzleType {
    Alpha,
    DropStickDragAlpha,
    DropAlphaDragStick
}

@ccclass
export default class Board extends cc.Component {
    @property(cc.Node)
    dropLayout: cc.Node = null

    @property(cc.Prefab)
    alphaDrag: cc.Prefab = null

    @property(cc.Prefab)
    alphaDrop: cc.Prefab = null

    @property(cc.Prefab)
    imagePuzzleDrag: cc.Prefab

    @property(cc.Prefab)
    imagePuzzleDrop: cc.Prefab

    @property(cc.Prefab)
    numberDisplay: cc.Prefab

    @property(cc.Node)
    pos0: cc.Node = null

    @property(cc.Node)
    pos1: cc.Node = null

    @property(cc.Node)
    pos2: cc.Node = null

    @property(cc.Node)
    truck: cc.Node = null

    @property(cc.Node)
    friendPos: cc.Node = null

    friend: dragonBones.ArmatureDisplay = null
    letters: Array<string> = null
    positions: Array<cc.Node> = null
    drags: Array<cc.Node> = []
    currentIndex: number = 0
    dragPositions = {}
    fontSize: number = 0
    lineHeight: number = 0
    type: PuzzleType = null
    xpos:number
    // xposition: number
    // truckX:number

    @catchError()
    onLoad() {
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
            this.friendPos.addChild(friendNode)
            this.friend.playAnimation('laugh', 1)
        })
         const truckX = this.truck.x
        // this.truck.x = cc.winSize.width
        if(Config.i.direction == Direction.RTL){
            this.truck.scaleX = -1;
            this.xpos = -this.truck.x ;
            this.truck.x = -cc.winSize.width;
            this.pos0.x = -this.pos0.x;
            this.pos1.x = -this.pos1.x;
            this.pos2.x = -this.pos2.x;
        } else {
           this.xpos= this.truck.x
           this.truck.x = cc.winSize.width
        } 
        this.positions = [this.pos0, this.pos1, this.pos2]
        this.dropLayout.removeAllChildren(); //temporary while styling
        const data = config.data
        this.letters = data[0][3].split(',')
        const layout = this.dropLayout.getComponent(cc.Layout)
        layout.paddingTop = parseInt(data[0][5])
        layout.paddingBottom = parseInt(data[0][6])
        layout.spacingX = parseInt(data[0][7])
        layout.spacingY = parseInt(data[0][8])
        this.fontSize = parseInt(data[0][9])
        this.lineHeight = parseInt(data[0][10])

        if (data[0][4] == 'Alpha') {
            this.type = PuzzleType.Alpha
            this.letters.forEach(element => {
                const drop = cc.instantiate(this.alphaDrop)
                drop.name = element
                if(Config.i.direction == Direction.RTL){drop.scaleX =-1}
                const dropLabel = drop.getComponent(cc.Label)
                dropLabel.string = element
                dropLabel.fontSize = this.fontSize
                dropLabel.lineHeight = this.lineHeight
                this.dropLayout.addChild(drop)
            })
        } else if (data[0][4] == 'DropStickDragAlpha') {
            this.type = PuzzleType.DropStickDragAlpha
            this.letters.forEach(element => {
                const drop = cc.instantiate(this.imagePuzzleDrop)
                drop.name = element
                if(Config.i.direction == Direction.RTL){drop.scaleX = -1}
                const numberDisplay = cc.instantiate(this.numberDisplay)
                const numberDisplayComp = numberDisplay.getComponent(NumberDisplay)
                numberDisplayComp.num = parseInt(element)
                numberDisplayComp.type = 'Stick'
                drop.getChildByName('imageglass_alphapuzzle').addChild(numberDisplay)
                this.dropLayout.addChild(drop)
            })
        } else if (data[0][4] == 'DropAlphaDragStick') {
            this.type = PuzzleType.DropAlphaDragStick
            this.letters.forEach(element => {
                const drop = cc.instantiate(this.imagePuzzleDrop)
                drop.name = element
                if(Config.i.direction == Direction.RTL){drop.scaleX = -1}
                const numberDisplay = cc.instantiate(this.numberDisplay)
                numberDisplay.color = new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)])
                const comp = numberDisplay.getComponent(NumberDisplay)
                comp.type = 'Alpha'
                comp.num = parseInt(element)
                comp.fontSize = this.fontSize
                comp.lineHeight = this.lineHeight
                drop.getChildByName('imageglass_alphapuzzle').addChild(numberDisplay)
                this.dropLayout.addChild(drop)
            })
        }

        if (data[0][11] == 'y') {
            this.letters = Util.shuffle(this.letters)
        }
        new cc.Tween().target(this.truck)
            .to(1.5, { x: (this.truck.x + this.xpos) / 2 }, { progress: null, easing: 'quadOut' })
            .delay(0.5)
            .to(1.5, { x: this.xpos }, { progress: null, easing: 'quadIn' })
            .call(() => {
                const anim = this.truck.getComponent(cc.Animation)
                anim.stop()
                this.createDrag(0, 0)
                this.createDrag(1, 1)
                this.createDrag(2, 2)
                this.scheduleOnce(() => {
                    Drag.letDrag = true
                }, 1)
            })
            .start()

    }

    @catchError()
    onMatch(drag: AlphaDrag) {
        this.node.emit('correct')
        if(this.friend != null) this.friend.playAnimation('happy', 1)
        if (this.drags.length == 1) {
            const anim = this.truck.getComponent(cc.Animation)
            anim.play()
            new cc.Tween().target(this.truck)
                .delay(1)
                .to(3.0, { x: -cc.winSize.width * 2 }, { progress: null, easing: 'quadOut' })
                .call(() => {
                    this.node.emit('nextProblem')
                })
                .start()
        } else {
            for (let i = drag.pos; i < this.drags.length - 1; i++) {
                this.drags[i] = this.drags[i + 1]
                new cc.Tween().target(this.drags[i])
                    .to(0.5, { position: this.positions[i].position }, { progress: null, easing: 'backOut' })
                    .start()
                this.drags[i].position = this.positions[i].position
                const dragChild = this.drags[i].children[0]
                const dragComp = dragChild.getComponent(AlphaDrag)
                dragComp.pos = i
            }
            if (++this.currentIndex < this.letters.length) {
                this.createDrag(this.currentIndex, this.drags.length - 1)
            } else {
                this.drags.splice(this.drags.length - 1, 1)
            }
        }
    }

    @catchError()
    createDrag(index: number, pos: number) {
        var drag: cc.Node = null
        if (this.type == PuzzleType.Alpha) {
            drag = this.createAlphaDrag(index)
        } else if (this.type == PuzzleType.DropStickDragAlpha) {
            drag = this.createImageAlphaDrag(index)
        } else if (this.type == PuzzleType.DropAlphaDragStick) {
            drag = this.createImageObjectDrag(index)
        }
        drag.name = this.letters[index]
        drag.on('alphaMatch', this.onMatch.bind(this))
        drag.on('alphaNoMatch', () => {
            this.node.emit('wrong')
            if(this.friend != null) this.friend.playAnimation('sad', 1)
        })
        const dragComp = drag.getComponent(AlphaDrag)
        dragComp.pos = pos
        const tempNode = new cc.Node()
        tempNode.addChild(drag)
        tempNode.position = this.positions[pos].position
        this.node.addChild(tempNode)
        this.drags[pos] = tempNode
        this.currentIndex = index
        new cc.Tween().target(tempNode)
            .set({ position: new cc.Vec2(this.positions[pos].position.x, -cc.winSize.height) })
            .to(0.5, { position: this.positions[pos].position }, { progress: null, easing: 'backOut' })
            .call(() => {
                if (index == 0) {
                    Util.showHelp(drag, this.dropLayout.getChildByName(drag.name))
                }
            })
            .start()
    }

    createAlphaDrag(index: number): cc.Node {
        const drag = cc.instantiate(this.alphaDrag)
        drag.color = new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)])
        const dragLabel = drag.getComponent(cc.Label)
        dragLabel.string = this.letters[index]
        dragLabel.fontSize = this.fontSize
        dragLabel.lineHeight = this.lineHeight
        return drag
    }

    createImageAlphaDrag(index: number): cc.Node {
        const drag = cc.instantiate(this.imagePuzzleDrag)
        const display = cc.instantiate(this.numberDisplay)
        display.color = new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)])
        const comp = display.getComponent(NumberDisplay)
        comp.type = 'Alpha'
        comp.num = parseInt(this.letters[index])
        comp.fontSize = this.fontSize
        comp.lineHeight = this.lineHeight
        drag.addChild(display)
        return drag
    }

    createImageObjectDrag(index: number): cc.Node {
        const drag = cc.instantiate(this.imagePuzzleDrag)
        const display = cc.instantiate(this.numberDisplay)
        const comp = display.getComponent(NumberDisplay)
        comp.type = 'Object'
        comp.num = parseInt(this.letters[index])
        drag.addChild(display)
        return drag
    }

}
