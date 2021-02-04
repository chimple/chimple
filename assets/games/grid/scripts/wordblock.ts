import CommonBlock from "./CommonBlock";
import { FONT_SIZE, H_GAP, RenderParams, V_GAP, Grid } from "./grid";
import Config,{ Direction } from "../../../common/scripts/lib/config";
import catchError from "../../../common/scripts/lib/error-handler";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WordBlock extends CommonBlock {

    @catchError()
    protected onLoad(): void {
        this.fontColor = '#654321';
        const label: cc.Node = this.createLabelNode(null, this.contentText, this.fontSize, this.fontColor, false);
        this.node.addChild(label);
        this.node.width = Grid._maxNodeWidth + H_GAP;
        this.node.height = Grid._maxNodeHeight + V_GAP;
        this.highlightNode = cc.instantiate(this.slotSelectedPrefab);
        if(Config.i.direction == Direction.RTL){
            this.node.scaleX=-1;
        }
    }

    @catchError()
    public render(renderParams: RenderParams): void {
        this.fontSize = FONT_SIZE;
        this.node.name = renderParams.content;
        this.contentText = renderParams.content;
        this.node.setPosition(renderParams.position.x, renderParams.position.y);
        renderParams.parentNode.addChild(this.node);
        if(Config.i.direction == Direction.RTL){
            this.node.scaleX=-1;
        }
    }
}

