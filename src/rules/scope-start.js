export default {
    meta: {
        type: 'layout',
        docs: {
            description: 'enforce new line at the beginning of function scope',
            category: 'Stylistic Issues',
            recommended: true,
        },
        fixable: 'whitespace',
        schema: [
            {
                enum: ['allow-one-liners'],
            },
            {
                type: 'integer',
            },
        ],
        messages: {
            missingBlank: 'Missing blank line at beginning of function.',
        },
    },
    create(context) {
        const sourceCode = context.sourceCode;

        const maxInOneLiner = context.options[1] !== undefined ? context.options[1] : 1;

        const checkFunction = function (node) {
            const allowOneLiners = context.options[0] === 'allow-one-liners';
            check(node, allowOneLiners);
        };

        const checkArrow = function (node) {
            check(node, true);
        };

        const check = function (node, allowOneLiners) {
            const fnBody = node.body;

            // Arrow functions can return literals that span multiple lines

            if (fnBody.type === 'ObjectExpression' || fnBody.type === 'ArrayExpression') {
                return;
            }

            const isBlockBody = fnBody.type === 'BlockStatement';
            const body = isBlockBody ? fnBody.body : [fnBody];

            // Allow empty function bodies to be of any size

            if (body.length === 0) {
                return;
            }

            const stmt = body[0];
            const openToken = sourceCode.getTokenBefore(stmt);
            const openTokenLine = openToken.loc.start.line;
            const commentsBefore = sourceCode.getCommentsBefore(stmt);
            const firstThing =
                commentsBefore.length > 0 && commentsBefore[0].range[0] > openToken.range[1] ? commentsBefore[0] : stmt;
            const bodyStartLine = firstThing.loc.start.line;
            const closeTokenLine = isBlockBody
                ? sourceCode.getTokenAfter(stmt).loc.start.line
                : sourceCode.getLastToken(stmt).loc.start.line;

            if (allowOneLiners === true && body.length <= maxInOneLiner && openTokenLine === closeTokenLine) {
                return;
            }

            if (bodyStartLine - openTokenLine < 2) {
                context.report({
                    node,
                    messageId: 'missingBlank',
                    fix(fixer) {
                        const commentsAfter = sourceCode.getCommentsAfter(openToken);
                        let lastTokenOnOpenLine = openToken;
                        for (const comment of commentsAfter) {
                            if (comment.loc.start.line === openTokenLine) {
                                lastTokenOnOpenLine = comment;
                            } else {
                                break;
                            }
                        }

                        return fixer.insertTextAfter(lastTokenOnOpenLine, '\n');
                    },
                });
            }
        };

        return {
            ArrowFunctionExpression: checkArrow,
            FunctionExpression: checkFunction,
            FunctionDeclaration: checkFunction,
        };
    },
};
