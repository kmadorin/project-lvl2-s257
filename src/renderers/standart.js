import _ from 'lodash';

const defaultIndent = 4;
const getIndentOfSize = num => ' '.repeat(num);
const indentString = '  ';

const render = (ast, curentIndent = defaultIndent) => {
  const indent = getIndentOfSize(curentIndent - 2);
  const constIndent = getIndentOfSize(defaultIndent);

  const valueToString = (value) => {
    if (!_.isObject(value)) {
      return value;
    }

    return _.keys(value)
      .map(key =>
        `{\n${constIndent}${indent}${indentString}${key}: ${valueToString(value[key])}\n${indent}${indentString}}`);
  };

  const genString = (name, value, prefix = '  ') => (`${indent}${prefix}${name}: ${valueToString(value)}`);

  const selectFn = {
    nested: node => genString(node.key, render(node.children, curentIndent + defaultIndent)),
    original: node => genString(node.key, node.value),
    updated: node => [
      genString(node.key, node.newValue, '+ '),
      genString(node.key, node.oldValue, '- '),
    ],
    added: node => genString(node.key, node.value, '+ '),
    removed: node => genString(node.key, node.value, '- '),
  };

  const resultArray = ast.map(node => selectFn[node.type](node));
  return ['{', ..._.flatten(resultArray), `${getIndentOfSize(curentIndent - defaultIndent)}}`].join('\n');
};

export default render;
