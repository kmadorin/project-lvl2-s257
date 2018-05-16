import { safeLoad, safeDump } from 'js-yaml';

const yamlParser = {
  parse: safeLoad, stringify: safeDump,
};

const parsers = {
  '.json': {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
  '.yaml': yamlParser,
  '.yml': yamlParser,
};

export default (format) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`unkown format: ${format}`);
  }
  return parser;
};

