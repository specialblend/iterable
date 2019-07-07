import { compose, filter, map, modulo, multiply, range } from 'ramda';
import iterable, { Iterable, __iter__ } from './main';

describe('Iterable', () => {
    test('is a function', () => {
        expect(typeof Iterable).toBe('function');
    });
    describe('class', () => {
        const foo = range(0, 10);
        const fooIterable = new Iterable(foo);
        test('returns a Iterable', () => {
            expect(fooIterable).toBeSuperIterable();
        });
        test('has an __iter__ property', () => {
            expect(fooIterable[__iter__]).toBeDefined();
            expect(fooIterable[__iter__]).toBeIterable();
        });
        test('__iter__ resolves to expected data', () => {
            const testArray = range(0, 13);
            const testIterable = new Iterable(testArray);
            expect(Array.from(testIterable[__iter__])).toMatchObject(testArray);
        });
        test('calling Iterable instance returns an iterable', () => {
            const testArray = range(0, 13);
            const testIterable = new Iterable(testArray);
            expect(testIterable()).toBeIterable();
        });
        test('calling Iterable instance resolves to expected data', () => {
            const testArray = range(0, 13);
            const testIterable = new Iterable(testArray);
            expect(Array.from(testIterable())).toMatchObject(testArray);
        });
        test('contructor can consume a single element', () => {
            const singleElementIterable = new Iterable(null);
            expect(singleElementIterable.toArray()).toMatchObject([null]);
        });
        test('constructor can consume other Iterables', () => {
            const array0 = range(0, 10);
            const array1 = range(10, 20);
            const array2 = range(20, 30);
            const array3 = range(30, 40);
            const array4 = range(40, 50);
            const iterable0 = new Iterable(array0);
            const iterable2 = new Iterable(array2);
            const iterable4 = new Iterable(array4);
            const combinedIterable = new Iterable(iterable0, array1, iterable2, array3, iterable4);
            expect(Array.from(combinedIterable())).toMatchObject(range(0, 50));
        });
    });
    describe('class methods', () => {
        test('Iterable.toArray() returns expected array', () => {
            const testArray = range(0, 10);
            const testIterable = new Iterable(testArray);
            expect(testIterable.toArray()).toMatchObject(testArray);
        });
        test('Iterable.next() returns expected data', () => {
            const testArray = range(0, 5);
            const testIterable = new Iterable(testArray);
            expect(testIterable.next()).toMatchObject({ done: false, value: testArray[0] });
            expect(testIterable.next()).toMatchObject({ done: false, value: testArray[1] });
            expect(testIterable.next()).toMatchObject({ done: false, value: testArray[2] });
            expect(testIterable.next()).toMatchObject({ done: false, value: testArray[3] });
            expect(testIterable.next()).toMatchObject({ done: false, value: testArray[4] });
            expect(testIterable.next()).toMatchObject({ done: true, value: testArray[5] });
            expect(testIterable.next()).toMatchObject({ done: true, value: undefined });
        });
        describe('Iterable.concat works as expected', () => {
            const testArray0 = range(0, 5);
            const testArray1 = range(5, 10);
            const testIterable0 = new Iterable(testArray0);
            const testIterable1 = new Iterable(testArray1);
            const testIterable2 = testIterable0.concat(testIterable1);
            test('returns a Iterable', () => {
                expect(testIterable2).toBeSuperIterable();
            });
            test('resolves to expected array', () => {
                expect(testIterable2.toArray()).toMatchObject(range(0, 10));
            });
        });
        describe('Iterable.map works as expected', () => {
            const testArray0 = range(0, 5);
            const testIterable0 = new Iterable(testArray0);
            const mappedIterable = testIterable0.map(multiply(2));
            test('returns a Iterable', () => {
                expect(mappedIterable).toBeSuperIterable();
            });
            test('resolves to expected array', () => {
                expect(mappedIterable.toArray()).toMatchObject(map(multiply(2), range(0, 5)));
            });
        });
        describe('Iterable.filter works as expected', () => {
            const testArray0 = range(0, 20);
            const testIterable0 = new Iterable(testArray0);
            const isOdd = compose(Boolean, modulo(2));
            const filteredIterable = testIterable0.filter(isOdd);
            test('returns a Iterable', () => {
                expect(filteredIterable).toBeSuperIterable();
            });
            test('resolves to expected array', () => {
                expect(filteredIterable.toArray()).toMatchObject(filter(isOdd, range(0, 20)));
            });
        });
    });
});

describe('iterable', () => {
    test('is a function', () => {
        expect(iterable).toBeFunction();
    });
    test('returns an Iterable', () => {
        expect(iterable(null)).toBeSuperIterable();
    });
    test('returned Iterable resolves to expected array', () => {
        const testArray = range(0, 10);
        const testIterable = iterable(testArray);
        expect(testIterable).toBeSuperIterable();
        expect(testIterable.toArray()).toMatchObject(testArray);
    });
});
