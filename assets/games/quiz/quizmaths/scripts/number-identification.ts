import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../../common/scripts/util";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizHelper } from "../../quizliteracy/scripts/quiz-helper";
import { QUIZ_WRONG } from "../../quizliteracy/scripts/quiz-literacy";
import { QuizMathsConfig, QUIZ_CORRECT } from "./quiz-maths";
import MathDrag, { MATH_MATCH, MATH_NO_MATCH } from "./math-drag";

const DRAG_HEIGHT = 150;
const DRAG_WIDTH = 75;

/*
        "4~200",
        "100~999",
        "ascending",

 */
@ccclass
export class NumberIdentification extends cc.Component {

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
    answer: string = '';
    individualNumbers: string[] = [];
    correctDrops: Map<string, boolean> = new Map();

    @catchError()
    protected onLoad(): void {
        this.quizConfig.choices = this.quizConfig.choices.indexOf("~") !== -1 ? this.quizConfig.choices : this.quizConfig.choices+'~'+this.quizConfig.choices;
        this.choices = QuizHelper.randomInRange(this.quizConfig.choices, 1, this.quizConfig.order);
        this.answer = String(QuizHelper.generateAnswer(this.quizConfig.choices));
        this.quizConfig.answer = this.answer;
        this.individualNumbers = this.quizConfig.answer.split('');

        this.node.on(MATH_MATCH, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            this.correctDrops.set(data.drop, data.isCorrect);
            if (Array.from(this.correctDrops.keys()).length === this.individualNumbers.length) {
                // all answered
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

        this.renderTopPanel();
        this.renderDragPanel();
    }

    @catchError()
    renderTopPanel() {
        const topPanel = this.node.getChildByName('topPanel');
        this.renderSoundButton(topPanel);
        this.renderDropPanel(topPanel);
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        this.quizConfig.soundFile = String(this.answer);
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir, true);
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
    renderDropPanel(topPanel) {
        const dropPanel = topPanel.getChildByName('dropPanel');
        const missingPanel = cc.instantiate(this.missingPanel);
        MathDrag.helpToDragNode = missingPanel;
        dropPanel.width = 1000;
        this.choices.forEach(
            (c, i) => {
                QuizHelper.renderDropChoices(this.quizConfig,
                    this.mathDrop, missingPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, this.individualNumbers);
            }
        );
        dropPanel.addChild(missingPanel);
    }
}
