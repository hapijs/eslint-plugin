'use strict';

const internals = {};


module.exports = function (context) {

    const message = 'Imported module variable name not capitalized.';
    const globalScopeOnly = context.options[0] === 'global-scope-only';
    const VALID_TOP_LEVEL_PARENTS = [
        'AssignmentExpression',
        'VariableDeclarator',
        'MemberExpression',
        'ExpressionStatement',
        'CallExpression',
        'ConditionalExpression',
        'Program',
        'VariableDeclaration'
    ];

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

        return context.getAncestors().every((parent) => VALID_TOP_LEVEL_PARENTS.includes(parent.type));
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

            context.report(node, message);
        }
        else if (node.type === 'AssignmentExpression' &&
            isRequire(node.right) &&
            node.left.type === 'Identifier' &&
            !isCapitalized(node.left.name)) {

            context.report(node, message);
        }
    };

    return {
        AssignmentExpression: check,
        VariableDeclarator: check
    };
};

module.exports.esLintRuleName = '@hapi/rule-capitalize-modules';
