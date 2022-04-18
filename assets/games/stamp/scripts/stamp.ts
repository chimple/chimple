import Drag from "../../../common/scripts/drag";
import { REWARD_TYPES, Util } from "../../../common/scripts/util";
import Config, { Direction } from "../../../common/scripts/lib/config";
import Game from "../../../common/scripts/game";
import StickerHolder from "./stickerHolder";
import { StampReward } from "../../../common/scripts/lib/convert";
import StampDrag from "./stampDrag";
import { User } from "../../../common/scripts/lib/profile";
import LessonController from "../../../common/scripts/lessonController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Stamp extends Game {
    @property(cc.Prefab)
    stampDrag: cc.Prefab = null

    @property(cc.Prefab)
    stampDrop: cc.Prefab = null

    @property(cc.Sprite)
    bg: cc.Sprite

    @property(cc.Node)
    label: cc.Node = null

    @property(cc.Prefab)
    stickerPrefab: cc.Prefab = null

    @property(cc.Node)
    stickerPack: cc.Node

    @property(cc.Graphics)
    graphics: cc.Graphics = null

    @property(cc.Node)
    bottomPaint: cc.Node = null

    @property(cc.Node)
    stickerLayer: cc.Node = null

    @property(cc.Node)
    mask: cc.Node = null

    numPieces: number = 0;
    text: string = null
    audio: cc.AudioClip = null
    stampReward: StampReward = null
    drags: cc.Node[] = []
    isPainting: boolean = false
    static stickerbookDataJson: any;
    currentColor: string;
    currentLessonId = Config.i.lesson.id;
    currentUserId = User.getCurrentUser().id

    onLoad() {

        this.toDrawSaveddrawing()
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        this.graphics.node.on('touchstart', () => {

        })
        this.graphics.node.on('touchmove', this.onTouchMove, this)
        this.graphics.node.on('touchend', this.onTouchEnd, this)
        // Drag.letDrag = false
        const [level, worksheet, problem, name, bgImage, num, fixed, sound] = config.data[0]
        this.text = name
        this.numPieces = parseInt(num)

        const itemName = this.getItemName(config);
        this.stampReward = JSON.parse(cc.sys.localStorage.getItem(itemName))
        if (this.stampReward == null) {
            this.stampReward = { "done": false, "stickers": [] }
        }

        Util.loadTexture(bgImage, (texture) => {
            if (texture != null) {
                this.bg.spriteFrame = new cc.SpriteFrame(texture)
                // this.graphics.node.setContentSize(this.bg.spriteFrame.getOriginalSize())
                // this.mask.setContentSize(this.bg.spriteFrame.getOriginalSize())
            }
        })

        Util.loadGameSound(sound, (audioClip) => {
            this.audio = audioClip
        })

        var firstDrag: cc.Node = null
        var firstDrop: cc.Node = null

        for (let index = 0; index < this.numPieces; index++) {
            const image = config.data[0][8 + index * 4];
            const x = config.data[0][9 + index * 4];
            const y = config.data[0][10 + index * 4];
            if (this.stampReward.stickers.length <= index) {
                this.stampReward.stickers.push({
                    "id": image,
                    "fixed": false,
                    "peeled": false,
                    "x": 0,
                    "y": 0
                })
            }

            // this.bg.node.addChild(drag)
            const sticker = cc.instantiate(this.stickerPrefab)
            const stickerHolder = sticker.getComponent(StickerHolder)
            stickerHolder.bg = this.stickerLayer
            this.stickerPack.addChild(sticker)
            const drag = cc.instantiate(this.stampDrag)
            drag.name = index.toString()
            drag.position = cc.Vec3.ZERO
            stickerHolder.icon.addChild(drag)
            this.drags.push(drag)
            const rewardName = `${REWARD_TYPES[4]}-${Config.i.chapter.id}-${Config.i.lesson.id}-${image}`
            stickerHolder.rewardArray = [REWARD_TYPES[4], Config.i.chapter.id, Config.i.lesson.id, image]
            //@ts-ignore
            Util.loadTexture(image, (texture) => {
                if (texture != null) {
                    const spriteFrame = new cc.SpriteFrame(texture)
                    const stickerHolderSprite = stickerHolder.icon.getComponent(cc.Sprite)
                    stickerHolderSprite.spriteFrame = spriteFrame
                    Util.resizeSprite(stickerHolderSprite, 96, 96)
                    const { scale, size } = Util.minScale(stickerHolderSprite, 96, 96)
                    if (User.getCurrentUser().unlockedRewards[rewardName] == 1) {
                        stickerHolder.lock.active = false
                        const stickerButton = stickerHolder.icon.getComponent(cc.Button)
                        stickerButton.interactable = false
                        if (Config.i.direction === Direction.RTL)
                            drag.getComponent(Drag).isReverseXNeeded = true;
                        drag.on('stampMatch', () => {
                            this.saveItem()
                        })
                        drag.on('stampNoMatch', () => {
                            this.saveItem()
                        })
                        const stampNode = drag.children[1]
                        stampNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                        const shadowNode = drag.children[0]
                        shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                        shadowNode.active = false
                        const dragComp = drag.getComponent(StampDrag)
                        dragComp.imageIndex = index
                        if (this.stampReward.stickers[index].fixed) {
                            drag.parent = this.stickerLayer
                            dragComp.allowDrag = false
                            drag.position = new cc.Vec3(parseInt(x) / 3, parseInt(y) / 3)
                            shadowNode.active = false
                            dragComp.inStickerPack = false
                        } else {
                            if (this.stampReward.stickers[index].peeled) {
                                drag.position = new cc.Vec3(this.stampReward.stickers[index].x, this.stampReward.stickers[index].y, 0)
                                dragComp.inStickerPack = false
                                drag.parent = drag.parent.parent.parent
                                drag.height = spriteFrame.getOriginalSize().height
                                drag.width = spriteFrame.getOriginalSize().width
                            } else {
                                drag.scale = scale
                                drag.position = new cc.Vec3(-stickerHolder.icon.width / 2, -stickerHolder.icon.height / 2, 0)
                                drag.height = spriteFrame.getOriginalSize().height
                                drag.width = spriteFrame.getOriginalSize().width
                            }
                            drag.getComponent(Drag).allowDrag = true
                            // if (index + 1 == config.data.length) {
                            //     Drag.letDrag = true
                            //     Util.showHelp(firstDrag, firstDrop)
                            // }
                        }

                        if (fixed.toLowerCase() == 'true') {
                            const drop = cc.instantiate(this.stampDrop)
                            drop.name = index.toString()
                            drop.position = new cc.Vec3(parseInt(x) / 3, parseInt(y) / 3)
                            drop.height = drag.height
                            drop.width = drag.width
                            this.stickerLayer.addChild(drop)
                            if (index == 1) {
                                firstDrag = drag
                                firstDrop = drop
                            }
                        }
                    }
                }
            })
        }
    }

    private getItemName(config: Config) {
        return User.getCurrentUser().id + '_' + config.course.id + '_' + config.chapter.id + '_' + config.lesson.id + '_' + config.problem;
    }

    saveItem() {
        this.drags.forEach((drag, index) => {
            this.stampReward.stickers[index].x = drag.x
            this.stampReward.stickers[index].y = drag.y
            this.stampReward.stickers[index].fixed = !drag.children[0].active
            this.stampReward.stickers[index].peeled = !drag.getComponent(StampDrag).inStickerPack
        })
        cc.sys.localStorage.setItem(this.getItemName(Config.i), JSON.stringify(this.stampReward));
    }

    onPaintClick(event: cc.Event, customEventData: string) {
        this.graphics.strokeColor = new cc.Color().fromHEX(customEventData)
        this.isPainting = true
        Drag.letDrag = false
        this.currentColor = customEventData
    }

    onTouchMove(touch: cc.Touch) {
        if (this.isPainting) {
            const from = this.graphics.node.convertToNodeSpaceAR(touch.getPreviousLocation())
            const to = this.graphics.node.convertToNodeSpaceAR(touch.getLocation())
            this.graphics.moveTo(from.x, from.y)
            this.graphics.lineTo(to.x, to.y)
            this.graphics.stroke()
            Stamp.stickerbookDataJson[this.currentUserId].paintData[this.currentLessonId].push([this.currentColor, from.x, from.y, to.x, to.y])
        }
    }

    onTouchEnd(touch: cc.Touch) {
        if (this.isPainting) {
            // this.isPainting = false
            Drag.letDrag = true
            console.log('Stamp.stickerbookDataJson.paintData[0]', Stamp.stickerbookDataJson[this.currentUserId].paintData[this.currentLessonId])
            cc.sys.localStorage.setItem('stickerbook-paint', JSON.stringify(Stamp.stickerbookDataJson));
        }
    }

    onToolClick(event: cc.Event, customEventData: string) {
        if (this.isPainting) {
            this.isPainting = false
            Drag.letDrag = true
            this.bottomPaint.active = false
        } else {
            this.isPainting = true
            Drag.letDrag = false
            this.bottomPaint.active = true
        }
    }

    toDrawSaveddrawing() {
        console.log('toDrawSaveddrawing() called', this.currentLessonId)

        if (cc.sys.localStorage.getItem('stickerbook-paint') == null) {
            const stickerBookJson = {}
            cc.sys.localStorage.setItem('stickerbook-paint', JSON.stringify(stickerBookJson));
        }
        Stamp.stickerbookDataJson = JSON.parse(cc.sys.localStorage.getItem('stickerbook-paint') || '{}');
        console.log('Stamp.stickerbookDataJson ', Stamp.stickerbookDataJson);
        if (Stamp.stickerbookDataJson[this.currentUserId] == undefined) {
            Stamp.stickerbookDataJson[this.currentUserId] = { "paintData": {} }
        }
        console.log('Stamp.stickerbookDataJson[this.currentUserId]', Stamp.stickerbookDataJson[this.currentUserId]);

        if (Stamp.stickerbookDataJson[this.currentUserId].paintData[this.currentLessonId] == undefined) {
            Stamp.stickerbookDataJson[this.currentUserId].paintData[this.currentLessonId] = []
        }
        console.log('this.paintDataJson', Stamp.stickerbookDataJson[this.currentUserId].paintData[this.currentLessonId]);
        const paintData = Stamp.stickerbookDataJson[this.currentUserId].paintData[this.currentLessonId]
        for (let i = 0; i < paintData.length; i++) {
            this.graphics.strokeColor = new cc.Color().fromHEX(paintData[i][0]);
            this.graphics.moveTo(paintData[i][1], paintData[i][2])
            this.graphics.lineTo(paintData[i][3], paintData[i][4])
            this.graphics.stroke()
        }
    }
}
