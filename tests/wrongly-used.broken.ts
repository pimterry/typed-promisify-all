import { promisify } from '..';

const callbackWithReturnType = (callback: (err: any, data: number) => void) => {
    callback(null, 123);
};

const promisified = promisify(callbackWithReturnType);

promisified().then((result) => {
    let x: string = result; // Should not compile, because `result` is inferred as `number`
});