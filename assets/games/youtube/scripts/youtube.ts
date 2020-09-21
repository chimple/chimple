import ccclass = cc._decorator.ccclass;
import Config from "../../../common/scripts/lib/config";
import catchError from "../../../common/scripts/lib/error-handler";
import UtilLogger from "../../../common/scripts/util-logger";

let handler = null;
//@ts-ignore
cc.nextYoutube = function () {
    cc.log("started nextYoutube");
    // Config.i.popScene();
    handler.node.emit('nextProblem');
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
        handler = this;
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
    }

    protected start() {
        UtilLogger.launchYoutube(this._currentConfig.videoId);
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
