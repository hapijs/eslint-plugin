import { RuleTester } from 'oxlint/plugins-dev';
import { describe, it } from 'vitest';

import HapiRecommended from '../../src/configs/recommended.js';
import Rule from '../../src/rules/capitalize-modules';

const ruleTester = new RuleTester(HapiRecommended);

describe('capitalize-modules rule', () => {
    it('reports warning when module is not capitalized', () => {
        const sample = [
            'import hapi from "hapi";',
            'import * as hapi from "hapi";',
            'async function x() { const hapi = await import("hapi"); }',
        ];

        ruleTester.run('test', Rule, {
            valid: [],
            invalid: sample.map((code) => {
                return {
                    code,
                    errors: [{ message: 'Imported module variable name not capitalized.' }],
                };
            }),
        });
    });

    it('does not report anything if module variable is capitalized', () => {
        const sample = ['import Hapi from "hapi";', 'import * as Hapi from "hapi";', 'import { hapi } from "hapi";'];

        ruleTester.run('test', Rule, {
            valid: sample.map((code) => {
                return { code };
            }),
            invalid: [],
        });
    });

    it('only warns on globals when global-scope-only is set', () => {
        const valid = [
            'import Hapi from "hapi";',
            'import * as Hapi from "hapi";',
            'async function x() { const hapi = await import("hapi"); }',
        ];

        const invalid = ['import hapi from "hapi";', 'import * as hapi from "hapi";'];

        ruleTester.run('test', Rule, {
            valid: valid.map((code) => {
                return {
                    code,
                    options: ['global-scope-only'],
                };
            }),
            invalid: invalid.map((code) => {
                return {
                    code,
                    options: ['global-scope-only'],
                    errors: [{ message: 'Imported module variable name not capitalized.' }],
                };
            }),
        });
    });

    it('does not report anything for non-module variables', () => {
        const sample = [
            'let foo, bar, baz;',
            'const foo = fn()',
            'const foo = "string";',
            'const foo = this.bar()',
            'foo[bar] = 5;',
            'this.foo = null;',
            ' [foo, bar] = [1, 2];',
        ];

        ruleTester.run('test', Rule, {
            valid: sample.map((code) => {
                return { code };
            }),
            invalid: [],
        });
    });
});
