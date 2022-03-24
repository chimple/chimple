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
    static stickerbookData;
    static data;

    static pictureSizes: Map<string, cc.Size> = new Map()
    static stickerIconPostion = [new cc.Vec2(500, 250), new cc.Vec2(680, 250),
    new cc.Vec2(500, 75), new cc.Vec2(680, 75),
    new cc.Vec2(500, -100), new cc.Vec2(680, -100)]

    // static stickerPostion = [new cc.Vec3(730, 250), new cc.Vec3(910, 250),
    // new cc.Vec3(730, 75), new cc.Vec3(910, 75),
    // new cc.Vec3(730, -100), new cc.Vec3(910, -100)]

    static stickerPostion = [new cc.Vec2(800, 320), new cc.Vec2(1035, 345),
    new cc.Vec2(800, 150), new cc.Vec2(1053, 150),
    new cc.Vec2(750, -150), new cc.Vec2(910, -100)]

    onLoad() {
        if (cc.sys.localStorage.getItem('stickerbook') == null) {
            const stickerBookJson = {
                'currentStickerBookLevel': 0,
                'data': [
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
                        "false",
                        "false",
                        "ap_puzzle10_bush2_puzzle.png",
                        "118",
                        "229",
                        "1000",
                        "0",
                        "true",
                        "true",
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
                        "true",
                        "true"
                    ]
                ],
                'paintStokes': []
            }
            cc.sys.localStorage.setItem('stickerbook', JSON.stringify(stickerBookJson));
        }
        StickerBook.stickerbookData = JSON.parse(cc.sys.localStorage.getItem('stickerbook') || '{}');
        console.log('stickerbook Data ', StickerBook.stickerbookData)
        // this.graphics = cc.sys.localStorage.getItem('graphics')
        // console.log('stickerbook Data this.graphics', this.graphics)
        if (StickerBook.pictureSizes.size > 0) StickerBook.pictureSizes.clear()
        console.log('stickerbook Copy Game playing')
        cc.director.getCollisionManager().enabled = true
        StickerBook.data = StickerBook.stickerbookData.data[StickerBook.stickerbookData.currentStickerBookLevel] //Config.getInstance();
        this.node.on('touchmove', this.onTouchMove, this)
        const [level, worksheet, problem, name, bgImage, num, sound] = StickerBook.data
        console.log('level, worksheet, problem, name, bgImage, num, x1, y1, sound', level, worksheet, problem, name, bgImage, num, sound)
        // if (StickerBook.stickerbookData.paintStokes[StickerBook.stickerbookData.currentStickerBookLevel] != null) {
        //     this.graphics = StickerBook.stickerbookData.paintStokes[StickerBook.stickerbookData.currentStickerBookLevel]
        // }

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
                this.bg.node.position = new cc.Vec3(-this.bg.node.width / 2, -this.bg.node.height / 2)


                this.mask.node.position = new cc.Vec3(this.bg.node.width / 2, this.bg.node.height / 2)
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
            const image = StickerBook.data[7 + index * 7];
            const correctPositionX = StickerBook.data[8 + index * 7];
            const correctPositionY = StickerBook.data[9 + index * 7];
            const randomPostionX = StickerBook.data[10 + index * 7];
            const randomPositionY = StickerBook.data[11 + index * 7];
            const isUnlock = StickerBook.data[12 + index * 7] == 'true' ? true : false;
            const isFinished = StickerBook.data[13 + index * 7] == 'true' ? true : false;

            const sticker = cc.instantiate(this.stickerPrefab)
            if (!isFinished) {
                var firstDrag: cc.Node = null
                var firstDrop: cc.Node = null

                // this.numPieces = parseInt(num)
                Util.loadGameSound(sound, (audioClip) => {
                    this.audio = audioClip
                })

                // this.stickerBook = this.node.getParent().getParent().getParent().getParent().getParent();
                console.log('this.stickerBook', this.node.name)
                const bg = this.node.getChildByName('New Node').getChildByName('bg')
                // const stickerBook = cc.instantiate(this.stickerBook)
                // console.log('stickerBook', stickerBook.name)
                // console.log('stickerBook', stickerBook.getChildByName('New Node').getChildByName('bg').name)
                // this.bg = stickerBook.getChildByName('New Node').getChildByName('bg')
                console.log('bg node', this.bg.name)


                const drag = cc.instantiate(this.stickerDrag)
                drag.name = index.toString()
                drag.on('stickericonMatch', this.onMatch.bind(this))
                drag.on('stickericonNoMatch', () => {
                    // this.node.emit('wrong')
                    console.log('this.node.emit wrong')
                })

                console.log('is drag null', drag)
                bg.addChild(drag)

                //@ts-ignore
                Util.loadTexture(image, (texture) => {
                    if (texture != null && !isFinished) {
                        this.node.getChildByName('stickericon').addChild(sticker)
                        sticker.name = index.toString()
                        const spriteFrame = new cc.SpriteFrame(texture)
                        sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).spriteFrame = spriteFrame
                        sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').setContentSize(130, 130)
                        console.log('picture size', sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getContentSize())
                        sticker.position = StickerBook.stickerIconPostion[index];
                        if (!isUnlock) {
                            sticker.getChildByName('lock').active = !isUnlock
                            this.node.getChildByName('right').active = isUnlock
                        } else {
                            const pictureNode = drag.children[1]
                            // const spriteFrame = new cc.SpriteFrame(texture)
                            console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode.children[1])
                            pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                            pictureNode.active = true
                            // pictureNode.scale = 0.35
                            // drag.scale = 0.35
                            StickerBook.pictureSizes.set(index.toString(), cc.size(pictureNode.getContentSize().width, pictureNode.getContentSize().height))
                            pictureNode.setContentSize(130, 130)
                            const shadowNode = drag.children[0]
                            console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode.children[0])
                            shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                            shadowNode.active = false
                            // shadowNode.scale = 0.35
                            drag.height = pictureNode.height
                            drag.width = pictureNode.width
                            console.log('randomPositionX, randomPositionY', randomPostionX, randomPositionY);
                            // drag.position = new cc.Vec3(parseInt(randomPostionX), parseInt(randomPositionY));
                            // drag.position = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]); //this.stickerBook.position 
                            drag.x = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).x + 6 - 0.1065088757397;
                            drag.y = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).y + 60;


                            console.log('StickerBook.stickerIconPostion[index]', StickerBook.stickerIconPostion[index])
                            // console.log('sticker.convertToWorldSpace(StickerBook.stickerIconPostion[index])', sticker.convertToWorldSpace(StickerBook.stickerIconPostion[index]))
                            // console.log('bg.convertToWorldSpace(StickerBook.stickerIconPostion[index])', bg.convertToWorldSpace(StickerBook.stickerIconPostion[index]))
                            console.log('this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index])', this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]))

                            // const to = bg.convertToNodeSpaceAR(touch.getLocation())
                            // console.log('touchmove touch', to.x, to.y)
                            // drag.x = to.x
                            // drag.y = to.y

                            // this.node.on('touchmove', function (event) {
                            //     // const to = this.label.convertToNodeSpaceAR(event.touch.getLocation())
                            //     console.log('touchmove to', event.touch.getLocationX(), event.touch.getLocationY())
                            //     this.stickerBook.x = event.touch.getLocationX()
                            //     this.stickerBook.y = event.touch.getLocationY()

                            // }, this)
                            drag.getComponent(Drag).allowDrag = true
                            if (index + 1 == StickerBook.data.length) {
                                Drag.letDrag = true
                                Util.showHelp(firstDrag, firstDrop)
                            }
                            const drop = cc.instantiate(this.stickerDrop)
                            drop.name = index.toString()
                            console.log('correctPositionX, correctPositionY', correctPositionX, correctPositionY);
                            drop.position = new cc.Vec3(parseInt(correctPositionX), parseInt(correctPositionY))
                            drop.height = drag.height
                            drop.width = drag.width
                            bg.addChild(drop)
                            // this.node.getComponent(cc.Button).interactable = false
                            // this.node.getChildByName('photo').getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
                            // this.node.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
                            if (index == 1) {
                                firstDrag = drag
                                firstDrop = drop
                            }
                        }
                    }
                })
            }
            else if (isFinished) {
                const drag = cc.instantiate(this.stickerDrag)
                drag.name = index.toString()
                const pictureNode = drag.children[1]
                Util.loadTexture(image, (texture) => {
                    const spriteFrame = new cc.SpriteFrame(texture)
                    this.node.getChildByName('stickericon').addChild(sticker)
                    sticker.name = index.toString()
                    sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).spriteFrame = spriteFrame
                    sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').setContentSize(130, 130)
                    console.log('picture size', sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getContentSize())
                    sticker.position = StickerBook.stickerIconPostion[index];

                    console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode.children[1])
                    pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    const shadowNode = drag.children[0]
                    console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode.children[0])
                    shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    shadowNode.active = false
                    drag.height = pictureNode.height
                    drag.width = pictureNode.width
                    if (correctPositionX == '' && correctPositionY == '')
                        drag.position = new cc.Vec3(parseInt(randomPostionX), parseInt(randomPositionY))
                    else
                        drag.position = new cc.Vec3(parseInt(correctPositionX), parseInt(correctPositionY))
                    drag.getComponent(Drag).allowDrag = false
                    this.node.getChildByName('New Node').getChildByName('bg').addChild(drag)
                    StickerBook.numPieces--
                    console.log('StickerBook.numPieces--', StickerBook.numPieces)
                })
            }
            // //@ts-ignore
            // Util.loadTexture(image, (texture: Texture2D) => {
            //     if (texture != null && !isFinished) {
            //         this.stickerIconScrollView.addChild(sticker) //this.node.addChild(sticker)
            //         this.stickerIconScrollView.width = 400
            //         this.stickerIconScrollView.parent.width = this.stickerIconScrollView.width
            //         this.stickerIconScrollView.parent.parent.width = this.stickerIconScrollView.width
            //         this.stickerIconScrollView.getComponent(cc.Layout).updateLayout()
            //         this.stickerIconScrollView.parent.height = this.stickerIconScrollView.height

            //         // this.node.getChildByName('stickericon').addChild(sticker)
            //         sticker.name = index.toString()
            //         const spriteFrame = new cc.SpriteFrame(texture)
            //         sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).spriteFrame = spriteFrame
            //         sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').setContentSize(130, 130)
            //         console.log('picture size', sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getContentSize())
            //         sticker.position = new cc.Vec3(500 + index * 180, 180);
            //         console.log('isUnlock ', isUnlock, ' isFinished ', isFinished);
            //         sticker.getComponent(cc.Button).interactable = isUnlock
            //         if (!isUnlock) {
            //             sticker.getComponent(cc.Button).disabledColor
            //             sticker.getChildByName('lock').active = !isUnlock
            //             this.node.getChildByName('right').active = isUnlock
            //         }
            //     } else if (isFinished) {
            //         const drag = cc.instantiate(this.stickerDrag)
            //         drag.name = index.toString()
            //         const pictureNode = drag.children[1]
            //         const spriteFrame = new cc.SpriteFrame(texture)
            //         console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode.children[1])
            //         pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
            //         const shadowNode = drag.children[0]
            //         console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode.children[0])
            //         shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
            //         shadowNode.active = false
            //         drag.height = pictureNode.height
            //         drag.width = pictureNode.width
            //         if (correctPositionX == '' && correctPositionY == '')
            //             drag.position = new cc.Vec3(parseInt(randomPostionX), parseInt(randomPositionY))

            //         else
            //             drag.position = new cc.Vec3(parseInt(correctPositionX), parseInt(correctPositionY))
            //         drag.getComponent(Drag).allowDrag = false
            //         this.node.getChildByName('New Node').getChildByName('bg').addChild(drag)
            //         StickerBook.numPieces--
            //         console.log('StickerBook.numPieces--', StickerBook.numPieces)
            //     }
            // })
        }
    }

    onMatch() {
        this.node.emit('correct')
        console.log('Answer Correct', StickerBook.numPieces);
        if (--StickerBook.numPieces <= 0) {
            console.log('Entered onMatch if', StickerBook.numPieces);
            StickerBook.stickerbookData.currentStickerBookLevel++
            if (StickerBook.stickerbookData.currentStickerBookLevel >= Config.getInstance().totalProblems) {
                StickerBook.stickerbookData.currentStickerBookLevel = 0
            }
            cc.sys.localStorage.setItem('stickerbook', JSON.stringify(StickerBook.stickerbookData));
            Drag.letDrag = false
            this.scheduleOnce(() => {
                Util.speakClip(this.audio, () => {
                    this.node.emit('nextProblem')
                    console.log('nextProblem emited');
                })
            }, 1)
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

    onTouchMove(touch: cc.Touch) {
        if (this.currentTool == this.bottomPaint) {
            const from = this.label.convertToNodeSpaceAR(touch.getPreviousLocation())
            const to = this.label.convertToNodeSpaceAR(touch.getLocation())
            this.graphics.moveTo(from.x, from.y)
            this.graphics.lineTo(to.x, to.y)
            this.graphics.stroke()
            // StickerBook.stickerbookData.paintStokes[StickerBook.stickerbookData.currentStickerBookLevel] = this.graphics
            // cc.sys.localStorage.setItem('graphics', this.graphics)
            // console.log('stickerbook Data this.graphics', this.graphics)
        }
    }

    clearDrawing() {
        if (this.graphics != undefined)
            this.graphics.clear();
    }
}
