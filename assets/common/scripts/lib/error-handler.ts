import UtilLogger from "../util-logger";

function isAsync(fn) {
    return fn.constructor.name === 'AsyncFunction';
}

export interface CatchErrorOptions {
    catchFunction: CatchCallback;
}

export type CatchCallback = (errMessage?: string, errStack?: string, funcName?: string, className?: string, context?: any, args?: any[]) => void;

function createTempFunction(originalFn: Function, options: CatchOptions) {
    const {catchFunction, className, funcName} = options;

    function handleError(err: Error, funcName: string, className: string, context: any = this, args: any[] = []) {
        catchFunction(err.message, err.stack, funcName, className, context, args);
        return;
    }

    const method = originalFn;
    const isAsyncFunc = isAsync(method);
    if (isAsyncFunc) {
        return async function (...args) {
            const context = this;
            try {
                const result = await method.apply(context, args);
                return result;
            } catch (err) {
                return handleError(err, funcName, className, context, args);
            }
        };
    } else {
        return function (...args) {
            const context = this;
            try {
                const result = method.apply(context, args);
                if (result instanceof Promise) return result.catch((err) => handleError(err, funcName, className, context, args));
                else return result;
            } catch (err) {
                return handleError(err, funcName, className, context, args);
            }
        };
    }
}

type CatchOptions = {
    catchFunction: CatchCallback;
    funcName: string;
    className: string;
}

function logError(errMessage: string, errStack: string, funcName: string, className: string, context: any, args: any[]) {
    cc.log('errMessage:' + errMessage + 'from className:' + className + ' funcName:' + funcName);

    if (!!context) {
        const errorObj = {
            errMessage: errMessage,
            className : className,
            funcName  : funcName
        };
        UtilLogger.logChimpleEvent("errorInfo", errorObj);
        // commenting out skip option for now
        // if(context.node) {
        //     context.scheduleOnce(() => {
        //         context.node.emit('nextProblem');
        //     }, 1);
        // }
    }
}

export function catchError<T>(options?: CatchErrorOptions): any {
    return function (decoratorTargetOrFunction: Object | Function, propertyName?: string, descriptor?: TypedPropertyDescriptor<T>) {
        let decoratorOptions;
        options = {
            catchFunction: logError
        };

        decoratorOptions = {
            funcName: propertyName, className: decoratorTargetOrFunction.constructor.name, ...options
        };

        // function decorator, old-style
        if (typeof decoratorTargetOrFunction === 'function' && typeof descriptor === 'undefined') {
            return createTempFunction(decoratorTargetOrFunction, {...decoratorOptions, funcName: decoratorTargetOrFunction.name});
        }

        let func: Function;
        let descriptorItemName: string;
        let getter = descriptor.get;
        let value = descriptor.value;

        if (getter) {
            func = getter;
            descriptorItemName = 'get';
        } else if (typeof value === 'function') {
            func = value;
            descriptorItemName = 'value';
        } else {
            throw new TypeError('Invalid decoration');
        }

        // static getter or static method decorator, es-next
        if (typeof decoratorTargetOrFunction === 'function' && typeof descriptor !== 'undefined') {
            decoratorOptions.className = `static ${descriptorItemName === 'get' ? 'getter' : 'method'}`;
            decoratorOptions.funcName = func.name;
        }

        return {
            ...descriptor,
            [descriptorItemName]: createTempFunction(func, decoratorOptions)
        };
    };
}

export default catchError;
