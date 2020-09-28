import CommonBlock from "./CommonBlock";
import {
    BLOCK_TYPE,
    FONT_SIZE, GAME_SOUND,
    H_MARGIN,
    HALF,
    RenderParams,
    SCALE,
    TouchEvents,
    V_MARGIN,
    Grid
} from "./grid";
import property = cc._decorator.property;
import Config, { Direction } from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import LessonController from "../../../common/scripts/lessonController";

const { ccclass } = cc._decorator;
@ccclass
export default class QuestionBlock extends CommonBlock {
    @property(cc.Prefab)
    slotSelectedPrefab: cc.Prefab = null;

    protected highlightNode: cc.Node = null;
    protected _isHighlightNodePresent: boolean = false;

    protected _sound: any = null;
    protected _soundID: number;
    _isRTL: boolean = false;

    @catchError()
    protected onLoad() {
        this.node.on(TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.on(TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(TouchEvents.TOUCH_END, this.onTouchEnd, this);
        this.node.on(TouchEvents.TOUCH_CANCEL, this.onTouchEnd, this);
        this.fontColor = '#654321';
        const label: cc.Node = this.createLabelNode(this.textFont, this.contentText, this.fontSize, this.fontColor);
        this.node.addChild(label);
        this.highlightNode = cc.instantiate(this.slotSelectedPrefab);
        this._isRTL = Config.i.direction == Direction.RTL;

        // inital load from game sound
        Util.loadGameSound(this.contentText, (clip) => {
            this._sound = clip;
        });
        if (this._isRTL) {
            this.node.scaleX = -1;
        }
    }

    onTouchMove(touch: cc.Touch) {
        const location = touch.getLocation();
        const nodeSpaceLocation = this.node.getParent().convertToNodeSpaceAR(location);
        if (!this.node.getBoundingBox().contains(nodeSpaceLocation)) {
            this.touchEnded();
        }
    }

    onTouchStart(touch: cc.Touch) {
        new cc.Tween().target(this.node)
            .call(() => {
                this.addHighLightedNode();
                this.speak();
            })
            .to(0.15, { scaleX: this.checkRTLAndScale(1.1), scaleY: 1.1 * SCALE }, { progress: null, easing: 'sineOut' })
            .start();

    }

    @catchError()
    speak() {
        LessonController.getFriend().speakGameAudioOrPhonics(this.contentText, () => {})
        // try {
        //     if (!!this._sound) {
        //         this._soundID = Util.play(this._sound, false);
        //         if (this._soundID === -1) {
        //             Util.speakGameAudioOrPhonics(this.contentText, () => {})
        //         }
        //     } else {
        //         Util.speakGameAudioOrPhonics(this.contentText, () => {})
        //     }
        // } catch (e) {

        // }
    }

    onTouchEnd(touch: cc.Touch) {
        this.touchEnded();
    }

    private touchEnded(): void {
        new cc.Tween().target(this.node).to(0.15, { scaleX: this.checkRTLAndScale(1.1), scaleY: 1.1 * SCALE }, { progress: null, easing: 'sineOut' })
            .call(() => {
                this.removeHighLightedNode();
            })
            .start();
    }

    @catchError()
    checkRTLAndScale(value: number): number {
        return value * SCALE * (this._isRTL ? -1 : 1);
    }

    @catchError()
    render(renderParams: RenderParams): void {
        this.node.name = renderParams.content;
        this.contentText = renderParams.content;
        this.node.width = Grid._maxNodeWidth;
        this.node.height = Grid._maxNodeHeight;
        this.fontSize = FONT_SIZE;
        this.node.scale *= SCALE;
        let x, y = 0;
        switch (renderParams.blockType) {
            case BLOCK_TYPE.H_QUESTION:
                // @ts-ignore
                const fraction = parseFloat(((renderParams.index + 1) / (renderParams.totalBlocks + 1)).toFixed(2));
                // @ts-ignore
                x = renderParams.parentNode.getBoundingBox().width * (this.node.anchorX - fraction) + this.node.getBoundingBox().width * 0.5;
                // @ts-ignore
                y = renderParams.parentNode.getBoundingBox().height * HALF - 2.35 * V_MARGIN;
                this.node.setPosition(x, y);
                Grid.addToHorizontalPositions(x);

                break;
            case BLOCK_TYPE.V_QUESTION:
                this.node.width -= H_MARGIN;
                // @ts-ignore
                const fraction = parseFloat(((renderParams.index + 1) / (renderParams.totalBlocks + 1)).toFixed(2));
                // @ts-ignore
                x = renderParams.parentNode.getBoundingBox().x + this.node.getBoundingBox().width * HALF + H_MARGIN;
                // @ts-ignore
                y = renderParams.parentNode.getBoundingBox().height * (this.node.anchorY - fraction) - this.node.getBoundingBox().height * 0.7;
                this.node.setPosition(x, y);
                Grid.addToVerticalPositions(y);
                break;
        }

        renderParams.parentNode.addChild(this.node);
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }
}

