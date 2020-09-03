import ccclass = cc._decorator.ccclass;
import { QuizHelper } from "./quiz-helper";
import property = cc._decorator.property;
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

const WIDTH = 850;
const HEIGHT = 85;

@ccclass
export class SoundonlySentence extends cc.Component {
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
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }
}
