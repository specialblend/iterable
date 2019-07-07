import { Iterable } from '../src/main';

require('jest-extended');

const { log, info, debug, warn, error } = console;

/**
 * Mute console output while running tests,
 * unless process.env.DEBUG is set to true
 */
beforeEach(() => {
    if (process.env.DEBUG === 'true') {
        console.log = jest.fn(log);
        console.info = jest.fn(info);
        console.debug = jest.fn(debug);
        console.warn = jest.fn(warn);
        console.error = jest.fn(error);
    } else {
        console.log = jest.fn();
        console.info = jest.fn();
        console.debug = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();
    }
});

afterAll(() => {
    console.log = log;
    console.info = info;
    console.debug = debug;
    console.warn = warn;
    console.error = error;
});

expect.extend({
    toBeIterable(received) {
        try {
            expect(received[Symbol.iterator]).toBeDefined();
            expect(typeof received[Symbol.iterator]).toBe('function');
            return {
                pass: true,
                message: () => `expected ${received} not to be iterable`,
            };
        } catch (e) {
            return {
                pass: false,
                message: () => `expected ${received} to be iterable`,
            };
        }
    },
    toBeSuperIterable(received) {
        try {
            expect(received).toBeIterable();
            expect(received).toBeInstanceOf(Iterable);
            return {
                pass: true,
                message: () => `expected ${received} not to be a Fiterable`,
            };
        } catch (e) {
            return {
                pass: false,
                message: () => `expected ${received} to be a Fiterable`,
            };
        }
    },
});
