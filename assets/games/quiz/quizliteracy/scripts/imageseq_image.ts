import ccclass = cc._decorator.ccclass;
import { QuizHelper } from "./quiz-helper";
import property = cc._decorator.property;
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizLiteracyConfig } from "./quiz-literacy";

@ccclass
export class ImageSeqImage extends cc.Component {
    @property(cc.Prefab)
    imageButton: cc.Prefab = null;

    @property(cc.Prefab)
    image: cc.Prefab = null;

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
        this.renderImageQuestions(topPanel);
    }

    @catchError()
    renderImage(parent: cc.Node, imageNode: cc.Node, imageName: string) {
        return QuizHelper.loadAndResizeImage(this.quizConfig, imageNode, this.assetDir, imageName);
    }

    @catchError()
    renderImageQuestions(parent: cc.Node) {
        const imagePanel = parent.getChildByName('imagePanel');
        const displayImages = this.quizConfig.displayImages.split('^');
        displayImages.forEach(
            (s, i) => {
                let image: cc.Node = cc.instantiate(this.image);
                image = this.renderImage(parent, image, s);
                imagePanel.addChild(image);
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
        QuizHelper.renderImageChoices(this.quizConfig, this.imageButton, bottomPanel, this.assetDir);
    }


    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }
}
