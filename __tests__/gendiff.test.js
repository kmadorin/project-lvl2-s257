import fs from 'fs';
import gendiff from '../src';

describe('Comparing flat data', () => {
  let json1;
  let json2;
  let yml1;
  let yml2;
  let ini1;
  let ini2;
  let expected;

  beforeEach(() => {
    json1 = './__tests__/__fixtures__/JSON/1.json';
    json2 = './__tests__/__fixtures__/JSON/2.json';

    yml1 = './__tests__/__fixtures__/YAML/1.yml';
    yml2 = './__tests__/__fixtures__/YAML/2.yml';

    ini1 = './__tests__/__fixtures__/INI/1.ini';
    ini2 = './__tests__/__fixtures__/INI/2.ini';

    expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8').toString();
  });

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
  let json1;
  let json2;
  let yml1;
  let yml2;
  let ini1;
  let ini2;
  let expected;

  beforeEach(() => {
    json1 = './__tests__/__fixtures__/JSON/recursive/1.json';
    json2 = './__tests__/__fixtures__/JSON/recursive/2.json';

    yml1 = './__tests__/__fixtures__/YAML/recursive/1.yml';
    yml2 = './__tests__/__fixtures__/YAML/recursive/2.yml';

    ini1 = './__tests__/__fixtures__/INI/recursive/1.ini';
    ini2 = './__tests__/__fixtures__/INI/recursive/2.ini';

    expected = fs.readFileSync('./__tests__/__fixtures__/expectedRecursive.txt', 'utf8').toString();
  });


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

describe('test, plain format', () => {
  let json1;
  let json2;
  let yml1;
  let yml2;
  let ini1;
  let ini2;
  let expected;

  beforeEach(() => {
    json1 = './__tests__/__fixtures__/JSON/recursive/1.json';
    json2 = './__tests__/__fixtures__/JSON/recursive/2.json';

    yml1 = './__tests__/__fixtures__/YAML/recursive/1.yml';
    yml2 = './__tests__/__fixtures__/YAML/recursive/2.yml';

    ini1 = './__tests__/__fixtures__/INI/recursive/1.ini';
    ini2 = './__tests__/__fixtures__/INI/recursive/2.ini';

    expected = fs.readFileSync('./__tests__/__fixtures__/expectedPlain.txt', 'utf8').toString();
  });


  test('test, difference between JSON files', () => {
    expect(gendiff(json1, json2, 'plain')).toBe(expected);
  });

  test('test, difference between YML files', () => {
    expect(gendiff(yml1, yml2, 'plain')).toBe(expected);
  });

  test('test, difference between INI files', () => {
    expect(gendiff(ini1, ini2, 'plain')).toBe(expected);
  });
});

describe('test, json format', () => {
  let json1;
  let json2;
  let yml1;
  let yml2;
  let ini1;
  let ini2;
  let expected;

  beforeEach(() => {
    json1 = './__tests__/__fixtures__/JSON/recursive/1.json';
    json2 = './__tests__/__fixtures__/JSON/recursive/2.json';

    yml1 = './__tests__/__fixtures__/YAML/recursive/1.yml';
    yml2 = './__tests__/__fixtures__/YAML/recursive/2.yml';

    ini1 = './__tests__/__fixtures__/INI/recursive/1.ini';
    ini2 = './__tests__/__fixtures__/INI/recursive/2.ini';

    expected = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/expectedJSON.txt', 'utf8'));
  });


  test('test, difference between JSON files', () => {
    expect(gendiff(json1, json2, 'json')).toEqual(expected);
  });

  test('test, difference between YML files', () => {
    expect(gendiff(yml1, yml2, 'json')).toEqual(expected);
  });

  test('test, difference between INI files', () => {
    expect(gendiff(ini1, ini2, 'json')).toEqual(expected);
  });
});
