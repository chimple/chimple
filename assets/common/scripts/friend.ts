import Profile, { LANGUAGE } from "./lib/profile";

import { Util } from "./util";
import Config from "./lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Friend extends cc.Component {
    @property(dragonBones.ArmatureDisplay)
    db: dragonBones.ArmatureDisplay = null

    @property(cc.Button)
    button: cc.Button = null

    isFace: boolean = false
    extraClip: cc.AudioClip = null
    helpAudioId: number = -1

    public playHappyAnimation(playTimes: number) {
        this.playAnimation(this.isFace? 'face_happy':'happy', playTimes)
    }

    public playSadAnimation(playTimes: number) {
        this.playAnimation(this.isFace? 'face_wrong':'sad', playTimes)
    }

    public playSpeakAnimation(playTimes: number) {
        this.playAnimation(this.isFace? 'face_eating':'talking', playTimes)
    }

    public playIdleAnimation(playTimes: number) {
        this.playAnimation(this.isFace? 'face_touch':'idle', playTimes)
    }

    public playAnimation(animName: string, playTimes: number) {
        this.db.playAnimation(animName, playTimes)
    }

    public speakHelp(callback: Function = null) {
        const extraCallback = () => {
            if (this.extraClip) {
                this.speak(this.extraClip, callback)
            } else {
                if (callback) callback()
            }
        }
        cc.assetManager.loadBundle(Profile.getValue(LANGUAGE) + '-help', (err, bundle) => {
            if (!err) {
                bundle.load(Config.i.game, cc.AudioClip, (err, clip) => {
                    if (!err) {
                        this.speak(clip, extraCallback)
                    } else {
                        extraCallback()
                    }
                })
            } else {
                extraCallback()
            }
        })
    }

    public speakExtra(callback: Function = null) {
        this.speak(this.extraClip, callback)
    }

    public speak(clip: cc.AudioClip, callback: Function = null) {
        if (clip) {
            this.helpAudioId = Util.play(clip, false);
            if (this.helpAudioId != -1) {
                this.playSpeakAnimation(0)
                this.button.interactable = false
                cc.audioEngine.setFinishCallback(this.helpAudioId, () => {
                    this.playIdleAnimation(1);
                    this.button.interactable = true
                    if (callback) callback()
                });
            } else {
                if (callback) callback();
            }
        } else {
            if (callback) callback()
        }
    }

    public speakGameAudioOrPhonics(audio: string, callback: Function) {
        const extraCallback = (index: number) => {
            this.playIdleAnimation(1);
            this.button.interactable = true
            callback(index)
        }
        this.playSpeakAnimation(0)
        this.button.interactable = false
        Util.speakGameAudioOrPhonics(audio, extraCallback)        
    }

    public speakEquation(nums: Array<string>, callback: (index: number) => void) {
        const extraCallback = (index: number) => {
            if (index + 1 >= nums.length) {
                this.playIdleAnimation(1);
                this.button.interactable = true
            }
            callback(index)
        }
        this.playSpeakAnimation(0)
        this.button.interactable = false
        Util.speakEquation(nums, extraCallback)
    }

    public speakPhonicsOrLetter(audio: string, callback: Function) {
        const extraCallback = (index: number) => {
            this.playIdleAnimation(1);
            this.button.interactable = true
            callback(index)
        }
        this.playSpeakAnimation(0)
        this.button.interactable = false
        Util.speakPhonicsOrLetter(audio, extraCallback)
    }

    public stopAudio() {
        try {
            cc.audioEngine.stopEffect(this.helpAudioId);
        } catch (e) {
            cc.log(e);
        }
        return this.helpAudioId;
    }

    public stopAnimation(name: string) {
        this.db.armature().animation.stop(name)
    }

    public showHelp(
        from: cc.Node,
        to: cc.Node,
        callBack: Function = null,
        playAudio: boolean = true
    ) {
        const config = Config.getInstance();
        const lessonNode = cc.Canvas.instance.node
        if (config.problem == 1) {
            if (from != null && to != null) {
                cc.resources.load("prefabs/help", function (err, prefab) {
                    if (!err) {
                        const help = cc.instantiate(prefab);
                        // @ts-ignore
                        const helpComp = help.getComponent(Help);
                        if (helpComp != null) {
                            helpComp.initNodes(from, to, callBack);
                        }
                        // @ts-ignore
                        lessonNode.addChild(help);
                    }
                });
            }
        }
        if (playAudio) {
            this.speakHelp(callBack)
        } else {
            if (callBack != null) callBack();
        }
    }

    onClick() {
        this.speakHelp()
    }


}
