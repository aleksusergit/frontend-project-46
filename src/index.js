import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';

const getExtension = (filepath) => path.extname(filepath).slice(1);

const getContentParse = (filepath) => {
  const normalizePath = path.resolve(process.cwd(), filepath);
  const getContent = fs.readFileSync(normalizePath, 'utf-8');
  return parse(getContent, getExtension(filepath));
};

const getIndent = (depth, replacer = ' ', spacesCount = 2) => replacer.repeat(depth * spacesCount);
const getBracketIndent = (depth, replacer = ' ', spacesCount = 2) => replacer.repeat(depth * spacesCount - spacesCount);

const getValue = (currentValue, depth = 1) => {
  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object.entries(currentValue).map(
    ([key, value]) => `${currentIndent}${key}: ${getValue(value, depth + 2)}`,
  );

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (data, depth = 1) => {
  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);

  const lines = data.flatMap((el) => {
    if (el.type === 'added') {
      return `${currentIndent}+ ${el.key}: ${getValue(el.value2, depth + 2)}`;
    }
    if (el.type === 'deleted') {
      return `${currentIndent}- ${el.key}: ${getValue(el.value1, depth + 2)}`;
    }
    if (el.type === 'changed') {
      return [
        `${currentIndent}- ${el.key}: ${getValue(el.value1, depth + 2)}`,
        `${currentIndent}+ ${el.key}: ${getValue(el.value2, depth + 2)}`,
      ];
    }
    return `${currentIndent}  ${el.key}: ${getValue(el.value1, depth + 2)}`;
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const getDifferences = (getData1, getData2) => {
  const keys1 = Object.keys(getData1);
  const keys2 = Object.keys(getData2);
  const unitedKeys = _.sortBy(_.union(keys1, keys2));

  const result = unitedKeys.map((key) => {
    if (!_.has(getData1, key)) {
      return { type: 'added', key, value2: getData2[key] };
    }
    if (!_.has(getData2, key)) {
      return { type: 'deleted', key, value1: getData1[key] };
    }
    if (getData1[key] !== getData2[key]) {
      return {
        type: 'changed',
        key,
        value1: getData1[key],
        value2: getData2[key],
      };
    }
    return { type: 'unchanged', key, value1: getData1[key] };
  });

  return stylish(result);
};

const genDiff = (filepath1, filepath2) => {
  const getData1 = getContentParse(filepath1);
  const getData2 = getContentParse(filepath2);

  return getDifferences(getData1, getData2);
};

export default genDiff;
