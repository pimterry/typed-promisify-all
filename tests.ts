import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const { expect, AssertionError } = chai;

import { promisify } from '.';

describe("promisify", () => {
    it("should promisify a function without params", () => {
        const callbackWithoutParams = (callback: () => void) => callback();

        const promisified = promisify(callbackWithoutParams);

        return expect(promisified()).to.eventually.equal(undefined);
    });
});