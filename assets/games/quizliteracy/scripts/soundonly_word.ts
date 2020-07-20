import ccclass = cc._decorator.ccclass;
import { QuizHelper } from "./quiz-helper";
import property = cc._decorator.property;
import catchError from "../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

@ccclass
export class SoundonlyWord extends cc.Component {
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
        const cs = this.quizConfig.choices.split('^');
        QuizHelper.renderTextChoices(
            this.quizConfig, this.textButton, bottomPanel, 250, 250, cs, cs[0] && cs[0].length > 1 ? 55 : 75
        );
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(
            this.quizConfig, parent, `${this.assetDir}`
        );
    }
}
