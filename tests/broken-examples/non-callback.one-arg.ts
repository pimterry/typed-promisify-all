import { promisify } from '../..';

const nonCallbackFunction = (x: string) => {
    return 1;
};

const promisified = promisify(nonCallbackFunction);

// Should not compile, because the return value is gibberish
promisified("hi").then((result: string) => {
});