import ccclass = cc._decorator.ccclass;
import catchError from "../../../common/scripts/lib/error-handler";
import { QuizHelper } from "./quiz-helper";
import property = cc._decorator.property;
import { QuizLiteracyConfig } from "./quiz-literacy";

const WIDTH = 300;
const HEIGHT = 250;

@ccclass
export class SentenceWord extends cc.Component {
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
            this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split('^')
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
        QuizHelper.renderTextLabel(this.quizConfig, parent);
    }
}
