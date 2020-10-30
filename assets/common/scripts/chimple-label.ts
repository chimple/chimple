import ccclass = cc._decorator.ccclass;
import Config, {Direction} from "./lib/config";
import {Util} from "./util";

@ccclass
export default class ChimpleLabel extends cc.Label {
    private _key: string = null;

    protected onLoad(): void {
        super.onLoad();
        this.useSystemFont = true;
        this._key = this.string;
        const config = Config.i;
        if (config !== null) {
            const fontName: string = config.currentFontName;
            let fontLoaded: boolean = config.hasLoadedTextFont(fontName);
            if (fontLoaded) {
                this.font = config.getTextFont(fontName);
            }
            if (config.direction == Direction.RTL && this.horizontalAlign == cc.Label.HorizontalAlign.LEFT) {
                this.horizontalAlign = cc.Label.HorizontalAlign.RIGHT
            }

            if (config.game === null || config.game === undefined || (config.course && config.course.type != 'literacy')) {
                this.string = Util.i18NText(this._key)
            }
        }
    }

    get key(): string {
        return this._key;
    }
}
