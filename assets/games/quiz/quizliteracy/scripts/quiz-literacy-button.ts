import { Util } from "../../../../common/scripts/util";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QuizBtnData, QuizBtnType, QUIZ_CORRECT, QUIZ_WRONG } from "./quiz-literacy";
import isAbsolutePath = jsb.fileUtils.isAbsolutePath;

const {ccclass, property} = cc._decorator;

let handleClick: boolean = true;

@ccclass
export default class QuizLiteracyButton extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    image: cc.Sprite = null;

    data: QuizBtnData = null;
    quizDir: string = '';
    quizNode: cc.Node = null;

    @catchError()
    onLoad() {
        handleClick = true;
        if (this.data.type == QuizBtnType.Sentence) {
            this.label.string = this.data.text;
        } else if (this.data.type == QuizBtnType.Picture) {
            const picWidth = this.node.width;
            const picHeight = this.node.height;

            if(this.data.absolutePath) {
                cc.resources.load(this.quizDir + this.data.pic, cc.SpriteFrame, (err, spriteFrame) => {
                    if (!err) {
                        // @ts-ignore
                        this.image.spriteFrame = spriteFrame;
                        const size = this.image.spriteFrame.getOriginalSize();
                        const xScale = picWidth / size.width;
                        const yScale = picHeight / size.height;
                        const scale = Math.min(xScale, yScale);
                        this.node.width = scale * size.width;
                        this.node.height = scale * size.height;
                    }
                });

            } else {
                Util.loadTexture(this.quizDir + this.data.pic, (texture) => {
                    if (texture != null) {
                        this.image.spriteFrame = new cc.SpriteFrame(texture);
                        const size = this.image.spriteFrame.getOriginalSize();
                        const xScale = picWidth / size.width;
                        const yScale = picHeight / size.height;
                        const scale = Math.min(xScale, yScale);
                        this.node.width = scale * size.width;
                        this.node.height = scale * size.height;
                    }
                });
            }
        }
    }

    @catchError()
    makeInteractable(interactable: boolean) {
        const butComp = this.node.getComponent(cc.Button);
        if (butComp) {
            butComp.interactable = interactable;
            handleClick = interactable;
        }

    }

    @catchError()
    onClick() {
        if (handleClick) {
            handleClick = false;
            this.makeInteractable(false);
            if (this.data.correct) {
                this.node.dispatchEvent(new cc.Event.EventCustom(QUIZ_CORRECT, true));
                this.makeInteractable(false);
            } else {
                this.node.dispatchEvent(new cc.Event.EventCustom(QUIZ_WRONG, true));
                this.makeInteractable(false);
            }
        }
    }
}
