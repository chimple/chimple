import { BtnData, MULTI_CHOICE_CORRECT, MULTI_CHOICE_WRONG, QuizBtnType } from "./quiz";
import catchError from "../../../common/scripts/lib/error-handler";
import { Util } from "../../../common/scripts/util";

const {ccclass, property} = cc._decorator;

let handleClick: boolean = true;

@ccclass
export default class QuizButton extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    image: cc.Sprite = null;

    data: BtnData = null;
    quizDir: string = '';
    quizNode: cc.Node = null;

    @catchError()
    onLoad() {
        handleClick = true;
        if (this.data.type == QuizBtnType.Sentence) {
            this.label.string = this.data.text;
        } else {
            const picWidth = this.node.width;
            const picHeight = this.node.height;

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

    @catchError()
    makeInteractable(interactable: boolean) {
        this.node.parent.children.forEach((but) => {
            const butComp = but.getComponent(cc.Button);
            butComp.interactable = interactable;
            handleClick = interactable;
        });
    }

    onClick() {
        if (handleClick) {
            handleClick = false;
            this.makeInteractable(false);
            if (this.data.correct) {
                this.node.dispatchEvent(new cc.Event.EventCustom(MULTI_CHOICE_CORRECT, true));
                this.makeInteractable(false);
            } else {
                this.node.dispatchEvent(new cc.Event.EventCustom(MULTI_CHOICE_WRONG, true));
                this.makeInteractable(true);
            }
        }
    }
}
