import { safeLoad, safeDump } from 'js-yaml';
import ini from 'ini';

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
  '.ini': {
    parse: ini.parse,
    stringify: ini.stringify,
  },
};

export default (format) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`unkown format: ${format}`);
  }
  return parser;
};

