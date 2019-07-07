import { toPairs } from 'ramda';
import moduleCJS from './dist/index.cjs';
import moduleESM from './dist/index.esm';
import * as packageCJS from './dist/index.cjs';
import * as packageESM from './dist/index.esm';
const moduleUMD = require('./dist/index.umd');

test('exports are importable', () => {
    expect(moduleCJS).toBeFunction();
    expect(moduleESM).toBeFunction();
    expect(moduleUMD).toBeObject();
    expect(moduleUMD).toHaveProperty('default', expect.any(Function));
});

const packageMap = [
    ['cjs', packageCJS],
    ['esm', packageESM],
    ['umd', moduleUMD],
];

const expectedExports = {
    isIterable: expect.any(Function),
    fromArray: expect.any(Function),
    range: expect.any(Function),
    concat: expect.any(Function),
    filter: expect.any(Function),
    map: expect.any(Function),
    Iterable: expect.any(Function),
};

describe('exports expected methods', () => {
    describe.each(packageMap)('%p', (format, __package__) => {
        test.each(toPairs(expectedExports))('%p', (prop, expectedProperty) => {
            expect(__package__).toHaveProperty(prop, expectedProperty);
        });
    });
});
