import type { Token } from "./tokenize";
import { TokenType } from "./tokenize";

type Value = {
    type: TokenType.VAR;
    value: string;
};

type BinaryOperation = {
    type: TokenType.OR | TokenType.AND;
    lhs: Expression;
    rhs: Expression;
};

type Negation = {
    type: TokenType.NOT;
    expression: Expression;
};

type Expression = Value | BinaryOperation | Negation;

interface ParseResult {
    result: Expression;
    remainingTokens: Token[];
}

const createParseResult = (
    result: Expression,
    remainingTokens: Token[]
): ParseResult => ({
    result,
    remainingTokens,
});

export const parse = (tokenList: Token[]): Expression => {
    const { result, remainingTokens } = parseOr(tokenList);
    console.log(remainingTokens);
    return result;
};

const parseOr = (tokenList: Token[]): ParseResult => {
    const { result: left, remainingTokens } = parseAnd(tokenList);

    if (remainingTokens[0]?.type === TokenType.OR) {
        const { result: right, remainingTokens: afterRight } = parseOr(
            remainingTokens.slice(1)
        );
        return createParseResult(
            { type: TokenType.OR, lhs: left, rhs: right },
            afterRight
        );
    } else {
        return createParseResult(left, remainingTokens);
    }
};

const parseAnd = (tokenList: Token[]): ParseResult => {
    const { result: left, remainingTokens } = parseNot(tokenList);

    if (remainingTokens[0]?.type === TokenType.AND) {
        const { result: right, remainingTokens: afterRight } = parseAnd(
            remainingTokens.slice(1)
        );
        return createParseResult(
            { type: TokenType.AND, lhs: left, rhs: right },
            afterRight
        );
    } else {
        return createParseResult(left, remainingTokens);
    }
};

const parseNot = (tokenList: Token[]): ParseResult => {
    const [currentToken, ...remainingTokens] = tokenList;

    if (currentToken.type === TokenType.NOT) {
        const { result: expression, remainingTokens: rest } =
            parseNot(remainingTokens);
        return createParseResult({ type: TokenType.NOT, expression }, rest);
    } else if (currentToken.type === TokenType.OPEN) {
        const { result: expression, remainingTokens: rest } =
            parseOr(remainingTokens);
        return createParseResult(expression, rest.slice(1));
    } else {
        return parseVar(tokenList);
    }
};

const parseVar = (tokenList: Token[]): ParseResult => {
    const [currentToken, ...rest] = tokenList;

    if (currentToken.type === TokenType.VAR && currentToken.value) {
        return createParseResult(currentToken as Value, rest);
    } else {
        throw new Error("expected variable token type but not found");
    }
};
