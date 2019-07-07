import * as R from 'ramda';
import { __validIterables, __invalidIterables } from '../__mocks__/factory';
import { isIterable, concat, filter, fromArray, map, range, Iterable } from './main';

describe('util', () => {
    describe('isIterable works as expected', () => {
        test.each(Array.from(__validIterables()))('isIterable(%p) returns true', obj => {
            expect(isIterable(obj)).toBe(true);
        });
        test.each(Array.from(__invalidIterables()))('isIterable(%p) returns false', obj => {
            expect(isIterable(obj)).toBe(false);
        });
    });
    test('range works as expected', () => {
        const itAlpha = range(0, 10);
        const itBravo = range(10, 20, 2);
        const itCharlie = range(25)();
        const itDelta = range()();
        expect(itAlpha).toBeInstanceOf(Iterable);
        expect(isIterable(itAlpha)).toBe(true);
        expect(Array.from(itAlpha)).toMatchObject(R.range(0, 10));
        expect(isIterable(itBravo)).toBe(true);
        expect(Array.from(itBravo)).toMatchObject(R.filter(x => x % 2 === 0, R.range(10, 20)));
        expect(isIterable(itCharlie)).toBe(true);
        expect(itCharlie.next().value).toBe(25);
        expect(isIterable(itDelta)).toBe(true);
        expect(itDelta.next().value).toBe(0);
    });
    test('fromArray works as expected', () => {
        const it = fromArray(R.range(0, 10));
        expect(isIterable(it)).toBe(true);
        expect(Array.from(it)).toMatchObject(R.range(0, 10));
    });
    test('concat works as expected', () => {
        const itAlpha = range(0, 5);
        const itBravo = range(5, 10);
        const itCharlie = range(10, 15);
        const itDelta = range(15, 20);
        const itEcho = range(20, 25);
        const itFoxtrot = concat(itAlpha, itBravo);
        const itGulf = concat(itCharlie, itDelta, itEcho);
        expect(itFoxtrot).toBeInstanceOf(Iterable);
        expect(Array.from(itFoxtrot)).toMatchObject(R.range(0, 10));
        expect(Array.from(itGulf)).toMatchObject(R.range(10, 25));
    });
    test('map works as expected', () => {
        const it = map(R.multiply(2), range(0, 10));
        expect(it).toBeInstanceOf(Iterable);
        expect(Array.from(it)).toMatchObject(
            R.map(
                R.multiply(2),
                R.range(0, 10),
            ),
        );
    });
    test('filter works as expected', () => {
        const it = filter(x => x % 2 === 0, range(0, 10));
        expect(it).toBeInstanceOf(Iterable);
        expect(Array.from(it)).toMatchObject(
            R.filter(
                x => x % 2 === 0,
                R.range(0, 10),
            ),
        );
    });
});
