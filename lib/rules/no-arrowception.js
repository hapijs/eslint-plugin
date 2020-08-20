'use strict';

const internals = {};


module.exports = function (context) {

    const check = function (node) {

        const fnBody = node.body;

        if (fnBody.type === 'ArrowFunctionExpression') {
            context.report(node, 'Arrow function implicitly creates arrow function.');
        }
    };

    return {
        ArrowFunctionExpression: check
    };
};


module.exports.esLintRuleName = '@hapi/rule-no-arrowception';
