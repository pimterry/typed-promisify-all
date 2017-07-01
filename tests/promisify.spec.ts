import { TSError } from 'ts-node';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const { expect, AssertionError } = chai;

import { promisify } from '..';

function expectCompilationFailure(name: string, errorMatcher: RegExp) {
    expect(
        () => require('./broken-examples/' + name)
    ).to.throw(TSError, errorMatcher);
}

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

    it("should pass through one param", () => {
        const callbackWithParam = (param: any, callback: () => void) => {
            expect(param).not.to.be.undefined;
            callback();
        };

        const promisified = promisify(callbackWithParam);

        return expect(promisified("hello")).not.to.be.rejected;
    });

    it("should pass through three params", () => {
        const callbackWithParams = (param1: any, param2: any, param3: any, callback: () => void) => {
            expect(param1).to.equal(1);
            expect(param2).to.equal(2);
            expect(param3).to.equal(3);
            callback();
        };

        const promisified = promisify(callbackWithParams);

        return expect(promisified(1, 2, 3)).not.to.be.rejected;
    });

    it("should allow functions with more params than explicitly supported", () => {
        const callbackWithParams = (
            param1: any, param2: any, param3: any, param4: any, param5: any, param6: any,
            param7: any, param8: any, param9: any, param10: any, param11: any, param12: any,
            callback: () => void
        ) => {
            expect(param1).to.equal(1);
            expect(param2).to.equal(2);
            expect(param3).to.equal(3);
            expect(param4).to.equal(4);
            expect(param5).to.equal(5);
            expect(param6).to.equal(6);
            expect(param7).to.equal(7);
            expect(param8).to.equal(8);
            expect(param9).to.equal(9);
            expect(param10).to.equal(10);
            expect(param11).to.equal(11);
            expect(param12).to.equal(12);
            callback();
        };

        const promisified = promisify(callbackWithParams);

        return expect(promisified(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)).not.to.be.rejected;
    });

    it("should correctly catch a wrong parameter on the resulting promisified function", () => {
        expectCompilationFailure(
            'wrong-param-passed',
            /Argument of type \'"hello"\' is not assignable to parameter of type \'number\'/
        );
    });

    it("should correctly catch a wrongly used promise result", () => {
        expectCompilationFailure(
            'wrongly-used-result',
            /Type 'number' is not assignable to type 'string'/
        );
    });

    it("should correctly catch a wrongly typed promise result", () => {
        expectCompilationFailure(
            'wrongly-typed-result',
            /Type 'number' is not assignable to type 'string'/
        );
    });

    it("should correctly catch promisify used on function that expects no args", () => {
        expectCompilationFailure(
            'non-callback.no-args',
            /Property 'then' does not exist on type 'never'./
        );
    });

    it("should correctly catch promisify used on function that expects one non-callback arg", () => {
        expectCompilationFailure(
            'non-callback.one-arg',
             /Property 'then' does not exist on type 'never'./
        );
    });
});