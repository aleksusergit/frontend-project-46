import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yaml1 = getFixturePath('file1.yaml');
const yaml2 = getFixturePath('file2.yaml');
const expected = readFile('expectedStylish.txt');

describe('Checking flat files', () => {
  test('stylish, json-json', () => {
    const actual = genDiff(json1, json2);
    expect(actual).toBe(expected);
  });

  test('stylish, json-yml', () => {
    const actual = genDiff(json1, yaml2);
    expect(actual).toBe(expected);
  });

  test('stylish, yml-yml', () => {
    const actual = genDiff(yaml1, yaml2);
    expect(actual).toBe(expected);
  });

  test('stylish, yml-json', () => {
    const actual = genDiff(yaml1, json2);
    expect(actual).toBe(expected);
  });
});
