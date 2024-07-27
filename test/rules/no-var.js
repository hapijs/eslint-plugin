'use strict';

const Code = require('@hapi/code');
const ESLint = require('eslint');
const Lab = require('@hapi/lab');
const Rule = require('../../lib/rules/no-var');


const { describe, it } = exports.lab = Lab.script();
const RuleTester = ESLint.RuleTester;


Code.settings.truncateMessages = false;


describe('no-var rule', () => {

    it('reports warning when vars used outside of try...catch scope', () => {

        const sample = [
            'function test() { var a = 1; }',
            'function test() { try { var bf = 2; console.log(bf); } catch (err) {} }',
            'function test() { try {} catch (err) { var cf = 3; console.log(cf); } }',
            'function test() { try { var bf = 2; if (bf) { console.log(bf); } } catch (err) {} }',
            'function test() { try { if (true) { var bf = 2; } console.log(bf); } catch (err) {} }',
            'var a = 1; try {} catch (err) {}'
        ];

        const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 6 } });
        ruleTester.run('test', Rule, {
            valid: [],
            invalid: sample.map((code) => {

                return {
                    code,
                    errors: [{ message: 'Unexpected var, use let or const instead.' }]
                };
            })
        });
    });

    it('ignores vars used inside try...catch scope and referenced from outside', () => {

        const sample = [
            'const a = 1;',
            'function test() { try { var bf = 2; } catch (err) {} console.log(bf); }',
            'function test() { try {} catch (err) { var cf = 3; } console.log(cf); }',
            'function test() { a = 1; try { var a = 2; } catch (err) {} }',
            'try { var a = 1; } catch (err) {} console.log(a);'
        ];

        const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 6 } });
        ruleTester.run('test', Rule, {
            valid: sample.map((code) => {

                return { code };
            }),
            invalid: []
        });
    });
});
