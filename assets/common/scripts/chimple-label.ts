import ccclass = cc._decorator.ccclass;
import Config, { Direction } from "./lib/config";
import {Util} from "./util";

@ccclass
export default class ChimpleLabel extends cc.Label {
    protected onLoad(): void {
        super.onLoad();
        this.useSystemFont = true;
        if (Config.getInstance() !== null) {
            const fontName: string = Config.getInstance().currentFontName;
            let fontLoaded: boolean = Config.getInstance().hasLoadedTextFont(fontName);
            if (fontLoaded) {
                this.font = Config.getInstance().getTextFont(fontName);
            }
            if(Config.i.direction == Direction.RTL && this.horizontalAlign == cc.Label.HorizontalAlign.LEFT) {
                this.horizontalAlign = cc.Label.HorizontalAlign.RIGHT
            }

            if(Config.i && (Config.i.game === null || Config.i.game === undefined) ) {
                this.string = Util.i18NText(this.string)
            }
        }
    }
}
