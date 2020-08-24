import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import Config, { Direction } from "../../../common/scripts/lib/config";


const { ccclass, property } = cc._decorator;

const bgHeight = 432
const bgWidth = 802

@ccclass
export default class PictureBoard extends cc.Component {
    @property(cc.Prefab)
    pictureDrag: cc.Prefab = null

    @property(cc.Prefab)
    pictureDrop: cc.Prefab = null

    @property(cc.Sprite)
    bg: cc.Sprite

    @property(cc.Node)
    truck: cc.Node = null

    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Node)
    friendPos: cc.Node = null

    friend: dragonBones.ArmatureDisplay = null
    numPieces: number = 0;
    text: string = null
    audio: cc.AudioClip = null

    onLoad() {
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
            this.friendPos.addChild(friendNode)
            this.friend.playAnimation('face_eating', 1)
        })
        const [level, worksheet, problem, name, bgImage, num, y1, sound] = config.data[0]
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

        for (let index = 0; index < this.numPieces; index++) {
            const image = config.data[0][8+index*4];
            const x = config.data[0][9+index*4];
            const y = config.data[0][10+index*4];

            const drag = cc.instantiate(this.pictureDrag)
            drag.name = index.toString()
            drag.position = new cc.Vec2(parseInt(x) / 3, parseInt(y) / 3)
            if (Config.i.direction === Direction.RTL)
                drag.getComponent(Drag).isReverseXNeeded = true;
            drag.on('pictureMatch', this.onMatch.bind(this))
            drag.on('pictureNoMatch', () => {
                this.node.emit('wrong')
                if (this.friend != null) this.friend.playAnimation('face_wrong', 1)
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
                    new cc.Tween().target(drag)
                        .delay(4)
                        .call(() => {
                            shadowNode.active = true
                        })
                        .to(0.5, { position: new cc.Vec2(Math.random() * (bgWidth + (cc.winSize.width - bgWidth) / 2) - (cc.winSize.width - bgWidth) / 2, Math.random() * (bgHeight - cc.winSize.height) / 4 + (bgHeight - cc.winSize.height) / 4) }, { progress: null, easing: 'backOut' })
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
        const truckX = this.truck.x
        if (Config.i.direction === Direction.RTL) {
            // this.node.getChildByName("truck").scaleX = -1;
            this.truck.scaleX = -1;
            new cc.Tween().target(this.truck)
                .set({ x: -cc.winSize.width })
                .to(3, { x: -truckX }, { progress: null, easing: 'quadOut' })
                .call(() => {
                    const anim = this.truck.getComponent(cc.Animation)
                    anim.stop()
                })
                .start()
        } else {
            new cc.Tween().target(this.truck)
                .set({ x: cc.winSize.width })
                .to(3, { x: truckX }, { progress: null, easing: 'quadOut' })
                .call(() => {
                    const anim = this.truck.getComponent(cc.Animation)
                    anim.stop()
                })
                .start()
        }

    }

    onMatch() {
        this.node.emit('correct')
        if (this.friend != null) this.friend.playAnimation('face_happy', 1)
        if (--this.numPieces <= 0) {
            Drag.letDrag = false
            this.scheduleOnce(() => {
                this.label.string = this.text
                if (Config.i.direction === Direction.RTL)
                    this.label.node.scaleX = -1;
                Util.speakClip(this.audio, () => {
                    const anim = this.truck.getComponent(cc.Animation)
                    anim.play()
                    if (Config.i.direction === Direction.RTL) {
                        new cc.Tween().target(this.truck)
                            .to(3.0, { x: cc.winSize.width * 2 }, { progress: null, easing: 'quadOut' })
                            .call(() => {
                                this.node.emit('nextProblem')
                            })
                            .start()
                    }
                    else {
                        new cc.Tween().target(this.truck)
                            .to(3.0, { x: -cc.winSize.width * 2 }, { progress: null, easing: 'quadOut' })
                            .call(() => {
                                this.node.emit('nextProblem')
                            })
                            .start()
                    }
                })
            }, 1)
        }
    }

}
