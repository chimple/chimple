import {ParseNetwork} from "./ParseNetwork";
import DownloaderTask = jsb.DownloaderTask;
import UtilLogger from "../util-logger";

export class ParseImageDownloader {
    private static downloadStatuses: Map<string, boolean> = new Map<string, boolean>();

    public static checkIfImageAlreadyDownloaded(key: string): string {
        return ParseNetwork.getInstance().getStringFromCache(key);
    }

    public static loadImage(imageUrl: string, callBack: Function) {
        if (!imageUrl) return;

        if (imageUrl && imageUrl.indexOf('/') == -1) {
            return;
        }

        if (ParseImageDownloader.downloadStatuses.get(imageUrl)) {
            cc.log('downloading in progress ...', imageUrl);
            return;
        }

        ParseImageDownloader.downloadStatuses.set(imageUrl, true);

        if (ParseImageDownloader.isNative()) {
            const imageFileNameToSave = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            ParseImageDownloader.downloadImageFromNetworkAndSave(imageUrl, imageFileNameToSave, callBack);
        } else {
            ParseImageDownloader.loadImageFromNetwork(imageUrl, imageUrl, callBack);
        }
    }

    public static getHash(input) {
        let hash = 0, len = input ?  input.length : 0;
        for (let i = 0; i < len; i++) {
            hash = ((hash << 5) - hash) + input.charCodeAt(i);
            hash |= 0; // to 32bit integer
        }
        return hash;
    }

    public static loadImageForSchool(imageUrl: string, savedAs: string, callBack: Function) {
        if (!imageUrl) return;

        if (imageUrl && imageUrl.indexOf('/') == -1) {
            return;
        }

        if (ParseImageDownloader.downloadStatuses.get(imageUrl)) {
            cc.log('downloading in progress ...', imageUrl);
            return;
        }

        ParseImageDownloader.downloadStatuses.set(imageUrl, true);

        const hash = ParseImageDownloader.getHash(imageUrl);
        const saveAsHash = savedAs + "_" +  hash;
        if (ParseImageDownloader.isNative()) {
            ParseImageDownloader.downloadImageFromNetworkAndSave(imageUrl, saveAsHash, callBack);
        } else {
            ParseImageDownloader.loadImageFromNetwork(imageUrl, imageUrl, callBack);
        }
    }

    private static downloadImageFromNetworkAndSave(imageUrl: string, imageFileNameToSave: string, callBack: Function) {
        const _storagePath = jsb.fileUtils.getWritablePath() + '/school-photos/';
        cc.log('_storagePath', _storagePath);
        const _inited = jsb.fileUtils.createDirectory(_storagePath);
        if (!_inited) {
            cc.log('Failed to create storage path, downloader won\'t work correctly');
            ParseImageDownloader.downloadStatuses.set(imageUrl, false);
            return;
        }
        imageFileNameToSave = imageFileNameToSave + ".jpg";
        let imageToSave = _storagePath + imageFileNameToSave;
        const isNetworkAvailable: boolean = UtilLogger.isNetworkAvailable();
        if (ParseNetwork.getInstance().getStringFromCache(imageToSave)) {
            cc.log('image found in cache', imageToSave);
            this.loadImageFromNetwork(imageUrl, imageToSave, callBack);
            return;
        }

        if (isNetworkAvailable) {
            const _downloader: jsb.Downloader = new jsb.Downloader();
            _downloader.setOnFileTaskSuccess((task: DownloaderTask) => {
                cc.log('setOnFileTaskSuccess called for:', task.requestURL, ' stored: ', task.storagePath);
                ParseNetwork.getInstance().storeIntoCache(task.storagePath, "true");
                this.loadImageFromNetwork(task.requestURL, task.storagePath, callBack);
            });

            _downloader.setOnTaskError((task: DownloaderTask, errorCode: number,
                                        errorCodeInternal: number, errorStr: string) => {
                ParseImageDownloader.downloadStatuses.set(task.requestURL, false);
                cc.log('Failed to download file (' + task.requestURL + '): ' + errorStr + '(' + errorCode + ')');
                this.clearDownloadStatus(task.requestURL);
            });

            _downloader.createDownloadFileTask(imageUrl, imageToSave);
        }
    }

    private static clearDownloadStatus(imageUrl: string) {
        cc.log('clear download status', imageUrl);
        ParseImageDownloader.downloadStatuses.delete(imageUrl);
    }

    private static loadImageFromNetwork(imageUrl: string, savedImageUrl: string, callBack: Function) {
        try {
            cc.assetManager.loadRemote(savedImageUrl, function (err, texture) {
                if (!err && !!texture) {
                    cc.log('successfully loadImageFromNetwork', savedImageUrl);
                    callBack(texture);
                } else {
                    cc.log('failed loadImageFromNetwork', savedImageUrl);
                }
            });
        } catch (e) {
            cc.error(e);
            callBack(null);
        } finally {
            this.clearDownloadStatus(imageUrl);
        }
    }

    private static isNative(): boolean {
        return cc.sys.isNative &&
            cc.sys.os == cc.sys.OS_ANDROID;
    }
}
