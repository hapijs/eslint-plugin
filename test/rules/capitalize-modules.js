'use strict';

const Code = require('@hapi/code');
const ESLint = require('eslint');
const Lab = require('@hapi/lab');
const Rule = require('../../lib/rules/capitalize-modules');


const { describe, it } = exports.lab = Lab.script();


Code.settings.truncateMessages = false;


describe('capitalize-modules rule', () => {

    it('reports warning when module is not capitalized', () => {

        const ruleTester = new ESLint.RuleTester({ parserOptions: { ecmaVersion: 2019 } });
        const sample = [
            'const hapi = require("hapi");',
            'let poop; poop = require("poop");',
            'const foo = {bar: function() { const hapi = require("hapi"); }};'
        ];

        ruleTester.run(Rule.esLintRuleName, Rule, {
            valid: [],
            invalid: sample.map((code) => {

                return {
                    code,
                    errors: [{ message: 'Imported module variable name not capitalized.' }]
                };
            })
        });
    });

    it('does not report anything if module variable is capitalized', () => {

        const ruleTester = new ESLint.RuleTester({ parserOptions: { ecmaVersion: 2019 } });
        const sample = [
            'const Hapi = require("hapi");',
            'let Poop; Poop = require("poop");',
            'Code = require("code");'
        ];

        ruleTester.run(Rule.esLintRuleName, Rule, {
            valid: sample.map((code) => {

                return { code };
            }),
            invalid: []
        });
    });

    it('only warns on globals when global-scope-only is set', () => {

        const ruleTester = new ESLint.RuleTester({ parserOptions: { ecmaVersion: 2019 } });
        const valid = [
            'function foo() { const hapi = require("hapi"); }',
            'const foo = function() { const hapi = require("hapi"); }',
            'const foo = {bar: function() { hapi = require("hapi"); }};'
        ];

        const invalid = [
            'hapi = require("hapi");',
            'let poop; poop = require("poop");'
        ];

        ruleTester.run(Rule.esLintRuleName, Rule, {
            valid: valid.map((code) => {

                return {
                    code,
                    options: ['global-scope-only']
                };
            }),
            invalid: invalid.map((code) => {

                return {
                    code,
                    options: ['global-scope-only'],
                    errors: [{ message: 'Imported module variable name not capitalized.' }]
                };
            })
        });
    });

    it('global-scope-only works in the presense of ES6 modules', () => {

        const ruleTester = new ESLint.RuleTester({ parserOptions: { ecmaVersion: 2019 } });
        const invalid = [
            'hapi = require("hapi");',
            'let poop; poop = require("poop");'
        ];

        ruleTester.run(Rule.esLintRuleName, Rule, {
            valid: [],
            invalid: invalid.map((code) => {

                return {
                    code,
                    options: ['global-scope-only'],
                    errors: [{ message: 'Imported module variable name not capitalized.' }]
                };
            })
        });
    });

    it('does not report anything for non-module variables', () => {

        const ruleTester = new ESLint.RuleTester({ parserOptions: { ecmaVersion: 2019 } });
        const sample = [
            'let foo, bar, baz;',
            'const foo = fn()',
            'const foo = "string";',
            'const foo = this.bar()',
            'foo[bar] = 5;',
            'this.foo = null;',
            '[foo, bar] = [1, 2];',
            '[foo, bar] = require("baz");',
            'const {foo} = require("bar");'
        ];

        ruleTester.run(Rule.esLintRuleName, Rule, {
            valid: sample.map((code) => {

                return { code };
            }),
            invalid: []
        });
    });
});
