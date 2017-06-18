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

    it("should promisify a function that calls back with an error", () => {
        const thrownError = new Error();
        const callbackWithError = (callback: (err: Error) => void) => callback(thrownError);

        const promisified = promisify(callbackWithError);

        return expect(promisified()).to.eventually.be.rejectedWith(thrownError);
    });

    it("should promisify a function that throws a synchronous error", () => {
        const thrownError = new Error();
        const callbackWithError = (callback: (err: Error) => void) => { throw thrownError; };

        const promisified = promisify(callbackWithError);

        return expect(promisified()).to.eventually.be.rejectedWith(thrownError);
    });
});