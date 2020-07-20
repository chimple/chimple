import { Platformer } from "./platformer";
import { Reward } from "./reward";
import GameController, { OverEvent, LOG_TYPE, FAIL_TO_COLLECT_ALL_REWARDS, LOG_WORLD, LOG_LEVEL, COURSE } from "../../common/scripts/gameController";
import UtilLogger from "../../common/scripts/util-logger";
import Config, { Flow, BRIDGE_NAME } from "../../common/scripts/lib/config";
import Profile from "../../common/scripts/lib/profile";
import RewardsMonitor, { ALL_REWARDS_COLLECTED } from "./rewardsMonitor";
import { Util, TouchEvents } from "../../common/scripts/util";
import Balloon from "../../common/scripts/balloon";

const { ccclass, property } = cc._decorator;

const LEVEL_MAP = [
    'map1',
    'map2',
    'map3',
    'map4',
    'map5'
];

const REWARD_COLLECTED_EXPIRED_TIME = 30;

const PLAYING_MAP = [
    'map0'
];

const BALLOON_WIDTH = 384;

enum RewardStatus {
    Collecting,
    Finished,
    TimedOut,
    Idle
}

@ccclass
export default class Assemble extends cc.Component {

    @property(cc.Prefab)
    gameController: cc.Prefab = null;

    @property(cc.Prefab)
    map0: cc.Prefab = null;

    @property(cc.Prefab)
    map1: cc.Prefab = null;

    @property(cc.Prefab)
    map2: cc.Prefab = null;

    @property(cc.Prefab)
    map3: cc.Prefab = null;

    @property(cc.Prefab)
    map4: cc.Prefab = null;

    @property(cc.Prefab)
    map5: cc.Prefab = null;

    @property(cc.AudioClip)
    bgMusic: cc.AudioClip = null;

    @property(cc.Prefab)
    filler: cc.Prefab = null;

    @property(cc.Prefab)
    gameBoard: cc.Prefab = null;

    @property(cc.Prefab)
    levelBoard: cc.Prefab = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.AudioClip)
    startAudio: cc.AudioClip = null;

    @property(cc.Prefab)
    balloon: cc.Prefab = null;

    @property(cc.Prefab)
    reward: cc.Prefab = null;

    @property(cc.Prefab)
    displayCollectReward: cc.Prefab = null;

    @property(cc.Prefab)
    displayCollectLabel: cc.Prefab = null;

    displayImage: cc.SpriteFrame = null;

    bridgeNode: cc.Node;
    chimp: cc.Node = null;
    world: cc.Node;

    x: number = 0;
    gameIndex: number = 0;
    cameraNode: cc.Node = null;
    rewardStatus: RewardStatus = RewardStatus.Idle;
    numScreens: number = 1;
    stopScrollX: number = 10 * cc.winSize.width;
    balloonMode: boolean = false;

    rewardsMonitor: cc.Node = null;
    randomFruitNumber: number = -1;
    _pickLetters: string[] = [];
    _showLetters: string[] = [];
    _alphabetCollectMode: boolean = false;

    protected onLoad(): void {
        const config = Config.getInstance();
        if (config.currentLevelGames()
            .filter(val => val[0] != 'run')
            .every((val) => {
                return Profile.isGameCompleted(config.world, config.level, val[0]);
            })) {
            config.currentLevelGames()
                .filter(val => val[0] != 'run')
                .forEach((val) => {
                    Profile.setGameCompleted(config.world, config.level, val[0], false);
                });
        }
        this.configureRewards();
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        this.player.zIndex = 1;
        this.player.x = cc.winSize.width / 2;
        this.player.y = cc.winSize.height / 2;
        this.world = this.node.getChildByName('world');
        this.world.x = -cc.winSize.width / 2;
        this.world.y = -cc.winSize.height / 2;
        this.cameraNode = this.node.getChildByName('Main Camera');
        this.showChimp(true);
        switch (config.flow) {
            case Flow.Debug:
                this.debugFlowPlay();
                break;
            case Flow.Platformer:
                this.platformFlowPlay();
                break;
            default:
                this.immediatePlay();
                break;
        }
    }

    private debugFlowPlay() {
        this.addBridge();
        this.player.active = false;
        const newBridge = cc.instantiate(this.bridgeNode);
        newBridge.x = 0;
        const config = Config.getInstance();
        var ground: number = config.gameConfigs[config.game].ground;
        if (ground == null) {
            ground = 0;
        }
        newBridge.y = ground - 256;
        newBridge.zIndex = -1;
        newBridge.name = BRIDGE_NAME;
        cc.game.addPersistRootNode(newBridge);
        const gameController = cc.instantiate(this.gameController);
        gameController.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        const gameControllerComp = gameController.getComponent(GameController);
        cc.game.addPersistRootNode(gameController);
        gameControllerComp.problemStart(true, () => gameControllerComp.loadGameScene());
    }

    private immediatePlay() {
        if (Config.i.overEvent == OverEvent.GameOver || Config.i.overEvent == OverEvent.None) {
            Config.i.overEvent = OverEvent.None
            this.rewardsMonitor = cc.find('RewardsMonitor')
            if (this.rewardsMonitor) this.rewardsMonitor.active = false
            const config = Config.i
            this.addBridge();
            this.player.active = false;
            const currentGame = config.currentLevelGames().find(val => val[0] != 'run' && !Profile.isGameCompleted(config.world, config.level, val[0]));
            if (currentGame) {
                const gameName = currentGame[0]
                const gameLevel = parseInt(currentGame[1])
                config.setGame(gameName, gameLevel);
                const newBridge = cc.instantiate(this.bridgeNode);
                newBridge.x = 0;
                var ground: number = config.gameConfigs[config.game].ground;
                if (ground == null) {
                    ground = 0;
                }
                newBridge.y = ground - 256;
                newBridge.zIndex = -1;
                newBridge.name = BRIDGE_NAME;
                cc.game.addPersistRootNode(newBridge);

                const bal = cc.instantiate(this.balloon);
                const balloonComp = bal.getComponent(Balloon);
                if (balloonComp != null) {
                    balloonComp.chimp = this.chimp;
                    this.chimp.removeFromParent(false)
                    this.chimp.position = cc.Vec2.ZERO
                    balloonComp.seat.addChild(this.chimp)
                    balloonComp.game = gameName;
                    if (config.gameConfigs[gameName].color != null) {
                        balloonComp.color = new cc.Color().fromHEX(config.gameConfigs[gameName].color);
                    }
                    balloonComp.label.string = config.gameConfigs[gameName].name;
                    balloonComp.done = Profile.isGameCompleted(config.world, config.level, gameName);
                    balloonComp.onClickCallback = () => {
                        const gameController = cc.instantiate(this.gameController);
                        gameController.setPosition(cc.winSize.width / 2, cc.winSize.height);
                        const gameControllerComp = gameController.getComponent(GameController);
                        cc.game.addPersistRootNode(gameController);
                        gameControllerComp.problemStart(true, () => balloonComp.stopZigzag = true);
                        balloonComp.flyZigzag(() => {
                            balloonComp.flyToNest(() => {
                                gameController.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                                gameControllerComp.loadGameScene();
                            });
                        });
                    };
                    bal.x = cc.winSize.width / 2;
                    bal.y = - cc.winSize.height;
                    cc.director.getScene().addChild(bal);
                    bal.zIndex = 5;

                    new cc.Tween().target(bal)
                        .to(1, { y: 50 }, null)
                        .start();

                }
            }
        } else {
            this.rewardStatus = RewardStatus.Collecting
            this.platformFlowPlay()
        }
    }

    private createRewardMonitor() {
        this.rewardsMonitor = cc.find('RewardsMonitor');
        const rewardMonitorComponent = this.rewardsMonitor.getComponent(RewardsMonitor);
        if (this.rewardsMonitor !== null) {
            this.rewardsMonitor.on(ALL_REWARDS_COLLECTED, () => {
                // all rewards collected
                if (this.rewardStatus == RewardStatus.Collecting) {
                    cc.log('ALL_REWARDS_COLLECTED');
                    this.rewardStatus = RewardStatus.Finished;
                    this.afterRewardsCollected();
                }
            });
            if (this._alphabetCollectMode) {
                rewardMonitorComponent.alphabetCollectMode = true;
                rewardMonitorComponent.alphabetToCollect = this.pickLetters[0];
            } else {
                rewardMonitorComponent.alphabetCollectMode = false;
                this.randomFruitNumber = Util.randomBetween(1, 10);
                const rewardNode = cc.instantiate(this.reward);
                if (!!rewardNode) {
                    const reward = rewardNode.getComponent(Reward);
                    rewardMonitorComponent.shadowImage = reward['r' + this.randomFruitNumber];
                    this.displayImage = reward['r' + this.randomFruitNumber];
                }
            }
        }
    }

    private platformFlowPlay() {
        this.chimp.active = false;
        this.createRewardMonitor();
        this.rewardsMonitor.active = true;
        Util.playSfx(this.bgMusic, true, true);
        if (Config.getInstance().overEvent == OverEvent.GameOver) {
            this.addBridge();
        } else {
            this.addPath(true, 1);
        }
        this.addPath(false, 1);

        // show current reward as collect item
        if (this._alphabetCollectMode) {
            const displayCollectReward: cc.Node = cc.instantiate(this.displayCollectLabel);
            if (!!displayCollectReward) {
                const chimpleNode = displayCollectReward.getChildByName('rewardCollect');
                const label = chimpleNode.getComponent(cc.Label);
                label.string = this.pickLetters[0];
                displayCollectReward.opacity = 255;
                displayCollectReward.scale = 1.0;
                displayCollectReward.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                cc.director.getScene().addChild(displayCollectReward);

                this.scheduleOnce(() => {
                    displayCollectReward.opacity = 0;
                    displayCollectReward.removeFromParent(false);
                }, 2);

            }
        } else {
            const displayCollectReward: cc.Node = cc.instantiate(this.displayCollectReward);
            if (displayCollectReward) {
                const spriteNode = displayCollectReward.getChildByName('rewardCollect');
                const sprite = spriteNode.getComponent(cc.Sprite);
                spriteNode.scale = 2.0;
                sprite.spriteFrame = this.displayImage;
                displayCollectReward.opacity = 255;
                displayCollectReward.scale = 1.0;
                displayCollectReward.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                cc.director.getScene().addChild(displayCollectReward);
                this.scheduleOnce(() => {
                    const anim = displayCollectReward.getComponent(cc.Animation);
                    anim.play('displaycollectreward');
                    anim.on('finished', () => {
                        displayCollectReward.opacity = 0;
                        displayCollectReward.removeFromParent(false);
                    });
                }, 1);

            }
        }

        // start timer for REWARD_COLLECTED_EXPIRED_TIME
        this.scheduleOnce(
            () => {
                if (this.rewardStatus == RewardStatus.Collecting) {
                    this.rewardStatus = RewardStatus.TimedOut;
                    const config = Config.getInstance();
                    const log = Object.assign({});
                    log[`${LOG_TYPE}`] = FAIL_TO_COLLECT_ALL_REWARDS;
                    log[`${LOG_WORLD}`] = config.world;
                    log[`${LOG_LEVEL}`] = config.level;
                    log[`${COURSE}`] = config.course;
                    UtilLogger.logEvent(log);
                    this.afterRewardsCollected();
                }
            }, REWARD_COLLECTED_EXPIRED_TIME
        );
    }

    private configureRewards() {
        const config = Config.getInstance();
        const gameLevels: string[] = config.currentLevelGames();
        const runConfig = gameLevels.filter(gl => gl[0] === 'run');
        if (!!runConfig && Array.isArray(runConfig) && runConfig.length > 0) {
            this._alphabetCollectMode = true;
            let r = runConfig[0];
            if (!!r && r.length === 3) {
                this._pickLetters = [].concat(r[1].split(','));
                this._showLetters = [].concat(r[2].split(','));
            }
        }
        cc.log('pick letters:', this._pickLetters);
        cc.log('show letters:', this._showLetters);
    }

    private addPlatform(isPlaying: boolean, count: number) {
        const levelPrefabs = isPlaying ? PLAYING_MAP : LEVEL_MAP;
        for (let index = 0; index < count; index++) {
            const node1 = cc.instantiate(this[levelPrefabs[Math.floor(Math.random() * levelPrefabs.length)]]);
            node1.setPosition(this.x, 0);
            this.world.addChild(node1);
            this.x += node1.width;
        }
    }

    private afterRewardsCollected() {
        cc.audioEngine.stopMusic();
        Util.playSfx(this.startAudio);
        const config = Config.getInstance();
        this.addBridge();
        this.player.active = false;
        this.node.off(TouchEvents.TOUCH_START)
        this.node.off(TouchEvents.TOUCH_END)
        const overEvent = Config.i.overEvent
        Config.i.overEvent = OverEvent.None
        if (overEvent == OverEvent.WorldOver) {
            const worldNum = config.world + 1;
            cc.resources.load('prefabs/world_over/world_over_' + worldNum, function (err, prefab) {
                if (prefab != null) {
                    var newNode = cc.instantiate(prefab);
                    cc.director.getScene().addChild(newNode);
                    const worldover_tag = newNode.getChildByName('worldover_tag');
                    if (worldover_tag != null) {
                        const label = worldover_tag.getChildByName('label');
                        if (label != null) {
                            const labelComp = label.getComponent(cc.Label);
                            labelComp.string = Util.i18NText('New World Unlocked');
                        }
                    }
                    config.prePopScene(null);
                    new cc.Tween().target(newNode)
                        .set({ x: cc.winSize.width / 2 })
                        .to(0.5, { position: cc.v2(cc.winSize.width / 2, cc.winSize.height / 2) }, null)
                        .delay(3)
                        .to(0.5, { position: cc.v2(cc.winSize.width / 2, cc.winSize.height) }, null)
                        .call(() => config.popScene())
                        .start();
                } else {
                    config.popScene();
                }
            });
        } else {
            this.chimp.active = true;
            this.chimp.position = this.chimp.parent.convertToNodeSpaceAR(this.player.convertToWorldSpaceAR(cc.Vec2.ZERO));
            const bal = cc.instantiate(this.balloon);
            const balloonComp = bal.getComponent(Balloon);
            if (balloonComp != null) {
                balloonComp.chimp = this.chimp;
                if (config.gameConfigs[config.game].color) balloonComp.color = new cc.Color().fromHEX(config.gameConfigs[config.game].color);    
                balloonComp.label.string = Util.i18NText(overEvent == OverEvent.LevelOver
                    ? 'New Level Unlocked' : overEvent == OverEvent.LevelRepeat
                        ? 'Repeat Level' : 'Game Over');
                balloonComp.onClickCallback = () => {
                    config.prePopScene(() => balloonComp.stopZigzag = true);
                    balloonComp.flyZigzag(() => new cc.Tween().target(bal)
                        .to(0.5, { position: cc.v2(cc.winSize.width / 2, 600) }, null)
                        .call(() => config.popScene())
                        .start()
                    );
                };
            }
            bal.x = cc.winSize.width / 2;
            bal.y = cc.winSize.height;
            cc.director.getScene().addChild(bal);
            bal.zIndex = 5;

            new cc.Tween().target(bal)
                .to(1, { y: 50 }, null)
                .call(() => {
                    balloonComp.jumpChimpToBalloon(() => {
                        const db = this.chimp.getComponent(dragonBones.ArmatureDisplay);
                        if (db != null)
                            db.playAnimation('eating', 1);
                    });
                })
                .delay(2)
                .call(() => {
                    balloonComp.onBalloonClick();
                })
                .start();
        }

    }

    private addPath(isPlaying: boolean, count: number) {
        this.addPlatform(isPlaying, count);
        this.stopScrollX = this.x;
    }

    private addBridge() {
        this.bridgeNode = new cc.Node();
        this.bridgeNode.setPosition(this.x, 0);
        this.bridgeNode.setAnchorPoint(0, 0);
        while (this.bridgeNode.width < cc.winSize.width) {
            const endFillerNode = cc.instantiate(this.filler);
            endFillerNode.setPosition(this.bridgeNode.width, -192);
            this.bridgeNode.addChild(endFillerNode);
            this.bridgeNode.width += endFillerNode.width;
        }
        this.x += this.bridgeNode.width;
        this.world.addChild(this.bridgeNode);
    }

    onDestroy() {
        cc.audioEngine.stopMusic();
    }

    private showChimp(show: boolean) {
        const nest = cc.director.getScene().getChildByName('nest');
        if (nest != null) {
            this.chimp = nest.getChildByName('chimp');
            if (this.chimp != null) {
                this.chimp.active = show;
            }
        }
    }

    protected lateUpdate(): void {
        if (this.rewardStatus == RewardStatus.Collecting && this.world.x > -this.stopScrollX - cc.winSize.width * 1 / 4) {
            const currentWorldX = this.world.x;
            this.world.x = -this.player.x - cc.winSize.width * 1 / 4;
            this.node.getComponent(Platformer).scrollLayersInParallax(this.world.x - currentWorldX);
            if (-this.world.x / 1024 > this.numScreens) {
                this.numScreens++;
                this.addPath(false, 1);
            }
        }
    }

    get pickLetters(): string[] {
        return this._pickLetters;
    }

    set pickLetters(newVal) {
        this._pickLetters = newVal;
    }

    get showLetters(): string[] {
        return this._showLetters;
    }

    set showLetters(newVal) {
        this._showLetters = newVal;
    }

    get alphabetCollectMode(): boolean {
        return this._alphabetCollectMode;
    }
}
