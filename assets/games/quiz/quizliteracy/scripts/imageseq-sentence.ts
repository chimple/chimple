import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Overflow = cc.Label.Overflow;
import { QuizHelper } from "./quiz-helper";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

const WIDTH = 1000;
const HEIGHT = 85;

@ccclass
export class ImageseqSentence extends cc.Component {
    @property(cc.Prefab)
    textButton: cc.Prefab = null;

    @property(cc.Prefab)
    image: cc.Prefab = null;

    @property(cc.Prefab)
    label: cc.Prefab = null;

    @property(cc.Prefab)
    arrow: cc.Prefab = null;

    @property(cc.Prefab)
    fill: cc.Prefab = null;

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
        if (this.quizConfig.displayImages.indexOf(".png") !== -1) {
            this.renderImageQuestions(topPanel);
        } else {
            this.renderTextQuestions(topPanel);
        }
    }

    @catchError()
    renderImage(parent: cc.Node, imageNode: cc.Node, imageName: string) {
        return QuizHelper.loadAndResizeImage(this.quizConfig, imageNode, this.assetDir, imageName);
    }

    @catchError()
    renderImageQuestions(parent: cc.Node) {
        const imagePanel = parent.getChildByName('imagePanel');
        const displayImages = this.quizConfig.displayImages.split('^');
        const howMany = displayImages.length;
        displayImages.forEach(
            (s, i) => {
                let image: cc.Node = cc.instantiate(this.image);
                image = this.renderImage(parent, image, s);
                imagePanel.addChild(image);
                if (i < displayImages.length - 1) {
                    imagePanel.addChild(cc.instantiate(this.arrow));
                    if(howMany === 2) {
                        imagePanel.addChild(cc.instantiate(this.fill));
                        imagePanel.addChild(cc.instantiate(this.arrow));
                    }
                }
            }
        );
    }

    @catchError()
    renderTextQuestions(parent: cc.Node) {
        const imagePanel = parent.getChildByName('imagePanel');
        const displayImages = this.quizConfig.displayImages.split('^');
        displayImages.forEach(
            (s, i) => {
                let label: cc.Node = cc.instantiate(this.label);
                const labelComponent = label.getComponent(cc.Label);
                labelComponent.overflow = Overflow.RESIZE_HEIGHT;
                labelComponent.string = s;
                imagePanel.addChild(label);
                label.width = 225;
                if (i < displayImages.length - 1) {
                    imagePanel.addChild(cc.instantiate(this.arrow));
                    imagePanel.addChild(cc.instantiate(this.fill));
                    imagePanel.addChild(cc.instantiate(this.arrow));
                }
            }
        );
    }

    @catchError()
    renderBottomPanel() {
        const bottomPanel = this.node.getChildByName('bottomPanel');
        QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split('^'));
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }
}
