import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { QuizHelper } from "../../quizliteracy/scripts/quiz-helper";
import { QuizMathsConfig } from "./quiz-maths";
import { Util } from "../../../../common/scripts/util";
import catchError from "../../../../common/scripts/lib/error-handler";

const WIDTH = 200;
const HEIGHT = 200;

@ccclass
export class DigitNumbers extends cc.Component {
    @property(cc.Prefab)
    image: cc.Prefab = null;

    @property(cc.Prefab)
    textButton: cc.Prefab = null;

    quizConfig: QuizMathsConfig;
    assetDir: string;
    choices: string[] = [];
    answer: number = 0;

    @catchError()
    protected onLoad(): void {
        this.quizConfig.choices = this.quizConfig.choices.indexOf("~") !== -1 ? this.quizConfig.choices : '1~'+this.quizConfig.choices;
        this.choices = QuizHelper.randomInRange(this.quizConfig.choices, 4, this.quizConfig.order);
        this.answer = Util.randomElements([...this.choices], 1);
        this.renderTopPanel();
        this.renderBottomPanel();
    }

    @catchError()
    renderTopPanel() {
        const topPanel = this.node.getChildByName('topPanel');
        this.renderSoundButton(topPanel);
        this.renderImages(topPanel);
    }

    @catchError()
    renderBottomPanel() {
        const bottomPanel = this.node.getChildByName('bottomPanel');
        QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.choices);
    }

    @catchError()
    renderImages(topPanel: cc.Node) {
        QuizHelper.renderImagesInGrid(topPanel, 'topLayout', this.image, this.answer, this.quizConfig);
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        this.quizConfig.soundFile = String(this.answer);
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir, true);
    }
}
