import { promisify } from '../..';

const nonCallbackFunction = () => {
    return 1;
};

const promisified = promisify(nonCallbackFunction);

// Should not compile, because the return value is gibberish
promisified().then((result: string) => {
});