import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import CountingAnswer from "../../total/scripts/counting-answer";
import { VALIDATE_RESULT } from "../../total/scripts/total";
import { QuizMathsConfig, QUIZ_CORRECT } from "./quiz-maths";
import { QUIZ_WRONG } from "../../quizliteracy/scripts/quiz-literacy";
import { QuizHelper } from "../../quizliteracy/scripts/quiz-helper";

const NUMBER_PADS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

@ccclass
export default class OperationWithObjects extends cc.Component {
    @property(cc.SpriteFrame)
    fill1: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    fill2: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    empty: cc.SpriteFrame = null;

    @property(cc.Prefab)
    c1: cc.Prefab = null;

    @property(cc.Prefab)
    countingAnswerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    leftPrefab: cc.Prefab = null;

    quizConfig: QuizMathsConfig;
    assetDir: string;
    countingAnswer: cc.Node = null;
    operator: string = '';
    choices: string[] = [];
    answer: string = '';
    resultValidated: boolean = false;

    @catchError()
    protected onLoad(): void {
        this.generateChoicesAndAnswer();
        const topPanel = this.node.getChildByName('topPanel');
        this.leftChild(topPanel);
        this.rightChild(topPanel);

        this.node.on(VALIDATE_RESULT, (event) => {
            if (this.resultValidated) {
                return;
            }
            this.resultValidated = true;
            event.stopPropagation();
            const data = event.getUserData();
            cc.log('data.result', data.result, 'this.answer ', this.answer);
            if (data.result && data.result === this.answer) {
                this.countingAnswer.getComponent(CountingAnswer).isValidResult = true;
                this.node.dispatchEvent(new cc.Event.EventCustom(QUIZ_CORRECT, true));
            } else {
                this.countingAnswer.getComponent(CountingAnswer).isValidResult = true;
                this.node.dispatchEvent(new cc.Event.EventCustom(QUIZ_WRONG, true));
            }
        });
    }

    @catchError()
    renderC1(parent, count: number, spriteFrame: cc.SpriteFrame) {
        for (let i = 0; i < count; i++) {
            const c1 = cc.instantiate(this.c1);
            c1.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            parent.addChild(c1);
        }
    }

    @catchError()
    leftChild(topPanel) {
        const left: cc.Node = cc.instantiate(this.leftPrefab);
        topPanel.addChild(left);
        const h1: cc.Node = left.getChildByName('h1');
        switch (this.operator) {
            case '+':
                this.renderC1(h1, Number(this.choices[0]), this.fill2);
                this.renderC1(h1, Number(this.choices[1]), this.fill1);
                break;
            case '-':
                this.renderC1(h1, Number(this.choices[0]), this.fill2);
                this.renderC1(h1, Number(this.choices[1]), this.empty);
                break;

        }

        const h2: cc.Node = left.getChildByName('h2');
        const label = h2.getChildByName('label');
        const labelComponent = label.getComponent(cc.Label);
        labelComponent.string = [this.choices[0], this.operator, this.choices[1], '='].join(' ');
    }

    @catchError()
    rightChild(topPanel) {
        this.countingAnswer = cc.instantiate(this.countingAnswerPrefab);
        const countingAnswerComponent = this.countingAnswer.getComponent(CountingAnswer);
        countingAnswerComponent.numberpads = NUMBER_PADS;
        countingAnswerComponent.result = this.answer;
        topPanel.addChild(this.countingAnswer);
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
}
