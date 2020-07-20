import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import { QuizMathsConfig, QUIZ_CORRECT } from "./quiz-maths";
import { MATH_MATCH, MATH_NO_MATCH } from "./math-drag";
import { QUIZ_WRONG } from "../../quizliteracy/scripts/quiz-literacy";
import { QuizHelper } from "../../quizliteracy/scripts/quiz-helper";

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';
const DRAG_HEIGHT = 150;
const DRAG_WIDTH = 75;

/*
        "4~200",
        "100~999",
        "ascending",

 */
@ccclass
export class OperationsDrag extends cc.Component {

    @property(cc.Prefab)
    label: cc.Prefab = null;

    @property(cc.Prefab)
    mathDrag: cc.Prefab = null;

    @property(cc.Prefab)
    mathDrop: cc.Prefab = null;

    quizConfig: QuizMathsConfig;
    assetDir: string;

    operator: string = '';
    choices: string[] = [];
    answer: string = '';
    individualNumbers: string[] = [];
    correctDrops: Map<string, boolean> = new Map();
    missingItems: number = 0;
    @catchError()
    protected onLoad(): void {
        this.generateChoicesAndAnswer();
        this.quizConfig.answer = this.answer;
        this.individualNumbers = this.quizConfig.answer.split('');

        this.node.on(MATH_MATCH, (event) => {
            event.stopPropagation();
            this.missingItems++;
            const data = event.getUserData();
            this.correctDrops.set(data.drop, data.isCorrect);
            cc.log('missing items', this.missingItems);
            if (Array.from(this.correctDrops.keys()).length === this.individualNumbers.length) {
                const allCorrect = Array.from(this.correctDrops.values()).every(n => n === true);
                if (allCorrect) {
                    this.node.dispatchEvent(new cc.Event.EventCustom(QUIZ_CORRECT, true));
                } else {
                    this.node.dispatchEvent(new cc.Event.EventCustom(QUIZ_WRONG, true));
                }
            }
        });

        this.node.on(MATH_NO_MATCH, (event) => {
            event.stopPropagation();
            this.missingItems--;
            const data = event.getUserData();
            const splits = data.drop.split('_');
            if(splits && splits.length === 2 && splits[0].length > 0 && splits[1].length > 0) {
                this.correctDrops.forEach((value: boolean, key: string) => {
                    if(key.endsWith(splits[1])) {
                        this.correctDrops.delete(key);
                    }
                });

            }
        });

        this.renderDropPanel();
        this.renderDragPanel();
    }

    @catchError()
    generateChoicesAndAnswer() {
        let results = this.quizConfig.choices.match(/(.*)(\+|-|x)(.*)=\?/);
        if (results && results.length === 4) {
            let op1V = '0';
            let op2V = '0';

            let op1CommaBased = results[1].indexOf(",") !== -1;
            let op2CommaBased = results[3].indexOf(",") !== -1;

            this.operator = results[2];
            if (op1CommaBased) {
                op1V = Util.randomElements(results[1].split(','), 1)[0];
            } else if (op2CommaBased) {
                op2V = Util.randomElements(results[3].split(','), 1)[0];
            } else {
                op1V = results[1].indexOf('~') === -1 ? results[1] :
                    QuizHelper.randomInRange(results[1], 1)[0];
                op2V = results[3].indexOf('~') === -1 ? results[3] :
                    QuizHelper.randomInRange(results[3], 1)[0];

                if (Number(op1V) < Number(op2V)) {
                    let tmp = op1V;
                    op1V = op2V;
                    op2V = tmp;
                }
            }

            this.operator = results[2];
            switch (this.operator) {
                case '+':
                    this.answer = String(Number(op1V) + Number(op2V));
                    break;
                case '-':
                    if (op1CommaBased) {
                        const parts = this.quizConfig.answer.split('~');
                        const min = parts[0];
                        op2V = String(Util.randomBetween(Number(min), Number(op1V) - 1));
                    } else if (op2CommaBased) {
                        const parts = this.quizConfig.answer.split('~');
                        const max = parts[1];
                        op1V = String(Util.randomBetween(Number(op2V) + 1, Number(max)));
                    }
                    op1V = op1V.trim();
                    op2V = op2V.trim();
                    this.answer = String(Number(op1V) - Number(op2V));
                    break;
                case 'x':
                    this.answer = String(Number(op1V) * Number(op2V));
                    break;
            }
            this.choices.push(op1V);
            this.choices.push(op2V);
        }
    }

    @catchError()
    renderDragPanel() {
        const dragPanel = this.node.getChildByName('dragPanel');
        const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(a => String(a));
        QuizHelper.renderDragChoices(this.quizConfig,
            this.mathDrag, dragPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, options,
            false, true
        );
    }

    @catchError()
    renderDropPanel() {
        if (this.choices && this.choices.length === 2) {
            let dropPanel: cc.Node = null;
            if (this.quizConfig.order === HORIZONTAL) {
                dropPanel = this.node.getChildByName('hDropPanel');
                this.node.getChildByName('vDropPanel').active = false;
                dropPanel.active = true;
                dropPanel.opacity = 255;
                const label = dropPanel.getChildByName('label');
                const labelComponent = label.getComponent(cc.Label);
                labelComponent.string = [this.choices[0], this.operator, this.choices[1], '='].join(' ');
            } else if (this.quizConfig.order === VERTICAL) {
                dropPanel = this.node.getChildByName('vDropPanel');
                this.node.getChildByName('hDropPanel').active = false;
                dropPanel.active = true;
                dropPanel.opacity = 255;
                const upLabel = dropPanel.getChildByName('upLabel');
                const upLabelComponent = upLabel.getComponent(cc.Label);
                upLabelComponent.string = this.choices[0];

                const bottomLabel = dropPanel.getChildByName('bottomLabel');
                const bottomLabelComponent = bottomLabel.getComponent(cc.Label);
                bottomLabelComponent.string = this.operator + ' ' + this.choices[1] + '\n' + '------';
            }

            if (dropPanel) {
                const missingPanel = dropPanel.getChildByName('missingPanel');
                QuizHelper.renderDropChoices(this.quizConfig,
                    this.mathDrop, missingPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, this.individualNumbers);
            }
        }
    }
}
