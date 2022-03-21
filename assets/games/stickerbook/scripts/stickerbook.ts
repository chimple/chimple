import Drag from "../../../common/scripts/drag";
import Config, { Direction } from "../../../common/scripts/lib/config";
import Game from "../../../common/scripts/game";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

const MIN_STICKERS_FOR_CAMERA = 5

@ccclass
export default class StickerBook extends Game {

    @property(cc.Node)
    label: cc.Node = null

    @property(cc.Sprite)
    bg: cc.Sprite = null

    @property(cc.Mask)
    mask: cc.Mask = null

    @property(cc.Graphics)
    graphics: cc.Graphics = null

    @property(cc.BoxCollider)
    board: cc.BoxCollider = null

    @property(cc.Node)
    bottomPaint: cc.Node = null

    @property(cc.Prefab)
    stickerDrag: cc.Prefab = null

    @property(cc.Prefab)
    stickerDrop: cc.Prefab = null

    @property(cc.Prefab)
    stickerPrefab: cc.Prefab = null

    currentTool: cc.Node = null
    numHeightAdjust: number = 0
    numYAdjust: number = -100
    numStickers: number = -50
    static numPieces: number = 0;
    text: string = null
    audio: cc.AudioClip = null

    onLoad() {
        console.log('stickerbook Copy Game playing')
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        this.node.on('touchstart', () => {

        })
        this.node.on('touchmove', this.onTouchMove, this)
        // this.node.on('stickerbookMatch', () => {
        //     // if(++this.numStickers >= MIN_STICKERS_FOR_CAMERA) this.cameraButton.interactable = true
        //     this.node.emit('correct')
        // })
        // this.cameraButton.interactable = false
        const [level, worksheet, problem, name, bgImage, num, sound] = config.data[0]
        console.log('Config.getInstance().data[0]', Config.getInstance().data[0])
        console.log('level, worksheet, problem, name, bgImage, num, x1, y1, sound', level, worksheet, problem, name, bgImage, num, sound)
        // this.numHeightAdjust = Number(heightAdjust)
        // this.numYAdjust = Number(yAdjust)
        // const labelComp = this.label.getComponent(cc.Label)
        // if (labelComp != null) labelComp.string = letter

        this.text = name
        StickerBook.numPieces = parseInt(num)
        Util.loadTexture(bgImage, (texture) => {
            if (texture != null) {
                this.bg.spriteFrame = new cc.SpriteFrame(texture)
                this.mask.spriteFrame = new cc.SpriteFrame(texture)
                console.log('this.bg.node', this.bg.node)
                console.log('this.bg.node.x', this.bg.node.x)
                console.log('this.bg.node.y', this.bg.node.y)
                console.log('this.bg.node.width', this.bg.node.width)
                console.log('this.bg.node.height', this.bg.node.height)
                this.bg.node.position = new cc.Vec2(-this.bg.node.width / 2, -this.bg.node.height / 2)


                this.mask.node.position = new cc.Vec2(this.bg.node.width / 2, this.bg.node.height / 2)
                this.mask.node.setContentSize(this.bg.node.width, this.bg.node.height)
                console.log('this.mask.node.position', -this.bg.node.width / 2, -this.bg.node.height / 2)
                console.log('this.mask.node.position.X', this.mask.node.position.x)
                console.log('this.mask.node.position.y', this.mask.node.position.y)
                console.log('this.mask.node.width', this.mask.node.width)
                console.log('this.mask.node.height', this.mask.node.height)

            }
        })

        Util.loadGameSound(sound, (audioClip) => {
            this.audio = audioClip
        })

        var firstDrag: cc.Node = null
        var firstDrop: cc.Node = null

        for (let index = 0; index < StickerBook.numPieces; index++) {
            const image = config.data[0][7 + index * 7];
            const correctPositionX = config.data[0][8 + index * 7];
            const correctPositionY = config.data[0][9 + index * 7];
            const randomPostionX = config.data[0][10 + index * 7];
            const randomPositionY = config.data[0][11 + index * 7];
            const isUnlock = config.data[0][12 + index * 7] == 'true' ? true : false;
            const isFinished = config.data[0][13 + index * 7] == 'true' ? true : false;

            // const drag = cc.instantiate(this.stickerDrag)
            // drag.name = index.toString()
            // drag.position = new cc.Vec2(parseInt(correctPositionX), parseInt(correctPositionY))
            // // console.log('Config.i.direction', Config.i.direction);
            // // console.log('Direction.RTL', Direction.RTL);
            // // console.log('Config.i.direction === Direction.RTL', Config.i.direction === Direction.RTL);
            // // if (Config.i.direction === Direction.RTL)
            // //     drag.getComponent(Drag).isReverseXNeeded = true;
            // drag.on('stickerbookMatch', this.onMatch.bind(this))
            // drag.on('stickerbookNoMatch', () => {
            //     // this.node.emit('wrong')
            //     console.log('this.node.emit wrong')
            // })
            // this.bg.node.addChild(drag)


            const sticker = cc.instantiate(this.stickerPrefab)

            //@ts-ignore
            Util.loadTexture(image, (texture: Texture2D) => {
                if (texture != null) {
                    this.node.addChild(sticker)
                    sticker.name = index.toString()
                    const spriteFrame = new cc.SpriteFrame(texture)
                    console.log('before spriteFrame size', spriteFrame.getOriginalSize())
                    spriteFrame.setOriginalSize(cc.size(140, 140))
                    console.log('after spriteFrame size', spriteFrame.getOriginalSize())
                    sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).spriteFrame = spriteFrame
                    // sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).spriteFrame.setOriginalSize(cc.size(140, 140))
                    console.log('picture size', sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).spriteFrame.getOriginalSize())
                    console.log('picture size', sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite))
                    sticker.position = new cc.Vec2(parseInt(randomPostionX), parseInt(randomPositionY));
                    console.log('isUnlock ', isUnlock, ' isFinished ', isFinished);
                    sticker.getComponent(cc.Button).interactable = isUnlock
                    if (!isUnlock) {
                        sticker.getComponent(cc.Button).disabledColor
                        sticker.getChildByName('lock').active = !isUnlock
                    }
                }
                // if (texture != null) {
                //     const pictureNode = drag.getChildByName('photo').getChildByName('mask').getChildByName('picture')
                //     const spriteFrame = new cc.SpriteFrame(texture)
                //     console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode)
                //     pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                //     const shadowNode = drag.children[0]
                //     shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                //     shadowNode.active = false
                //     drag.height = pictureNode.height
                //     drag.width = pictureNode.width
                //     console.log('randomPositionX, randomPositionY', randomPostionX, randomPositionY);
                //     drag.position = new cc.Vec2(parseInt(randomPostionX), parseInt(randomPositionY));
                //     drag.getComponent(Drag).allowDrag = true
                //     if (index + 1 == config.data.length) {
                //         Drag.letDrag = true
                //         Util.showHelp(firstDrag, firstDrop)
                //     }
                //     const drop = cc.instantiate(this.stickerDrop)
                //     drop.name = index.toString()
                //     console.log('correctPositionX, correctPositionY', correctPositionX, correctPositionY);
                //     drop.position = new cc.Vec2(parseInt(correctPositionX), parseInt(correctPositionY))
                //     drop.height = drag.height
                //     drop.width = drag.width
                //     this.bg.node.addChild(drop)
                //     if (index == 1) {
                //         firstDrag = drag
                //         firstDrop = drop
                //     }
                // }
            })

        }
    }

    // start() {
    //     //@ts-ignore
    //     // console.log('texture.getBoundingBox().getX()', this.bg.node.getContentSize())
    //     // console.log('texture.getBoundingBox().getX()', this.mask.spriteFrame)
    //     // this.mask.node.width = this.bg.node.getContentSize().width
    //     // this.mask.node.height = this.bg.node.getContentSize().height
    //     // this.background.width = this.bg.node.getContentSize().width
    //     // this.background.height = this.bg.node.getContentSize().height + this.numHeightAdjust
    //     // this.background.y += this.numHeightAdjust / 2
    //     // this.board.size.width = this.bg.node.getContentSize().width
    //     // this.board.size.height = this.bg.node.getContentSize().height + Number(this.numHeightAdjust)
    //     // this.board.offset.y += this.numHeightAdjust / 2
    //     // this.bg.node.y += Number(this.numYAdjust)
    //     // // this.graphics.node.y += Number(this.numYAdjust)
    //     // this.mask.node.y += Number(this.numYAdjust)
    //     // const outline = this.label.addComponent(cc.LabelOutline)
    //     // outline.width = 10
    //     // this.label.scale = 1.1
    // }

    // onMatch() {
    //     this.node.emit('correct')
    //     console.log('Answer Correct', this.numPieces);
    //     if (--this.numPieces <= 0) {
    //         console.log('Entered onMatch if', this.numPieces);
    //         Drag.letDrag = false
    //         this.scheduleOnce(() => {
    //             // console.log('Config.i.direction', Config.i.direction)
    //             // console.log('Direction.RTL', Direction.RTL);
    //             // console.log('Config.i.direction === Direction.RTL', Config.i.direction === Direction.RTL);
    //             // if (Config.i.direction === Direction.RTL)
    //             Util.speakClip(this.audio, () => {
    //                 this.node.emit('nextProblem')
    //                 console.log('nextProblem emited');
    //             })
    //         }, 1)
    //     }
    // }

    onToolClick(event: cc.Event, customEventData: string) {
        let newTool: cc.Node = this[customEventData]
        console.log("customEventData", this[customEventData])
        if (newTool != null && this.currentTool == newTool) {
            this.currentTool.active = false
            this.currentTool = null
            newTool = null
            Drag.letDrag = true
            this.node.getChildByName("clear").active = false;
        }
        if (newTool != null) {
            this.currentTool = newTool
            console.log("new currentTool", this.currentTool)
            newTool.active = true
            this.node.getChildByName("clear").active = true;
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
    }

    // startLocation: cc.Vec2 = cc.v2(0, 0);
    // adjustCords: cc.Vec2 = cc.v2(0, 0);
    // last_location = new cc.Vec2(0, 0);

    onTouchMove(touch: cc.Touch) {
        if (this.currentTool == this.bottomPaint) {
            const from = this.label.convertToNodeSpaceAR(touch.getPreviousLocation())
            const to = this.label.convertToNodeSpaceAR(touch.getLocation())
            this.graphics.moveTo(from.x, from.y)
            this.graphics.lineTo(to.x, to.y)
            this.graphics.stroke()
        }
        // if (touch.getID() == 0 && this.currentTool == this.bottomPaint) {
        //     const location = touch.getLocation();
        //     const nodeSpaceLocation = this.node.getParent().convertToNodeSpaceAR(location);
        //     // console.log('nodeSpaceLocation', nodeSpaceLocation)
        //     let tempCordX = nodeSpaceLocation.x //- this.adjustCords.x
        //     let tempCordY = nodeSpaceLocation.y //- this.adjustCords.y
        //     // let tempCordX = this.bg.node.getContentSize().width/2
        //     // let tempCordY = this.bg.node.getContentSize().height/2
        //     console.log('this.bg.node.getPosition()', this.bg.node.getPosition())
        //     console.log('this.bg.node.getContentSize()', this.bg.node.getContentSize())
        //     cc.log("on movetempCordX " + tempCordX, this.bg.node.getContentSize().width);
        //     cc.log("on movetempCordY " + tempCordY, this.bg.node.getContentSize().height);
        //     if (tempCordX > -this.bg.node.getContentSize().width / 2 && tempCordX < this.bg.node.getContentSize().width / 2 && tempCordY > -this.bg.node.getContentSize().height / 2 && tempCordY < this.bg.node.getContentSize().height / 2) {
        //         // if (this.calculateMagnitute(nodeSpaceLocation, this.last_location) > 10 && nodeSpaceLocation.x < (-40) && nodeSpaceLocation.x > -472 / 1 && nodeSpaceLocation.y > -512 / 2 && nodeSpaceLocation.y < 512 / 2) {
        //         console.log("Prefab Spawned!!!")
        //         // this.drawing = this.node.getChildByName("canvas").getChildByName("graphicsNode").getComponent(cc.Graphics);
        //         const from = this.label.convertToNodeSpaceAR(touch.getPreviousLocation())
        //         const to = this.label.convertToNodeSpaceAR(touch.getLocation())
        //         this.graphics.moveTo(from.x, from.y)
        //         this.graphics.lineTo(to.x, to.y)
        //         this.graphics.stroke()


        //         // this.last_location = nodeSpaceLocation;
        //         // this.startLocation.x = nodeSpaceLocation.x - this.adjustCords.x;
        //         // this.startLocation.y = nodeSpaceLocation.y - this.adjustCords.y;
        //     }
        // }
    }

    @catchError()
    clearDrawing() {
        if (this.graphics != undefined)
            this.graphics.clear();
    }

    @catchError()
    onstickerIconClick() {
        console.log('onstickerIconClick called');
    }
}
