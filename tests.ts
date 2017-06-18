import { expect } from 'chai';

import { promisify } from '.';

const callbackWithoutParams = (callback: () => void) => {
    callback();
};

describe("promisify", () => {
    it("should promisify a function without params", () => {
        const promisified = promisify(callbackWithoutParams);

        return promisified().then((result: any) => {
            expect(result).to.be.undefined;
        });
    });
});