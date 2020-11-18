import Drag from "../../../../common/scripts/drag";
import MathDrop from "./math-drop";

const {ccclass, property} = cc._decorator;

export const MATH_MATCH = 'MATH_MATCH';
export const MATH_NO_MATCH = 'MATH_NO_MATCH';

let handleClick: boolean = true;

@ccclass
export default class MathDrag extends Drag {
    matchIndex: string = '';

    onLoad() {
        super.onLoad();
        handleClick = true;
    }

    onTouchStart(touch: cc.Touch) {
        if (handleClick) {
            Drag.letDrag = true;
            super.onTouchStart(touch);
            handleClick = false;
        }
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch);
        if (this.match) {
            this.match = false;
        }

    }

    onMatchOver() {
        this.isDragging = false;
        Drag.letDrag = true;
        this.enableTouch();
        handleClick = true;
        this.allowDrag = true;
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(MATH_MATCH, true);
        const matchGroups = this.matchingNode.name.split('_');
        const value = matchGroups[0];
        this.matchIndex = matchGroups[1];
        customEvent.setUserData({
            isCorrect: this.node.name === value,
            drop     : value + '_' + this.matchIndex
        });
        this.node.dispatchEvent(customEvent);
    }

    collisionEnterCondition(self, other) {
        return !this.match;
    }

    onReturnBackOnNoMatch() {
        super.onReturnBackOnNoMatch();
        handleClick = true;
        this.mathNoMatchEvent();
    }

    mathNoMatchEvent() {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(MATH_NO_MATCH, true);
        customEvent.setUserData({
            drop: this.node.name + '_' + this.matchIndex
        });
        this.node.dispatchEvent(customEvent);
        this.matchIndex = '';
    }

    collisionExitCondition(matchingNode, otherNode) {
        if (matchingNode && otherNode && otherNode.name === matchingNode.name) {
            const mathDropComponent = otherNode.getComponent(MathDrop);
            mathDropComponent.allowDrop = true;
        }
        return super.collisionExitCondition(matchingNode, otherNode);
    }

}
