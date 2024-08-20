export enum TokenType {
    VAR,
    NOT,
    OR,
    AND,
    OPEN,
    CLOSE,
}

export interface Token {
    type: TokenType;
    value?: string;
}

const createToken = (tokenString: string): Token => {
    switch (tokenString) {
        case "NOT":
            return { type: TokenType.NOT };
        case "OR":
            return { type: TokenType.OR };
        case "AND":
            return { type: TokenType.AND };
        case "(":
            return { type: TokenType.OPEN };
        case ")":
            return { type: TokenType.CLOSE };
        default:
            return { type: TokenType.VAR, value: tokenString };
    }
};

export const tokenize = (inputString: string): Token[] => {
    const characters = inputString.split("");

    const { tokens, currentToken: straggler } = characters.reduce<{
        currentToken: string;
        tokens: Token[];
    }>(
        (acc, char) => {
            const updatedTokens = [...acc.tokens];
            let currentToken = acc.currentToken;

            // little closure action
            const addCurrentToken = () => {
                if (currentToken !== "")
                    updatedTokens.push(createToken(currentToken));
                currentToken = "";
            };

            switch (char) {
                case " ":
                    addCurrentToken();
                    break;
                case "\n":
                    addCurrentToken();
                    break;
                case "(":
                    addCurrentToken();
                    updatedTokens.push(createToken("("));
                    break;
                case ")":
                    addCurrentToken();
                    updatedTokens.push(createToken(")"));
                    break;
                default:
                    currentToken = `${currentToken}${char}`;
            }

            return { currentToken, tokens: updatedTokens };
        },
        {
            currentToken: "",
            tokens: [],
        }
    );

    if (straggler !== "") tokens.push(createToken(straggler));

    return tokens;
};
