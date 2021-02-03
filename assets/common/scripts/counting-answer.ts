import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import AnswerGrid, { ANSWER_GRID_BUTTON_CLICKED, CLEAR_BUTTON_CLICKED, CONFIRM_BUTTON_CLICKED } from "./answer-grid";
import catchError from "./lib/error-handler";
import { Util } from "./util";
import ChimpleRichText from "./chimple-richtext";

const DIGITS = 'digits';
const LABEL = 'label';
const COUNTING_LABEL = 'countingLabel';
const CHIMPLE_RICHTEXT = 'chimple-richtext';
export const VALIDATE_RESULT = 'VALIDATE_RESULT';

@ccclass
export default class CountingAnswer extends cc.Component {

    @property(cc.Prefab)
    answerGridPrefab: cc.Prefab = null;

    @property(cc.AudioClip)
    touchAudio: cc.AudioClip = null;

    numberpads: string[] = [];
    result: string = null;
    delay: number = 2;
    private _answerGrid: cc.Node = null;
    private _isValidResult: boolean = false;

    @catchError()
    protected onLoad(): void {
        this._answerGrid = cc.instantiate(this.answerGridPrefab);
        this._answerGrid.setPosition(new cc.Vec2(0, -125));
        this.node.addChild(this._answerGrid);
        const answerGridComponent: AnswerGrid = this._answerGrid.getComponent(AnswerGrid);
        answerGridComponent.numberpads = this.numberpads;
        answerGridComponent.result = this.result;
        answerGridComponent.delay = this.delay;
        this.updateRichText();
        this.updateDigits('?'.repeat(this.result.length), true);
        this.registerEvents();
    }

    @catchError()
    private registerEvents() {
        this.node.on(ANSWER_GRID_BUTTON_CLICKED, (event) => {
            event.stopPropagation();
            try {
                if (!!this.touchAudio)
                    Util.playSfx(this.touchAudio);
            } catch (e) {

            }
            if (!this.isValidResult) {
                const data = event.getUserData();
                const selectedDigit = data.selectedDigit;
                this.updateDigits(selectedDigit, false);
            }
        });

        // this.node.on(CLEAR_BUTTON_CLICKED, (event) => {
        //     event.stopPropagation();
        //     const data = event.getUserData();
        //     const oneByOne = data.oneByOne || true;
        //     this.clearDigits(oneByOne);
        // });

        // this.node.on(CONFIRM_BUTTON_CLICKED, (event) => {
        //     event.stopPropagation();
        //     this.checkResult();
        // });
    }

    @catchError()
    private updateDigits(digit: string, onLoad: boolean = false) {
        const digits = this.node.getChildByName(DIGITS);
        const label = digits.getChildByName(LABEL);
        const textComponent = label.getComponent(ChimpleRichText);
        let displayStr = textComponent.string || '';
        displayStr = displayStr.concat(digit);
        if (onLoad) {
            textComponent.string = displayStr;
        } else {
            displayStr = displayStr.substring(1, displayStr.length);
            textComponent.string = displayStr;
            if (displayStr.indexOf('?') === -1 && displayStr.length === this.result.length) {
                this.scheduleOnce(
                    () => {
                        this.checkResult();
                    }, 0.25);
            }
        }
        // if (shrink && textComponent.string.length >= 6) {
        //     textComponent.fontSize = 40;
        //     //textComponent.string = textComponent.string.concat(digit);
        //     textComponent.string = displayStr;
        // } else if (textComponent.string.length < 6) {
        //     textComponent.string = displayStr;
        // }
    }

    @catchError()
    public clearDigits(oneByOne: boolean = false) {
        const digits = this.node.getChildByName(DIGITS);
        const label = digits.getChildByName(LABEL);
        const textComponent = label.getComponent(ChimpleRichText);
        textComponent.string = '?'.repeat(this.result.length);
    }

    @catchError()
    private checkResult() {
        const digits = this.node.getChildByName(DIGITS);
        const label = digits.getChildByName(LABEL);
        const textComponent = label.getComponent(ChimpleRichText);
        if (!!textComponent.string) {
            const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(VALIDATE_RESULT, true);
            customEvent.setUserData({
                result: textComponent.string
            });
            this.node.dispatchEvent(customEvent);
        }
    }

    @catchError()
    private updateRichText() {
        const countingLabel = this.node.getChildByName(COUNTING_LABEL);
        const richText = countingLabel.getChildByName(CHIMPLE_RICHTEXT);
        const rc: ChimpleRichText = richText.getComponent(ChimpleRichText);
        rc.string = `<color=#8B4513><bold>${Util.i18NText('How Many??')}</bold></color>`;
    }

    set isValidResult(n) {
        this._isValidResult = n;
    }

    get isValidResult() {
        return this._isValidResult;
    }

}
