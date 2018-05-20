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
  const plainNode = {
    ...node,
    fullName: `${prefixName ? `${prefixName}.` : ''}${node.key}`,
    action: node.type,
  };

  switch (node.type) {
    case 'nested': {
      const res = plainNode.children
        .filter(astNode => astNode.type !== 'original')
        .map(child => renderNode(child, plainNode.fullName));
      return flatten(res);
    }
    case 'added': {
      plainNode.description = ` with ${makeDescription(plainNode)}`;
      break;
    }
    case 'updated': {
      plainNode.description = `. From ${makeDescription(plainNode)}`;
      break;
    }
    default: {
      break;
    }
  }

  return `Property '${plainNode.fullName}' was ${plainNode.action}${plainNode.description || ''}`;
};


export default (ast) => {
  const res = ast.map(node => renderNode(node));
  return compact(flatten(res)).join('\n');
};

