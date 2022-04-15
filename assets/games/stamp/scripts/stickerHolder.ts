import Config from "../../../common/scripts/lib/config";
import { User } from "../../../common/scripts/lib/profile";
import { REWARD_TYPES } from "../../../common/scripts/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StickerHolder extends cc.Component {

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    lock: cc.Node = null;

    rewardArray: string[]

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onClick(event: cc.Event, customEventData: string) {
        User.getCurrentUser().currentReward = this.rewardArray
        Config.i.popAllScenes()
        Config.i.pushScene('menu/start/scenes/start', 'menu', null, true);        
    }
    

    // update (dt) {}
}
