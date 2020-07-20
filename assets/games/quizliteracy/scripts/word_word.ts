import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { QuizHelper } from "./quiz-helper";
import catchError from "../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

const WIDTH = 250;
const HEIGHT = 250;
const LABEL_WIDTH = 600;


@ccclass
export class WordWord extends cc.Component {
    @property(cc.Prefab)
    textButton: cc.Prefab = null;

    quizConfig: QuizLiteracyConfig;
    assetDir: string;

    @catchError()
    protected onLoad(): void {
        this.renderTopPanel();
        this.renderBottomPanel();
    }

    @catchError()
    renderTopPanel() {
        const topPanel = this.node.getChildByName('topPanel');
        this.renderSoundButton(topPanel);
        this.renderLabel(topPanel);
    }

    @catchError()
    renderBottomPanel() {
        const bottomPanel = this.node.getChildByName('bottomPanel');
        QuizHelper.renderTextChoices(
            this.quizConfig, this.textButton, bottomPanel, 250, 250,this.quizConfig.choices.split('^')
        );
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(
            this.quizConfig, parent, `${this.assetDir}`
        );
    }

    @catchError()
    renderLabel(parent: cc.Node) {
        QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH);
    }

}
