import ccclass = cc._decorator.ccclass;
import { QuizHelper } from "./quiz-helper";
import property = cc._decorator.property;
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

const LABEL_WIDTH = 250;
@ccclass
export class ImageWord extends cc.Component {
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
        const hLayout = topPanel.getChildByName('hLayout');
        if(this.quizConfig.displayTexts.startsWith('__')) {
            this.renderLabel(hLayout, 'rLabel');
        } else if(this.quizConfig.displayTexts.endsWith('__')) {
            this.renderLabel(hLayout, 'lLabel');
        }

        this.renderImage(hLayout);
    }

    @catchError()
    renderImage(parent: cc.Node) {
        const imageNode = parent.getChildByName('image');
        QuizHelper.loadAndResizeImage(this.quizConfig, imageNode, this.assetDir, this.quizConfig.displayImages);
    }

    @catchError()
    renderBottomPanel() {
        const bottomPanel = this.node.getChildByName('bottomPanel');
        QuizHelper.renderTextChoices(
            this.quizConfig, this.textButton, bottomPanel, 250, 250, this.quizConfig.choices.split('^')
        );
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }

    @catchError()
    renderLabel(parent: cc.Node, childName: string) {
        QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH, '#000000', childName);
    }
}
