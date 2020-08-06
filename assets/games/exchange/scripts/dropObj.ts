import Drop from "../../../common/scripts/drop";
import { Util } from "../../../common/scripts/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DropObj extends Drop {
    @property(cc.Node)
    animation :cc.Node = null
    
    private _soundName: string = null;

    private _soundClip: cc.AudioClip = null;

    get soundName(): string {
        return this._soundName;
    }

    set soundName(newVal) {
        this._soundName = newVal
        Util.loadGameSound(this._soundName, (clip) => {
            this._soundClip = clip
        })
    }

    onLoad() {
        super.onLoad();
        this.node.on('touchstart', (touch: cc.Touch) => {
            this.playSound()
        }, this);

    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        super.onCollisionEnter(other, self)
        if(this.match) {
            this.playSound()
        }
    }


    playSound() {
        const animNode = this.node.getChildByName('cat_pink_ske')
        if(animNode != null) {
            const animation = animNode.getComponent(dragonBones.ArmatureDisplay).armature().animation
            animation.stop()
            animation.play('talk', 1)
        }
        if(this._soundClip != null) {
            Util.play(this._soundClip, false)
        }
    }
}
