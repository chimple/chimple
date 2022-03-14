import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import Config, { Direction } from "../../../common/scripts/lib/config";
import Game from "../../../common/scripts/game";


const { ccclass, property } = cc._decorator;

const bgHeight = 432
const bgWidth = 802

export const enum TouchEvents {
    TOUCH_START = "touchstart",
    TOUCH_END = "touchend",
    TOUCH_MOVE = "touchmove",
    TOUCH_CANCEL = "touchCancel"
}

@ccclass
export default class PictureBoardcopy extends Game {
    @property(cc.Prefab)
    pictureDrag: cc.Prefab = null

    @property(cc.Prefab)
    pictureDrop: cc.Prefab = null

    @property(cc.Sprite)
    bg: cc.Sprite

    // @property(cc.Label)
    // label: cc.Label = null

    @property(cc.Node)
    label: cc.Node = null

    @property(cc.Mask)
    mask: cc.Mask = null

    @property(cc.Node)
    wallpaper: cc.Node = null

    @property(cc.Graphics)
    graphics: cc.Graphics = null

    @property(cc.BoxCollider)
    board: cc.BoxCollider = null

    numPieces: number = 0;
    text: string = null
    audio: cc.AudioClip = null
    currentTool: cc.Node = null

    onLoad() {
        console.log('PictureBoardCopy loaded');
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        const [level, worksheet, problem, name, bgImage, num, y1, sound] = config.data[0]
        console.log('level, worksheet, problem, name, bgImage, num, x1, y1, sound', level, worksheet, problem, name, bgImage, num, y1, sound)
        this.text = name
        this.numPieces = parseInt(num)

        this.node.on(TouchEvents.TOUCH_MOVE, this.onTouchMove, this);

        // this.node.on('touchmove', function (event) {
        //     console.log('onTouchMove called', this.bottomPaint)
        //     if (this.currentTool) {
        //         console.log('this.bottomPaint', this.bottomPaint)
        //         const from = this.label.convertToNodeSpaceAR(event.getPreviousLocation())
        //         const to = this.label.convertToNodeSpaceAR(event.getLocation())
        //         this.graphics.moveTo(from.x, from.y)
        //         this.graphics.lineTo(to.x, to.y)
        //         this.graphics.stroke()
        //     }

        // }, this.node);

        // this.node.on('touch', this.onTouchMove, this)

        Util.loadTexture(bgImage, (texture) => {
            if (texture != null) {
                this.bg.spriteFrame = new cc.SpriteFrame(texture)
                this.bg.node.position = new cc.Vec2(this.bg.node.x - this.bg.node.width / 2, this.bg.node.y - this.bg.node.height)
            }
        })

        Util.loadGameSound(sound, (audioClip) => {
            this.audio = audioClip
        })

        var firstDrag: cc.Node = null
        var firstDrop: cc.Node = null

        console.log('config.data[0] ', config.data[0])
        for (let index = 0; index < this.numPieces; index++) {
            const image = config.data[0][8 + index * 7];
            const x = config.data[0][9 + index * 7];
            const y = config.data[0][10 + index * 7];
            const x1 = config.data[0][11 + index * 7];
            const y1 = config.data[0][12 + index * 7];
            const isUnlock = config.data[0][13 + index * 7];
            const isFinished = config.data[0][14 + index * 7];

            console.log('isUnlock ', isUnlock, ' isFinished ', isFinished)

            const drag = cc.instantiate(this.pictureDrag)
            drag.name = index.toString()
            drag.position = new cc.Vec2(parseInt(x) / 3, parseInt(y) / 3)
            if (Config.i.direction === Direction.RTL)
                drag.getComponent(Drag).isReverseXNeeded = true;
            drag.on('pictureMatch', this.onMatch.bind(this))
            drag.on('pictureNoMatch', () => {
                this.node.emit('wrong')
            })
            this.bg.node.addChild(drag)
            //@ts-ignore
            Util.loadTexture(image, (texture) => {
                if (texture != null) {
                    const pictureNode = drag.children[1]
                    const spriteFrame = new cc.SpriteFrame(texture)
                    pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    const shadowNode = drag.children[0]
                    shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    shadowNode.active = false
                    drag.height = pictureNode.height
                    drag.width = pictureNode.width
                    console.log('cc.Vec2(parseInt(x1), parseInt(y1))', new cc.Vec2(parseInt(x1), parseInt(y1)));
                    drag.position = new cc.Vec2(parseInt(x1), parseInt(y1));
                    drag.getComponent(Drag).allowDrag = true
                    if (index + 1 == config.data.length) {
                        Drag.letDrag = true
                        Util.showHelp(firstDrag, firstDrop)
                    }
                    // new cc.Tween().target(drag)
                    //     .delay(0)
                    //     .call(() => {
                    //         shadowNode.active = false
                    //     })
                    //     .to(0.5, { position: new cc.Vec2(parseInt(x1), parseInt(y1)) }, { progress: null, easing: 'backOut' })
                    //     .call(() => {
                    //         drag.getComponent(Drag).allowDrag = true
                    //         if (index + 1 == config.data.length) {
                    //             Drag.letDrag = true
                    //             Util.showHelp(firstDrag, firstDrop)
                    //         }
                    //     })
                    //     .start()
                    const drop = cc.instantiate(this.pictureDrop)
                    drop.name = index.toString()
                    drop.position = new cc.Vec2(parseInt(x) / 3, parseInt(y) / 3)
                    drop.height = drag.height
                    drop.width = drag.width
                    this.bg.node.addChild(drop)
                    if (index == 1) {
                        firstDrag = drag
                        firstDrop = drop
                    }
                }
            })

        }
        // const truckX = this.truck.x
        // if (Config.i.direction === Direction.RTL) {
        //     // this.node.getChildByName("truck").scaleX = -1;
        //     this.truck.scaleX = -1;
        //     new cc.Tween().target(this.truck)
        //         .set({ x: -cc.winSize.width })
        //         .call(()=>{Util.playSfx(this.truckInAudio)})
        //         .to(3, { x: -truckX }, { progress: null, easing: 'quadOut' })
        //         .call(() => {
        //             const anim = this.truck.getComponent(cc.Animation)
        //             anim.stop()
        //         })
        //         .start()
        // } else {
        //     new cc.Tween().target(this.truck)
        //         .set({ x: cc.winSize.width })
        //         .call(()=>{Util.playSfx(this.truckInAudio)})
        //         .to(3, { x: truckX }, { progress: null, easing: 'quadOut' })
        //         .call(() => {
        //             const anim = this.truck.getComponent(cc.Animation)
        //             anim.stop()
        //         })
        //         .start()
        // }

    }

    onMatch() {
        this.node.emit('correct')
        if (--this.numPieces <= 0) {
            Drag.letDrag = false
            this.scheduleOnce(() => {
                // this.label.string = this.text
                if (Config.i.direction === Direction.RTL)
                    // this.label.node.scaleX = -1;
                    Util.speakClip(this.audio, () => {
                        this.node.emit('nextProblem')
                        console.log('nextProblem emited');
                        // const anim = this.truck.getComponent(cc.Animation)
                        // anim.play()
                        // if (Config.i.direction === Direction.RTL) {
                        //     new cc.Tween().target(this.truck)
                        //     .call(()=>{Util.playSfx(this.truckOutAudio)})
                        //         .to(3.0, { x: cc.winSize.width * 2 }, { progress: null, easing: 'quadOut' })
                        //         .call(() => {
                        //             this.node.emit('nextProblem')
                        //         })
                        //         .start()
                        // }
                        // else {
                        //     new cc.Tween().target(this.truck)
                        //     .call(()=>{Util.playSfx(this.truckOutAudio)})
                        //         .to(3.0, { x: -cc.winSize.width * 2 }, { progress: null, easing: 'quadOut' })
                        //         .call(() => {
                        //             this.node.emit('nextProblem')
                        //         })
                        //         .start()
                        // }
                    })
            }, 1)
        }
    }

    onTouchMove(touch: cc.Touch) {
        console.log('onTouchMove', this.currentTool, '  ', this.currentTool === this.bottomPaint)
        if (this.currentTool == this.bottomPaint) {
            console.log('this.bottomPaint', this.bottomPaint)
            const from = this.label.convertToNodeSpaceAR(touch.getPreviousLocation())
            const to = this.label.convertToNodeSpaceAR(touch.getLocation())
            console.log("from", from, 'to', to)
            this.graphics.moveTo(from.x, from.y)
            this.graphics.lineTo(to.x, to.y)
            this.graphics.stroke()
        }
    }

    onToolClick(event: cc.Event, customEventData: string) {
        let newTool: cc.Node = this[customEventData]
        console.log("customEventData", this[customEventData])
        if (this.currentTool == newTool) {
            this.currentTool.active = false
            this.currentTool = null
            newTool = null
            Drag.letDrag = true
        }
        if (newTool != null) {
            this.currentTool = newTool
            console.log("new currentTool", this.currentTool)
            newTool.active = true
            const y = newTool.y
            new cc.Tween().target(newTool)
                .set({ y: -cc.winSize.height / 2 })
                .to(0.25, { y: y }, { progress: null, easing: 'elasticOut' })
                .start()
            if (newTool == this.bottomPaint) {
                Drag.letDrag = false
            } else {
                Drag.letDrag = true
            }
        }
    }

    onPaintClick(event: cc.Event, customEventData: string) {
        this.graphics.strokeColor = new cc.Color().fromHEX(customEventData)
        console.log("onPaintClick", this.graphics.strokeColor)
        // this.currentTool = 'bottomPaint';
    }

}
