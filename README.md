# Typed-Promisify-All

This module provides `promisify` and `promisifyAll`, including full TypeScript types, as a standalone module (independent of other Promise libraries, e.g. Bluebird).

This module uses [`any-promise`](https://github.com/kevinbeaty/any-promise), so you can use it to promisify with any Promise implementation you'd prefer. If unspecified, the `Promise` global will be used.