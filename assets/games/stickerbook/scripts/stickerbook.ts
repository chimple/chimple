import Drag from "../../../common/scripts/drag";
import Config, { Direction } from "../../../common/scripts/lib/config";
import Game from "../../../common/scripts/game";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;


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

    paintTool: cc.Node = null
    numStickers: number = -50
    static numPieces: number = 0;
    text: string = null
    audio: cc.AudioClip = null
    static stickerbookDataJson;
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
        console.log('stickerbook Game playing')
        this.loadStickerBookData();

        cc.director.getCollisionManager().enabled = true

        this.toDrawSaveddrawing()
        this.node.on('touchmove', this.onTouchMove, this)
        const [level, worksheet, problem, name, bgImage, num, sound] = StickerBook.data

        // const labelComp = this.label.getComponent(cc.Label)
        // if (labelComp != null) labelComp.string = letter

        this.text = name
        StickerBook.numPieces = parseInt(num)
        Util.loadTexture(bgImage, (texture) => {
            if (texture != null) {
                this.bg.spriteFrame = new cc.SpriteFrame(texture)
                this.mask.spriteFrame = new cc.SpriteFrame(texture)
                this.bg.node.position = new cc.Vec3(-this.bg.node.width / 2, -this.bg.node.height / 2)


                this.mask.node.position = new cc.Vec3(this.bg.node.width / 2, this.bg.node.height / 2)
                this.mask.node.setContentSize(this.bg.node.width, this.bg.node.height)

            }
        })

        Util.loadGameSound(sound, (audioClip) => {
            this.audio = audioClip
        })

        for (let index = 0; index < StickerBook.numPieces; index++) {
            const image = StickerBook.data[7 + index * 7];
            const correctPositionX = parseInt(StickerBook.data[8 + index * 7]) || null;
            const correctPositionY = parseInt(StickerBook.data[9 + index * 7]) || null;
            const randomPostionX = parseInt(StickerBook.data[10 + index * 7]) || null;
            const randomPositionY = parseInt(StickerBook.data[11 + index * 7]) || null;
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

                const bg = this.node.getChildByName('New Node').getChildByName('bg')

                const drag = cc.instantiate(this.stickerDrag)
                drag.name = index.toString()
                drag.on('stickericonMatch', this.onMatch.bind(this))
                drag.on('stickericonNoMatch', () => {
                    // this.node.emit('wrong')
                    console.log('this.node.emit wrong')
                })

                bg.addChild(drag)

                //@ts-ignore
                Util.loadTexture(image, (texture) => {
                    if (texture != null && !isFinished) {
                        this.node.getChildByName('stickericon').addChild(sticker)
                        sticker.name = index.toString()
                        const spriteFrame = new cc.SpriteFrame(texture)
                        sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).spriteFrame = spriteFrame
                        sticker.getChildByName('photo').getChildByName('mask').getChildByName('picture').setContentSize(130, 130)
                        sticker.position = StickerBook.stickerIconPostion[index];
                        // sticker.x = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).x + 6 - 0.1065088757397;
                        // sticker.y = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).y + 60;
                        if (!isUnlock) {
                            sticker.getChildByName('lock').active = !isUnlock
                            this.node.getChildByName('right').active = isUnlock
                        } else {
                            const pictureNode = drag.children[1]
                            // const spriteFrame = new cc.SpriteFrame(texture)
                            pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                            pictureNode.active = true
                            // pictureNode.scale = 0.35
                            // drag.scale = 0.35
                            StickerBook.pictureSizes.set(index.toString(), cc.size(pictureNode.getContentSize().width, pictureNode.getContentSize().height))
                            pictureNode.setContentSize(130, 130)
                            const shadowNode = drag.children[0]
                            shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                            shadowNode.active = false
                            // shadowNode.scale = 0.35
                            drag.height = pictureNode.height
                            drag.width = pictureNode.width
                            // drag.position = new cc.Vec3(parseInt(randomPostionX), parseInt(randomPositionY));
                            // drag.position = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]); //this.stickerBook.position 
                            drag.x = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).x + 6 - 0.1065088757397;
                            drag.y = this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]).y + 60;


                            // console.log('StickerBook.stickerIconPostion[index]', StickerBook.stickerIconPostion[index])
                            // console.log('sticker.convertToWorldSpace(StickerBook.stickerIconPostion[index])', sticker.convertToWorldSpace(StickerBook.stickerIconPostion[index]))
                            // console.log('bg.convertToWorldSpace(StickerBook.stickerIconPostion[index])', bg.convertToWorldSpace(StickerBook.stickerIconPostion[index]))
                            // console.log('this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index])', this.node.convertToWorldSpace(StickerBook.stickerIconPostion[index]))

                            // const to = bg.convertToNodeSpaceAR(touch.getLocation())
                            // console.log('touchmove touch', to.x, to.y)
                            // drag.x = to.x
                            // drag.y = to.y

                            drag.getComponent(Drag).allowDrag = true
                            if (index + 1 == StickerBook.data.length) {
                                Drag.letDrag = true
                                Util.showHelp(firstDrag, firstDrop)
                            }
                            const drop = cc.instantiate(this.stickerDrop)
                            drop.name = index.toString()
                            drop.position = new cc.Vec3(correctPositionX, correctPositionY)
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
                    sticker.position = StickerBook.stickerIconPostion[index];

                    pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    const shadowNode = drag.children[0]
                    shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    shadowNode.active = false
                    drag.height = pictureNode.height
                    drag.width = pictureNode.width
                    if (correctPositionX == null && correctPositionY == null)

                        drag.position = new cc.Vec3(randomPostionX, randomPositionY)
                    else
                        drag.position = new cc.Vec3(correctPositionX, correctPositionY)
                    drag.getComponent(Drag).allowDrag = false
                    this.node.getChildByName('New Node').getChildByName('bg').addChild(drag)
                    StickerBook.numPieces--
                })
            }
        }
    }

    onMatch() {
        this.node.emit('correct')
        console.log('Answer Correct', StickerBook.numPieces);
        if (--StickerBook.numPieces <= 0) {
            console.log('Entered onMatch if', StickerBook.numPieces);
            StickerBook.stickerbookDataJson.currentStickerBookLevel++
            if (StickerBook.stickerbookDataJson.currentStickerBookLevel >= Config.getInstance().totalProblems) {
                StickerBook.stickerbookDataJson.currentStickerBookLevel = 0
            }
            cc.sys.localStorage.setItem('stickerbook', JSON.stringify(StickerBook.stickerbookDataJson));
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
        let paintTool: cc.Node = this[customEventData]
        if (paintTool != null && this.paintTool == paintTool) {
            this.paintTool.active = false
            this.paintTool = null
            paintTool = null
            Drag.letDrag = true
            this.node.getChildByName("clear").active = false;

            //Saving Draw Data in local storage
            cc.sys.localStorage.setItem('stickerbook', JSON.stringify(StickerBook.stickerbookDataJson));
            console.log('After StickerBook.stickerbookData.paintData ', StickerBook.stickerbookDataJson.paintData)
        }
        if (paintTool != null) {
            this.paintTool = paintTool
            paintTool.active = true
            this.node.getChildByName("clear").active = true;
            const y = paintTool.y
            new cc.Tween().target(paintTool)
                .set({ y: -cc.winSize.height / 2 })
                .to(0.25, { y: y }, { progress: null, easing: 'elasticOut' })
                .start()
            if (paintTool == this.bottomPaint) {
                Drag.letDrag = false
            } else {
                Drag.letDrag = true
            }
        }
    }

    currentColor: string;
    onPaintClick(event: cc.Event, customEventData: string) {
        this.graphics.strokeColor = new cc.Color().fromHEX(customEventData)
        this.currentColor = customEventData
        // this.paintData.set(this.currentColor, [])
    }

    onTouchMove(touch: cc.Touch) {
        if (this.paintTool == this.bottomPaint) {
            const from = this.label.convertToNodeSpaceAR(touch.getPreviousLocation())
            const to = this.label.convertToNodeSpaceAR(touch.getLocation())
            this.graphics.moveTo(from.x, from.y)
            this.graphics.lineTo(to.x, to.y)
            this.graphics.stroke()
            StickerBook.stickerbookDataJson.paintData[StickerBook.stickerbookDataJson.currentStickerBookLevel].push([this.currentColor, from.x, from.y, to.x, to.y])
        }
    }

    toDrawSaveddrawing() {
        console.log('drawStokes() called')
        const paintData = StickerBook.stickerbookDataJson.paintData[StickerBook.stickerbookDataJson.currentStickerBookLevel]
        for (let i = 0; i < paintData.length; i++) {
            this.graphics.strokeColor = new cc.Color().fromHEX(paintData[i][0]);
            this.graphics.moveTo(paintData[i][1], paintData[i][2])
            this.graphics.lineTo(paintData[i][3], paintData[i][4])
            this.graphics.stroke()
        }
    }

    clearDrawing() {
        if (this.graphics != undefined)
            this.graphics.clear();
    }

    loadStickerBookData() {
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
                        "6",
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
                        "false",
                        "ap2_puzzle7_butterfly_puzzle.png",
                        "",
                        "",
                        "700",
                        "-100",
                        "true",
                        "false"
                    ],
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
                'paintData': {}
            }
            cc.sys.localStorage.setItem('stickerbook', JSON.stringify(stickerBookJson));
        }
        StickerBook.stickerbookDataJson = JSON.parse(cc.sys.localStorage.getItem('stickerbook') || '{}');
        console.log('stickerbook Data ', StickerBook.stickerbookDataJson);
        if (StickerBook.pictureSizes.size > 0) StickerBook.pictureSizes.clear()

        StickerBook.data = StickerBook.stickerbookDataJson.data[StickerBook.stickerbookDataJson.currentStickerBookLevel] //Config.getInstance();
        if (StickerBook.stickerbookDataJson.paintData[StickerBook.stickerbookDataJson.currentStickerBookLevel] == undefined) {
            StickerBook.stickerbookDataJson.paintData[StickerBook.stickerbookDataJson.currentStickerBookLevel] = []
        }
        console.log('this.paintDataJson', StickerBook.stickerbookDataJson.paintData[StickerBook.stickerbookDataJson.currentStickerBookLevel]);
    }
}
