import ccclass = cc._decorator.ccclass;
import Blender, {
    ADD_BUTTON_HUNDRED,
    ADD_BUTTON_ONE,
    ADD_BUTTON_TEN, BLENDER1_NODE, BLENDER2_NODE, BLENDER3_NODE, LAYOUT,
    MAX_CHILDREN,
    ADDED_PLACE_VALUE_ITEM
} from "./blender";
import property = cc._decorator.property;
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class AddButton extends cc.Component {
    private _layout: cc.Node = null;
    placeValueNode: cc.Node = null;
    private _handleClick: boolean = true;
    @property(cc.AudioClip)
    addClip: cc.AudioClip = null;

    @catchError()
    onLoad() {
        this._handleClick = true;
        this._layout = this.node.parent.getChildByName('layout');
    }

    @catchError()
    check() {
        if (this._handleClick && this.checkIfClickAllowed(this.node, this._layout)) {
            this.makeInteractable(true);
        } else {
            this.makeInteractable(false);
        }
    }

    @catchError()
    onClick(event, customEventData) {
        try {
            this.check();
            if (this._handleClick && this.addClip) {
                this.makeInteractable(false);
                const placeValue2 = this.placeValueNode.getComponent(Blender);
                if (this.node.name === ADD_BUTTON_HUNDRED) {
                    placeValue2.addToHundredContainer(false);
                } else if (this.node.name === ADD_BUTTON_TEN) {
                    placeValue2.addToTenContainer(false);
                } else if (this.node.name === ADD_BUTTON_ONE) {
                    placeValue2.addToOneContainer(false);
                }
                this.scheduleOnce(
                    () => {
                        this.makeInteractable(true);
                        cc.audioEngine.playEffect(this.addClip, false);
                        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(ADDED_PLACE_VALUE_ITEM, true);
                        this.node.dispatchEvent(customEvent);
                    }, 0.05
                );
            }
        } catch (e) {

        }
    }

    @catchError()
    makeInteractable(interactable: boolean, gameCompleted: boolean = false) {
        if(gameCompleted) {
            interactable = false;
        }
        const butComp = this.node.getComponent(cc.Button);
        if (butComp) {
            butComp.interactable = interactable;
            this._handleClick = interactable;
        }
    }

    @catchError()
    hundredCount() {
        return this.node.parent.parent.getChildByName(BLENDER1_NODE).getChildByName(LAYOUT).childrenCount;
    }

    @catchError()
    tenCount() {
        return this.node.parent.parent.getChildByName(BLENDER2_NODE).getChildByName(LAYOUT).childrenCount;
    }

    @catchError()
    oneCount() {
        return this.node.parent.parent.getChildByName(BLENDER3_NODE).getChildByName(LAYOUT).childrenCount;
    }

    @catchError()
    checkIfClickAllowed(self, other) {
        if (self.name === ADD_BUTTON_HUNDRED) {
            return other.children.length < MAX_CHILDREN;
        } else if (self.name === ADD_BUTTON_TEN) {
            return (this.hundredCount() < MAX_CHILDREN
                && other.children.length <= MAX_CHILDREN) || (
                this.hundredCount() === MAX_CHILDREN
                && other.children.length < MAX_CHILDREN);
        } else if (self.name === ADD_BUTTON_ONE) {
            return (this.hundredCount() === MAX_CHILDREN &&
                this.tenCount() === MAX_CHILDREN
                && other.children.length < MAX_CHILDREN ||
                ((this.hundredCount() < MAX_CHILDREN ||
                    this.tenCount() < MAX_CHILDREN)
                    && other.children.length <= MAX_CHILDREN)
            );
        } else {
            return false;
        }
    }
}
