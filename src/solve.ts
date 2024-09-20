import type { Expression } from "./parser";
import { evalExpr, type VariableValues } from "./eval";
import { collectVariables } from "./eval";

// not very fp of me
export const setToArray = (set: Set<any>): Array<any> => {
    const arr = [];
    for (const item of set.values()) {
        arr.push(item);
    }

    return arr;
};

export const solve = (ast: Expression): SearchResult => {
    const variableArray = setToArray(collectVariables(ast));
    return search(ast, variableArray, {});
};

export type SearchResult =
    | { found: true; config: VariableValues }
    | { found: false };

const search = (
    expr: Expression,
    remainingVars: string[],
    varValues: VariableValues
): SearchResult => {
    if (remainingVars.length === 0) {
        const found = evalExpr(expr, varValues);
        return found ? { found, config: varValues } : { found };
    }

    const [current, ...remaining] = remainingVars;

    const lhs = search(expr, remaining, { ...varValues, [current]: false });
    if (lhs.found) return lhs;

    const rhs = search(expr, remaining, { ...varValues, [current]: true });
    if (rhs.found) return rhs;

    return { found: false };
};

export type ExhaustiveSolveResult = {
    variableArray: string[];
    values: ExhaustiveSearchResult[];
};

export const solveExhaustive = (ast: Expression): ExhaustiveSolveResult => {
    const variableArray = setToArray(collectVariables(ast));
    return { variableArray, values: searchExhaustive(ast, variableArray, {}) };
};

export type ExhaustiveSearchResult = {
    truthValue: boolean;
    config: VariableValues;
};

export const searchExhaustive = (
    expr: Expression,
    remainingVars: string[],
    varValues: VariableValues
): ExhaustiveSearchResult[] => {
    if (remainingVars.length === 0) {
        const truthValue = evalExpr(expr, varValues);
        return [{ truthValue, config: varValues }];
    }

    const [current, ...remaining] = remainingVars;
    const lhs = searchExhaustive(expr, remaining, {
        ...varValues,
        [current]: false,
    });
    const rhs = searchExhaustive(expr, remaining, {
        ...varValues,
        [current]: true,
    });

    return [...lhs, ...rhs];
};
