import { tokenize, TokenType } from "./src/tokenize";
import { parse } from "./src/parser";
import { solve } from "./src/solve";

const file = Bun.file("./test.sat");
const text = await file.text();

console.log(text);
const ast = parse(tokenize(text));
console.log(solve(ast));
