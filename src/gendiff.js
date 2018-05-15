import fs from 'fs';
import _ from 'lodash';

const makeDiffStr = (obj1, obj2) => {
  const allKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  return '{' + allKeys.reduce((acc,key) => {
    if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
      return `${acc}
  ${key}: ${obj1[key]}`
    }
    if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]) {
      return `${acc}
  + ${key}: ${obj2[key]}
  - ${key}: ${obj1[key]}`
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return `${acc}
  + ${key}: ${obj2[key]}`
    }

    if (!_.has(obj2, key) && _.has(obj1, key)) {
      return `${acc}
  - ${key}: ${obj1[key]}`
    }
  }, '') + '\n}';
};

const gendiff = (pathToFile1, pathToFile2) => {
  const f1obj = JSON.parse(fs.readFileSync(pathToFile1).toString());
  const f2obj = JSON.parse(fs.readFileSync(pathToFile2).toString());

  return makeDiffStr(f1obj, f2obj);
}

export default gendiff;