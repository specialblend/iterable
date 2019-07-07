/* eslint-disable no-undefined */

export const __validIterables = function *() {
    yield '';
    yield 'hello, world!';
    yield [0, 1, 2, 3];
    yield (function *() {
        yield '';
        yield 'hello, world!';
        yield [0, 1, 2, 3];
    }());
};

export const __invalidIterables = function *() {
    yield undefined;
    yield null;
    yield 0;
    yield 1;
    yield -1;
    yield 1.5;
    yield true;
    yield false;
    yield {};
    yield new Promise(resolve => resolve(null));
};
