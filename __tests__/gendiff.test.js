import gendiff from '../src';

const json1 = './__tests__/__fixtures__/JSON/1.json';
const json2 = './__tests__/__fixtures__/JSON/2.json';

const yml1 = './__tests__/__fixtures__/YAML/1.yml';
const yml2 = './__tests__/__fixtures__/YAML/2.yml';

const ini1 = './__tests__/__fixtures__/INI/1.ini';
const ini2 = './__tests__/__fixtures__/INI/2.ini';

const expected = `{
  host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('test, difference between JSON files', () => {
  expect(gendiff(json1, json2)).toBe(expected);
});

test('test, difference between YML files', () => {
  expect(gendiff(yml1, yml2)).toBe(expected);
});

test('test, difference between INI files', () => {
  expect(gendiff(ini1, ini2)).toBe(expected);
});
