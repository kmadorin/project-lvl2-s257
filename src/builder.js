import _ from 'lodash';

// Tree Structure
//  Node {
//   key : value
//   type: added, removed, updated, notUpdated, nested
//   oldValue: value or Object
//   newValue: value or Object
//   children: node
//  }

const createNode = (key, type, oldValue, newValue, children) =>
  ({
    key, type, oldValue, newValue, children,
  });

const hasChilden = (firstObjValue, secondObjValue) =>
  _.isObject(firstObjValue) && _.isObject(secondObjValue);

const isEqual = (firstObjValue, secondObjValue) => firstObjValue === secondObjValue;

const hasNotValue = (obj, key) => !_.has(obj, key);

const buildAst = (f1obj, f2obj) => {
  const unionKeys = _.union(Object.keys(f1obj), Object.keys(f2obj));

  const result = unionKeys
    .map((key) => {
      if (hasChilden(f1obj[key], f2obj[key])) {
        const children = buildAst(f1obj[key], f2obj[key]);
        return createNode(key, 'nested', f1obj[key], f2obj[key], children);
      } else if (hasNotValue(f1obj, key)) {
        return createNode(key, 'added', f1obj[key], f2obj[key], []);
      } else if (hasNotValue(f2obj, key)) {
        return createNode(key, 'removed', f1obj[key], f2obj[key], []);
      } else if (isEqual(f1obj[key], f2obj[key])) {
        return createNode(key, 'notUpdated', f1obj[key], f2obj[key], []);
      }
      return createNode(key, 'updated', f1obj[key], f2obj[key], []);
    });
  return result;
};

export default buildAst;

