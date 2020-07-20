import property = cc._decorator.property;
import {RenderParams} from "./grid";
import Overflow = cc.Label.Overflow;
import catchError from "../../../common/scripts/lib/error-handler";
import ChimpleLabel from "../../../common/scripts/chimple-label";

export const DEFAULT_FONT_COLOR = cc.Color.BLACK;

export default abstract class CommonBlock extends cc.Component {
    @property({
        type: cc.Font
    })
    textFont: cc.Font = null;

    @property(cc.Prefab)
    slotSelectedPrefab: cc.Prefab = null;

    _contentText: string = null;
    _fontSize: string = null;
    _fontColor: string = null;
    _questionSound: any = null;

    protected highlightNode: cc.Node = null;
    protected _isHighlightNodePresent: boolean = false;

    get contentText(): string {
        return this._contentText;
    }

    set contentText(newVal) {
        this._contentText = newVal;
    }

    get fontSize(): string {
        return this._fontSize;
    }

    set fontSize(newVal) {
        this._fontSize = newVal;
    }

    get fontColor(): string {
        return this._fontColor;
    }

    set fontColor(newVal) {
        this._fontColor = newVal;
    }

    @catchError()
    createLabelNode(textFont: cc.Font, text: string = '', fontSize: string = '10', fontColor: string = null, showLabel: boolean = true): cc.Node {
        const qLabelNode = new cc.Node(text);
        const label = qLabelNode.addComponent(ChimpleLabel);
        label.string = showLabel ? text : '';
        label.font = textFont;
        label.overflow = Overflow.NONE;
        let defaultFontColor: cc.Color = DEFAULT_FONT_COLOR;
        if (!!fontColor) {
            defaultFontColor = defaultFontColor.fromHEX(fontColor);
        }
        qLabelNode.color = defaultFontColor;
        const outLine = qLabelNode.addComponent(cc.LabelOutline);
        outLine.width = 3;
        const fSize: number = parseInt(fontSize);
        label.fontSize = fSize;
        label.lineHeight = fSize;
        qLabelNode.position = new cc.Vec2(0, fSize * 0.1); // to align text with middle since in bigger font size it aligns down
        return qLabelNode;
    }


    public abstract render(renderParams: RenderParams): void;

    public getRandom(min, max): number {
        return Math.random() * (max - min) + min;
    }

    @catchError()
    public addHighLightedNode(): void {
        if (!this._isHighlightNodePresent && !!this.highlightNode) {
            this._isHighlightNodePresent = true;
            this.highlightNode.width = this.node.width;
            this.highlightNode.height = this.node.height;
            this.node.addChild(this.highlightNode);
        }
    }

    @catchError()
    public removeHighLightedNode(): void {
        if (this._isHighlightNodePresent && !!this.highlightNode) {
            this._isHighlightNodePresent = false;
            this.node.removeChild(this.highlightNode);
        }
    }

}
