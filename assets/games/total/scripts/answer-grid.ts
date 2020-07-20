import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { HELP_BTN, VALIDATE_RESULT } from "./total";
import catchError from "../../../common/scripts/lib/error-handler";

export const BACK_GROUND = 'Background';
export const NUMBER_LABEL = 'numberLabel';
export const ANSWER_GRID_BUTTON_CLICKED = 'ANSWER_GRID_BUTTON_CLICKED';
export const CLEAR_BUTTON_CLICKED = 'CLEAR_BUTTON_CLICKED';
export const CONFIRM_BUTTON_CLICKED = 'CONFIRM_BUTTON_CLICKED';

@ccclass
export default class AnswerGrid extends cc.Component {

    @property(cc.Prefab)
    numberBtnPrefab: cc.Prefab = null;
    numberpads: string[] = [];
    delay: number = 2;

    result: string = null;
    correctBtns: cc.Node[] = [];

    protected onLoad(): void {
    }

    @catchError()
    protected start(): void {
        this.createGrid(this.delay);
    }

    @catchError()
    createGrid(delay: number = 2) {
        this.addDummyBtn(this.node, null);
        for (let i = 0; i <= this.numberpads.length - 1; i++) {
            this.addNumberBtn(this.node, this.numberpads[i]);
            if (i == 0) {
                this.addDummyBtn(this.node, null);
            }
        }

        this.scheduleOnce(
            () => {
                if (this.correctBtns !== null && this.correctBtns.length > 0) {
                    const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(HELP_BTN, true);
                    customEvent.setUserData({
                        helpNodes: this.correctBtns
                    });
                    this.node.dispatchEvent(customEvent);
                }
            }, delay
        );
    }

    @catchError()
    protected addNumberBtn(node, text) {
        const numberBtn: cc.Node = cc.instantiate(this.numberBtnPrefab);
        const backGround = numberBtn.getChildByName(BACK_GROUND);
        if (!!backGround) {
            const labelNode: cc.Node = backGround.getChildByName(NUMBER_LABEL);
            const label = labelNode.getComponent(cc.Label);
            labelNode.color = new cc.Color().fromHEX('#654321');
            label.string = text;
            const outLine = labelNode.addComponent(cc.LabelOutline);
            outLine.width = 2;
        }
        node.addChild(numberBtn);

        if (!!this.result && this.result.includes(text)) {
            const index = this.result.indexOf(text);
            this.correctBtns.splice(index, 0, numberBtn);
        }
    }

    @catchError()
    protected addDummyBtn(node, text) {
        const n: cc.Node = new cc.Node();
        node.addChild(n);
    }
}
