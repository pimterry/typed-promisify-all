import { TSError } from 'ts-node';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

export const { expect } = chai;

export function expectCompilationFailure(name: string, errorMatcher: RegExp) {
    expect(
        () => require('./broken-examples/' + name)
    ).to.throw(TSError, errorMatcher);
}