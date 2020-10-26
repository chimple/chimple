import {ApiHandler} from "./ApiHandler";
import {ParseApi} from "./parseApi";
import {FirebaseApi} from "./FirebaseApi";
import {ParseNetwork} from "./ParseNetwork";

export enum APIMode {
    PARSE,
    FIREBASE
}

export class ServiceConfig {
    private static instance: ServiceConfig;
    private _handler: ApiHandler;
    private _mode: APIMode;

    private constructor() {
    }

    public static getInstance(mode: APIMode): ServiceConfig {
        if (!ServiceConfig.instance) {
            ServiceConfig.instance = new ServiceConfig();
            ServiceConfig.instance.mode = mode;

            ParseNetwork.getInstance();
        }

        switch (mode) {
            case APIMode.FIREBASE:
                this.instance.initializeFireBase();
                break;
            case APIMode.PARSE:
                this.instance.initializeParse();
                break;
        }


        return ServiceConfig.instance;
    }

    public static getI(): ServiceConfig {
        return ServiceConfig.instance;
    }

    private initializeParse(): void {
        this._handler = ApiHandler.getInstance(ParseApi.getInstance());
    }

    // @ts-ignore
    private initializeFireBase() {
        this._handler = ApiHandler.getInstance(FirebaseApi.getInstance());
    }

    get handle(): ApiHandler {
        return this._handler
    }

    set mode(mode: APIMode) {
        this._mode = mode;
    }

    get mode() {
        return this._mode;
    }
}
