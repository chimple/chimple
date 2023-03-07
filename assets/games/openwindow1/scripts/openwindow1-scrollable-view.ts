import ccclass = cc._decorator.ccclass;
import EventType = cc.ScrollView.EventType;
import {SCROLL_BEGAN, SCROLL_ENDED} from "./openwindow1";
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class OpenWindow1ScrollableView extends cc.Component {
    @catchError()
    protected onLoad(): void {
        this.bindScrollEventHandler();
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchend', this.onTouchStart, this);
        this.node.off('touchcancel', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchStart, this);
    }

    onTouchStart(touch: cc.Touch) {

    }

    @catchError()
    private bindScrollEventHandler() {
        let scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node; // This node is the node to which your event handler code component belongs
        scrollViewEventHandler.component = "scrollable-view";// This is the code file name
        scrollViewEventHandler.handler = "mapEventHandler";
        const scrollView = this.node.getComponent(cc.ScrollView);
        scrollView.scrollEvents.push(scrollViewEventHandler);
    }

    @catchError()
    mapEventHandler(scrollView, eventType, customEventData) {
        switch (eventType) {
            case EventType.SCROLLING:
                this.node.dispatchEvent(new cc.Event.EventCustom(SCROLL_BEGAN, true));
                break;
            case EventType.SCROLL_ENDED:
                this.node.dispatchEvent(new cc.Event.EventCustom(SCROLL_ENDED, true));

                break;
        }
    }
}
