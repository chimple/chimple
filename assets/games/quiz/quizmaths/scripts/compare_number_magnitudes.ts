import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../../common/scripts/util";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizMathsConfig, QUIZ_CORRECT } from "./quiz-maths";
import { MATH_MATCH, MATH_NO_MATCH } from "./math-drag";
import { QuizHelper } from "../../quizliteracy/scripts/quiz-helper";
import { QUIZ_WRONG } from "../../quizliteracy/scripts/quiz-literacy";

const DRAG_HEIGHT = 150;
const DRAG_WIDTH = 150;

@ccclass
export class CompareNumberMagnitudes extends cc.Component {
    @property(cc.Prefab)
    mathDrag: cc.Prefab = null;

    @property(cc.Prefab)
    mathDrop: cc.Prefab = null;

    quizConfig: QuizMathsConfig;
    assetDir: string;
    choices: string[] = [];
    answers: string[] = [];
    correctDrops: Map<string, boolean> = new Map();
    currentMatches: string[] = [];

    @catchError()
    protected onLoad(): void {
        this.answers = this.quizConfig.order === 'ascending' ? [...this.choices.reverse()] : [...this.choices];
        this.choices = QuizHelper.randomInRange(this.quizConfig.choices, 4, this.quizConfig.order);
        this.answers = this.quizConfig.order === 'ascending' ? [...this.choices.reverse()] : [...this.choices];
        this.choices = Util.shuffle(this.choices);
        this.quizConfig.answer = String(this.answers);
        this.renderTopPanel();
        this.renderDragPanel();
        this.renderDropPanel();

        this.node.on(MATH_MATCH, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            this.correctDrops.set(data.drop, data.isCorrect);
            if (Array.from(this.correctDrops.keys()).length === this.choices.length) {
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
            if (splits && splits.length === 2 && splits[0].length > 0 && splits[1].length > 0) {
                this.correctDrops.forEach((value: boolean, key: string) => {
                    if (key.endsWith(splits[1])) {
                        this.correctDrops.delete(key);
                    }
                });

            }
        });
    }

    @catchError()
    renderTopPanel() {
        const topPanel = this.node.getChildByName('topPanel');
        this.renderSoundButton(topPanel);
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }

    @catchError()
    renderDragPanel() {
        const dragPanel = this.node.getChildByName('dragPanel');
        QuizHelper.renderDragChoices(this.quizConfig,
            this.mathDrag, dragPanel, DRAG_WIDTH, DRAG_HEIGHT, this.choices,
            false
        );
    }

    @catchError()
    renderDropPanel() {
        const dropPanel = this.node.getChildByName('dropPanel');
        QuizHelper.renderDropChoices(this.quizConfig,
            this.mathDrop, dropPanel, DRAG_WIDTH, DRAG_HEIGHT, this.answers);
    }

}
