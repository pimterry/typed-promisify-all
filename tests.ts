import { expect } from 'chai';

import { promisify } from '.';

describe("promisify", () => {
    it("should promisify a function without params", () => {
        const callbackWithoutParams = (callback: () => void) => callback();

        const promisified = promisify(callbackWithoutParams);

        return promisified().then((result: any) => {
            expect(result).to.be.undefined;
        });
    });
});