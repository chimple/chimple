import Drag from "../../../common/scripts/drag";
import Config, { Direction } from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import StickerBook from "./stickerbook";

const { ccclass, property } = cc._decorator;



@ccclass
export default class StickerIcon extends cc.Component {

    @property(cc.Prefab)
    stickerDrag: cc.Prefab = null

    @property(cc.Prefab)
    stickerDrop: cc.Prefab = null

    @property(cc.Material)
    grayMaterial: cc.Material

    // @property(cc.Prefab)
    // stickerBook: cc.Prefab = null

    // numPieces;
    audio: cc.AudioClip = null;
    bg: cc.Node = null
    stickerBook: cc.Node = null;

    onLoad() {

    }

    // start() {
    // }

    // @catchError()
    onstickerIconClick(touch: cc.Touch) {
        console.log('onstickerIconClick called');
        const [level, worksheet, problem, name, bgImage, num, sound] = StickerBook.data
        const index = parseInt(this.node.name);
        console.log('index', index)
        const image = StickerBook.data[7 + index * 7];
        const correctPositionX = StickerBook.data[8 + index * 7];
        const correctPositionY = StickerBook.data[9 + index * 7];
        const randomPostionX = StickerBook.data[10 + index * 7];
        const randomPositionY = StickerBook.data[11 + index * 7];
        const isUnlock = StickerBook.data[12 + index * 7] == 'true' ? true : false;
        const isFinished = StickerBook.data[13 + index * 7] == 'true' ? true : false;

        console.log('isUnlock ', isUnlock, ' isFinished ', isFinished)

        if (!isFinished) {
            var firstDrag: cc.Node = null
            var firstDrop: cc.Node = null

            // this.numPieces = parseInt(num)
            Util.loadGameSound(sound, (audioClip) => {
                this.audio = audioClip
            })

            this.stickerBook = this.node.getParent().getParent().getParent().getParent().getParent();
            console.log('this.stickerBook', this.stickerBook.name)
            this.bg = this.stickerBook.getChildByName('New Node').getChildByName('bg')
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
            this.bg.addChild(drag)

            //@ts-ignore
            Util.loadTexture(image, (texture: Texture2D) => {
                if (texture != null && !isFinished) {
                    const pictureNode = drag.children[1]
                    const spriteFrame = new cc.SpriteFrame(texture)
                    console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode.children[1])
                    pictureNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    const shadowNode = drag.children[0]
                    console.log('pictureNode.getChildByName(photo).getChildByName(mask)', pictureNode.children[0])
                    shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    shadowNode.active = false
                    drag.height = pictureNode.height
                    drag.width = pictureNode.width
                    console.log('randomPositionX, randomPositionY', randomPostionX, randomPositionY);
                    // drag.position = new cc.Vec3(parseInt(randomPostionX), parseInt(randomPositionY));
                    drag.position = new cc.Vec3(500, 180); //this.stickerBook.position 
                    // console.log('touchmove touch', touch.getLocationX(), touch.getLocationY())
                    // drag.x = touch.getLocationX()
                    // drag.y = touch.getLocationY()

                    this.node.on('touchmove', function (event) {
                        // const to = this.label.convertToNodeSpaceAR(event.touch.getLocation())
                        console.log('touchmove to', event.touch.getLocationX(), event.touch.getLocationY())
                        this.stickerBook.x = event.touch.getLocationX()
                        this.stickerBook.y = event.touch.getLocationY()

                    }, this)
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
                    this.bg.addChild(drop)
                    this.node.getComponent(cc.Button).interactable = false
                    this.node.getChildByName('photo').getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
                    this.node.getChildByName('photo').getChildByName('mask').getChildByName('picture').getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
                    if (index == 1) {
                        firstDrag = drag
                        firstDrop = drop
                    }
                }
            })
        }
    }

    // bool = true;
    // onTouchMove(touch: cc.Touch) {
    //     console.log('stickericon ontouchmove called')
    //     if (this.bool) {
    //         console.log('stickericon ontouchmove if called')
    //         this.onstickerIconClick(touch);
    //         this.bool = false
    //     }
    // }

    onMatch() {
        this.stickerBook.emit('correct')
        console.log('Answer Correct', StickerBook.numPieces);
        console.log('Answer Correct this.node.name', this.node.name);
        StickerBook.data[13 + parseInt(this.node.name) * 7] = 'true';
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
                    this.stickerBook.emit('nextProblem')
                    console.log('nextProblem emited');
                })
            }, 1)
        }
    }
}
