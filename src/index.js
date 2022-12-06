import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const normalizeData = (filepath) => {
  const normalizePath = path.resolve(process.cwd(), filepath);
  const getContent = fs.readFileSync(normalizePath, 'utf-8');
  const getContentParse = JSON.parse(getContent);
  return getContentParse;
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

const getDifferences = (getData1, getData2, sortedKeys) => {
  const result = sortedKeys.map((key) => {
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
  const getData1 = normalizeData(filepath1);
  const getData2 = normalizeData(filepath2);
  const keys1 = Object.keys(getData1);
  const keys2 = Object.keys(getData2);
  const unitedKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unitedKeys);

  return getDifferences(getData1, getData2, sortedKeys);
};

export default genDiff;
