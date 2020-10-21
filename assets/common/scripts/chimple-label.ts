import ccclass = cc._decorator.ccclass;
import Config, { Direction } from "./lib/config";
import { Util } from "./util";

@ccclass
export default class ChimpleLabel extends cc.Label {
protected onLoad(): void {
        super.onLoad();
        this.useSystemFont = true;
        const config = Config.i
        if (config !== null) {
            const fontName: string = config.currentFontName;
            let fontLoaded: boolean = config.hasLoadedTextFont(fontName);
            if (fontLoaded) {
                this.font = config.getTextFont(fontName);
            }
            if (config.direction == Direction.RTL && this.horizontalAlign == cc.Label.HorizontalAlign.LEFT) {
                this.horizontalAlign = cc.Label.HorizontalAlign.RIGHT
            }

            if (config.game === null || config.game === undefined || (config.course && config.course.type == 'maths')) {
                this.string = Util.i18NText(this.string)
            }
        }
    }
}
