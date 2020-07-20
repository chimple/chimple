import ccclass = cc._decorator.ccclass;
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

@ccclass
export default class Image extends cc.Component {
    quizDir: string = '';
    imageName: string = '';

    @catchError()
    protected onLoad(): void {
        const picWidth = this.node.width;
        const picHeight = this.node.height;

        Util.loadTexture(this.quizDir + this.imageName, (texture) => {
            if (texture != null) {
                const sprite = this.node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                const size = sprite.spriteFrame.getOriginalSize();
                const xScale = picWidth / size.width;
                const yScale = picHeight / size.height;
                const scale = Math.min(xScale, yScale);
                this.node.width = scale * size.width;
                this.node.height = scale * size.height;
            }
        });
    }
}
