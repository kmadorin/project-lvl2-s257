import { flatten, isObject, compact } from 'lodash';

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

const renderNode = (node, prefixName) => {
  const fullName = `${prefixName ? `${prefixName}.` : ''}${node.key}`;

  switch (node.type) {
    case 'nested': {
      const res = node.children
        .filter(astNode => astNode.type !== 'original')
        .map(child => renderNode(child, fullName));
      return res;
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


export default (ast) => {
  const res = ast.map(node => renderNode(node));
  return compact(flatten(res)).join('\n');
};

