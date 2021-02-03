import ccclass = cc._decorator.ccclass;
import Config from "./lib/config";

@ccclass
export default class ChimpleRichText extends cc.RichText {
    protected onLoad(): void {
        this.useSystemFont = false;
        if (Config.getInstance() !== null) {
            const fontName: string = Config.getInstance().currentFontName;
            let fontLoaded: boolean = Config.getInstance().hasLoadedTextFont(fontName);
            if (fontLoaded) {
                this.font = Config.getInstance().getTextFont(fontName);
            }
        }
    }
}
