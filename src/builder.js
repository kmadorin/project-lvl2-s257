import _ from 'lodash';
// Tree Structure
//
// Node {
//  key : value
//  type: added, removed, updated, notUpdated, nested
//  oldValue: value or Object
//  newValue: value or Object
//  children: node
// }

const nodeTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, fn) => ({ children: fn(first, second) }),
  },
  {
    type: 'original',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => ({ value: first }),
  },
  {
    type: 'updated',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) =>
      ({ oldValue: first, newValue: second }),
  },
  {
    type: 'added',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => ({ value: second }),
  },
  {
    type: 'removed',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => ({ value: first }),
  },
];

const buildAst = (obj1 = {}, obj2 = {}) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  return uniqKeys.map((key) => {
    const { type, process } = _.find(nodeTypes, item => item.check(obj1, obj2, key));
    return { key, type, ...process(obj1[key], obj2[key], buildAst) };
  });
};


export default buildAst;

