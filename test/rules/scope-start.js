import { RuleTester } from 'oxlint/plugins-dev';
import { describe, it } from 'vitest';

import HapiRecommended from '../../src/configs/recommended.js';
import Rule from '../../src/rules/scope-start';

const ruleTester = new RuleTester(HapiRecommended);

describe('scope-start rule', () => {
    it('reports warning when function body does not begin with a blank line', () => {
        const invalids = [
            [
                `function fn() {
                    return;
                }`,
                `function fn() {

                    return;
                }`,
            ],
            [
                `function fn(foo, bar, baz) {
                    const fizz = 1;
                }`,
                `function fn(foo, bar, baz) {

                    const fizz = 1;
                }`,
            ],
            [
                `function fn(foo) {
                    return 'foo';
                }`,
                `function fn(foo) {

                    return 'foo';
                }`,
            ],
            [
                `function fn() {/*test*/
                    return;
                }`,
                `function fn() {/*test*/

                    return;
                }`,
            ],
            [
                `function fn() { // test
                    return;
                }`,
                `function fn() { // test

                    return;
                }`,
            ],
            [
                `function fn() {
                    /* test */ return;
                }`,
                `function fn() {

                    /* test */ return;
                }`,
            ],
            [
                `function fn() {
                    /* test */
                    return;
                }`,
                `function fn() {

                    /* test */
                    return;
                }`,
            ],
            [
                `function fn() {
                    /* test */ // test
                    return;
                }`,
                `function fn() {

                    /* test */ // test
                    return;
                }`,
            ],
            [
                `function fn() {/*test*//*test2*/
                    return;
                }`,
                `function fn() {/*test*//*test2*/

                    return;
                }`,
            ],
            ['function fn() { return; }', 'function fn() {\n return; }'],
            ['function fn(foo, bar, baz) { return; }', 'function fn(foo, bar, baz) {\n return; }'],
        ];

        ruleTester.run('test', Rule, {
            valid: [],
            invalid: invalids.map(([code, output]) => {
                return {
                    code,
                    output,
                    errors: [{ message: 'Missing blank line at beginning of function.' }],
                };
            }),
        });
    });

    it('does not report anything when function body begins with a blank line', () => {
        const valids = [
            `function fn() {

                return;
            }`,
            `function fn(foo, bar, baz) {

                const fizz = 1;
            }`,
            `function fn(foo) {

                return 'foo';
            }`,
            `function fn() {/*test*/

                return;
            }`,
        ];

        ruleTester.run('test', Rule, {
            valid: valids.map((code) => {
                return { code };
            }),
            invalid: [],
        });
    });

    it('does not report anything when function is one line and allow-one-liners is set', () => {
        const valids = ['function fn() { return; }', 'function fn(foo, bar, baz) { return; }'];

        ruleTester.run('test', Rule, {
            valid: valids.map((code) => {
                return {
                    code,
                    options: ['allow-one-liners'],
                };
            }),
            invalid: [],
        });
    });

    it('reports an error when function is allow-one-liners is set but function body contains too many statements', () => {
        ruleTester.run('test', Rule, {
            valid: [],
            invalid: [
                {
                    code: 'function fn() { let i = 0; i++; return; }',
                    output: 'function fn() {\n let i = 0; i++; return; }',
                    options: ['allow-one-liners', 2],
                    errors: [{ message: 'Missing blank line at beginning of function.' }],
                },
            ],
        });
    });

    it('allow-one-liners defaults to 1', () => {
        ruleTester.run('test', Rule, {
            valid: [],
            invalid: [
                {
                    code: "function fn() { console.log('broken'); return; }",
                    output: "function fn() {\n console.log('broken'); return; }",
                    options: ['allow-one-liners'],
                    errors: [{ message: 'Missing blank line at beginning of function.' }],
                },
            ],
        });
    });

    it('does not report anything when function body is empty', () => {
        const valids = [
            'function fn() { }',
            'function fn(foo, bar, baz) { }',
            `function fn(foo) {

            }`,
            'function fn() {/*test*/ }',
        ];

        ruleTester.run('test', Rule, {
            valid: valids.map((code) => {
                return { code };
            }),
            invalid: [],
        });
    });

    it('handles function expressions', () => {
        const code = `const foo =  function () {

            return;
        }`;

        ruleTester.run('test', Rule, {
            valid: [{ code }],
            invalid: [],
        });
    });

    it('handles arrow functions', () => {
        const valids = [
            'const foo = () => {\n\nreturn;};',
            'const foo = () => {\n\nreturn;}',
            'const foo = () => 42;',
            'const foo = () => 42\n',
            'const foo = () => ({});',
            'const foo = () => ({})',
            'const foo = () => ({\nbar: 1});',
            'const foo = () => [];',
            'const foo = () => [\n1,\n2];',
            'const foo = (isTrue) ? () => bar()\n: false;',
            'const foo = (isTrue) ? true:\n () => 1;',
        ].map((code) => {
            return { code };
        });

        const invalids = [
            ['const foo = () => {\nreturn;};', 'const foo = () => {\n\nreturn;};'],
            ['const foo = () => {const foo = 1; return foo;};', 'const foo = () => {\nconst foo = 1; return foo;};'],
            ['const foo = () => {const foo = 1;\nreturn foo;};', 'const foo = () => {\nconst foo = 1;\nreturn foo;};'],
            ['const foo = () => \n12;', 'const foo = () =>\n \n12;'],
            ['const foo = () => "1" + \n"2";', 'const foo = () =>\n "1" + \n"2";'],
        ];

        ruleTester.run('test', Rule, {
            valid: valids,
            invalid: invalids.map(([code, output]) => {
                return {
                    code,
                    output,
                    errors: [{ message: 'Missing blank line at beginning of function.' }],
                };
            }),
        });
    });
});
