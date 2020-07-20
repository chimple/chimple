import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Vec2 = cc.Vec2;
import {Platformer} from "./platformer";
import { TouchEvents } from "../../common/scripts/util";


@ccclass
export class CamraMovement extends cc.Component {
    camera: cc.Camera;

    @property(cc.Node)
    player: cc.Node = null;

    @property(Platformer)
    platformer: Platformer = null

    stopScrollX: number = 10 * cc.winSize.width;
    startGameX: number = 0;
    numScreens: number = 1

    private _gameMode: boolean = false;

    get gameMode(): boolean {
        return this._gameMode;
    }

    set gameMode(newVal) {
        this._gameMode = newVal;
    }


    protected onLoad(): void {
        this.camera = this.getComponent(cc.Camera);
        if (this.node) {
            this.node.on(TouchEvents.TOUCH_START, this.onTouchStart, this);
            this.node.on(TouchEvents.TOUCH_END, this.onTouchEnded, this);

        }
    }

    onTouchStart(touch: cc.Touch) {
    }


    onTouchEnded(touch: cc.Touch) {
    }

    // protected lateUpdate(): void {
    //     // if (!this._gameMode) {
    //     if (!this._gameMode) {
    //         if (this.node.position.x < this.stopScrollX) {
    //             let targetPos = this.player.convertToWorldSpaceAR(new Vec2(0, 0));
    //             let newPos = this.node.parent.convertToNodeSpaceAR(targetPos);
    //             if (newPos.x > this.node.position.x) {
    //                 this.platformer.scrollLayersInParallax(this.node.position.x - newPos.x)
    //                 if(newPos.x / 1024 > this.numScreens) {
    //                     this.numScreens++
    //                     this.node.emit('screenOver')
    //                 }
    //                 this.node.position = new cc.Vec2(newPos.x, 0);
    //             }
    //         } else {
    //             this.node.emit('waitStart');
    //         }
    //     }
    // }
}
