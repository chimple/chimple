import { PARSE_ENABLED } from "./common/scripts/lib/constants";
import { ParseApi } from "./private/services/parseApi";

export const QUEUE_CACHE = 'QUEUE_CACHE';

//@ts-ignore
cc.processQueue = function () {
    cc.log("started process queue");
    Queue.getInstance().consumeMessage();
    cc.log("finished process queue");
};

export class Queue {
    private static instance: Queue;
    private _store: any[] = [];
    private isHandlerBusy: boolean = false;

    public static init() {
        Queue.getInstance();
    }

    public static getInstance(): Queue {
        if (!Queue.instance) {
            Queue.instance = new Queue();
            if (PARSE_ENABLED) {
                Queue.instance._store = Queue.instance.getFromCache();
            }
        }

        return Queue.instance;
    }

    push(val: any): void {
        if (PARSE_ENABLED) {
            this._store.push(val);
            cc.sys.localStorage.setItem(QUEUE_CACHE, JSON.stringify(this._store));
        }
    }

    pop(): any | undefined {
        let result: any = undefined;
        if (PARSE_ENABLED) {
            result = this._store.shift();
            cc.sys.localStorage.setItem(QUEUE_CACHE, JSON.stringify(this._store));
        }
        return result;
    }

    isEmpty(): boolean {
        return this._store.length === 0;
    }

    private getFromCache(): Array<any> {
        try {
            return JSON.parse(cc.sys.localStorage.getItem(QUEUE_CACHE)) || [];
        } catch (e) {
            return [];
        }
    }

    public consumeMessage() {
        cc.log("called consumeMessage");
        if (Queue.getInstance().isHandlerBusy) {
            cc.log("Queue is busy handling....");
            return;
        }

        this.isHandlerBusy = true;
        cc.log('started consumeMessage -> checking queue empty', Queue.getInstance().isEmpty());

        while (!Queue.getInstance().isEmpty()) {
            const payload = Queue.getInstance().pop();
            cc.log('found payload to process', payload);
            if (payload) {
                switch (payload.kind) {
                    case 'Progress':
                        // only happen in CLOSE, School or Home (with teacher)
                        cc.log("calling update progress API");
                        ParseApi.getInstance().updateProgress(payload)
                            .then(res => cc.log(res))
                            .catch(err => cc.log(err));
                        break;
                    case 'Monitor':
                        cc.log("calling update monitor API");
                        ParseApi.getInstance().updateMonitor(payload)
                            .then(res => cc.log(res))
                            .catch(err => cc.log(err));
                        break;
                    default:
                        cc.log("found payload with no handler.. ignoring", payload);
                        break;
                }
            }
        }
        this.isHandlerBusy = false;
        cc.log("finished queue processing -> resetting isHandlerBusy", this.isHandlerBusy);
    }
}
