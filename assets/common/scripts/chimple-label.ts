import ccclass = cc._decorator.ccclass;
import Config, {Direction, Lang, LANG_CONFIGS} from "./lib/config";
import {Util} from "./util";
import Profile, {LANGUAGE} from "./lib/profile";

@ccclass
export default class ChimpleLabel extends cc.Label {
    private _key: string = null;

    protected onLoad(): void {
        super.onLoad();
        this.useSystemFont = false;
        this._key = this.string;
        const config = Config.i;
        // const lang = Config.i.course
        //     ? (Config.i.course.id == 'maths'
        //         ? (Config.i.hasTracing
        //             ? Lang.ENGLISH
        //             : Profile.lang)
        //         : Config.i.course.lang as Lang)
        //     : (Profile.lang || Lang.ENGLISH)
        // const lang = Profile.lang || Lang.ENGLISH;
        if (config !== null) {
            // config.currentFontName = config.currentFontName === null ? lang + '-main' : config.currentFontName;
            const fontName: string = config.currentFontName;
            cc.log('applied font:', fontName);
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
