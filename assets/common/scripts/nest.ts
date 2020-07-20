import Config, { Flow } from "./lib/config";
import { Util } from "./util";
import Profile, { SFX_OFF } from "./lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Nest extends cc.Component {
    @property(cc.Node)
    chimp: cc.Node = null

    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null

    @property(cc.Button)
    homeButton: cc.Button = null

    @property(cc.Node)
    backButton: cc.Node = null

    @property(cc.Node)
    settingsButton: cc.Node = null

    @property(cc.SpriteFrame)
    soundEnable: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    soundDisable: cc.SpriteFrame = null

    @property({
        type: cc.AudioClip
    })
    backButtonAudio: cc.AudioClip = null;

    isOpen: boolean = false

    isTrasitioning: boolean = false
    numClicks: number = 0
    gameNode: cc.Node = null

    onLoad() {
        this.node.zIndex = 4
        this.setSfxButton();
        const config = Config.getInstance()
        if (config.flow == Flow.Debug && config.hasPersistentNodes()) {
            const node = new cc.Node()
            const label = node.addComponent(cc.Label)
            label.string = config.gameLevel.toString() + '-' + config.worksheet.toString()
            node.y = 48
            this.node.addChild(node)
        }
    }

    onDisable() {
        this.chimp.active = true
    }

    onSettingsClicked(event, customEventData) {
        if (!this.isTrasitioning) {
            this.isTrasitioning = true
            const sfxOff = Profile.getItem(SFX_OFF) == 0
            let activeComp = null;
            try {
                // if (activeComp == null && this.node.getParent().getParent() != null)
                //     activeComp = this.node.getParent().getParent().getChildByName("Canvas").getComponent(Home);
                // if (activeComp == null)
                //     activeComp = this.node.getParent().getChildByName("Platform").getComponent(Assemble);
            } catch (e) {

            }
            Profile.setItem(SFX_OFF, sfxOff ? 1 : 0)
            if (sfxOff)
                cc.audioEngine.stopMusic()
            else if (activeComp != null)
                Util.playSfx(activeComp.bgMusic, true, true);
            this.setSfxButton()
            this.goBack()
        }
    }

    setSfxButton() {
        const sprite = this.settingsButton.getComponent(cc.Sprite)
        sprite.spriteFrame = Profile.getItem(SFX_OFF) == 0 ? this.soundEnable : this.soundDisable
    }

    onButtonClick(event, customEventData) {
        if (!this.isTrasitioning) {
            this.isTrasitioning = true
            // if (++this.numClicks >= 6 && this.gameNode) {
            //     this.numClicks = 0
            //     this.gameNode.emit('nextProblem')
            // }
            if (this.isOpen) {
                this.goBack();
            } else {
                this.isOpen = true
                const block = cc.instantiate(this.blockPrefab)
                const widgetComp = block.getComponent(cc.Widget)
                widgetComp.target = cc.director.getScene()
                block.on('touchstart', this.onButtonClick, this)
                this.node.insertChild(block, 0)
                if (Config.getInstance().canPop) {
                    new cc.Tween().target(this.backButton)
                        .to(0.5, { x: -300 }, { progress: null, easing: 'elasticOut' })
                        .start()
                }
                new cc.Tween().target(this.settingsButton)
                    .to(0.5, { x: -200 }, { progress: null, easing: 'elasticOut' })
                    .call(() => {
                        // cc.game.pause()
                        cc.director.pause()
                        this.isTrasitioning = false
                    })
                    .start()
            }
        }
    }

    onBackClick(event, customEventData) {
        if (!this.isTrasitioning) {
            this.isTrasitioning = true
            this.goBack(() => {
                // call back sound here
                Util.playSfx(this.backButtonAudio);
                this.homeButton.interactable = false
                Config.getInstance().popScene()
            })
        }
    }

    private goBack(callback: Function = null) {
        // cc.game.resume()
        cc.director.resume()
        new cc.Tween().target(this.backButton)
            .to(0.5, { x: 0 }, { progress: null, easing: 'elasticIn' })
            .call(() => {
                this.node.removeChild(this.node.children[0])
                this.isOpen = false
                this.isTrasitioning = false
                if (callback != null) {
                    callback()
                }
            })
            .start();
        new cc.Tween().target(this.settingsButton)
            .to(0.5, { x: 0 }, { progress: null, easing: 'elasticIn' })
            .call(() => {
                //
            })
            .start();
    }
}

