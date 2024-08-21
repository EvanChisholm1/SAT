import type { Token } from "./tokenize";
import { TokenType } from "./tokenize";

type Value = {
    type: TokenType.VAR;
    value: string;
};

type BinaryOperation = {
    type: TokenType.OR;
    lhs: Expression;
    rhs: Expression;
};

type Negation = {
    type: TokenType.NOT;
};

type Expression = Value | BinaryOperation | Negation;

interface ParseResult {
    result: Expression;
    remainingTokens: Token[];
}

//
const parse = (tokenList: Token[]): Expression => {};
