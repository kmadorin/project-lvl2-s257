import fs from 'fs';
import gendiff from '../src';

describe('Comparing flat data', () => {
  const json1 = './__tests__/__fixtures__/JSON/1.json';
  const json2 = './__tests__/__fixtures__/JSON/2.json';

  const yml1 = './__tests__/__fixtures__/YAML/1.yml';
  const yml2 = './__tests__/__fixtures__/YAML/2.yml';

  const ini1 = './__tests__/__fixtures__/INI/1.ini';
  const ini2 = './__tests__/__fixtures__/INI/2.ini';

  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8').toString();

  test('test, difference between JSON files', () => {
    expect(gendiff(json1, json2)).toBe(expected);
  });

  test('test, difference between YML files', () => {
    expect(gendiff(yml1, yml2)).toBe(expected);
  });

  test('test, difference between INI files', () => {
    expect(gendiff(ini1, ini2)).toBe(expected);
  });
});


describe('test, recursive comparison', () => {
  const json1 = './__tests__/__fixtures__/JSON/recursive/1.json';
  const json2 = './__tests__/__fixtures__/JSON/recursive/2.json';

  const yml1 = './__tests__/__fixtures__/YAML/recursive/1.yml';
  const yml2 = './__tests__/__fixtures__/YAML/recursive/2.yml';

  const ini1 = './__tests__/__fixtures__/INI/recursive/1.ini';
  const ini2 = './__tests__/__fixtures__/INI/recursive/2.ini';

  const expected = fs.readFileSync('./__tests__/__fixtures__/expectedRecursive.txt', 'utf8').toString();


  test('test, difference between JSON files', () => {
    expect(gendiff(json1, json2)).toBe(expected);
  });

  test('test, difference between YML files', () => {
    expect(gendiff(yml1, yml2)).toBe(expected);
  });

  test('test, difference between INI files', () => {
    expect(gendiff(ini1, ini2)).toBe(expected);
  });
});
