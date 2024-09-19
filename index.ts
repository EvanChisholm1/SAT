import { tokenize } from "./src/tokenize";
import { parse } from "./src/parser";
import { evalExpr } from "./src/eval";
import { solve } from "./src/solve";

console.log(parse(tokenize("NOT A AND B => B")));

const file = Bun.file("./test.sat");
const text = await file.text();

// console.log(parse(tokenize("((x OR y) AND (x))")));

// console.log(text);
const ast = parse(tokenize(text));
console.log(solve(ast));
console.log(solve(parse(tokenize("x AND NOT x"))));
// console.log(setToArray(collectVariables(ast)));
// console.log(evalExpr(ast, { x: true, y: false, z: false }));

// console.log(parse(tokenize(text)));
// console.log(parse(tokenize("x AND y")));

// console.log(parse(tokenize("NOT (k AND z)")));
