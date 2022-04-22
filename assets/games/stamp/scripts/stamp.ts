import Drag from "../../../common/scripts/drag";
import { REWARD_TYPES, Util } from "../../../common/scripts/util";
import Config, { Direction } from "../../../common/scripts/lib/config";
import Game from "../../../common/scripts/game";
import StickerHolder from "./stickerHolder";
import { StampReward } from "../../../common/scripts/lib/convert";
import StampDrag from "./stampDrag";
import { User } from "../../../common/scripts/lib/profile";

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

    @property(cc.Node)
    camera: cc.Node = null

    numPieces: number = 0;
    text: string = null
    audio: cc.AudioClip = null
    stampReward: StampReward = null
    drags: cc.Node[] = []
    isPainting: boolean = false
    currentColor: string;

    onLoad() {

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
            this.stampReward = { "done": false, "stickers": [], 'drawStokes': [] }
        }

        this.toDrawSavedDrawing()

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
            const sticker = cc.instantiate(this.stickerPrefab);
            const stickerHolder = sticker.getComponent(StickerHolder)
            stickerHolder.bg = this.stickerLayer
            this.stickerPack.addChild(sticker)
            const drag = cc.instantiate(this.stampDrag)
            drag.name = index.toString()
            console.log('drag.position', drag.position)
            drag.position = cc.Vec3.ZERO
            console.log('drag.position', drag.position)
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
                            drag.getComponent(Drag).isReverseXNeeded = true
                        drag.on('stampMatch', (th, drag) => {
                            console.log('this.stampReward.stickers', this.stampReward.stickers)
                            console.log('drag', drag)
                            this.stampReward.stickers[drag.name].fixed = true
                            this.stampReward.stickers[drag.name].peeled = true
                            this.stampReward.stickers[drag.name].x = 0
                            this.stampReward.stickers[drag.name].y = 0
                            console.log('this.stampReward.stickers', this.stampReward.stickers)
                            this.saveItem()
                        })
                        drag.on('stampNoMatch', (th, drag) => {
                            console.log('this.stampReward.stickers', this.stampReward.stickers)
                            console.log('drag', drag)
                            this.stampReward.stickers[drag.name].fixed = false
                            this.stampReward.stickers[drag.name].peeled = true
                            this.stampReward.stickers[drag.name].x = drag.x
                            this.stampReward.stickers[drag.name].y = drag.y
                            console.log('this.stampReward.stickers', this.stampReward.stickers)
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
                            drag.position = new cc.Vec3(parseInt(x), parseInt(y))
                            shadowNode.active = false;
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

                        // if (fixed.toLowerCase() == 'true') {
                        const drop = cc.instantiate(this.stampDrop)
                        drop.name = index.toString()
                        drop.position = new cc.Vec3(parseInt(x), parseInt(y))
                        drop.height = drag.height
                        drop.width = drag.width
                        this.stickerLayer.addChild(drop)
                        if (index == 1) {
                            firstDrag = drag
                            firstDrop = drop
                        }
                        // }
                    }
                }
            })
            console.log('this.stampReward in onload before change', this.stampReward)
        }
    }

    private getItemName(config: Config) {
        return User.getCurrentUser().id + '_' + config.course.id + '_' + config.chapter.id + '_' + config.lesson.id + '_' + config.problem;
    }

    saveItem() {
        // this.drags.forEach((drag, index) => {
        //     console.log('enterd if (drag.getComponent(StampDrag).inStickerPack)')
        //     this.stampReward.stickers[index].x = drag.x
        //     this.stampReward.stickers[index].y = drag.y
        //     this.stampReward.stickers[index].fixed = !drag.children[0].active
        //     this.stampReward.stickers[index].peeled = !drag.getComponent(StampDrag).inStickerPack
        // })
        cc.sys.localStorage.setItem(this.getItemName(Config.i), JSON.stringify(this.stampReward));
        console.log('this.stampReward in saveItem', this.stampReward)
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
            this.stampReward.drawStokes.push([this.currentColor, from.x, from.y, to.x, to.y])
        }
    }

    onTouchEnd(touch: cc.Touch) {
        if (this.isPainting) {
            this.isPainting = false
            Drag.letDrag = true
            this.saveItem()
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

    toDrawSavedDrawing() {
        console.log('const drawstrokes', this.stampReward)
        if (this.stampReward.drawStokes == undefined) {
            this.stampReward.drawStokes = []
        }
        const drawstrokes = this.stampReward.drawStokes

        for (let i = 0; i < drawstrokes.length; i++) {
            this.graphics.strokeColor = new cc.Color().fromHEX(drawstrokes[i][0]);
            this.graphics.moveTo(drawstrokes[i][1], drawstrokes[i][2])
            this.graphics.lineTo(drawstrokes[i][3], drawstrokes[i][4])
            this.graphics.stroke()
        }
    }


    _width: 0
    _height: 0
    texture

    capturingScreenshot() {
        // this.mask.enabled = false//.node.active = false
        // this.mask.node.setContentSize(0, 0)

        console.log('screenshot method called')
        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.Texture2D.PixelFormat.RGBA8888);
        this.camera.getComponent(cc.Camera).targetTexture = texture;
        this.texture = texture;
        // create the capture
        this.schedule(() => {
            let picData = this.initImage();
            this.createCanvas(picData);
            // this.label.string = 'Showing the capture'
            this.saveFile(picData);
            // this.camera.enabled = false;
        }, 1, 0);
    };

    // override
    initImage() {
        let data = this.texture.readPixels();
        this._width = this.texture.width;
        this._height = this.texture.height;
        let picData = this.filpYImage(data, this._width, this._height);
        return picData;
    };

    // This is a temporary solution
    filpYImage(data, width, height) {
        // create the data array
        let picData = new Uint8Array(width * height * 4);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            // save the piexls data
            for (let i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }
        return picData;
    }

    // override init with Data
    createCanvas(picData) {
        let texture = new cc.Texture2D();
        texture.initWithData(picData, 32, this._width, this._height);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);

        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;

        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        // set position
        let width = cc.winSize.width;
        let height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, () => {
            node.parent = null;
            // this.label.string = '';
            node.destroy();
        });

        this.captureAction(node, width, height);
    }

    // sprite action
    captureAction(capture, width, height) {
        let scaleAction = cc.scaleTo(1, 0.3);
        let targetPos = cc.v2(width - width / 6, height / 4);
        let moveAction = cc.moveTo(1, targetPos);
        let spawn = cc.spawn(scaleAction, moveAction);
        capture.runAction(spawn);
        let blinkAction = cc.blink(0.1, 1);
        // scene action
        this.node.runAction(blinkAction);
    }

    saveFile(picData) {
        cc.log("saveFile() called");
        if (CC_JSB) {
            cc.log("saveFile() Entered if(CC_JSB)");
            let filePath = jsb.fileUtils.getWritablePath() + 'render_to_sprite_image.png';

            // @ts-ignore
            let success = jsb.saveImageData(picData, this._width, this._height, filePath)
            cc.log("saveFile() success", success);
            if (success) {
                cc.log("save image data success, file: " + filePath);
            }
            else {
                cc.error("save image data failed!");
            }
        }
    };

}
