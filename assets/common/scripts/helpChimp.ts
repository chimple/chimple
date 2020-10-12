import Profile, { LANGUAGE } from "./lib/profile";
import { Util } from "./util";

const { ccclass, property } = cc._decorator;

const X_BORDER = 70
const Y_BORDER = 20

const spoken: Map<string, number> = new Map()

@ccclass
export default class HelpChimp extends cc.Component {
    @property(dragonBones.ArmatureDisplay)
    chimp: dragonBones.ArmatureDisplay = null;

    @property
    helpKey: string = null

    private helpAudioId: number = -1
    private clip: cc.AudioClip

    onLoad() {
        this.node.x = -cc.winSize.width / 2 - X_BORDER
        new cc.Tween().target(this.node)
            .to(0.25, { x: -cc.winSize.width / 2 + X_BORDER }, {})
            .start()
        this.chimp.playAnimation('idle', 0);
        this.node.getComponent(cc.Button).interactable = false
        const name = Profile.getValue(LANGUAGE) + '-help'
        const bundle = Util.bundles.get(name)
        if (bundle) {
            this.loadAndPlay(bundle);
        } else {
            cc.assetManager.loadBundle(name, (err, bundle) => {
                if (!err) {
                    Util.bundles.set(name, bundle)
                    bundle.load(this.helpKey, cc.AudioClip, (err, clip) => {
                        if (!err) {
                            this.loadAndPlay(clip);
                        }
                    })
                }
            })
        }
    }

    private loadAndPlay(clip: any) {
        this.clip = clip;
        if (!spoken.has(this.helpKey)) {
            spoken.set(this.helpKey, 1);
            this.speak();
        }
        else {
            this.node.getComponent(cc.Button).interactable = true;
        }
    }

    speak() {
        if (this.helpAudioId == -1 && this.clip) {
            this.helpAudioId = Util.play(this.clip, false);
            if (this.helpAudioId != -1) {
                this.chimp.armature().animation.stop('idle')
                this.chimp.playAnimation('talking', 0)
                this.getComponent(cc.Button).interactable = false
                cc.audioEngine.setFinishCallback(this.helpAudioId, () => {
                    this.chimp.armature().animation.stop('talking')
                    this.chimp.playAnimation('idle', 0);
                    this.node.getComponent(cc.Button).interactable = true
                    this.helpAudioId = -1
                })
            }
        }
    }

    onDisable() {
        if (this.helpAudioId != -1) {
            cc.audioEngine.stop(this.helpAudioId)
        }
    }
}
