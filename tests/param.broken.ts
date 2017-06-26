import { promisify } from '..';

const callbackWithParam = (param: number, callback: () => void) => { };

const promisified = promisify(callbackWithParam);

// Should fails to compile: argument of type '"hello"' is not assignable to parameter of type 'number'.
promisified("hello");