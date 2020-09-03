import ccclass = cc._decorator.ccclass;
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizMathsConfig, QUIZ_CORRECT } from "./quiz-maths";
import { MATH_MATCH, MATH_NO_MATCH } from "./math-drag";
import property = cc._decorator.property;
import { QUIZ_WRONG } from "../../quizliteracy/scripts/quiz-literacy";
import { QuizHelper } from "../../quizliteracy/scripts/quiz-helper";

const DRAG_HEIGHT = 150;
const DRAG_WIDTH = 75;
const LABEL_WIDTH = 850;

@ccclass
export default class WordProblem extends cc.Component {
    @property(cc.Prefab)
    mathDrag: cc.Prefab = null;

    @property(cc.Prefab)
    mathDrop: cc.Prefab = null;

    quizConfig: QuizMathsConfig;
    assetDir: string;

    individualNumbers: string[] = [];
    correctDrops: Map<string, boolean> = new Map();

    @catchError()
    protected onLoad(): void {
        this.individualNumbers = this.quizConfig.answer.split('');

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

        this.renderTopPanel();
        this.renderDropPanel();
        this.renderDragPanel();
    }

    @catchError()
    renderTopPanel() {
        const topPanel = this.node.getChildByName('topPanel');
        this.renderSoundButton(topPanel);
        QuizHelper.renderTextLabel(this.quizConfig, topPanel, LABEL_WIDTH);
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
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
        let dropPanel: cc.Node = null;
        dropPanel = this.node.getChildByName('hDropPanel');
        dropPanel.active = true;
        dropPanel.opacity = 255;

        if (dropPanel) {
            const missingPanel = dropPanel.getChildByName('missingPanel');
            QuizHelper.renderDropChoices(this.quizConfig,
                this.mathDrop, missingPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, this.individualNumbers);
        }
    }
}
