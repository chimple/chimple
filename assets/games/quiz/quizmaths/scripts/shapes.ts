import ccclass = cc._decorator.ccclass;
import { QuizMathsConfig } from "./quiz-maths";
import { QuizHelper } from "../../quizliteracy/scripts/quiz-helper";
import property = cc._decorator.property;
import { Util } from "../../../../common/scripts/util";
import catchError from "../../../../common/scripts/lib/error-handler";

const LABEL_WIDTH = 850;
const WIDTH = 200;
const HEIGHT = 200;
const WHICH = 'which';
const WHAT = 'what';
const FONT_SIZE = 40;

@ccclass
export default class Shapes extends cc.Component {
    quizConfig: QuizMathsConfig;
    assetDir: string;

    @property(cc.Prefab)
    imageButton: cc.Prefab = null;

    @property(cc.Prefab)
    textButton: cc.Prefab = null;

    @catchError()
    protected onLoad(): void {
        this.quizConfig.choices = this.quizConfig.choices.replace(/,/g, '^');
        this.quizConfig.answer = this.quizConfig.answer.replace(/,/g, '^');
        const options = this.quizConfig.answer.split('^');
        this.quizConfig.answer = Util.randomElements(options, 1)[0];
        this.renderTopPanel();
        if (this.quizConfig.order === WHAT) this.renderImage();
        this.renderBottomPanel();
    }

    @catchError()
    renderImage() {
        const imageNode = this.node.getChildByName('image');
        QuizHelper.loadAndResizeResourceImage(this.quizConfig, imageNode, this.assetDir,
            this.quizConfig.answer);

    }

    /*
        ["#level", "Worksheet", "ProblemNo", "type", "answer", "choices", "order", "soundFile", "displayTexts", "displayImage"],
        ["1", "1", "1", "shapes", "cylinder,cube,sphere,cone", "cylinder,cube,sphere,cone", "what", "What_is_this_shape.m4a", "What is this shape?", ""],
        ["1", "1", "2", "shapes", "circle", "circle,square,triangle,rectangle", "which","which_is_a_circle.m4a", "Which is a circle?", ""]

     */
    @catchError()
    renderTopPanel() {
        const topPanel = this.node.getChildByName('topPanel');
        this.renderSoundButton(topPanel);
        QuizHelper.renderTextLabel(this.quizConfig, topPanel, LABEL_WIDTH);
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }

    @catchError()
    renderBottomPanel() {
        const bottomPanel = this.node.getChildByName('bottomPanel');
        switch (this.quizConfig.order) {
            case WHICH:
                QuizHelper.renderImageChoices(this.quizConfig, this.imageButton, bottomPanel, this.assetDir, true);
                break;
            case WHAT:
                QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split('^'), FONT_SIZE);
                break;
        }
    }
}
