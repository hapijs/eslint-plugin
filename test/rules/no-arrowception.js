'use strict';

const Code = require('@hapi/code');
const ESLint = require('eslint');
const Lab = require('@hapi/lab');
const Rule = require('../../lib/rules/no-arrowception');


const internals = {};


const { describe, it } = exports.lab = Lab.script();


Code.settings.truncateMessages = false;


describe('no-arrowception rule', () => {

    it('reports error when an arrow function implicitly creates another arrow function', () => {

        const ruleTester = new ESLint.RuleTester({ parserOptions: { ecmaVersion: 2019 } });
        const valids = [
            'const foo = () => 85;',
            'const foo = () => { return 42; }',
            'const foo = () => ({});',
            'const foo = () => ({\nbar: 1});',
            'const foo = () => [];',
            'const foo = () => [\n1,\n2];',
            'const foo = () => { return () => 85; };'
        ].map((code) => {

            return { code };
        });

        const invalids = [
            'const foo = () => () => 85;'
        ].map((code) => {

            return {
                code,
                errors: [{ message: 'Arrow function implicitly creates arrow function.' }]
            };
        });

        ruleTester.run(Rule.esLintRuleName, Rule, {
            valid: valids,
            invalid: invalids
        });
    });
});
