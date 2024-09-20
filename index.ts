import { tokenize } from "./src/tokenize";
import { parse } from "./src/parser";
import { solve, solveExhaustive } from "./src/solve";
import { truthTable } from "./src/truthTable";

// console.log(Bun.argv);

// type CliOption = {
//     name: string;
//     short: string;
//     type: "string" | "boolean";
// };

// const parseCliArgs = (rawArgs: string[], options: CliOption[]) => {};

// const file = Bun.file("./test.sat");
// const text = await file.text();

// console.log(text);
// const ast = parse(tokenize(text));
// console.log(solve(ast));

const file = Bun.file("./test2.sat");
const text = await file.text();

const ast = parse(tokenize(text));
truthTable(ast);
