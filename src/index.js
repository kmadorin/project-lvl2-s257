import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import renderAST from './renderer';
import buildAST from './builder';

const gendiff = (pathToFile1, pathToFile2) => {
  const file1Type = path.extname(pathToFile1);
  const file2Type = path.extname(pathToFile2);

  const parser1 = getParser(file1Type);
  const parser2 = getParser(file2Type);


  const f1obj = parser1.parse(fs.readFileSync(pathToFile1).toString());
  const f2obj = parser2.parse(fs.readFileSync(pathToFile2).toString());

  const ast = buildAST(f1obj, f2obj);

  const result = renderAST(ast);
  console.log(result);
  return result;
};

export default gendiff;
