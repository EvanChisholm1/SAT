import { solveExhaustive } from "./solve";
import type { Expression } from "./parser";

export const truthTable = (ast: Expression) => {
    const exhaustiveResult = solveExhaustive(ast);

    console.table(
        exhaustiveResult.values.map((x) => ({
            ...x.config,
            truthValue: x.truthValue,
        }))
    );
};
