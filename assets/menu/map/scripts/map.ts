import LevelIndicator from "./level-indicator";
import Config, { Flow } from "../../../common/scripts/lib/config";
import Profile from "../../../common/scripts/lib/profile";
import { ASSET_LOAD_METHOD } from "../../../common/scripts/lib/constants";
import { Util } from "../../../common/scripts/util";
import { LEVEL_FONT_SIZE } from "../../../common/scripts/helper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Map extends cc.Component {

    @property(cc.Node)
    forestMap: cc.Node = null

    @property(cc.Prefab)
    levelCompletedPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    currentLevelPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    unlockedPrefab: cc.Prefab = null;

    @property(cc.Node)
    view: cc.Node = null

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.Node)
    layout: cc.Node = null

    @property(cc.Node)
    block: cc.Node = null

    @property({
        type: cc.Font
    })
    textFont: cc.Font = null;

    @property
    world: number = 0

    @property(cc.AudioClip)
    bgMusic: cc.AudioClip = null

    worlds: Array<number> = []
    balloon: cc.Node = null

    onLoad() {
        // const config = Config.getInstance()
        // const curLevel = Profile.lastLevel
        // const curWorld = Profile.lastWorld
        // var y = 0
        // var up = true
        // var worldWidth = 0
        // const worldLevels = config.currentWorlds()[this.world]
        // const levelsInWorld = worldLevels.length
        // for (let i = 0; i < levelsInWorld; i += 5) {
        //     if (worldWidth != 0) {
        //         const newWorld = cc.instantiate(this.forestMap)
        //         newWorld.x = worldWidth
        //         this.layout.addChild(newWorld)
        //         worldWidth += newWorld.width
        //     } else {
        //         worldWidth += 1024
        //     }
        // }
        // const preWorld = cc.instantiate(this.forestMap)
        // preWorld.x = -preWorld.width
        // preWorld.zIndex = -1
        // this.content.addChild(preWorld)
        // const postWorld = cc.instantiate(this.forestMap)
        // postWorld.x = worldWidth
        // postWorld.zIndex = -1
        // this.content.addChild(postWorld)
        // worldWidth = Math.max(worldWidth, cc.winSize.width)
        // const ctxNode = new cc.Node()
        // const ctx = ctxNode.addComponent(cc.Graphics)
        // this.content.addChild(ctxNode)
        // ctx.lineWidth = 40
        // ctx.strokeColor = cc.Color.WHITE
        // // var lastPoint: cc.Vec2 = null
        // for (let i = 0; i < levelsInWorld; i++) {
        //     const pos = cc.v2((i + 0.5) * worldWidth / levelsInWorld, 400 + Math.sin(i) * 100)
        //     if (i == 0) {
        //         ctx.moveTo(pos.x, pos.y)
        //     } else {
        //         ctx.bezierCurveTo((i - 1 + 0.5 + 0.5) * worldWidth / levelsInWorld,
        //             400 + Math.sin(i - 1 + 0.5) * 100,
        //             (i - 1 + 0.5 + 0.5) * worldWidth / levelsInWorld,
        //             400 + Math.sin(i - 1 + 0.5) * 100,
        //             pos.x,
        //             pos.y)
        //         ctx.stroke()
        //     }
        //     if (this.world < curWorld || (this.world == curWorld && i < curLevel)) {
        //         this.showLevelIndicator(this.content, this.levelCompletedPrefab, pos, this.world, i, true);
        //     } else if (this.world == curWorld && i === curLevel) {
        //         this.showLevelIndicator(this.content, this.currentLevelPrefab, pos, this.world, i, true);
        //     } else {
        //         this.showLevelIndicator(this.content, this.unlockedPrefab, pos, this.world, i, false);
        //     }
        // }
        // const button = this.block.getChildByName('Button')
        // if(button) button.on('click', (button) => {
        //     this.downloadGames()
        // })

        // this.downloadGames();
        // this.layout.parent.width = worldWidth
        // this.node.width = cc.winSize.width
        // this.view.x = -cc.winSize.width / 2
        // this.view.width = cc.winSize.width
        // this.scrollToCurrentLevel()
    }

    // private downloadGames() {
    //     const label = this.block.getChildByName('Label')
    //     var labelComp
    //     if (label) {
    //         labelComp = label.getComponent(cc.Label)
    //         if (labelComp) labelComp.string = Util.i18NText('Downloading games....')
    //     }
    //     const button = this.block.getChildByName('Button')
    //     if(button) button.active = false
    //     const downloadGames = this.getGamesToDownload();
    //     if (downloadGames.size > 0) {
    //         downloadGames.forEach((game) => {
    //             Util.downloadIfNeeded(this.node, game, 0, (success: boolean) => {
    //                 if (success) {
    //                     if (this.getGamesToDownload().size == 0) this.block.active = false;
    //                 } else {
    //                     if (labelComp) labelComp.string = Util.i18NText('Error downloading. Please connect to internet')
    //                     if (button) {
    //                         button.active = true
    //                     }
    //                 }
    //             });
    //         });
    //     } else {
    //         this.block.active = false;
    //     }
    // }

    // getGamesToDownload(): Set<string> {
    //     const storageDir = Config.i.course
    //     const downloadGames: Set<string> = new Set()
    //     const world = Config.i.currentWorlds()[this.world]
    //     world.forEach(level => {
    //         level.forEach(element => {
    //             const game = element[0]
    //             const testFile = storageDir + '/' + game + '/res/' + game + '.json'
    //             if (game != 'run' && game != 'quizliteracy' && game != 'quizmaths'
    //                 && cc.sys.isNative
    //                 && cc.sys.os == cc.sys.OS_ANDROID
    //                 && ASSET_LOAD_METHOD === 'file') {
    //                 if (!jsb.fileUtils.isFileExist(testFile)) downloadGames.add(game)
    //             }
    //         })
    //     })
    //     return downloadGames
    // }

    private showLevelIndicator(node: cc.Node, lPrefab: cc.Prefab, pos: cc.Vec2, world: number, level: number, completed: boolean = false) {
        const lCNode = cc.instantiate(lPrefab);
        const levelIndicator = lCNode.getComponent(LevelIndicator);
        levelIndicator.level = level
        levelIndicator.world = world
        if (Config.getInstance().flow != Flow.Default) {
            levelIndicator.touchable = true
        }
        lCNode.position = pos;
        node.addChild(lCNode);
        Util.initText(lCNode, this.textFont, String(level + 1), LEVEL_FONT_SIZE, '#808080', true, new cc.Vec2(-2.5, 0));
        if (completed) {
            this.balloon = lCNode
        }
    }

    private scrollToCurrentLevel() {
        if (this.balloon != null) {
            const space = this.balloon.getParent().convertToWorldSpace(this.balloon.getPosition());
            const posInView = this.node.convertToNodeSpace(space);
            const scrollView = this.node.getComponent(cc.ScrollView)
            scrollView.scrollToOffset(new cc.Vec2(Math.abs(posInView.x) - cc.winSize.width / 2, 0), 2.0);
        }
    }

    protected onDestroy(): void {
        console.log("map destroy");
        this.node.destroyAllChildren();
        this.node.destroy();
    }

}
