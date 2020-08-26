import Config, { Flow } from "../../../common/scripts/lib/config";
import Profile from "../../../common/scripts/lib/profile";
import { Util, TouchEvents } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelIndicator extends cc.Component {
    @property
    touchable: boolean = true

    level: number;
    world: number
    @property({
        type: cc.AudioClip
    })
    levelsClickAudio: cc.AudioClip = null;

    protected onLoad(): void {
        if (this.touchable) {
            this.node.on(TouchEvents.TOUCH_START, this.onTouchStart, this);
            this.node.on(TouchEvents.TOUCH_END, this.onTouchEnd, this);
        }
    }

    onTouchStart(touch: cc.Touch) {
        new cc.Tween().target(this.node)
            .to(0.5, { scale: 0.9 }, { progress: null, easing: 'elasticOut' })
            .start();
    }


    onTouchEnd(touch: cc.Touch) {
        new cc.Tween().target(this.node)
            .to(0.5, { scale: 1 }, { progress: null, easing: 'elasticOut' })
            .call(() => {
                Util.playSfx(this.levelsClickAudio);
                const config = Config.getInstance();
                // config.level = this.level;
                // config.world = this.world
                if (config.flow != Flow.Default) {
                    Profile.lastWorld = this.world
                    Profile.lastLevel = this.level
                }
                if (config.flow == Flow.Debug) {
                    config.pushScene('menu/home/scenes/games')
                } else {
                    // config.loadAssembleScene(true)
                    config.pushScene('menu/map/scene/submap', 'menu')
                }
            })
            .start();
    }
}
