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

    @property(cc.Node)
    stickerIconScrollView: cc.Node = null

    currentTool: cc.Node = null
    numStickers: number = -50
    static numPieces: number = 0;
    text: string = null
    audio: cc.AudioClip = null

    onLoad() {
        if (cc.sys.localStorage.getItem('stickerbook') == null) {
            const stickerBookJson = {
                'currentStickerBookLevel': 0,
                'data': [
                    [
                        "stickerbook",
                        "1",
                        "Description",
                        "Cat and Butterfly",
                        "ap2_puzzle7_background.jpg",
                        "2",
                        "cat_and_butterfly.mp3",
                        "ap2_puzzle7_butterfly_puzzle.png",
                        "321",
                        "174",
                        "700",
                        "-100",
                        "true",
                        "false",
                        "ap2_puzzle7_cat_puzzle.png",
                        "18",
                        "13",
                        "700",
                        "80",
                        "true",
                        "false"
                    ],
                    [
                        "stickerbook",
                        "1",
                        "Description",
                        "Cacti and Camels",
                        "ap_puzzle10_background.jpg",
                        "5",
                        "cacti_and_camels.mp3",
                        "ap_puzzle10_bush1_puzzle.png",
                        "8",
                        "101",
                        "810",
                        "0",
                        "true",
                        "false",
                        "ap_puzzle10_bush2_puzzle.png",
                        "118",
                        "229",
                        "1000",
                        "0",
                        "true",
                        "false",
                        "ap_puzzle10_bush3_puzzle.png",
                        "566",
                        "10",
                        "800",
                        "100",
                        "true",
                        "false",
                        "ap_puzzle10_camel1_puzzle.png",
                        "183",
                        "55",
                        "980",
                        "310",
                        "true",
                        "false",
                        "ap_puzzle10_camel2_puzzle.png",
                        "411",
                        "97",
                        "890",
                        "65",
                        "true",
                        "false"
                    ],
                    [
                        "stickerbook",
                        "1",
                        "Description",
                        "Cacti and Camels",
                        "ap_puzzle10_background.jpg",
                        "9",
                        "cacti_and_camels.mp3",
                        "ap_puzzle10_bush1_puzzle.png",
                        "8",
                        "101",
                        "810",
                        "0",
                        "true",
                        "false",
                        "ap_puzzle10_bush2_puzzle.png",
                        "118",
                        "229",
                        "1000",
                        "0",
                        "false",
                        "false",
                        "ap_puzzle10_bush3_puzzle.png",
                        "566",
                        "10",
                        "800",
                        "100",
                        "false",
                        "false",
                        "ap_puzzle10_camel1_puzzle.png",
                        "183",
                        "55",
                        "980",
                        "310",
                        "true",
                        "false",
                        "ap_puzzle10_camel2_puzzle.png",
                        "411",
                        "97",
                        "890",
                        "65",
                        "false",
                        "false",
                        "ap_puzzle10_bush2_puzzle.png",
                        "118",
                        "229",
                        "1000",
                        "0",
                        "false",
                        "false",
                        "ap_puzzle10_bush3_puzzle.png",
                        "566",
                        "10",
                        "800",
                        "100",
                        "true",
                        "false",
                        "ap_puzzle10_camel1_puzzle.png",
                        "183",
                        "55",
                        "980",
                        "310",
                        "false",
                        "false",
                        "ap_puzzle10_camel2_puzzle.png",
                        "411",
                        "97",
                        "890",
                        "65",
                        "false",
                        "false"
                    ]
                ]
            }
            cc.sys.localStorage.setItem('stickerbook', JSON.stringify(stickerBookJson));
        }
        let stickerbookData: JSON = JSON.parse(cc.sys.localStorage.getItem('stickerbook') || '{}');
        console.log('stickerbook Data ', stickerbookData)
        console.log('stickerbook Copy Game playing')
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        this.node.on('touchstart', () => { })
        this.node.on('touchmove', this.onTouchMove, this)
        const [level, worksheet, problem, name, bgImage, num, sound] = config.data[0]
        console.log('Config.getInstance().data[0]', Config.getInstance().data[0])
        console.log('level, worksheet, problem, name, bgImage, num, x1, y1, sound', level, worksheet, problem, name, bgImage, num, sound)

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

        for (let index = 0; index < StickerBook.numPieces; index++) {
            const image = config.data[0][7 + index * 7];
            const correctPositionX = config.data[0][8 + index * 7];
            const correctPositionY = config.data[0][9 + index * 7];
            const randomPostionX = config.data[0][10 + index * 7];
            const randomPositionY = config.data[0][11 + index * 7];
            const isUnlock = config.data[0][12 + index * 7] == 'true' ? true : false;
            const isFinished = config.data[0][13 + index * 7] == 'true' ? true : false;

            const sticker = cc.instantiate(this.stickerPrefab)

            //@ts-ignore
            Util.loadTexture(image, (texture: Texture2D) => {
                if (texture != null) {
                    this.stickerIconScrollView.addChild(sticker) //this.node.addChild(sticker)
                    this.stickerIconScrollView.width = 400
                    this.stickerIconScrollView.parent.width = this.stickerIconScrollView.width
                    this.stickerIconScrollView.parent.parent.width = this.stickerIconScrollView.width
                    this.stickerIconScrollView.getComponent(cc.Layout).updateLayout()
                    this.stickerIconScrollView.parent.height = this.stickerIconScrollView.height

                    sticker.name = index.toString()
                    const spriteFrame = new cc.SpriteFrame(texture)
                    sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).spriteFrame = spriteFrame
                    sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').setContentSize(130, 130)
                    console.log('picture size', sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getContentSize())
                    sticker.position = new cc.Vec2(parseInt(randomPostionX), parseInt(randomPositionY));
                    console.log('isUnlock ', isUnlock, ' isFinished ', isFinished);
                    sticker.getComponent(cc.Button).interactable = isUnlock
                    if (!isUnlock) {
                        sticker.getComponent(cc.Button).disabledColor
                        sticker.getChildByName('lock').active = !isUnlock
                        this.node.getChildByName('right').active = isUnlock
                    }
                }
            })
        }
    }

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
    // }

    clearDrawing() {
        if (this.graphics != undefined)
            this.graphics.clear();
    }

    onstickerIconClick() {
        console.log('onstickerIconClick called');
    }
}
