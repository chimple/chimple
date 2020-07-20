import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../common/scripts/util";
import {
    ADD_BUTTON_HUNDRED,
    ADD_BUTTON_ONE,
    ADD_BUTTON_TEN,
    BLENDER1_NODE,
    BLENDER2_NODE,
    BLENDER3_NODE,
    LAYOUT,
    REMOVE_BUTTON_HUNDRED, REMOVE_BUTTON_ONE, REMOVE_BUTTON_TEN, REMOVED_PLACE_VALUE_ITEM
} from "./blender";
import AddButton from "./add-button";

@ccclass
export default class RemoveButton extends cc.Component {
    @property(cc.AudioClip)
    removeClip: cc.AudioClip = null;
    private _handleClick: boolean = true;

    onLoad() {
        this._handleClick = true;
    }

    onClick(event, customEventData) {
        try {
            let name = '';
            let addButtonNode: cc.Node = null;
            if (this.node.name === REMOVE_BUTTON_HUNDRED) {
                name = BLENDER1_NODE;
                addButtonNode = this.node.parent.getChildByName('add_button_hundred');
            } else if (this.node.name === REMOVE_BUTTON_TEN) {
                name = BLENDER2_NODE;
                addButtonNode = this.node.parent.getChildByName('add_button_ten');
            } else if (this.node.name === REMOVE_BUTTON_ONE) {
                name = BLENDER3_NODE;
                addButtonNode = this.node.parent.getChildByName('add_button_one');
            }
            if (this._handleClick && this.childCount(name) > 0) {
                this.makeInteractable(false);
                this.removeLastChild(name);
                const addButtonComponent = addButtonNode.getComponent(AddButton);
                addButtonComponent.makeInteractable(true);
                this.scheduleOnce(
                    () => {
                        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(REMOVED_PLACE_VALUE_ITEM, true);
                        this.node.dispatchEvent(customEvent);
                        Util.play(this.removeClip, false);
                        this.makeInteractable(true);
                    }, 0.05
                );
            }
        } catch (e) {

        }
    }

    makeInteractable(interactable: boolean) {
        const butComp = this.node.getComponent(cc.Button);
        if (butComp) {
            butComp.interactable = interactable;
            this._handleClick = interactable;
        }
    }

    removeHundredChild() {
        const layout = this.node.parent.parent.getChildByName(BLENDER1_NODE).getChildByName(LAYOUT);
        const children = layout.children || [];
        layout.removeChild(children[children.length - 1]);
    }

    removeTenChild() {
        const layout = this.node.parent.parent.getChildByName(BLENDER2_NODE).getChildByName(LAYOUT);
        const children = layout.children || [];
        layout.removeChild(children[children.length - 1]);
    }

    removeOneChild() {
        const layout = this.node.parent.parent.getChildByName(BLENDER3_NODE).getChildByName(LAYOUT);
        const children = layout.children || [];
        layout.removeChild(children[children.length - 1]);
    }

    removeLastChild(name: string) {
        const layout = this.node.parent.parent.getChildByName(name).getChildByName(LAYOUT);
        const children = layout.children || [];
        layout.removeChild(children[children.length - 1]);

    }

    childCount(name: string) {
        const layout = this.node.parent.parent.getChildByName(name).getChildByName(LAYOUT);
        return layout.children.length;
    }
}
