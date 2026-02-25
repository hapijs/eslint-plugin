import { RuleTester } from 'oxlint/plugins-dev';
import { describe, it } from 'vitest';

import HapiRecommended from '../../src/configs/recommended.js';
import Rule from '../../src/rules/no-var';

const ruleTester = new RuleTester(HapiRecommended);

describe('no-var rule', () => {
    it('reports warning when vars used outside of try...catch scope', () => {
        const sample = [
            'function test() { var a = 1; }',
            'function test() { try { var bf = 2; console.log(bf); } catch (err) {} }',
            'function test() { try {} catch (err) { var cf = 3; console.log(cf); } }',
            'function test() { try { var bf = 2; if (bf) { console.log(bf); } } catch (err) {} }',
            'function test() { try { if (true) { var bf = 2; } console.log(bf); } catch (err) {} }',
            'var a = 1; try {} catch (err) {}',
        ];

        ruleTester.run('test', Rule, {
            valid: [],
            invalid: sample.map((code) => {
                return {
                    code,
                    errors: [{ message: 'Unexpected var, use let or const instead.' }],
                };
            }),
        });
    });

    it('ignores vars used inside try...catch scope and referenced from outside', () => {
        const sample = [
            'const a = 1;',
            'function test() { try { var bf = 2; } catch (err) {} console.log(bf); }',
            'function test() { try {} catch (err) { var cf = 3; } console.log(cf); }',
            'function test() { a = 1; try { var a = 2; } catch (err) {} }',
            'try { var a = 1; } catch (err) {} console.log(a);',
        ];

        ruleTester.run('test', Rule, {
            valid: sample.map((code) => {
                return { code };
            }),
            invalid: [],
        });
    });
});
