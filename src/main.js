/* eslint-disable no-use-before-define */

import Callable, { __call__ } from '@specialblend/callable';
import { is } from 'ramda';

const asIterable = generator => (...args) => new Iterable(generator(...args));

export const __iter__ = Symbol('__iter__');

export const isIterable = obj =>
    typeof obj !== 'undefined' &&
    obj !== null &&
    typeof obj[Symbol.iterator] === 'function';

export const fromArray = asIterable(
    function *(arr) {
        for (const i of arr) {
            yield i;
        }
    }
);

export const range = asIterable(
    function *(start = 0, stop = Infinity, step = 1) {
        for (let i = start; i < stop; i += step) {
            yield i;
        }
    }
);

export const concat = asIterable(
    function *(...iterables) {
        for (const it of iterables) {
            for (const i of it) {
                yield i;
            }
        }
    }
);

export const filter = asIterable(
    function *(predicate, it) {
        for (const i of it) {
            if (predicate(i)) {
                yield i;
            }
        }
    }
);

export const map = asIterable(
    function *(fn, it) {
        for (const i of it) {
            yield fn(i);
        }
    }
);

const normalize = (...iterables) => {
    const [first, ...rest] = iterables;
    if (rest.length) {
        return concat(normalize(first), normalize(...rest));
    }
    if (is(Array, first)) {
        return fromArray(first);
    }
    if (isIterable(first)) {
        return first;
    }
    return normalize([first]);
};

export class Iterable extends Callable {
    constructor(...iterables) {
        super();
        this[__iter__] = normalize(...iterables);
    }
    *[Symbol.iterator]() {
        for (const i of this[__iter__]) {
            yield i;
        }
    }
    [__call__]() {
        return this[Symbol.iterator]();
    }
    next() {
        return this[Symbol.iterator]().next();
    }
    concat(...tail) {
        return new Iterable(concat(this[__iter__], ...tail));
    }
    map(transformer) {
        return new Iterable(map(transformer, this[__iter__]));
    }
    filter(predicate) {
        return new Iterable(filter(predicate, this[__iter__]));
    }
    toArray() {
        return Array.from(this);
    }
}

export default function iterable(...iterables) {
    return new Iterable(...iterables);
}
