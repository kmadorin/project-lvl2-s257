import { isObject } from 'lodash';

const makeDescription = (node) => {
  switch (node.type) {
    case 'added': {
      return isObject(node.value) ? 'complex value' : `value: '${node.value}'`;
    }
    case 'updated': {
      const oldVal = isObject(node.oldValue) ? 'complex value' : `'${node.oldValue}'`;
      const newVal = isObject(node.newValue) ? 'complex value' : `'${node.newValue}'`;
      return `${oldVal} to ${newVal}`;
    }
    default: {
      return '';
    }
  }
};


const render = (ast, prefixName) => {
  const renderNode = (node) => {
    const fullName = `${prefixName ? `${prefixName}.` : ''}${node.key}`;
    switch (node.type) {
      case 'nested': {
        return render(node.children, fullName);
      }
      case 'added': {
        return `Property '${fullName}' was ${node.type} with ${makeDescription(node)}`;
      }
      case 'updated': {
        return `Property '${fullName}' was ${node.type}. From ${makeDescription(node)}`;
      }
      case 'removed': {
        return `Property '${fullName}' was ${node.type}`;
      }
      default: {
        return '';
      }
    }
  };

  const res = ast.filter(node => node.type !== 'original')
    .map(node => renderNode(node))
    .join('\n');

  return res;
};

export default render;

