
import { ChoiceData, LINE_MATCH_CHOICE_CORRECT, LINE_MATCH_CHOICE_WRONG, QuizBtnType } from "./quiz";
import catchError from "../../../common/scripts/lib/error-handler";
import { TouchEvents, Util } from "../../../common/scripts/util";


const {ccclass, property} = cc._decorator;

let lineMatchingStartName = null;
let lineMatchingStartNode: cc.Node = null;
@ccclass
export default class Choice extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    image: cc.Sprite = null;

    data: ChoiceData = null;
    quizDir: string = '';
    quizNode: cc.Node = null;

    private _graphics: cc.Graphics = null;
    private _touchStartPoint: cc.Vec2 = null;
    enabled: boolean = true;

    @catchError()
    onLoad() {
        this.quizNode
            .on(TouchEvents.TOUCH_START, this.onPageTouchStart, this);

        this.quizNode
            .on(TouchEvents.TOUCH_MOVE, this.onPageTouchMove, this);

        this.quizNode
            .on(TouchEvents.TOUCH_END, this.onPageTouchEnd, this);

        this._graphics = this.quizNode.parent.getChildByName('draw').getComponent(cc.Graphics);
        this._graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this._graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this._graphics.strokeColor = cc.Color.BLACK;
        this._graphics.lineWidth = 20;

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
    onPageTouchStart(touch: cc.Touch) {
        if (this.enabled) {
            this.clear();
            if (this.node.getBoundingBox().contains(this.node.parent.convertToNodeSpaceAR(touch.getLocation()))) {
                this._touchStartPoint = this.quizNode.parent.convertToNodeSpaceAR(touch.getLocation());
                lineMatchingStartName = this.data.matchName;
                lineMatchingStartNode = this.node;
            }
        }
    }

    @catchError()
    private clear() {
        this._graphics.clear();
        this._touchStartPoint = null;
    }

    @catchError()
    onPageTouchMove(touch: cc.Touch) {
        if (this._touchStartPoint && this.enabled) {
            this._graphics.clear();
            const loc = this.quizNode.parent.convertToNodeSpaceAR(touch.getLocation());
            cc.log('touch move from', this._touchStartPoint, ' to', loc);
            this._graphics.moveTo(this._touchStartPoint.x, this._touchStartPoint.y);
            this._graphics.lineTo(loc.x, loc.y);
            this._graphics.stroke();
        }
    }

    @catchError()
    onPageTouchEnd(touch: cc.Touch) {
        if (this.enabled) {
            this.clear();
            if (this.node.getBoundingBox().contains(this.node.parent.convertToNodeSpaceAR(touch.getLocation()))) {
                const choiceComponent = this.node.getComponent(Choice);

                if (choiceComponent.data.matchName === lineMatchingStartName) {
                    this.node.opacity = 100;
                    const choiceComponent = this.node.getComponent(Choice);
                    choiceComponent.enabled = false;

                    const otherChoiceComponent = lineMatchingStartNode.getComponent(Choice);
                    lineMatchingStartNode.opacity = 100;
                    otherChoiceComponent.enabled = false;
                    choiceComponent.node.dispatchEvent(new cc.Event.EventCustom(LINE_MATCH_CHOICE_CORRECT, true));
                } else {
                    this.node.dispatchEvent(new cc.Event.EventCustom(LINE_MATCH_CHOICE_WRONG, true));
                }
            }
        }
    }
}
