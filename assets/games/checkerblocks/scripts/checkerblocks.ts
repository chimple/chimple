import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import Drag from "../../../common/scripts/drag";
import Game from "../../../common/scripts/game";

const { ccclass, property } = cc._decorator;

const tileWidth = 69
const tileHeight = 69
const startX = 200
const topMargin = 128

const colors: Array<string> = [
    '#E3EB0E',
    '#FF809A',
    '#74F750',
    '#56DEA8',
    '#A857FF'
]


@ccclass
export default class CheckerBlocks extends Game {
    @property(cc.Prefab)
    dragPrefab: cc.Prefab = null

    @property(cc.Prefab)
    dropPrefab: cc.Prefab = null

    @property(cc.Prefab)
    dragTilePrefab: cc.Prefab = null

    @property(cc.Prefab)
    tilePrefab: cc.Prefab = null

    @property(cc.Node)
    board: cc.Node = null

    @property(cc.SpriteFrame)
    dark: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    light: cc.SpriteFrame = null

    @property(cc.Node)
    truck: cc.Node = null

    @property(cc.AudioClip)
    truckInAudio:cc.AudioClip =null

    @property(cc.AudioClip)
    truckOutAudio:cc.AudioClip =null


    matchCount: number = 0

    boardContents: Array<Array<number>> = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
        [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
        [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    ]

    dragTiles: Map<number, cc.Node> = new Map()
    colorMap: Map<number, cc.Color> = new Map()

    @catchError()
    onLoad() {
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        const [oldLevel, worksheet, problem, level] = Config.getInstance().data[0];
        switch (level) {
            case "1":
                this.generateRandomSquares()
                break;
            case "2":
                this.generateHorizontalStrips()
                break;
            case "3":
                this.generateVerticalStrips()
                break;
            case "4":
                this.generateHorizontalHalfStrips()
                break;
            case "5":
                this.generate5Multiples()
                break;
            case "6":
                this.generatePlus()
                break;
            case "7":
                this.generate2by2Squares()
                break;
            case "8":
                this.generateEvenColumns()
                break;
            case "9":
                this.generateOddColumns()
                break;
            case "10":
                this.generateRandomDoubleSquares()
                break;
            case "11":
                this.generateAllSingleSquares()
                break;
            default:
                this.generateRandomSquares()
                break;
        }
        var firstDrag: cc.Node = null
        var firstDrop: cc.Node = null
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const num = i * 10 + j + 1
                const bg = new cc.Node()
                const bgComp = bg.addComponent(cc.Sprite)
                bg.x = j * tileWidth
                bg.y = - i * tileHeight
                bg.anchorX = 0
                bg.anchorY = 1
                if (i % 2 == 0) {
                    if (j % 2 == 0) {
                        bgComp.spriteFrame = this.dark
                    } else {
                        bgComp.spriteFrame = this.light
                    }
                } else {
                    if (j % 2 == 0) {
                        bgComp.spriteFrame = this.light
                    } else {
                        bgComp.spriteFrame = this.dark
                    }
                }
                this.board.addChild(bg)
                const tile = cc.instantiate(this.boardContents[i][j] < 0 ? this.dropPrefab : this.tilePrefab)
                tile.name = num.toString()
                tile.x = j * tileWidth
                tile.y = - i * tileHeight
                tile.zIndex = 101 - num
                this.board.addChild(tile)
                if (this.boardContents[i][j] < 0) {
                    if (!this.dragTiles.has(this.boardContents[i][j])) {
                        const dragTile = cc.instantiate(this.dragTilePrefab)
                        dragTile.name = (-this.boardContents[i][j]).toString()
                        this.dragTiles.set(this.boardContents[i][j], dragTile)
                        this.colorMap.set(-this.boardContents[i][j], new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)]))
                        dragTile.on('hundredpuzzleMatch', this.onMatch, this)
                        dragTile.on('hundredpuzzleNoMatch', () => {
                            this.node.emit('wrong')
                        })
                        if (firstDrag == null) {
                            firstDrag = dragTile
                            firstDrop = tile
                        }
                    }
                    this.addToDragTile(-this.boardContents[i][j], num, this.dragTiles.get(this.boardContents[i][j]))
                }
            }
        }
        const truckX = this.truck.x
        new cc.Tween().target(this.truck)
            .set({ x: cc.winSize.width })
            .call(()=>{Util.playSfx(this.truckInAudio)})
            .to(3, { x: truckX }, { progress: null, easing: 'quadOut' })
            .call(() => {
                const anim = this.truck.getComponent(cc.Animation)
                anim.stop()
                this.dragTiles.forEach((val, key) => {
                    val.position = cc.v2(startX + Math.random() * (cc.winSize.width / 2 - startX - val.width), -cc.winSize.height)
                    val.zIndex = 100 - parseInt(val.name)
                    this.node.addChild(val)
                    new cc.Tween().target(val)
                        .delay(Math.random() * 2)
                        .to(0.5, { y: Math.random() * (cc.winSize.height - topMargin - val.height) - cc.winSize.height / 2 + val.height }, { progress: null, easing: 'sineOut' })
                        .start()
                })
                this.scheduleOnce(() => {
                    Drag.letDrag = true
                    Util.showHelp(firstDrag, firstDrop)
                }, 2.5)
            })
            .start()

    }

    private onMatch() {
        this.node.emit('correct')
        if (++this.matchCount >= this.dragTiles.size) {
            const anim = this.truck.getComponent(cc.Animation)
            anim.play()
            new cc.Tween().target(this.truck)
                .delay(2)
                .call(()=>{Util.playSfx(this.truckOutAudio)})
                .to(3, { x: -cc.winSize.width * 2 }, { progress: null, easing: 'quadOut' })
                .call(() => {
                    this.node.emit('nextProblem')
                })
                .start()
        }
    }

    addToDragTile(pos: number, currentPos: number, dragTile: cc.Node) {
        const drag = cc.instantiate(this.dragPrefab)
        drag.name = currentPos.toString()
        drag.x = ((currentPos - 1) % 10 - (pos - 1) % 10) * tileWidth
        drag.y = (Math.floor((pos - 1) / 10) - Math.floor((currentPos - 1) / 10)) * tileHeight
        dragTile.addChild(drag)
        if (dragTile.width < drag.x + tileWidth) {
            dragTile.width = drag.x + tileWidth
        }
        if (dragTile.height < -drag.y + tileHeight) {
            dragTile.height = -drag.y + tileHeight
        }
        const sprite = drag.getChildByName('sprite')
        if (sprite != null) {
            sprite.color = this.colorMap.get(pos)
        }
    }

    generateRandomSquares() { //2
        var generated: number = 0
        do {
            const num = Math.floor(Math.random() * 90)
            const type = Math.floor(Math.random() * 3)
            const i = Math.floor(num / 10)
            const j = num % 10
            if (j + 1 < 10
                && this.boardContents[i][j] > 0
                && this.boardContents[i][j + 1] > 0
                && this.boardContents[i + 1][j] > 0
                && this.boardContents[i + 1][j] > 0
            ) {
                if (type == 0) { //2 x 3
                    if (i + 2 < 10
                        && this.boardContents[i + 2][j] > 0
                        && this.boardContents[i + 2][j + 1] > 0
                    ) {
                        this.boardContents[i][j] = -(num + 1)
                        this.boardContents[i][j + 1] = -(num + 1)
                        this.boardContents[i + 1][j] = -(num + 1)
                        this.boardContents[i + 1][j + 1] = -(num + 1)
                        this.boardContents[i + 2][j] = -(num + 1)
                        this.boardContents[i + 2][j + 1] = -(num + 1)
                        generated++
                    }
                } else if (type == 1) { //3 x 2
                    if (j + 2 < 10
                        && this.boardContents[i][j + 2] > 0
                        && this.boardContents[i + 1][j + 2] > 0
                    ) {
                        this.boardContents[i][j] = -(num + 1)
                        this.boardContents[i][j + 1] = -(num + 1)
                        this.boardContents[i][j + 2] = -(num + 1)
                        this.boardContents[i + 1][j] = -(num + 1)
                        this.boardContents[i + 1][j + 1] = -(num + 1)
                        this.boardContents[i + 1][j + 2] = -(num + 1)
                        generated++
                    }
                }
                else { //3 x 3
                    if (i + 2 < 10 && j + 2 < 10
                        && this.boardContents[i][j + 2] > 0
                        && this.boardContents[i + 1][j + 2] > 0
                        && this.boardContents[i + 2][j] > 0
                        && this.boardContents[i + 2][j + 1] > 0
                        && this.boardContents[i + 2][j + 2] > 0
                    ) {
                        this.boardContents[i][j] = -(num + 1)
                        this.boardContents[i][j + 1] = -(num + 1)
                        this.boardContents[i][j + 2] = -(num + 1)
                        this.boardContents[i + 1][j] = -(num + 1)
                        this.boardContents[i + 1][j + 1] = -(num + 1)
                        this.boardContents[i + 1][j + 2] = -(num + 1)
                        this.boardContents[i + 2][j] = -(num + 1)
                        this.boardContents[i + 2][j + 1] = -(num + 1)
                        this.boardContents[i + 2][j + 2] = -(num + 1)
                        generated++
                    }
                }
            }
        } while (generated < 8)
    }

    generateHorizontalStrips() { //3
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.boardContents[i][j] = -(i * 10 + 1)
            }
        }
    }

    generateVerticalStrips() { //4
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.boardContents[i][j] = -(j + 1)
            }
        }
    }

    generateHorizontalHalfStrips() { //5
        var generated: number = 0
        do {
            const num = (Math.floor(Math.random() * 20) * 5) + 1
            if (this.boardContents[Math.floor((num - 1) / 10)][(num - 1) % 10] > 0) {
                for (let i = 0; i < 5; i++) {
                    this.boardContents[Math.floor((num - 1) / 10)][((num - 1) % 10) + i] = -num
                }
                generated++
            }
        } while (generated < 16)
    }

    generate5Multiples() { //6
        for (let i = 0; i < 10; i++) {
            for (let j = 4; j < 10; j += 5) {
                this.boardContents[i][j] = -(i * 10 + j + 1)
            }
        }
    }

    generatePlus() { //7 (8)
        var generated: number = 0
        do {
            const num = Math.floor(Math.random() * 70)
            const i = Math.floor(num / 10)
            const j = num % 10
            if (this.boardContents[i][j + 1] > 0
                && this.boardContents[i + 1][j] > 0
                && this.boardContents[i + 1][j + 2] > 0
                && this.boardContents[i + 2][j + 1] > 0
            ) {
                this.boardContents[i][j + 1] = -(num + 1)
                this.boardContents[i + 1][j] = -(num + 1)
                this.boardContents[i + 1][j + 1] = -(num + 1)
                this.boardContents[i + 1][j + 2] = -(num + 1)
                this.boardContents[i + 2][j + 1] = -(num + 1)
                generated++
            }
        } while (generated < 8)
    }

    generate2by2Squares() { //8
        var generated: number = 0
        do {
            const num = Math.floor(Math.random() * 25)
            const i = Math.floor(num / 5) * 2
            const j = (num % 5) * 2
            if (this.boardContents[i][j] > 0) {
                this.boardContents[i][j] = -(i * 10 + j + 1)
                this.boardContents[i + 1][j] = -(i * 10 + j + 1)
                this.boardContents[i][j + 1] = -(i * 10 + j + 1)
                this.boardContents[i + 1][j + 1] = -(i * 10 + j + 1)
                generated++
            }
        } while (generated < 16)
    }

    generateOddShapes() { //9

    }

    generateEvenColumns() { //10
        for (let i = 0; i < 10; i++) {
            for (let j = 1; j < 10; j += 2) {
                this.boardContents[i][j] = -(i * 10 + j + 1)
            }
        }
    }

    generateOddColumns() { //11
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j += 2) {
                this.boardContents[i][j] = -(i * 10 + j + 1)
            }
        }
    }

    generateRandomDoubleSquares() { //12
        var generated: number = 0
        do {
            var success = false
            const num = Math.floor(Math.random() * 100)
            const horizontal = (Math.floor(Math.random() * 2) == 1)
            const i = Math.floor(num / 10)
            const j = num % 10
            if (this.boardContents[i][j] > 0) {
                if (horizontal) {
                    if (j + 1 < 10 && this.boardContents[i][j + 1] > 0) {
                        this.boardContents[i][j] = -(num + 1)
                        this.boardContents[i][j + 1] = -(num + 1)
                        generated++
                        success = true
                    }
                } else {
                    if (i + 1 < 10 && this.boardContents[i + 1][j] > 0) {
                        this.boardContents[i][j] = -(num + 1)
                        this.boardContents[i + 1][j] = -(num + 1)
                        generated++
                        success = true
                    }
                }
            }
            if (!success) {
                loop: for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10; j++) {
                        if (this.boardContents[i][j] > 0) {
                            const num = i * 10 + j
                            if (j + 1 < 10 && this.boardContents[i][j + 1] > 0) {
                                this.boardContents[i][j] = -(num + 1)
                                this.boardContents[i][j + 1] = -(num + 1)
                                generated++
                                success = true
                                break loop
                            } else if (i + 1 < 10 && this.boardContents[i + 1][j] > 0) {
                                this.boardContents[i][j] = -(num + 1)
                                this.boardContents[i + 1][j] = -(num + 1)
                                generated++
                                success = true
                                break loop
                            }
                        }
                    }
                }
            }
        } while (generated < 45 && success)
    }

    generateAllSingleSquares() { //13
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const num = i * 10 + j + 1
                this.boardContents[i][j] = -num
            }
        }
    }


}
