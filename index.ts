import { tokenize } from "./src/tokenize";
import { parse } from "./src/parser";

const file = Bun.file("./test.sat");
const text = await file.text();

console.log(parse(tokenize("((x OR y) AND (x))")));

// console.log(text);
// console.log(parse(tokenize(text)));
// console.log(parse(tokenize("x AND y")));

// console.log(parse(tokenize("NOT (k AND z)")));
