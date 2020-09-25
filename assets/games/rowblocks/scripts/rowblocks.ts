import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "../../../common/scripts/lib/config";
import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import Game from "../../../common/scripts/game";

const tileWidth = 80;
const tileHeight = 80;
const startX = 50;

const colors: Array<string> = [
    '#E3EB0E',
    '#FF809A',
    '#74F750',
    '#56DEA8',
    '#A857FF'
];

interface RowBlocksConfig {
    level: string;
    workSheet: string;
    problem: string;
    columns: number[];
    suggests: number[];
    isRandom: string;
    problemNumber: string;
}

@ccclass
export default class RowBlocks extends Game {
    @property(cc.Node)
    board: cc.Node = null;

    @property(cc.Node)
    truck: cc.Node = null;

    @property(cc.Prefab)
    dragPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    dropPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    dragTilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    tilePrefab: cc.Prefab = null;

    @property(cc.SpriteFrame)
    dark: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    light: cc.SpriteFrame = null;

    @property(cc.AudioClip)
    truckInAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    truckOutAudio: cc.AudioClip = null

    private currentConfig: RowBlocksConfig = null;

    matchCount: number = 0;

    boardContents: Array<Array<number>> = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    ];

    dragTiles: Map<number, cc.Node> = new Map();
    colorMap: Map<number, cc.Color> = new Map();

    @catchError()
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        this.generateAllSingleSquares();
        const howManyRows: number = Math.floor(this.currentConfig.columns.length / 10);
        var firstDrag: cc.Node = null;
        var firstDrop: cc.Node = null;

        for (let i = 0; i < howManyRows; i++) {
            for (let j = 0; j < 10; j++) {
                const num = i * 10 + j + 1;
                const bg = new cc.Node();
                const bgComp = bg.addComponent(cc.Sprite);
                bg.x = j * tileWidth;
                bg.y = -i * tileHeight;
                bg.anchorX = 0;
                bg.anchorY = 1;
                if (i % 2 == 0) {
                    if (j % 2 == 0) {
                        bgComp.spriteFrame = this.dark;
                    } else {
                        bgComp.spriteFrame = this.light;
                    }
                } else {
                    if (j % 2 == 0) {
                        bgComp.spriteFrame = this.light;
                    } else {
                        bgComp.spriteFrame = this.dark;
                    }
                }
                this.board.addChild(bg);
                this.board.setPosition(new cc.Vec2(this.board.x, cc.winSize.height * 0.75
                    - (howManyRows - 1) * this.board.height));
                const tile = cc.instantiate(this.boardContents[i][j] < 0 ? this.dropPrefab : this.tilePrefab);
                cc.log('tile.name', num.toString());
                tile.name = num.toString();
                tile.x = j * tileWidth;
                tile.y = -i * tileHeight;
                this.board.addChild(tile);

                if (this.boardContents[i][j] < 0) {
                    if (!this.dragTiles.has(this.boardContents[i][j])) {
                        const dragTile = cc.instantiate(this.dragTilePrefab);
                        cc.log('dragTile.name', (-this.boardContents[i][j]).toString());
                        dragTile.name = (-this.boardContents[i][j]).toString();
                        this.dragTiles.set(this.boardContents[i][j], dragTile);
                        this.colorMap.set(-this.boardContents[i][j], new cc.Color().fromHEX(colors[Math.floor(Math.random() * colors.length)]));
                        dragTile.on('thirtypuzzleMatch', this.onMatch, this);
                        dragTile.on('thirtypuzzleNoMatch', () => {
                            this.node.emit('wrong');
                        });

                        if (firstDrag == null) {
                            firstDrag = dragTile;
                            firstDrop = tile;
                        }
                    }
                    this.addToDragTile(-this.boardContents[i][j], num, this.dragTiles.get(this.boardContents[i][j]));
                }
            }
        }

        const truckX = this.truck.x;

        const randomPositions =
            Util.generatePositionsArray(700,
                300, 100, 40);

        new cc.Tween().target(this.truck)
            .set({ x: cc.winSize.width })
            .call(()=>{Util.playSfx(this.truckInAudio)})
            .to(3, { x: truckX }, { progress: null, easing: 'quadOut' })
            .call(() => {
                const anim = this.truck.getComponent(cc.Animation);
                anim.stop();
                let count = 0;
                this.dragTiles.forEach((val, key) => {
                    val.position = cc.v2(cc.winSize.width + 10, -cc.winSize.height / 8);
                    this.node.addChild(val);
                    new cc.Tween().target(val)
                        .delay(Math.random() * 2)
                        .to(0.5, { x: randomPositions[count].x, y: randomPositions[count].y }, {
                            progress: null,
                            easing: 'sineOut'
                        })
                        .start();
                    count++;
                });
                this.scheduleOnce(() => {
                    Drag.letDrag = true;
                    Util.showHelp(firstDrag, firstDrop);
                }, 2.5);
            })
            .start();
    }

    private processConfiguration(data: any[] = []): RowBlocksConfig | null {
        const configurations: any[] = [].concat(...data);
        let [level, workSheet, problem, columnStr, suggestStr, isRandom, problemNumber] = configurations;
        return {
            level,
            workSheet,
            problem,
            columns: columnStr.split(',').map(i => parseInt(i, 10)),
            suggests: suggestStr.split(',').map(i => parseInt(i, 10)),
            isRandom,
            problemNumber
        };
    }

    private onMatch() {
        this.node.emit('correct');
        if (++this.matchCount >= this.dragTiles.size) {
            const anim = this.truck.getComponent(cc.Animation);
            anim.play();
            new cc.Tween().target(this.truck)
                .call(() => {
                    this.truckInAudio = Util.playSfx(this.truckAudio, false, true);
                })
                .delay(2)
                .call(()=>{Util.playSfx(this.truckOutAudio)})
                .to(3, { x: -cc.winSize.width * 2 }, { progress: null, easing: 'quadOut' })
                .call(() => {
                    cc.audioEngine.stop(this.truckAudioId);
                    this.node.emit('nextProblem');
                })
                .start();
        }
    }

    addToDragTile(pos: number, currentPos: number, dragTile: cc.Node) {
        const drag = cc.instantiate(this.dragPrefab);
        drag.name = currentPos.toString();
        drag.x = 0;
        drag.y = (Math.floor((pos - 1) / 10) - Math.floor((currentPos - 1) / 10)) * tileHeight;
        dragTile.addChild(drag);
        if (dragTile.width < drag.x + tileWidth) {
            dragTile.width = drag.x + tileWidth;
        }
        if (dragTile.height < -drag.y + tileHeight) {
            dragTile.height = -drag.y + tileHeight;
        }
        const sprite = drag.getChildByName('sprite');
        if (sprite != null) {
            sprite.color = this.colorMap.get(pos);
        }
    }

    generateAllSingleSquares() { //13
        const howManyRows: number = Math.floor(this.currentConfig.columns.length / 10);
        for (let i = 0; i < howManyRows; i++) {
            for (let j = 0; j < 10; j++) {
                const num = i * 10 + j;
                const eleNum = this.currentConfig.columns[num];
                if (this.currentConfig.suggests.indexOf(eleNum) !== -1)
                    this.boardContents[i][j] = -this.boardContents[i][j];
            }
        }
    }
}
