import ccclass = cc._decorator.ccclass;
import { QuizHelper } from "./quiz-helper";
import property = cc._decorator.property;
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

const WIDTH = 400;
const HEIGHT = 150;
const COLOR = '#887D7D';

@ccclass
export class ListeningComSequence extends cc.Component {
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
        this.renderSoundButton(left);
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
            this.quizConfig, this.textButton, right, WIDTH, HEIGHT,
            this.quizConfig.choices.split('^')
        );
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(
            this.quizConfig, parent, `${this.assetDir}`
        );
    }
}
