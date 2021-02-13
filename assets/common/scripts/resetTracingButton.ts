import {RESET_TRACING} from "./helper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResetTracingButton extends cc.Component {
    onLoad() {
        this.node.zIndex = 100;
        this.node.on('touchend', () => {
            this.node.dispatchEvent(new cc.Event.EventCustom(RESET_TRACING, true));
        })
    }
}

