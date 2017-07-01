import { promisify } from '../..';

const callbackWithReturnType = (callback: (err: any, data: number) => void) => {
    callback(null, 123);
};

const promisified = promisify(callbackWithReturnType);

promisified().then((result: string) => { });