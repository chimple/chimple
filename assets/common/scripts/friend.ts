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
    helpAudioId: number = -1

    // onLoad () {}

    public playAnimation(animName: string, playTimes: number) {
        this.db.playAnimation(animName, playTimes)
    }

    public talkHelp(callback: Function = null) {
        this.db.playAnimation("talking_long", 0)
        this.button.interactable = false
        this.playHelpAudio(
            Config.i.game,
            () => {
                this.db.playAnimation("idle", 1);
                this.button.interactable = true
                if(callback) callback();
            }
        );
    }

    public talk(clip: cc.AudioClip, callback: Function) {
        this.db.playAnimation("talking_long", 0)
        this.button.interactable = false
        if(clip) {
            this.helpAudioId = Util.play(clip, false);
            if (this.helpAudioId != -1) {
                cc.audioEngine.setFinishCallback(this.helpAudioId, callback);
            } else {
                callback();
            }

        }
    }

    public playHelpAudio(audio: string, callback: Function) {
        cc.assetManager.loadBundle(Profile.getValue(LANGUAGE) + '-help', (err, bundle) => {
            if (!err) {
                bundle.load(audio, cc.AudioClip, (err, clip) => {
                    if (!err) {
                        this.helpAudioId = Util.play(clip, false);
                        if (this.helpAudioId != -1) {
                            cc.audioEngine.setFinishCallback(this.helpAudioId, callback);
                        } else {
                            callback();
                        }
                    } else {
                        callback()
                    }
                })
            } else {
                callback()
            }
        })
    }

    public stopHelpAudio() {
        try {
            cc.audioEngine.stopEffect(this.helpAudioId);
        } catch (e) {
            cc.log(e);
        }
        return this.helpAudioId;
    }

    onClick() {
        this.talkHelp()
    }


}
