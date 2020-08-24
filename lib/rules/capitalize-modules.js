'use strict';

const internals = {
    validTopLevelParents: new Set([
        'AssignmentExpression',
        'VariableDeclarator',
        'MemberExpression',
        'ExpressionStatement',
        'CallExpression',
        'ConditionalExpression',
        'Program',
        'VariableDeclaration'
    ])
};


module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce the capitalization of imported module variables',
            category: 'Stylistic Issues',
            recommended: true
        },
        schema: [{
            enum: ['global-scope-only']
        }],
        messages: {
            notCapitalized: 'Imported module variable name not capitalized.'
        }
    },
    create(context) {

        const globalScopeOnly = context.options[0] === 'global-scope-only';

        const isCapitalized = function (name) {

            const firstChar = name.charAt(0);
            return firstChar === firstChar.toUpperCase();
        };

        const isRequire = function (node) {

            return node !== null &&
                node.type === 'CallExpression' &&
                node.callee.type === 'Identifier' &&
                node.callee.name === 'require';
        };

        const atTopLevel = function () {

            return context.getAncestors().every((parent) => internals.validTopLevelParents.has(parent.type));
        };

        const check = function (node) {

            if (globalScopeOnly === true &&
                atTopLevel() === false) {

                return;
            }

            if (node.type === 'VariableDeclarator' &&
                node.id.type === 'Identifier' &&
                isRequire(node.init) &&
                !isCapitalized(node.id.name)) {

                context.report({ node, messageId: 'notCapitalized' });
            }
            else if (node.type === 'AssignmentExpression' &&
                isRequire(node.right) &&
                node.left.type === 'Identifier' &&
                !isCapitalized(node.left.name)) {

                context.report({ node, messageId: 'notCapitalized' });
            }
        };

        return {
            AssignmentExpression: check,
            VariableDeclarator: check
        };
    }
};
