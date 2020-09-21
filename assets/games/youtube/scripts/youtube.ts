import ccclass = cc._decorator.ccclass;
import Config from "../../../common/scripts/lib/config";
import catchError from "../../../common/scripts/lib/error-handler";
import UtilLogger from "../../../common/scripts/util-logger";

//@ts-ignore
cc.nextYoutube = function () {
    cc.log("started nextYoutube");
    Config.i.popScene();
};

interface YoutubeConfig {
    name: string;
    version: string;
    description: string;
    videoId: string;
}

@ccclass
export class Youtube extends cc.Component {
    _currentConfig: YoutubeConfig = null;

    protected onLoad() {
        // UtilLogger.initYoutubePlugin();
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
    }

    protected start() {
        UtilLogger.launchYoutube(this._currentConfig.videoId);
        // @ts-ignore
        // if ('undefined' == typeof sdkbox.PluginYoutube) {
        //     cc.log('sdkbox.PluginYoutube is undefined');
        //     return;
        // }
        //
        // // @ts-ignore
        // sdkbox.PluginYoutube.setListener({
        //     onPlayEnds: (ok) => {
        //         cc.log("onPlayEnds:" + ok);
        //         this.scheduleOnce(
        //             () => {
        //                 sdkbox.PluginYoutube.close();
        //                 // Config.getInstance().nextProblem();
        //                 this.node.emit('nextProblem');
        //             }
        //             , 0.25)
        //
        //     }
        // });
        // @ts-ignore
        // sdkbox.PluginYoutube.playVideo(this._currentConfig.videoId, 0, true, true);

    }

    @catchError()
    private processConfiguration(data: any[] = []): YoutubeConfig | null {
        const configurations: any[] = [].concat(...data);
        let [name, version, description, videoId] = configurations;
        return {
            name,
            version,
            description,
            videoId
        };
    }

}
