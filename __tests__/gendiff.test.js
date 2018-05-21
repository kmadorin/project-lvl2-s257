import fs from 'fs';
import gendiff from '../src';

const buildFilePath = (fileName, extension, folder) => `./__tests__/__fixtures__/${extension.toUpperCase()}/${folder}/${fileName}.${extension}`;
const buildRecursiveFilePath = (fileName, extension) => buildFilePath(fileName, extension, 'recursive');
const buildFlatFilePath = (fileName, extension) => buildFilePath(fileName, extension, 'flat');

describe('Comparing flat data', () => {
  let expected;

  beforeEach(() => {
    expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8').toString();
  });

  test('test, difference between JSON files', () => {
    expect(gendiff(
      buildFlatFilePath('1', 'json'),
      buildFlatFilePath('2', 'json'),
    )).toBe(expected);
  });

  test('test, difference between YML files', () => {
    expect(gendiff(
      buildFlatFilePath('1', 'yml'),
      buildFlatFilePath('2', 'yml'),
    )).toBe(expected);
  });

  test('test, difference between INI files', () => {
    expect(gendiff(
      buildFlatFilePath('1', 'ini'),
      buildFlatFilePath('2', 'ini'),
    )).toBe(expected);
  });
});


describe('test, recursive comparison', () => {
  let expected;

  beforeEach(() => {
    expected = fs.readFileSync('./__tests__/__fixtures__/expectedRecursive.txt', 'utf8').toString();
  });


  test('test, difference between JSON files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'json'),
      buildRecursiveFilePath('2', 'json'),
    )).toBe(expected);
  });

  test('test, difference between YML files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'yml'),
      buildRecursiveFilePath('2', 'yml'),
    )).toBe(expected);
  });

  test('test, difference between INI files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'ini'),
      buildRecursiveFilePath('2', 'ini'),
    )).toBe(expected);
  });
});

describe('test, plain format', () => {
  let expected;

  beforeEach(() => {
    expected = fs.readFileSync('./__tests__/__fixtures__/expectedPlain.txt', 'utf8').toString();
  });


  test('test, difference between JSON files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'json'),
      buildRecursiveFilePath('2', 'json'), 'plain',
    )).toBe(expected);
  });

  test('test, difference between YML files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'yml'),
      buildRecursiveFilePath('2', 'yml'), 'plain',
    )).toBe(expected);
  });

  test('test, difference between INI files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'ini'),
      buildRecursiveFilePath('2', 'ini'), 'plain',
    )).toBe(expected);
  });
});

describe('test, json format', () => {
  let expected;

  beforeEach(() => {
    expected = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/expectedJSON.txt', 'utf8'));
  });


  test('test, difference between JSON files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'json'),
      buildRecursiveFilePath('2', 'json'), 'json',
    )).toBe(expected);
  });

  test('test, difference between YML files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'yml'),
      buildRecursiveFilePath('2', 'yml'), 'json',
    )).toBe(expected);
  });

  test('test, difference between INI files', () => {
    expect(gendiff(
      buildRecursiveFilePath('1', 'ini'),
      buildRecursiveFilePath('2', 'ini'), 'json',
    )).toBe(expected);
  });
});
