import ccclass = cc._decorator.ccclass;
import { StoryPage } from "./story-page";
import catchError from "../../../common/scripts/lib/error-handler";

let handleClick: boolean = true;
@ccclass
export default class NavButton extends cc.Component {
    @catchError()
    onLoad() {
        handleClick = true;
    }

    @catchError()
    onClick(event, customEventData) {
        if (handleClick) {
            handleClick = false;
            const storyComponent = this.node.parent.getComponent(StoryPage);
            storyComponent.changePage(Number(customEventData));
        }
    }
}
