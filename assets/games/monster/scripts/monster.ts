import Drag from "../../../common/scripts/drag";
import Config from "../../../common/scripts/lib/config";
import Game from "../../../common/scripts/game";

const { ccclass, property } = cc._decorator;

const MIN_STICKERS_FOR_CAMERA = 5

@ccclass
export default class Monster extends Game {
    @property(cc.Node)
    background: cc.Node = null

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

    @property(cc.Node)
    bottomPaint: cc.Node = null

    @property(cc.Node)
    bottomMouth: cc.Node = null

    @property(cc.Node)
    bottomHat: cc.Node = null

    @property(cc.Node)
    bottomEye: cc.Node = null

    @property(cc.Node)
    bottomMark: cc.Node = null

    @property(cc.Node)
    bottomHair: cc.Node = null

    @property(cc.Node)
    bottomNose: cc.Node = null

    @property(cc.Node)
    bottomWallpaper: cc.Node = null

    @property(cc.Prefab)
    wallpaper1: cc.Prefab = null

    @property(cc.Prefab)
    wallpaper2: cc.Prefab = null

    @property(cc.Prefab)
    wallpaper3: cc.Prefab = null

    @property(cc.Prefab)
    wallpaper4: cc.Prefab = null

    @property(cc.Prefab)
    wallpaper5: cc.Prefab = null

    @property(cc.Prefab)
    wallpaper6: cc.Prefab = null

    @property(cc.Prefab)
    wallpaper7: cc.Prefab = null

    @property(cc.Button)
    cameraButton: cc.Button = null

    @property(cc.Animation)
    cameraAnim: cc.Animation = null

    currentTool: cc.Node = null
    numHeightAdjust: number = 0
    numYAdjust: number = 0
    numStickers: number = 0
    
    onLoad() {
        cc.director.getCollisionManager().enabled = true
        this.node.on('touchstart', () => {

        })
        this.node.on('touchmove', this.onTouchMove, this)
        this.node.on('monsterMatch', () => {
            if(++this.numStickers >= MIN_STICKERS_FOR_CAMERA) this.cameraButton.interactable = true
            this.node.emit('correct')
        })
        this.cameraButton.interactable = false
        const [level, worksheet, problem, letter, heightAdjust, yAdjust] = Config.getInstance().data[0]
        this.numHeightAdjust = Number(heightAdjust)
        this.numYAdjust = Number(yAdjust)
        const labelComp = this.label.getComponent(cc.Label)
        if(labelComp != null) labelComp.string = letter
    }

    start() {
        //@ts-ignore
        const texture = this.label._renderComponent._frame._texture
        this.mask.spriteFrame = new cc.SpriteFrame(texture)
        this.mask.node.width = this.label.width
        this.mask.node.height = this.label.height
        this.background.width = this.label.width
        this.background.height = this.label.height + this.numHeightAdjust
        this.background.y += this.numHeightAdjust/2
        this.board.size.width = this.label.width
        this.board.size.height = this.label.height + Number(this.numHeightAdjust)
        this.board.offset.y += this.numHeightAdjust/2
        this.label.y += Number(this.numYAdjust)
        // this.graphics.node.y += Number(this.numYAdjust)
        this.mask.node.y += Number(this.numYAdjust)
        // const outline = this.label.addComponent(cc.LabelOutline)
        // outline.width = 10
        // this.label.scale = 1.1
    }

    onTouchMove(touch: cc.Touch) {
        if (this.currentTool == this.bottomPaint) {
            const from = this.label.convertToNodeSpaceAR(touch.getPreviousLocation())
            const to = this.label.convertToNodeSpaceAR(touch.getLocation())
            this.graphics.moveTo(from.x, from.y)
            this.graphics.lineTo(to.x, to.y)
            this.graphics.stroke()
        }
    }

    onToolClick(event: cc.Event, customEventData: string) {
        const newTool: cc.Node = this[customEventData]
        if (newTool != null) {
            if (this.currentTool != null) {
                this.currentTool.active = false
            }
            this.currentTool = newTool
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
    }

    onCameraClick(event: cc.Event, customEventData: string) {
        this.cameraAnim.play()
        this.scheduleOnce(() => {
            this.node.emit('nextProblem')
        }, 1)
    }

    onWallpaperClick(event: cc.Event, customEventData: string) {
        if(this[customEventData]) {
            const wp = cc.instantiate(this[customEventData])
            this.wallpaper.removeAllChildren()
            this.wallpaper.addChild(wp)
        }
    }

}
