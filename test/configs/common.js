'use strict';

module.exports = function commonTestCases(expect, it, lintFile) {

    it('enforces file level strict mode', async () => {

        const output = await lintFile('fixtures/strict.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('strict');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Use the global form of \'use strict\'.');
        expect(msg.line).to.equal(2);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('Program');
    });

    it('enforces stroustrup style braces', async () => {

        const output = await lintFile('fixtures/brace-style.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(1);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('brace-style');
        expect(msg.severity).to.equal(1);
        expect(msg.message).to.equal('Closing curly brace appears on the same line as the subsequent block.');
        expect(msg.line).to.equal(9);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('Punctuator');
    });

    it('enforces four space indentation', async () => {

        const output = await lintFile('fixtures/indent.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('indent');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected indentation of 4 spaces but found 2.');
        expect(msg.line).to.equal(4);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('Keyword');
    });

    it('enforces case indentation in switch statements', async () => {

        const output = await lintFile('fixtures/indent-switch-case.js');
        const results = output[0];

        expect(results.errorCount).to.equal(5);
        expect(results.warningCount).to.equal(0);

        let msg = results.messages[0];

        expect(msg.ruleId).to.equal('indent');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected indentation of 4 spaces but found 0.');
        expect(msg.line).to.equal(11);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('Keyword');

        msg = results.messages[1];

        expect(msg.ruleId).to.equal('indent');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected indentation of 8 spaces but found 4.');
        expect(msg.line).to.equal(12);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('Identifier');

        msg = results.messages[2];

        expect(msg.ruleId).to.equal('indent');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected indentation of 8 spaces but found 4.');
        expect(msg.line).to.equal(13);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('Keyword');

        msg = results.messages[3];

        expect(msg.ruleId).to.equal('indent');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected indentation of 8 spaces but found 4.');
        expect(msg.line).to.equal(15);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('Identifier');

        msg = results.messages[4];

        expect(msg.ruleId).to.equal('indent');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected indentation of 8 spaces but found 4.');
        expect(msg.line).to.equal(16);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('Keyword');
    });

    it('enforces semicolon usage', async () => {

        const output = await lintFile('fixtures/semi.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('semi');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Missing semicolon.');
        expect(msg.line).to.equal(4);
        expect(msg.column).to.equal(14);
        expect(msg.nodeType).to.equal('ReturnStatement');
    });

    it('enforces no extra semicolons', async () => {

        const output = await lintFile('fixtures/no-extra-semi.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('no-extra-semi');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unnecessary semicolon.');
        expect(msg.line).to.equal(10);
        expect(msg.column).to.equal(6);
        expect(msg.nodeType).to.equal('EmptyStatement');
    });

    it('enforces space-before-function-paren', async () => {

        const output = await lintFile('fixtures/space-before-function-paren.js');
        const results = output[0];

        expect(results.errorCount).to.equal(2);
        expect(results.warningCount).to.equal(0);

        let msg = results.messages[0];

        expect(msg.ruleId).to.equal('space-before-function-paren');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Missing space before function parentheses.');
        expect(msg.line).to.equal(8);
        expect(msg.column).to.equal(21);
        expect(msg.nodeType).to.equal('FunctionExpression');

        msg = results.messages[1];

        expect(msg.ruleId).to.equal('space-before-function-paren');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unexpected space before function parentheses.');
        expect(msg.line).to.equal(16);
        expect(msg.column).to.equal(27);
        expect(msg.nodeType).to.equal('FunctionExpression');
    });

    it('enforces @hapi/for-loop', async () => {

        const output = await lintFile('fixtures/hapi-for-you.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(2);

        let msg = results.messages[0];

        expect(msg.ruleId).to.equal('@hapi/for-loop');
        expect(msg.severity).to.equal(1);
        expect(msg.message).to.equal('Expected iterator \'j\', but got \'k\'.');
        expect(msg.line).to.equal(7);
        expect(msg.column).to.equal(5);
        expect(msg.nodeType).to.equal('ForStatement');

        msg = results.messages[1];

        expect(msg.ruleId).to.equal('@hapi/for-loop');
        expect(msg.severity).to.equal(1);
        expect(msg.message).to.equal('Update to iterator should use prefix operator.');
        expect(msg.line).to.equal(7);
        expect(msg.column).to.equal(5);
        expect(msg.nodeType).to.equal('ForStatement');
    });

    it('enforces @hapi/scope-start', async () => {

        const output = await lintFile('fixtures/hapi-scope-start.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(1);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('@hapi/scope-start');
        expect(msg.severity).to.equal(1);
        expect(msg.message).to.equal('Missing blank line at beginning of function.');
        expect(msg.line).to.equal(2);
        expect(msg.column).to.equal(13);
        expect(msg.nodeType).to.equal('FunctionExpression');
    });

    it('enforces @hapi/capitalize-modules', async () => {

        const output = await lintFile('fixtures/hapi-capitalize-modules.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(1);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('@hapi/capitalize-modules');
        expect(msg.severity).to.equal(1);
        expect(msg.message).to.equal('Imported module variable name not capitalized.');
        expect(msg.line).to.equal(5);
        expect(msg.column).to.equal(7);
        expect(msg.nodeType).to.equal('VariableDeclarator');
    });

    it('enforces @hapi/no-arrowception', async () => {

        const output = await lintFile('fixtures/no-arrowception.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('@hapi/no-arrowception');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Arrow function implicitly creates arrow function.');
        expect(msg.line).to.equal(2);
        expect(msg.column).to.equal(13);
        expect(msg.nodeType).to.equal('ArrowFunctionExpression');
    });

    it('enforces no-shadow rule', async () => {

        const output = await lintFile('fixtures/no-shadow.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(1);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('no-shadow');
        expect(msg.severity).to.equal(1);
        expect(msg.message).to.equal('\'res\' is already declared in the upper scope on line 25 column 27.');
        expect(msg.line).to.equal(27);
        expect(msg.column).to.equal(33);
        expect(msg.nodeType).to.equal('Identifier');
    });

    it('enforces one-var rule', async () => {

        const output = await lintFile('fixtures/one-var.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('one-var');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Split \'let\' declarations into multiple statements.');
        expect(msg.line).to.equal(6);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('VariableDeclaration');
    });

    it('enforces no-undef rule', async () => {

        const output = await lintFile('fixtures/no-undef.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('no-undef');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('\'bar\' is not defined.');
        expect(msg.line).to.equal(6);
        expect(msg.column).to.equal(17);
        expect(msg.nodeType).to.equal('Identifier');
    });

    it('enforces no-unused-vars', async () => {

        const output = await lintFile('fixtures/no-unused-vars.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(1);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('no-unused-vars');
        expect(msg.severity).to.equal(1);
        expect(msg.message).to.match(/'internals2' is assigned a value but never used\./);
        expect(msg.line).to.equal(3);
        expect(msg.column).to.equal(7);
        expect(msg.nodeType).to.equal('Identifier');
    });

    it('enforces prefer-const', async () => {

        const output = await lintFile('fixtures/prefer-const.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('prefer-const');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('\'foo\' is never reassigned. Use \'const\' instead.');
        expect(msg.line).to.equal(4);
        expect(msg.column).to.equal(5);
        expect(msg.nodeType).to.equal('Identifier');
    });

    it('enforces @hapi/no-var', async () => {

        const output = await lintFile('fixtures/no-var.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('@hapi/no-var');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unexpected var, use let or const instead.');
        expect(msg.line).to.equal(4);
        expect(msg.column).to.equal(1);
        expect(msg.nodeType).to.equal('VariableDeclaration');
    });

    it('enforces arrow-parens', async () => {

        const output = await lintFile('fixtures/arrow-parens.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('arrow-parens');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected parentheses around arrow function argument.');
        expect(msg.line).to.equal(2);
        expect(msg.column).to.equal(13);
        expect(msg.nodeType).to.equal('ArrowFunctionExpression');
    });

    it('enforces arrow-spacing', async () => {

        const output = await lintFile('fixtures/arrow-spacing.js');
        const results = output[0];

        expect(results.errorCount).to.equal(2);
        expect(results.warningCount).to.equal(0);

        let msg = results.messages[0];
        expect(msg.ruleId).to.equal('arrow-spacing');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Missing space before =>.');
        expect(msg.line).to.equal(2);
        expect(msg.column).to.equal(17);
        expect(msg.nodeType).to.equal('Punctuator');

        msg = results.messages[1];
        expect(msg.ruleId).to.equal('arrow-spacing');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Missing space after =>.');
        expect(msg.line).to.equal(7);
        expect(msg.column).to.equal(22);
        expect(msg.nodeType).to.equal('Punctuator');
    });

    it('enforces object-shorthand', async () => {

        const output = await lintFile('fixtures/object-shorthand.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('object-shorthand');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected property shorthand.');
        expect(msg.line).to.equal(10);
        expect(msg.column).to.equal(5);
        expect(msg.nodeType).to.equal('Property');
    });

    it('enforces prefer-arrow-callback', async () => {

        const output = await lintFile('fixtures/prefer-arrow-callback.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('prefer-arrow-callback');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unexpected function expression.');
        expect(msg.line).to.equal(22);
        expect(msg.column).to.equal(8);
        expect(msg.nodeType).to.equal('FunctionExpression');
    });

    it('enforces no-constant-condition rule', async () => {

        const output = await lintFile('fixtures/no-constant-condition.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('no-constant-condition');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unexpected constant condition.');
        expect(msg.line).to.equal(4);
        expect(msg.column).to.equal(5);
        expect(msg.nodeType).to.equal('ArrowFunctionExpression');
    });

    it('enforces no-unsafe-finally rule', async () => {

        const output = await lintFile('fixtures/no-unsafe-finally.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('no-unsafe-finally');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unsafe usage of ReturnStatement.');
        expect(msg.line).to.equal(12);
        expect(msg.column).to.equal(9);
        expect(msg.nodeType).to.equal('ReturnStatement');
    });

    it('enforces no-useless-computed-key rule', async () => {

        const output = await lintFile('fixtures/no-useless-computed-key.js');
        const results = output[0];

        expect(results.errorCount).to.equal(5);
        expect(results.warningCount).to.equal(0);

        let msg = results.messages[0];

        expect(msg.ruleId).to.equal('no-useless-computed-key');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unnecessarily computed property [\'0\'] found.');
        expect(msg.line).to.equal(2);
        expect(msg.column).to.equal(22);
        expect(msg.nodeType).to.equal('Property');

        msg = results.messages[1];

        expect(msg.ruleId).to.equal('no-useless-computed-key');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unnecessarily computed property [\'0+1,234\'] found.');
        expect(msg.line).to.equal(3);
        expect(msg.column).to.equal(22);
        expect(msg.nodeType).to.equal('Property');

        msg = results.messages[2];

        expect(msg.ruleId).to.equal('no-useless-computed-key');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unnecessarily computed property [0] found.');
        expect(msg.line).to.equal(4);
        expect(msg.column).to.equal(22);
        expect(msg.nodeType).to.equal('Property');

        msg = results.messages[3];

        expect(msg.ruleId).to.equal('no-useless-computed-key');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unnecessarily computed property [\'x\'] found.');
        expect(msg.line).to.equal(5);
        expect(msg.column).to.equal(22);
        expect(msg.nodeType).to.equal('Property');

        msg = results.messages[4];

        expect(msg.ruleId).to.equal('no-useless-computed-key');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Unnecessarily computed property [\'x\'] found.');
        expect(msg.line).to.equal(6);
        expect(msg.column).to.equal(22);
        expect(msg.nodeType).to.equal('Property');
    });

    it('enforces handle-callback-err rule', async () => {

        const output = await lintFile('fixtures/handle-callback-err.js');
        const results = output[0];

        expect(results.errorCount).to.equal(2);
        expect(results.warningCount).to.equal(0);

        let msg = results.messages[0];

        expect(msg.ruleId).to.equal('handle-callback-err');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected error to be handled.');
        expect(msg.line).to.equal(6);
        expect(msg.column).to.equal(17);
        expect(msg.nodeType).to.equal('FunctionExpression');

        msg = results.messages[1];

        expect(msg.ruleId).to.equal('handle-callback-err');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Expected error to be handled.');
        expect(msg.line).to.equal(8);
        expect(msg.column).to.equal(23);
        expect(msg.nodeType).to.equal('FunctionExpression');
    });

    it('enforces no-dupe-keys rule', async () => {

        const output = await lintFile('fixtures/no-dupe-keys.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];

        expect(msg.ruleId).to.equal('no-dupe-keys');
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Duplicate key \'a\'.');
        expect(msg.line).to.equal(6);
        expect(msg.column).to.equal(5);
        expect(msg.nodeType).to.equal('ObjectExpression');
    });

    it('uses the node environment', async () => {

        const output = await lintFile('fixtures/node-env.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(0);
        expect(results.messages).to.equal([]);
    });

    it('uses the ES6 environment', async () => {

        const output = await lintFile('fixtures/es6-env.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(0);
        expect(results.messages).to.equal([]);
    });

    it('does not enforce the camelcase lint rule', async () => {

        const output = await lintFile('fixtures/camelcase.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(0);
        expect(results.messages).to.equal([]);
    });

    it('enforces key-spacing', async () => {

        const output = await lintFile('fixtures/key-spacing.js');
        const results = output[0];

        expect(results.errorCount).to.equal(2);
        expect(results.warningCount).to.equal(0);
    });

    it('enforces space-before-blocks', async () => {

        const output = await lintFile('fixtures/space-before-blocks.js');
        const results = output[0];

        expect(results.errorCount).to.equal(2);
        expect(results.warningCount).to.equal(0);
    });
};
