'use strict';

const Code = require('@hapi/code');
const ESLint = require('eslint');
const Lab = require('@hapi/lab');
const Rule = require('../../lib/rules/for-loop');


const internals = {};


const { describe, it } = exports.lab = Lab.script();


Code.settings.truncateMessages = false;


describe('for-loop rule', () => {

    it('enforces iterator variable naming', () => {

        const ruleTester = new ESLint.RuleTester({ languageOptions: { ecmaVersion: 2019 } });
        const valids = [
            {
                code: 'for (let i = 0; i < a.length; ++i) { for (let j = 0; j < b.length; ++j) {} }'
            },
            {
                code: 'for (let j = 0; j < a.length; ++j) { for (let k = 0; k < b.length; ++k) {} }',
                options: [{ startIterator: 'j' }]
            },
            {
                code: 'for (let i = 0; i < a.length; ++i) {}; for (let i = 0; i < a.length; ++i) {}'
            },
            {
                code: 'for (;;) {}'
            }
        ];

        const invalids = [
            {
                code: 'for (let j = 0; j < a.length; ++j) {}',
                errors: [{ message: 'Expected iterator \'i\', but got \'j\'.' }]
            },
            {
                code: 'for (let i = 0; i < a.length; ++i) {}',
                options: [{ startIterator: 'j' }],
                errors: [{ message: 'Expected iterator \'j\', but got \'i\'.' }]
            }
        ];

        ruleTester.run('test', Rule, {
            valid: valids,
            invalid: invalids
        });
    });

    it('enforces a maximum of one variable initialized per loop', () => {

        const ruleTester = new ESLint.RuleTester({ languageOptions: { ecmaVersion: 2019 } });
        const valids = [
            {
                code: 'for (let i = 0; i < a.length; ++i) {}'
            },
            {
                code: 'for (i = 0, j = 1; i < a.length; ++i) {}'
            },
            {
                code: 'for (; i < a.length; ++i) {}'
            }
        ];

        const invalids = [
            {
                code: 'for (let i = 0, j; i < a.length; ++i) {}',
                errors: [{ message: 'Only one variable can be initialized per loop.' }]
            },
            {
                code: 'for (let [i] = [0]; i < a.length; ++i) {}',
                errors: [{ message: 'Left hand side of initializer must be a single variable.' }]
            }
        ];

        ruleTester.run('test', Rule, {
            valid: valids,
            invalid: invalids
        });
    });

    it('enforces the maximum number of nested for loops', () => {

        const ruleTester = new ESLint.RuleTester({ languageOptions: { ecmaVersion: 2019 } });
        const valids = [
            {
                code: 'for (let i = 0; i < a.length; ++i) {}'
            },
            {
                code: 'for (let i = 0; i < a.length; ++i) { for (let j = 0; j < b.length; ++j) { for (let k = 0; k < c.length; ++k) { for (let l = 0; l < d.length; ++l) {} } } }',
                options: [{ maxDepth: 4 }]
            }
        ];

        const invalids = [
            {
                code: 'for (let i = 0; i < a.length; ++i) { for (let j = 0; j < b.length; ++j) { for (let k = 0; k < c.length; ++k) { for (let l = 0; l < d.length; ++l) {} } } }',
                errors: [{ message: 'Too many nested for loops.' }]
            },
            {
                code: 'for (let i = 0; i < a.length; ++i) { for (let j = 0; j < b.length; ++j) {} }',
                options: [{ maxDepth: 1 }],
                errors: [{ message: 'Too many nested for loops.' }]
            }
        ];

        ruleTester.run('test', Rule, {
            valid: valids,
            invalid: invalids
        });
    });

    it('prevents post-increment and post-decrement', () => {

        const ruleTester = new ESLint.RuleTester({ languageOptions: { ecmaVersion: 2019 } });
        const valids = [
            {
                code: 'for (let i = 0; i < a.length; ++i) {}'
            },
            {
                code: 'for (let i = 0; i < a.length; --i) {}'
            },
            {
                code: 'for (let i = 0; i < a.length; i += 1) {}'
            },
            {
                code: 'for (let i = 0; i < a.length; i = i + 1) {}'
            },
            {
                code: 'for (let i = 0; i < a.length;) {}'
            }
        ];

        const invalids = [
            {
                code: 'for (let i = 0; i < a.length; i++) {}',
                errors: [{ message: 'Update to iterator should use prefix operator.' }]
            },
            {
                code: 'for (let i = 0; i < a.length; i--) {}',
                errors: [{ message: 'Update to iterator should use prefix operator.' }]
            }
        ];

        ruleTester.run('test', Rule, {
            valid: valids,
            invalid: invalids
        });
    });
});
