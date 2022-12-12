import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getDifferences from './buildDiff.js';
import formatChoice from './formatters/formatChoice.js';

const getContentParse = (filepath) => {
  const normalizePath = path.resolve(process.cwd(), filepath);
  const getContent = fs.readFileSync(normalizePath, 'utf-8');
  const getExtension = path.extname(filepath).slice(1);

  return parse(getContent, getExtension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const getData1 = getContentParse(filepath1);
  const getData2 = getContentParse(filepath2);

  return formatChoice(getDifferences(getData1, getData2), formatName);
};

export default genDiff;
