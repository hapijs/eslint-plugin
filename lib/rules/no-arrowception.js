'use strict';

const internals = {};


module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'prevent arrow functions that implicitly create arrow functions',
            category: 'ECMAScript 6',
            recommended: true
        },
        schema: [],
        messages: {
            implicitCreate: 'Arrow function implicitly creates arrow function.'
        }
    },
    create(context) {

        const check = function (node) {

            const fnBody = node.body;

            if (fnBody.type === 'ArrowFunctionExpression') {
                context.report({ node, messageId: 'implicitCreate' });
            }
        };

        return {
            ArrowFunctionExpression: check
        };
    }
};
