import gendiff from '../src';

const json1 = './__tests__/__fixtures__/JSON/1.json';
const json2 = './__tests__/__fixtures__/JSON/2.json';

const expected = `{
  host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('test, difference JSON files', () => {
  expect(gendiff(json1, json2)).toBe(expected);
});
