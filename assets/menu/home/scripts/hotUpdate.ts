import Profile from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";
import UtilLogger from "../../../common/scripts/util-logger";

const { ccclass, property } = cc._decorator;

class UpdateConfig {
    storagePath: string = null
    manifestUrl: string = null
}

export enum UpdateEvent {
    Checking,
    Updating,
    UpdateDone,
    Done,
    Error
}

export const PROJECT_MANIFEST = 'project.manifest'

@ccclass
export default class HotUpdate extends cc.Component {
    @property(cc.Label)
    status: cc.Label = null

    @property(cc.ProgressBar)
    fileProgress: cc.ProgressBar = null

    @property({
        type: cc.Asset
    })
    manifest: cc.Asset = null

    oneByOne(updates: Array<UpdateConfig>, index: number, callbackOnEnd: (index: number, restart: boolean) => void) {
        HotUpdate.doHotUpdate(updates[index].storagePath, updates[index].manifestUrl, null, (event, status, percent) => {
            this.status.string = status
            this.fileProgress.progress = percent
            if (event == UpdateEvent.Done || event == UpdateEvent.UpdateDone || event == UpdateEvent.Error) {
                callbackOnEnd(index, event == UpdateEvent.UpdateDone && updates[index].storagePath == 'HotUpdateSearchPaths')
                if (++index < updates.length) {
                    this.oneByOne(updates, index, callbackOnEnd)
                }
            }
        })
    }

    onLoad() {
        UtilLogger.initPluginFirebase();
        // Profile.fromJson()
        if (!cc.sys.isNative) {
            cc.director.loadScene('home')
            return
        }
        const updates = [
            {
                storagePath: 'HotUpdateSearchPaths',
                manifestUrl: this.manifest.nativeUrl
            }
        ]
        const subpackages = Util.getSubpackages().map((val) => {
            return {
                storagePath: subpackages + '/' + val,
                manifestUrl: val+'/project.manifest'
            }
        })
        // updates.push(...subpackages) //TODO do this in background
        var doRestart = false
        this.oneByOne(updates, 0, (index: number, restart: boolean) => {
            doRestart = doRestart || restart
            if (index == updates.length - 1) {
                if (doRestart) {
                    cc.audioEngine.stopAll();
                    cc.game.restart();
                } else {
                    cc.director.loadScene('home')
                }
            }
        })
    }

    static doHotUpdate(storagePath: string, manifestUrl: string, manifestJson: string, callback: Function) {
        const fullStoragePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + storagePath)
        const am = new jsb.AssetsManager('', fullStoragePath, (versionA: string, versionB: string) => {
            return Number(versionA) - Number(versionB)
        })

        am.setVerifyCallback((path, asset) => {
            //todo: seems like always returns true
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            const compressed = asset.compressed;
            // Retrieve the correct md5 value.
            const expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            const relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            const size = asset.size;
            if (compressed) {
                callback(UpdateEvent.Checking, "Verification passed : " + relativePath, 0)
                return true;
            } else {
                callback(UpdateEvent.Checking, "Verification passed : " + relativePath + ' (' + expectedMD5 + ')', 0)
                return true;
            }
        });

        callback(UpdateEvent.Checking, 'Hot update is ready, please check or directly update', 0)
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            am.setMaxConcurrentTask(2);
            callback(UpdateEvent.Checking, 'Max concurrent tasks count have been limited to 2', 0)
        }

        callback(UpdateEvent.Checking, 'Checking or updating ...', 0)
        if (am.getState() === jsb.AssetsManager.State.UNINITED) {
            if (manifestUrl) {
                // Resolve md5 url
                var url = manifestUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                am.loadLocalManifest(url);
            } else {
                const manifest = new jsb.Manifest(manifestJson, fullStoragePath);
                am.loadLocalManifest(manifest, fullStoragePath)
            }
        }
        if (!am.getLocalManifest() || !am.getLocalManifest().isLoaded()) {
            callback(UpdateEvent.Error, 'Failed to load local manifest ...', 0)
        }
        am.setEventCallback((event) => {
            switch (event.getEventCode()) {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                    am.setEventCallback(null);
                    callback(UpdateEvent.Error, 'No local manifest file found, hot update skipped', 0)
                    break;
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                    am.setEventCallback(null);
                    callback(UpdateEvent.Error, 'Fail to download manifest file, hot update skipped', 0)
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    am.setEventCallback(null);
                    callback(UpdateEvent.Done, 'Already up to date with the latest remote version', 0)
                    break;
                case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                    callback(UpdateEvent.Checking, 'New version found, please try to update', 0)
                    am.setEventCallback(null);
                    if (am) {
                        am.setEventCallback((event) => {
                            switch (event.getEventCode()) {
                                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                                    am.setEventCallback(null);
                                    callback(UpdateEvent.Error, 'No local manifest file found, hot update skipped', 0)
                                    break;
                                case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                                    var msg = event.getMessage();
                                    callback(UpdateEvent.Updating, msg, event.getPercentByFile())
                                    break;
                                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                                    am.setEventCallback(null);
                                    callback(UpdateEvent.Error, 'No local manifest file found, hot update skipped', 0)
                                    break;
                                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                                    am.setEventCallback(null);
                                    callback(UpdateEvent.Done, 'Already up to date with the latest remote version', 0)
                                    break;
                                case jsb.EventAssetsManager.UPDATE_FINISHED:
                                    am.setEventCallback(null);
                                    callback(UpdateEvent.UpdateDone, 'Update finished. ' + event.getMessage(), 1)
                                    break;
                                case jsb.EventAssetsManager.UPDATE_FAILED:
                                    am.setEventCallback(null);
                                    callback(UpdateEvent.Error, 'Update failed. ' + event.getMessage(), 0)
                                    break;
                                case jsb.EventAssetsManager.ERROR_UPDATING:
                                    am.setEventCallback(null);
                                    callback(UpdateEvent.Error, 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage(), 0)
                                    break;
                                case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                                    am.setEventCallback(null);
                                    callback(UpdateEvent.Error, event.getMessage(), 0)
                                    break;
                                default:
                                    break;
                            }
                        });
                        am.update();
                    }
                    break;
                default:
                    return;
            }

        });
        am.checkUpdate();

    }

    cancel() {
        cc.director.loadScene('home')
    }

}
