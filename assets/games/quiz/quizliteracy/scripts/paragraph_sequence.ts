import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { QuizHelper } from "./quiz-helper";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

const LABEL_WIDTH = 400;
const WIDTH = 400;
const HEIGHT = 175;
const COLOR = '#887D7D';

@ccclass
export class ParagraphSequence extends cc.Component {
    @property(cc.Prefab)
    textButton: cc.Prefab = null;

    @property(cc.Prefab)
    additionalLabel: cc.Prefab = null;

    quizConfig: QuizLiteracyConfig;
    assetDir: string;

    @catchError()
    protected onLoad(): void {
        this.renderLeft();
        this.renderRight();
    }

    @catchError()
    renderLeft() {
        const topPanel = this.node.getChildByName('topPanel');
        const left = topPanel.getChildByName('left');
        this.renderLabel(left);
    }

    @catchError()
    renderRight() {
        const topPanel = this.node.getChildByName('topPanel');
        const right = topPanel.getChildByName('right');
        const additionalQuestionLabel = cc.instantiate(this.additionalLabel);
        QuizHelper.renderAdditionalQuestionLabel(
            this.quizConfig, additionalQuestionLabel, WIDTH, HEIGHT
        );

        additionalQuestionLabel.color = new cc.Color().fromHEX(COLOR);
        right.addChild(additionalQuestionLabel);

        QuizHelper.renderTextChoices(
            this.quizConfig, this.textButton, right, WIDTH, HEIGHT,this.quizConfig.choices.split('^')
        );
    }

    @catchError()
    renderLabel(parent: cc.Node) {
        QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH, COLOR, 'label', 45);
    }
}
