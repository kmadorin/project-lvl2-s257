import _ from 'lodash';

const valueToString = (value, level) => {
  if (!_.isObject(value)) {
    return value;
  }
  return `{\n${_.keys(value).map(key =>
    `${' '.repeat(level + 8)}${key}: ${value[key]}`).join('\n')}\n${' '.repeat(level + 4)}}`;
};

const renderNode = (node, level = 0) => {
  const renderStr = (key, value, sign = ' ') =>
    `${' '.repeat(level + 2)}${sign} ${key}: ${valueToString(value, level)}`;

  const renStringFns = {
    nested: () => {
      const res = node.children.map(child => renderNode(child, level + 4));
      return renderStr(node.key, `{\n${_.flatten(res).join('\n')}\n${' '.repeat(level + 4)}}`);
    },
    original: () => renderStr(node.key, node.value),
    updated: () => {
      const res = [
        renderStr(node.key, node.newValue, '+'),
        renderStr(node.key, node.oldValue, '-'),
      ];
      return `${_.flatten(res).join('\n')}`;
    },
    added: () => renderStr(node.key, node.value, '+'),
    removed: () => renderStr(node.key, node.value, '-'),
  };


  return renStringFns[node.type]();
};

const render = (ast = []) => {
  const res = ast.map(node => renderNode(node, 0));
  return `{\n${_.flatten(res).join('\n')}\n}`;
};

export default render;
