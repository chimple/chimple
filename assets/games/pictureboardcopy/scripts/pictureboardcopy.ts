import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import Config, { Direction } from "../../../common/scripts/lib/config";
import Game from "../../../common/scripts/game";


const { ccclass, property } = cc._decorator;

const bgHeight = 432
const bgWidth = 802

@ccclass
export default class PictureBoardcopy extends Game {
    @property(cc.Prefab)
    pictureDrag: cc.Prefab = null

    @property(cc.Prefab)
    pictureDrop: cc.Prefab = null

    @property(cc.Sprite)
    bg: cc.Sprite

    @property(cc.Label)
    label: cc.Label = null

    numPieces: number = 0;
    text: string = null
    audio: cc.AudioClip = null

    onLoad() {
        console.log('PictureBoardCopy loaded');
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        const [level, worksheet, problem, name, bgImage, num, y1, sound] = config.data[0]
        console.log('level, worksheet, problem, name, bgImage, num, x1, y1, sound', level, worksheet, problem, name, bgImage, num, y1, sound)
        this.text = name
        this.numPieces = parseInt(num)

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
            const image = config.data[0][8 + index * 5];
            const x = config.data[0][9 + index * 5];
            const y = config.data[0][10 + index * 5];
            const x1 = config.data[0][11 + index * 5];
            const y1 = config.data[0][12 + index * 5];

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
                    console.log('cc.Vec2(parseInt(x1), parseInt(y1))', new cc.Vec2(parseInt(x1), parseInt(y1)))
                    new cc.Tween().target(drag)
                        .delay(0)
                        .call(() => {
                            shadowNode.active = true
                        })
                        .to(0.5, { position: new cc.Vec2(parseInt(x1), parseInt(y1)) }, { progress: null, easing: 'backOut' })
                        .call(() => {
                            drag.getComponent(Drag).allowDrag = true
                            if (index + 1 == config.data.length) {
                                Drag.letDrag = true
                                Util.showHelp(firstDrag, firstDrop)
                            }
                        })
                        .start()
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
                this.label.string = this.text
                if (Config.i.direction === Direction.RTL)
                    this.label.node.scaleX = -1;
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

}
