import Profile, { LANGUAGE, SFX_OFF } from "./lib/profile";

import { Util } from "./util";
import Config from "./lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Friend extends cc.Component {
    @property(dragonBones.ArmatureDisplay)
    db: dragonBones.ArmatureDisplay = null

    @property(cc.Button)
    button: cc.Button = null

    helpSpoken: Set<string> = new Set()
    speakFullHelp: boolean = true
    isFace: boolean = false
    extraClip: cc.AudioClip = null
    private helpAudioId: number = -1

    public playHappyAnimation(playTimes: number) {
        this.playAnimation(this.isFace ? 'face_happy' : 'happy', playTimes)
    }

    public playSadAnimation(playTimes: number) {
        this.playAnimation(this.isFace ? 'face_wrong' : 'sad', playTimes)
    }

    public playSpeakAnimation(playTimes: number) {
        this.playAnimation(this.isFace ? 'face_eating' : 'talking', playTimes)
    }

    public playIdleAnimation(playTimes: number) {
        this.playAnimation(this.isFace ? 'face_touch' : 'idle', playTimes)
    }

    public playAnimation(animName: string, playTimes: number) {
        this.db.playAnimation(animName, playTimes)
    }

    public speakHelp(auto: boolean = true) {
        const config = Config.i
        if ((auto
            || (this.speakFullHelp && this.extraClip))
            && this.helpSpoken.has(config.game)) {
            this.speakFullHelp = false
            this.speakExtra()
        } else {
            cc.assetManager.loadBundle(Profile.getValue(LANGUAGE) + '-help', (err, bundle) => {
                if (!err) {
                    bundle.load(config.game, cc.AudioClip, (err, clip) => {
                        if (!err) {
                            this.helpSpoken.add(config.game)
                            this.speakFullHelp = true
                            this.helpAudioId = this.speak(clip, this.speakExtra.bind(this))
                        } else {
                            this.speakExtra()
                        }
                    })
                } else {
                    this.speakExtra()
                }
            })
        }
    }

    public speakExtra(callback: Function = null) {
        this.helpAudioId = this.speak(this.extraClip, callback)
    }

    public speak(clip: cc.AudioClip, callback: Function = null, isSfx: boolean = false, anim: string = null) {
        var audioId = -1
        if (clip && (!isSfx || Profile.getItem(SFX_OFF) == 0)) {
            this.stopAudio()
            audioId = Util.play(clip, false);
            if (audioId != -1) {
                if (anim == null) {
                    this.playSpeakAnimation(0)
                    this.button.interactable = false
                    cc.audioEngine.setFinishCallback(audioId, () => {
                        this.helpAudioId = -1
                        this.playIdleAnimation(1);
                        this.button.interactable = true
                        if (callback) callback()
                    });
                } else {
                    this.playAnimation(anim, 1)
                    if (callback) callback()
                }
            } else {
                if (callback) callback();
            }
        } else {
            if (anim != null) this.playAnimation(anim, 1)
            if (callback) callback()
        }
        return audioId
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
        this.button.interactable = true
        this.helpAudioId = -1
    }

    public stopAnimation(name: string) {
        this.db.armature().animation.stop(name)
    }

    onClick() {
        if (this.helpAudioId == -1) this.speakHelp(false)
    }

    get interactable() : boolean {
        return this.button.interactable
    }

    set interactable(i: boolean) {
        this.button.interactable = i
    }
}
