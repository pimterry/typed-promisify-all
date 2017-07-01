import * as Promise from 'any-promise';

type Callback<T> = ((err: any, result: T) => void);

type NoParamFunction<R> = () => R;
type OneParamFunction<A1, R> = (a: A1) => R;
type TwoParamFunction<A1, A2, R> = (a1: A1, a2: A2) => R;
type ThreeParamFunction<A1, A2, A3, R> = (a1: A1, a2: A2, a3: A3) => R;
type FourParamFunction<A1, A2, A3, A4, R> = (a1: A1, a2: A2, a3: A3, a4: A4) => R;
type FiveParamFunction<A1, A2, A3, A4, A5, R> = (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => R;
type SixParamFunction<A1, A2, A3, A4, A5, A6, R> = (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => R;
type AnyFunction<AN, R> = (...args: AN[]) => R;

type CbOnlyFunction<T> = OneParamFunction<Callback<T>, void>;
type OneParamCbFunction<A1, T> = TwoParamFunction<A1, Callback<T>, void>;
type TwoParamCbFunction<A1, A2, T> = ThreeParamFunction<A1, A2, Callback<T>, void>;
type ThreeParamCbFunction<A1, A2, A3, T> = FourParamFunction<A1, A2, A3, Callback<T>, void>;
type FourParamCbFunction<A1, A2, A3, A4, T> = FiveParamFunction<A1, A2, A3, A4, Callback<T>, void>;
type FiveParamCbFunction<A1, A2, A3, A4, A5, T> = SixParamFunction<A1, A2, A3, A4, A5, Callback<T>, void>;

// These are matched in order, so order here is important!
// It would be nice to have a single 'no callback' fallback -> never, but the problem is that while
// a 1 param function is not a valid callback-only function (so falls through), it is a valid 1 param
// + callback function (that ignores the callback), so it'll always match a stage lower. If we alternate
// though, we can catch this, and real total type safety here.
export function promisify<R>(func: NoParamFunction<R>): () => never;
export function promisify<T>(func: CbOnlyFunction<T>): () => Promise<T>;
export function promisify<A1, R>(func: OneParamFunction<A1, R>): (arg1: A1) => never;
export function promisify<A1, T>(func: OneParamCbFunction<A1, T>): (arg1: A1) => Promise<T>;
export function promisify<A1, A2, R>(func: TwoParamFunction<A1, A2, R>): (arg1: A1, arg2: A2) => never;
export function promisify<A1, A2, T>(func: TwoParamCbFunction<A1, A2, T>): (arg1: A1, arg2: A2) => Promise<T>;
export function promisify<A1, A2, A3, R>(func: ThreeParamFunction<A1, A2, A3, R>): (arg1: A1, arg2: A2, arg3: A3) => never;
export function promisify<A1, A2, A3, T>(func: ThreeParamCbFunction<A1, A2, A3, T>): (arg1: A1, arg2: A2, arg3: A3) => Promise<T>;
export function promisify<A1, A2, A3, A4, R>(func: FourParamFunction<A1, A2, A3, A4, R>): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => never;
export function promisify<A1, A2, A3, A4, T>(func: FourParamCbFunction<A1, A2, A3, A4, T>): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Promise<T>;
export function promisify<A1, A2, A3, A4, A5, R>(func: FiveParamFunction<A1, A2, A3, A4, A5, R>): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => never;
export function promisify<A1, A2, A3, A4, A5, T>(func: FiveParamCbFunction<A1, A2, A3, A4, A5, T>): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Promise<T>;
export function promisify(f: Function): AnyFunction<any, Promise<any> | never>;
export function promisify(f: Function): AnyFunction<any, Promise<any> | never> {
    return function promisifyWrapper() {
        let args = [].slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push(function callback(err: any, data: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
            f.apply(this, args);
        });
    }
}