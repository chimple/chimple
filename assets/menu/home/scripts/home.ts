import Config, { Flow } from "../../../common/scripts/lib/config";
import Profile from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";
import UtilLogger from "../../../common/scripts/util-logger";
import Balloon, { BalloonType } from "../../../common/scripts/balloon";
import { LOG_TYPE, APP_START } from "../../../common/scripts/lib/constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    @property(cc.Prefab)
    nestPrefab: cc.Prefab = null

    @property(cc.Node)
    balloons: cc.Node = null

    @property(cc.Prefab)
    balloonPrefab: cc.Prefab = null

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null

    @property(cc.Node)
    logo: cc.Node = null

    @property(cc.Node)
    nest: cc.Node = null

    @property(cc.AudioClip)
    bgMusic: cc.AudioClip = null

    onLoad() {
        const config = Config.getInstance();
        UtilLogger.initPluginFirebase();
        // Profile.fromJson()

        if (cc.sys.isNative)
            jsb.fileUtils.setSearchPaths([
                jsb.fileUtils.getWritablePath() + 'subpackages',
                jsb.fileUtils.getWritablePath() + 'HotUpdateSearchPaths',
                '@assets/subpackages/',
                '@assets/'
            ])
        const log = Object.assign({});
        log[`${LOG_TYPE}`] = APP_START;
        UtilLogger.logEvent(log);

        Util.playSfx(this.bgMusic, true, true)
        const logoY = this.logo.y
        new cc.Tween().target(this.logo)
            .set({ y: cc.winSize.height })
            .to(1, { y: logoY }, { progress: null, easing: 'elasticOut' })
            .start()
        const courseNames = ['en', 'en-maths']
        courseNames.forEach((type, i, arr) => {
            const litNode = cc.instantiate(this.balloonPrefab)
            const lit = litNode.getComponent(Balloon)
            lit.chimp = this.nest.getChildByName('chimp')
            lit.type = BalloonType.Type
            lit.game = type
            lit.onClickCallback = () => {
                const nest = this.node.getChildByName('nest')
                if (nest != null) {
                    const home = nest.getChildByName('home')
                    if (home != null) {
                        const homeButton = home.getComponent(cc.Button)
                        if (homeButton != null) {
                            homeButton.interactable = false
                        }
                    }
                }
                // config.loadCurriculumJson(() => {
                    config.pushScene('menu/map/scene/map' + Profile.lastWorld.toString(), 'menu')
                // })
            //     this.balloons.children.forEach((node) => {
            //         const balloon = node.children[0]
            //         if (balloon != litNode) {
            //             const balloonComp = balloon.getComponent(Balloon)
            //             balloonComp.flyUpUpAndAbove()
            //         }
            //     })
            //     lit.flyToCenter(() =>
            //         lit.jumpChimpToBalloon(() => {
            //             lit.flyZigzag(() =>
            //                 lit.flyUpUpAndAbove(() =>
            //                     config.pushScene('menu/map/scene/map' + Profile.lastWorld.toString())
            //                 )
            //             )
            //             const config = Config.getInstance()
            //             config.course = type
            //             config.loadCurriculumJson(() =>
            //                 Config.preloadScene('menu/map/scene/map' + Profile.lastWorld.toString(), () =>
            //                     lit.stopZigzag = true
            //                 )
            //             )
            //         })
            //     )
            }
            litNode.scale = 0.8
            if (arr.length > 2) {
                const layout = this.balloons.getComponent(cc.Layout)
                if (layout != null) {
                    layout.spacingX = 50
                }
            }
            const tempNode = new cc.Node()
            tempNode.width = litNode.width * 0.8
            tempNode.addChild(litNode)
            this.balloons.addChild(tempNode)
            new cc.Tween().target(litNode)
                .set({ y: cc.winSize.height })
                .delay(1)
                .to(1, { y: 0 }, { progress: null, easing: 'elasticOut' })
                .start()
        })
        const loading = cc.director.getScene().getChildByName('loading')
        if (loading == null) {
            const newLoading = cc.instantiate(this.loadingPrefab)
            newLoading.zIndex = 3
            cc.game.addPersistRootNode(newLoading)
            newLoading.active = false
        } else {
            loading.active = false
        }
    }

    nextFlow() {
        // var flow: string = null
        // switch (Config.getInstance().flow) {
        //     case Flow.Default:
        //         Config.getInstance().flow = Flow.Platformer
        //         flow = 'Platformer'
        //         break;
        //     case Flow.Platformer:
        //         Config.getInstance().flow = Flow.Open
        //         flow = 'Open'
        //         break;
        //     case Flow.Open:
        //         Config.getInstance().flow = Flow.Debug
        //         flow = 'Debug'
        //         break;
        //     case Flow.Debug:
        //         Config.getInstance().flow = Flow.Default
        //         flow = 'Default'
        //         break;
        // }
        // const labelNode = new cc.Node()
        // const label = labelNode.addComponent(cc.Label)
        // label.string = flow
        // this.node.addChild(labelNode)
        // this.scheduleOnce(() => {
        //     this.node.removeChild(labelNode)
        // }, 1)
    }

    onInventoryButtonClicked() {
        Config.getInstance().pushScene("rewards")
    }

    onDestroy() {
        cc.audioEngine.stopMusic();
    }
}

