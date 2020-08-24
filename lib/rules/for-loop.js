'use strict';

const internals = {};


module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce for loop syntax',
            category: 'Stylistic Issues',
            recommended: true
        },
        schema: [{
            type: 'object',
            properties: {
                maxDepth: {
                    type: 'integer'
                },
                startIterator: {
                    type: 'string'
                }
            },
            additionalProperties: false
        }],
        messages: {
            depthExceeded: 'Too many nested for loops.',
            singleInit: 'Only one variable can be initialized per loop.',
            singleVar: 'Left hand side of initializer must be a single variable.',
            badIter: 'Expected iterator \'{{designatedIter}}\', but got \'{{iteratorVar}}\'.',
            usePrefixOp: 'Update to iterator should use prefix operator.'
        }
    },
    create(context) {

        const options = context.options[0] || {};
        const maxDepth = options.maxDepth || 3;
        const startIterator = options.startIterator || 'i';
        const stack = [];

        const getIteratorVariable = function (offset) {

            return String.fromCharCode(startIterator.charCodeAt(0) + offset);
        };

        const check = function (node) {

            stack.push(node);

            // Make sure that for loops are not nested excessively

            if (stack.length > maxDepth) {
                context.report({ node, messageId: 'depthExceeded' });
            }

            const init = node.init;
            if (init !== null &&
                init.type === 'VariableDeclaration') {

                // Verify that there is 1 initialized variable at most

                if (init.declarations.length > 1) {
                    context.report({ node, messageId: 'singleInit' });
                }

                const declaration = init.declarations[0];

                // Verify that this is a normal variable declaration, not destructuring

                if (declaration.id.type !== 'Identifier') {
                    context.report({ node, messageId: 'singleVar' });
                }
                else {
                    const iteratorVar = declaration.id.name;
                    const designatedIter = getIteratorVariable(stack.length - 1);

                    // Verify that the iterator variable has the expected value

                    if (iteratorVar !== designatedIter) {
                        context.report({ node, messageId: 'badIter', data: { designatedIter, iteratorVar } });
                    }
                }
            }

            const update = node.update;

            // Verify that postfix increment/decrement are not used

            if (update && update.type === 'UpdateExpression' &&
                !update.prefix) {

                context.report({ node, messageId: 'usePrefixOp' });
            }
        };

        const popStack = function () {

            stack.pop();
        };

        return {
            ForStatement: check,
            'ForStatement:exit': popStack
        };
    }
};
