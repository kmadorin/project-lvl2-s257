import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

const makeDiffStr = (obj1, obj2) => {
  const uniqueKeys = _.union(_.keys(obj1), _.keys(obj2));

  const diffArr = uniqueKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return [...acc, `  ${key}: ${obj1[key]}`];
      }
      return [...acc, `  + ${key}: ${obj2[key]}`, `  - ${key}: ${obj1[key]}`];
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    return [...acc, `  + ${key}: ${obj2[key]}`];
  }, []);
  console.log(diffArr.join('\n'));

  return `{\n${diffArr.join('\n')}\n}`;
};

const gendiff = (pathToFile1, pathToFile2) => {
  const fileTypes = [path.extname(pathToFile1), path.extname(pathToFile2)];
  const parsers = [getParser(fileTypes[0]), getParser(fileTypes[1])];

  const f1obj = parsers[0].parse(fs.readFileSync(pathToFile1).toString());
  const f2obj = parsers[1].parse(fs.readFileSync(pathToFile2).toString());

  return makeDiffStr(f1obj, f2obj);
};

export default gendiff;
