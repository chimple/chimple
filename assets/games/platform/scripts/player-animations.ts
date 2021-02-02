import {PlatformPlayer} from "./platform-player";

export const walking = "walking";
export const idle = "idle";
export const happy = "happy";
export const sad = "sad";
export const jump = "jump";
export const falling = "falling";
export const squash = "squash";
export const collide = "collide";

export class PlayerAnimations {
    private _player: PlatformPlayer;
    private _body: cc.RigidBody;
    private _anim: cc.Animation;
    private _currentAnimState: string;
    private _prevAnimState: string;

    constructor(player: PlatformPlayer, body: cc.RigidBody, anim: cc.Animation) {
        this._player = player;
        this._body = body;
        this._anim = anim;
    }

    animate(): void {
        // if (this._player.walking) {
        //     this.animState(walking, true);
        //     return;
        // } else if (this._player.idle) {
        //     this.animState(idle, true);
        //     return;
        // } else if(this._player.jumping) {
        //     this.animState(jump, false);
        // } else if(this._player.falling) {
        //     this.animState(falling, false, this.fallCondition());
        // }
    }

    private fallCondition() {
        return this._currentAnimState !== jump
    }

    private reset() {
        this._anim.stop();
        this._currentAnimState = null;
    }

    private animState(state: string, isLooped: boolean = true, shouldPlay: boolean = true) {
        if (shouldPlay && this._currentAnimState !== state) {
            this._prevAnimState = this._currentAnimState;
            this.reset();
            this._currentAnimState = state;
            const aState = this._anim.play(state);
            if (isLooped) {
                aState.wrapMode = cc.WrapMode.Loop;
                aState.repeatCount = Infinity;
            }
        }
    }


    // getters, setters

    get currentAnimState() {
        return this._currentAnimState;
    }

    set currentAnimState(state: string) {
        this._currentAnimState = state;
    }

}
