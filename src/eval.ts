import type {
    BinaryOperation,
    Expression,
    Implication,
    Negation,
    Value,
} from "./parser";
import { tokenize, TokenType } from "./tokenize";

export type VariableValues = {
    [key: string]: boolean;
};

export const evalExpr = (expr: Expression, values: VariableValues): boolean => {
    switch (expr.type) {
        case TokenType.IMPL:
            return evalImplication(expr, values);
        case TokenType.OR:
            return evalOr(expr, values);
        case TokenType.AND:
            return evalAnd(expr, values);
        case TokenType.NOT:
            return evalNot(expr, values);
        case TokenType.VAR:
            return evalVar(expr, values);
    }
};

export const evalImplication = (
    expr: Implication,
    values: VariableValues
): boolean => {
    const A = evalExpr(expr.hypothesis, values);
    const B = evalExpr(expr.conclusion, values);
    return !A || B;
};

export const evalOr = (
    expr: BinaryOperation,
    values: VariableValues
): boolean => evalExpr(expr.lhs, values) || evalExpr(expr.rhs, values);

export const evalAnd = (
    expr: BinaryOperation,
    values: VariableValues
): boolean => evalExpr(expr.lhs, values) && evalExpr(expr.rhs, values);

export const evalNot = (expr: Negation, values: VariableValues): boolean =>
    !evalExpr(expr.expression, values);

export const evalVar = (expr: Value, values: VariableValues): boolean =>
    values[expr.value];

export const collectVariables = (expr: Expression): Set<string> => {
    if (expr.type === TokenType.AND || expr.type === TokenType.OR) {
        const lhsVariables = collectVariables(expr.lhs);
        const rhsVariables = collectVariables(expr.rhs);
        return lhsVariables.union(rhsVariables);
    } else if (expr.type === TokenType.IMPL) {
        const hypothesisVariables = collectVariables(expr.hypothesis);
        const conclusionVariables = collectVariables(expr.conclusion);
        return hypothesisVariables.union(conclusionVariables);
    } else if (expr.type === TokenType.NOT) {
        return collectVariables(expr.expression);
    } else if (expr.type === TokenType.VAR) {
        return new Set([expr.value]);
    }

    return new Set();
};

// not very fp of me
export const setToArray = (set: Set<any>): Array<any> => {
    const arr = [];
    for (const item of set.values()) {
        arr.push(item);
    }

    return arr;
};
