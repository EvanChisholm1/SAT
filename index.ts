import { tokenize } from "./src/tokenize";

const file = Bun.file("./test.sat");
const text = await file.text();

console.log(text);

console.log(tokenize(text));
console.log(tokenize("x AND y"));
