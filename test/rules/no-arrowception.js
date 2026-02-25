import { RuleTester } from 'oxlint/plugins-dev';
import { describe, it } from 'vitest';

import HapiRecommended from '../../src/configs/recommended.js';
import Rule from '../../src/rules/no-arrowception';

const ruleTester = new RuleTester(HapiRecommended);

describe('no-arrowception rule', () => {
    it('reports error when an arrow function implicitly creates another arrow function', () => {
        const valids = [
            'const foo = () => 85;',
            'const foo = () => { return 42; }',
            'const foo = () => ({});',
            'const foo = () => ({\nbar: 1});',
            'const foo = () => [];',
            'const foo = () => [\n1,\n2];',
            'const foo = () => { return () => 85; };',
        ].map((code) => {
            return { code };
        });

        const invalids = ['const foo = () => () => 85;'].map((code) => {
            return {
                code,
                errors: [{ message: 'Arrow function implicitly creates arrow function.' }],
            };
        });

        ruleTester.run('test', Rule, {
            valid: valids,
            invalid: invalids,
        });
    });
});
