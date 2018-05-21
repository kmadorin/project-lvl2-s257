import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import rendersAST from './renderers';
import buildAST from './builder';

const gendiff = (pathToFile1, pathToFile2, rendererType = 'standart') => {
  const file1Type = path.extname(pathToFile1);
  const file2Type = path.extname(pathToFile2);

  const parser1 = getParser(file1Type);
  const parser2 = getParser(file2Type);

  const f1Content = fs.readFileSync(pathToFile1).toString();
  const f2Content = fs.readFileSync(pathToFile2).toString();
  const f1obj = parser1.parse(f1Content);
  const f2obj = parser2.parse(f2Content);

  const ast = buildAST(f1obj, f2obj);

  const result = rendersAST[rendererType](ast);

  return result;
};

export default gendiff;
