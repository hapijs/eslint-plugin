export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce the capitalization of imported module variables',
            category: 'Stylistic Issues',
            recommended: true,
        },
        schema: [
            {
                enum: ['global-scope-only'],
            },
        ],
        messages: {
            notCapitalized: 'Imported module variable name not capitalized.',
        },
    },
    create(context) {
        const options = context.options[0] || {};
        const globalScopeOnly = options === 'global-scope-only';

        const check = (node) => {
            if (globalScopeOnly && context.sourceCode.getScope(node).type !== 'module') {
                return;
            }

            const name = node.local ? node.local.name : node.id.name;
            if (name[0] !== name[0].toUpperCase()) {
                context.report({
                    node: node.local || node.id,
                    messageId: 'notCapitalized',
                    data: { name },
                });
            }
        };

        const checkVariable = (node) => {
            if (
                node.init &&
                node.init.type === 'AwaitExpression' &&
                node.init.argument.type === 'ImportExpression' &&
                node.id.type === 'Identifier'
            ) {
                check(node);
            }
        };

        return {
            ImportDefaultSpecifier: check,
            ImportNamespaceSpecifier: check,
            VariableDeclarator: checkVariable,
        };
    },
};
