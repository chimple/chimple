import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { QuizHelper } from "./quiz-helper";
import Type = cc.Layout.Type;
import catchError from "../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

const WIDTH = 850;
const HEIGHT = 85;

@ccclass
export class ImageSentence extends cc.Component {
    @property(cc.Prefab)
    textButton: cc.Prefab = null;

    @property(cc.Prefab)
    imageButton: cc.Prefab = null;


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
        this.renderImage(topPanel);
    }

    @catchError()
    renderImage(parent: cc.Node) {
        const imageNode = parent.getChildByName('image');
        QuizHelper.loadAndResizeImage(this.quizConfig, imageNode, this.assetDir,
            this.quizConfig.displayImages);
    }

    @catchError()
    renderBottomPanel() {
        const bottomPanel = this.node.getChildByName('bottomPanel');
        const choices = this.quizConfig.choices.split('^');
        const allImages: boolean = choices.every((n) => n.endsWith(".png"));
        if(allImages) {
            const layout = bottomPanel.getComponent(cc.Layout);
            layout.type = Type.HORIZONTAL;
            QuizHelper.renderImageChoices(this.quizConfig, this.imageButton, bottomPanel, this.assetDir);
        } else {
            QuizHelper.renderTextChoices(
                this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT,
                this.quizConfig.choices.split('^')
            );
        }
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }

    @catchError()
    renderLabel(parent: cc.Node) {
        QuizHelper.renderTextLabel(this.quizConfig, parent);
    }
}
