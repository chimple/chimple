import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { QuizMathsConfig } from "./quiz-maths";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizHelper } from "../../quizliteracy/scripts/quiz-helper";

const LABEL_WIDTH = 550;
const TEXT_WIDTH = 200;
const TEXT_HEIGHT = 200;

@ccclass
export class BiggerOrSmaller extends cc.Component {
    @property(cc.Prefab)
    image: cc.Prefab = null;

    @property(cc.Prefab)
    textButton: cc.Prefab = null;

    @property(cc.Prefab)
    imageGridButton: cc.Prefab = null;

    quizConfig: QuizMathsConfig;
    assetDir: string;
    choices: string[] = [];
    answer: number = 0;
    choice1: number = 0;
    choice2: number = 0;

    @catchError()
    protected onLoad(): void {
        this.choices = QuizHelper.randomInRange(this.quizConfig.choices, 2, this.quizConfig.order);
        this.choice1 = Number(this.choices[0]);
        this.choice2 = Number(this.choices[1]);
        const options = this.choices.map(n=>Number(n));
        if (this.quizConfig.order === "bigger" || this.quizConfig.order === "biggest") {
            this.answer = Math.max(...options);
        } else if (this.quizConfig.order === "smaller" || this.quizConfig.order === "smallest") {
            this.answer = Math.min(...options);
        }
        this.quizConfig.answer = String(this.answer);
        this.renderTopPanel();
        this.renderBottomPanel();
    }

    @catchError()
    renderTopPanel() {
        const topPanel = this.node.getChildByName('topPanel');
        this.renderSoundButton(topPanel);
        QuizHelper.renderTextLabel(this.quizConfig, topPanel, LABEL_WIDTH);
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        this.quizConfig.soundFile = String(this.answer);
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }

    @catchError()
    addGrid(bottomPanel: cc.Node, childName: string, choice: number) {
        if (this.quizConfig.displayImage === "number") {
            const c = bottomPanel.getChildByName(childName);
            QuizHelper.renderTextChoices(this.quizConfig,
                this.textButton, c, TEXT_WIDTH, TEXT_HEIGHT,
                [String(choice)]);
        } else if (this.quizConfig.displayImage === "image") {
            const c = bottomPanel.getChildByName(childName);
            const cGrid = cc.instantiate(this.imageGridButton);
            QuizHelper.renderImagesInGrid(cGrid, 'spriteGrid', this.image, choice, this.quizConfig);
            c.addChild(cGrid);
        }
    }

    @catchError()
    renderBottomPanel() {
        const bottomPanel = this.node.getChildByName('bottomPanel');
        this.addGrid(bottomPanel, 'left', this.choice1);
        this.addGrid(bottomPanel, 'right', this.choice2);
    }
}
