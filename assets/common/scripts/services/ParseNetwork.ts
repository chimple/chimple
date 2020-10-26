import {ParseApi} from "./parseApi";
import {
    ASSIGN_HOMEWORK_FAILED,
    DEFAULT_TIMEOUT,
    GET,
    POST,
    PUT,
    UPDATE_HOME_TEACHER,
    UPDATE_HOME_TEACHER_FAILED,
    UPDATE_MONITOR,
    UPDATE_MONITOR_FAILED,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAILED,
    UPDATE_PROGRESS,
    UPDATE_PROGRESS_FAILED
} from "../domain/parseConstants";
import {FilePointer, Pointer} from "../domain/parseSchool";
import {Queue} from "../../../queue";
import UtilLogger from "../util-logger";
import {User} from "../lib/profile";
import {CURRENT_STUDENT_ID, QUEUE_OFFLOAD_FREQUENCY} from "../lib/constants";
import {ASSIGN_HOMEWORK} from "../../../chimple";
import {APIMode, ServiceConfig} from "./ServiceConfig";
import {FirebaseApi} from "./FirebaseApi";

export const PARSE_CACHE = 'PARSE_CACHE';

//@ts-ignore
cc.processQueue = function () {
    // cc.log("started process queue");
    ParseNetwork.getInstance().consumeMessage();
    // cc.log("finished process queue");
};

export interface RequestOptions {
    ignoreCache?: boolean;
    headers?: { [key: string]: string };
    timeout?: number; // 0 (or negative) to wait forever
    responseType?: XMLHttpRequestResponseType;
    authHeader?: AuthHeader;
}

export interface AuthHeader {
    [key: string]: string;
}

export interface QueryParams {
    [key: string]: any;
}

export interface RequestParams {
    url: string;
    queryParams?: QueryParams;
    isWhereQuery?: boolean;
    body?: any;
    includeParam?: string;
    keysParam?: string;
}

export interface RequestResult {
    ok: boolean;
    status: number;
    statusText: string;
    data: any;
    headers: string;
    responseType?: XMLHttpRequestResponseType;
}

export class ParseNetwork {
    private cacheTimeInMillis = 1 * 60 * 1000;
    private cachedApiTimings: Map<string, number> = new Map<string, number>();
    private static instance: ParseNetwork;
    private isHandlerBusy: boolean = false;
    private handler = null;

    private constructor() {
    }

    public static init() {
        ParseNetwork.getInstance();
    }

    public static getInstance(): ParseNetwork {
        if (!ParseNetwork.instance) {
            ParseNetwork.instance = new ParseNetwork();
            const cachedItems = ParseNetwork.instance.getParseObjectFromCache(PARSE_CACHE);
            if (!!cachedItems) {
                Object.keys(cachedItems).forEach(k => {
                    ParseNetwork.instance.cachedApiTimings.set(k, cachedItems[k]);
                });
            }
            const parseApi: ParseApi = ParseApi.getInstance();
            ParseNetwork.instance.startOnlyIfWeb();
        }

        return ParseNetwork.instance;
    }

    private withQuery(url: string, params: QueryParams, isWhereQuery: boolean, includeParam: string, keysParam: string): string {
        if (!params) return url;
        const queryString = this.queryParams(params, isWhereQuery);
        const sep: string = url.indexOf('?') === -1 ? '?' : '&';
        let includeCriteria = !!includeParam ? '&include=' + includeParam : '';
        let keysCriteria = !!keysParam ? '&keys=' + keysParam : '';
        return queryString ? url + sep + queryString + includeCriteria + keysCriteria : url;
    }

    private queryParams(params, isWhereQuery: boolean): string {
        if (isWhereQuery) {
            return 'where=' + JSON.stringify(params);
        } else {
            return Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
        }
    }

    private parseXHRResult(xhr: XMLHttpRequest): RequestResult {
        let isTextResponse = xhr.responseType === '' || xhr.responseType === 'text';
        let isJsonResponse = xhr.responseType === 'json';
        return {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            responseType: xhr.responseType,
            headers: xhr.getAllResponseHeaders(),
            data: isTextResponse ? xhr.responseText : xhr.response
        };
    }

    private errorResponse(xhr: XMLHttpRequest, message: string | null = null): RequestResult {
        return {
            ok: false,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: message || xhr.statusText
        };
    }

    public storeIntoCache(key: string, data: object | string) {
        let storeData = typeof (data) === 'object' ? JSON.stringify(data) : data;
        cc.sys.localStorage.setItem(key, storeData);
    }

    public removeFromCache(key: string) {
        cc.sys.localStorage.removeItem(key);
    }

    public getStringFromCache(key: string): string {
        return cc.sys.localStorage.getItem(key);
    }

    public getParseObjectFromCache(key: string): object {
        try {
            return JSON.parse(cc.sys.localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }

    public async createMonitor(requestParams: RequestParams,
                               options: RequestOptions = null) {
        let jsonResult = null;
        try {
            let result: RequestResult = await ParseNetwork.getInstance().request(POST, requestParams, options);
            cc.log(result);
        } catch (e) {
            cc.log('exception:', e);
        }
        return jsonResult;

    }

    public isEmpty(obj: any) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    private isCacheValidForKey(cachedKey: string): boolean {
        let curTime = new Date().getTime();
        let cachedValidTimeInMillis = ParseNetwork.getInstance().cachedApiTimings.get(cachedKey) || 0;
        let cachedValue: string = ParseNetwork.getInstance().getStringFromCache(cachedKey);
        let isValid: boolean = false;
        try {
            const parsed: any = JSON.parse(cachedValue);
            isValid = !ParseNetwork.getInstance().isEmpty(parsed);
        } catch (e) {

        }
        return curTime < cachedValidTimeInMillis && isValid;
    }

    public async get(requestParams: RequestParams,
                     cachedKey: string,
                     options: RequestOptions
    ) {
        let jsonResult = null;
        let isCacheValid: boolean = false;
        try {
            isCacheValid = cachedKey && ParseNetwork.getInstance().isCacheValidForKey(cachedKey);
            if (isCacheValid) {
                jsonResult = ParseNetwork.getInstance().getParseObjectFromCache(cachedKey);
            } else {
                let result: RequestResult = await ParseNetwork.getInstance().request(GET, requestParams, options);
                jsonResult = ParseNetwork.getInstance().processResult(result, cachedKey);
            }
        } catch (e) {
            cc.log('exception:', e);
        }
        return jsonResult;
    }

    public async update(requestParams: RequestParams,
                        options: RequestOptions
    ): Promise<void> {


        try {
            let result: RequestResult = await ParseNetwork.getInstance().request(PUT, requestParams, options);
            cc.log('result:', result);
        } catch (e) {
            cc.log('exception:', e);
        }
    }

    public async post(requestParams: RequestParams,
                      options: RequestOptions
    ): Promise<RequestResult> {
        let result: RequestResult = null;
        cc.log("calling post request with options", JSON.stringify(options));
        try {
            result = await ParseNetwork.getInstance().request(POST, requestParams, options);
            cc.log('result:', result);
            if (!result.ok) {
                cc.log('processing failed to due:', result.data);
                throw Error('processing failed to due: ' + result.data);
            }
        } catch (e) {
            cc.log('exception:', e);
            throw e;
        }
        return result;
    }

    public createPointer(className: string, objectId: string): Pointer {
        return {
            '__type': 'Pointer',
            'className': className,
            'objectId': objectId
        };
    }

    public createFilePointer(name: string, url: string): FilePointer {
        return {
            '__type': 'File',
            'name': name,
            'url': url
        };
    }

    private processResult(result: RequestResult, cachedKey: string) {
        let jsonResult = null;
        try {
            if (result && result.data && result.ok && !result.data.error) {
                let isTextResponse = result.responseType === '' || result.responseType === 'text';
                let isJsonResponse = result.responseType === 'json';
                let isArrayBufferResponse = result.responseType === 'arraybuffer';
                let cachedValidTime = new Date().getTime() + ParseNetwork.getInstance().cacheTimeInMillis;
                if (isJsonResponse) {
                    jsonResult = result.data;
                    if ('results' in jsonResult && Array.isArray(jsonResult.results)) {
                        jsonResult = jsonResult.results;
                    }
                    !!cachedKey ? ParseNetwork.getInstance().storeIntoCache(cachedKey, jsonResult) : null;
                    ParseNetwork.getInstance().cachedApiTimings.set(cachedKey, cachedValidTime);
                } else if (isArrayBufferResponse) {
                    let base64 = this.createBase64Image(result);
                    !!cachedKey ? ParseNetwork.getInstance().storeIntoCache(cachedKey, base64) : null;
                    ParseNetwork.getInstance().cachedApiTimings.set(cachedKey, cachedValidTime);
                }
            } else {
                jsonResult = !!cachedKey ? ParseNetwork.getInstance().getParseObjectFromCache(cachedKey) : null;
            }
        } catch (e) {
            cc.log('exception', e);
        } finally {
            let st = {};
            ParseNetwork.getInstance().cachedApiTimings.forEach((value: number, key: string) => {
                if (key) {
                    st[key] = value;
                }
            });
            ParseNetwork.getInstance().storeIntoCache(PARSE_CACHE, st);
        }

        return jsonResult;
    }

    private createBase64Image(result: RequestResult) {
        let uInt8Array = new Uint8Array(result.data);
        var i = uInt8Array.length;
        var biStr = new Array(i);
        while (i--) {
            biStr[i] = String.fromCharCode(uInt8Array[i]);
        }
        let base64 = window.btoa(biStr.join(''));
        return base64;
    }

    private request(method,
                    requestParams: RequestParams,
                    options: RequestOptions) {

        let {url, queryParams, body, isWhereQuery, includeParam, keysParam} = requestParams;
        const ignoreCache = options.ignoreCache || false;
        const headers = options.headers;
        const timeout = options.timeout || DEFAULT_TIMEOUT;

        return new Promise<RequestResult>((resolve, reject) => {
            const xhr = cc.loader.getXMLHttpRequest();
            xhr.responseType = !!options.responseType ? options.responseType : 'json';
            const requestUrl = this.withQuery(url, queryParams, isWhereQuery, includeParam, keysParam);
            xhr.open(method, requestUrl, true);

            if (headers) {
                Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
            }

            if (ignoreCache) {
                xhr.setRequestHeader('Cache-Control', 'no-cache');
            }

            xhr.timeout = timeout;

            xhr.onload = evt => {
                resolve(this.parseXHRResult(xhr));
            };

            xhr.onerror = evt => {
                resolve(this.errorResponse(xhr, 'Failed to make request.'));
            };

            xhr.ontimeout = evt => {
                resolve(this.errorResponse(xhr, 'Request took longer than expected.'));
            };

            if ((method === POST || method === PUT) && body) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(body));
            } else {
                xhr.send();
            }
        });
    }

    public consumeMessage() {
        // cc.log("called consumeMessage");
        if (ParseNetwork.getInstance().isHandlerBusy) {
            // cc.log("Queue is busy handling....");
            return;
        }

        this.isHandlerBusy = true;
        // cc.log('started consumeMessage -> checking queue empty', Queue.getInstance().isEmpty());

        while (!Queue.getInstance().isEmpty()) {
            const payload = Queue.getInstance().pop();
            cc.log('found payload to process', payload);
            if (!!payload) {
                switch (payload.kind) {
                    case 'Progress':
                        // only happen in CLOSE, School or Home (with teacher)
                        cc.log("calling update progress API");
                        ServiceConfig.getI().handle.updateProgress(payload)
                            .then(res => {
                                UtilLogger.logChimpleEvent(UPDATE_PROGRESS, payload);
                            })
                            .catch(err => {
                                Queue.getInstance().push(payload)
                                UtilLogger.logChimpleEvent(UPDATE_PROGRESS_FAILED, payload);
                            });
                        break;
                    case 'Monitor':
                        cc.log("calling update monitor API");
                        ParseApi.getInstance().updateMonitor(payload)
                            .then(res => {
                                cc.log(res);
                                UtilLogger.logChimpleEvent(UPDATE_MONITOR, payload);
                            })
                            .catch(err => {
                                Queue.getInstance().push(payload)
                                UtilLogger.logChimpleEvent(UPDATE_MONITOR_FAILED, payload);
                            });
                        break;
                    case 'Profile':
                        cc.log("calling update profile API");
                        ParseApi.getInstance().updateProfile(payload)
                            .then(r => {
                                cc.log('successfully updated profile ', payload.studentId)
                                UtilLogger.logChimpleEvent(UPDATE_PROFILE, payload);
                            })
                            .catch(err => {
                                cc.log('failed to update profile ', payload.studentId, ' with error ', err);
                                UtilLogger.logChimpleEvent(UPDATE_PROFILE_FAILED, payload);
                                Queue.getInstance().push(payload)
                            });
                        break;
                    case 'UpdateHomeTeacher':
                        cc.log("calling update home teacher API");
                        ServiceConfig.getI().handle.updateHomeTeacher(payload)
                            .then(res => {
                                cc.log(res);
                                this.onHomeTeacherSuccess(payload.homeId, payload.homeId)
                                UtilLogger.logChimpleEvent(UPDATE_HOME_TEACHER, payload);
                            })
                            .catch(err => {
                                Queue.getInstance().push(payload);
                                UtilLogger.logChimpleEvent(UPDATE_HOME_TEACHER_FAILED, payload);
                            });
                        break;
                    case 'AssignHomeWork':
                        cc.log("calling assign Homework API");
                        ParseApi.getInstance().assignHomeWork(payload)
                            .then(res => {
                                cc.log(res)
                                UtilLogger.logChimpleEvent(ASSIGN_HOMEWORK, payload);
                            })
                            .catch(err => {
                                Queue.getInstance().push(payload)
                                UtilLogger.logChimpleEvent(ASSIGN_HOMEWORK_FAILED, payload);
                            });
                    default:
                        cc.log("found payload with no handler.. ignoring", payload);
                        break;
                }
            }
        }
        this.isHandlerBusy = false;
        cc.log("finished queue processing -> resetting isHandlerBusy", this.isHandlerBusy);
    }

    onHomeTeacherSuccess(homeId: string, studentId: string) {
        const associatedUser: User = User.getUsers().find(u => u.id === homeId);
        if (associatedUser) {
            associatedUser.serverId = studentId;
            if (User.getCurrentUser().id === homeId) {
                ParseNetwork.getInstance().storeIntoCache(CURRENT_STUDENT_ID, studentId);
                User.getCurrentUser().serverId = studentId;
            }
        }
    }

    startOnlyIfWeb() {
        if (cc.sys.isBrowser) {
            ParseNetwork.getInstance().clearScheduler();
            ParseNetwork.getInstance().startScheduler();
        }
    }

    public startScheduler() {
        this.handler = setInterval(this.consumeMessage, QUEUE_OFFLOAD_FREQUENCY);
    }

    public clearScheduler() {
        if (this.handler) {
            clearInterval(this.handler);
        }
    }
}
