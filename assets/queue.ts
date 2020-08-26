import { PARSE_ENABLED } from "./common/scripts/lib/constants";

export const QUEUE_CACHE = 'QUEUE_CACHE';

export class Queue {
    private static instance: Queue;
    private _store: any[] = [];

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
}