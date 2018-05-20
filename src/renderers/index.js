import plain from './plain';
import standart from './standart';

export default {
  standart,
  plain,
  json: ast => JSON.stringify(ast, 2),
};

