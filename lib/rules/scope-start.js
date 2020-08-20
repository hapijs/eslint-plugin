'use strict';

const internals = {};


module.exports = function (context) {

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

        if (fnBody.type === 'ObjectExpression' ||
            fnBody.type === 'ArrayExpression') {

            return;
        }

        const isBlockBody = fnBody.type === 'BlockStatement';
        const body = isBlockBody ? fnBody.body : [fnBody];

        // Allow empty function bodies to be of any size

        if (body.length === 0) {
            return;
        }

        const stmt = body[0];
        const bodyStartLine = stmt.loc.start.line;
        const openTokenLine = context.getTokenBefore(stmt).loc.start.line;
        const closeTokenLine = isBlockBody ? context.getTokenAfter(stmt).loc.start.line : context.getLastToken(stmt).loc.start.line;

        if (allowOneLiners === true &&
            body.length <= maxInOneLiner &&
            openTokenLine === closeTokenLine) {

            return;
        }

        if (bodyStartLine - openTokenLine < 2) {
            context.report(node, 'Missing blank line at beginning of function.');
        }
    };

    return {
        ArrowFunctionExpression: checkArrow,
        FunctionExpression: checkFunction,
        FunctionDeclaration: checkFunction
    };
};


module.exports.esLintRuleName = '@hapi/rule-scope-start';
