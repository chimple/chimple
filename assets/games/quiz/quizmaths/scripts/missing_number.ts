import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../../common/scripts/util";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizMathsConfig, QUIZ_CORRECT } from "./quiz-maths";
import { MATH_MATCH, MATH_NO_MATCH } from "./math-drag";
import { QUIZ_WRONG } from "../../quizliteracy/scripts/quiz-literacy";
import { SORT_ASC, SORT_ASCENDING, QuizHelper } from "../../quizliteracy/scripts/quiz-helper";

const DRAG_HEIGHT = 150;
const DRAG_WIDTH = 75;

/*
        "4~200",
        "100~999",
        "ascending",

 */
@ccclass
export class MissingNumber extends cc.Component {

    @property(cc.Prefab)
    label: cc.Prefab = null;

    @property(cc.Prefab)
    missingPanel: cc.Prefab = null;

    @property(cc.Prefab)
    mathDrag: cc.Prefab = null;

    @property(cc.Prefab)
    mathDrop: cc.Prefab = null;

    quizConfig: QuizMathsConfig;
    assetDir: string;

    choices: string[] = [];
    individualNumbers: string[] = [];
    answerIndex: number = -1;
    step: number = 1;
    correctDrops: Map<string, boolean> = new Map();

    @catchError()
    protected onLoad(): void {
        this.choices = this.generateChoices();
        // this.answers = [this.choices[this.answerIndex]];
        // this.quizConfig.answer = String(this.answers);

        this.node.on(MATH_MATCH, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            this.correctDrops.set(data.drop, data.isCorrect);
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
    generateChoices() {
        const choices = [];
        const options = this.quizConfig.answer.split('~');
        if (options && options.length === 2) {
            this.step = Number(options[0]);
            this.answerIndex = Number(options[1]);
        }

        const values = this.quizConfig.choices.split('~');
        if (values && values.length === 2) {
            let start = -1;

            if (this.quizConfig.order === SORT_ASC || this.quizConfig.order === SORT_ASCENDING) {
                let rNumber = Util.randomBetween(Number(values[0]), Number(values[1]) - (3 * this.step));
                for (let i = 0; i < 4; i++) {
                    start = rNumber;
                    start += i * this.step;
                    choices.push(String(start));
                }
            } else {
                let rNumber = Util.randomBetween(Number(values[0]) + (3 * this.step), Number(values[1]));
                for (let i = 0; i < 4; i++) {
                    start = rNumber;
                    start -= i * this.step;
                    choices.push(String(start));
                }

            }
        }
        return choices;
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
        const dropPanel = this.node.getChildByName('dropPanel');
        const missingPanel = cc.instantiate(this.missingPanel);
        dropPanel.width = 1024;
        this.choices.forEach(
            (c, i) => {
                if (i == this.answerIndex - 1) {
                    this.individualNumbers = c.split('');
                    QuizHelper.renderDropChoices(this.quizConfig,
                        this.mathDrop, missingPanel, DRAG_WIDTH, DRAG_HEIGHT, this.individualNumbers);
                    dropPanel.addChild(missingPanel);
                } else {
                    QuizHelper.createTextLabelWithContent(this.quizConfig, dropPanel, c, this.label, DRAG_WIDTH - 10, 3 * DRAG_HEIGHT);
                }
            }
        );
    }
}
