import * as Promise from 'any-promise';

export function promisify(f: Function): Function {
    return () => Promise.resolve();
}