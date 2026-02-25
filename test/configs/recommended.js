import { execSync } from 'child_process';
import Fs from 'fs';
import Path from 'path';

import { describe, it } from 'vitest';

describe.concurrent('recommended config', () => {
    describe('oxlint', () => {
        const configPath = Path.join(import.meta.dirname, './oxlint.test.config.ts');

        const checkFile = function (filePath) {
            const command = `./node_modules/.bin/oxlint -c ${configPath} --format json --no-ignore --disable-nested-config ${filePath}`;

            let output;
            try {
                output = execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
            } catch (err) {
                output = err.stdout;
                if (!output) {
                    console.error(err.stderr);
                    throw err;
                }
            }

            const result = JSON.parse(output);

            const { diagnostics } = result;

            const messages = diagnostics.map((d) => ({
                ruleId: d.code,
                severity: d.severity === 'error' ? 2 : 1,
                message: d.message,
                line: d.labels[0].span.line,
                column: d.labels[0].span.column,
            }));

            return messages;
        };

        const lintFile = function (file) {
            const messages = checkFile(Path.join(import.meta.dirname, file));

            return [
                {
                    messages,
                    errorCount: messages.filter((m) => m.severity === 2).length,
                    warningCount: messages.filter((m) => m.severity === 1).length,
                },
            ];
        };

        it('enforces @hapi/for-loop', async ({ expect }) => {
            const output = await lintFile('fixtures/hapi-for-you.js');
            const results = output[0];

            expect(results.errorCount).toBe(0);
            expect(results.warningCount).toBe(2);

            let msg = results.messages[0];

            expect(msg.ruleId).toBe('@hapi(for-loop)');
            expect(msg.severity).toBe(1);
            expect(msg.message).toBe("Expected iterator 'j', but got 'k'.");
            expect(msg.line).toBe(4);
            expect(msg.column).toBe(5);

            msg = results.messages[1];

            expect(msg.ruleId).toBe('@hapi(for-loop)');
            expect(msg.severity).toBe(1);
            expect(msg.message).toBe('Update to iterator should use prefix operator.');
            expect(msg.line).toBe(4);
            expect(msg.column).toBe(5);
        });

        it.skip('enforces @hapi/scope-start', async ({ expect }) => {
            const output = await lintFile('fixtures/hapi-scope-start.js');
            const results = output[0];

            expect(results.errorCount).toBe(0);
            expect(results.warningCount).toBe(1);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('@hapi(scope-start)');
            expect(msg.severity).toBe(1);
            expect(msg.message).toBe('Missing blank line at beginning of function.');
            expect(msg.line).toBe(2);
            expect(msg.column).toBe(13);
        });

        it('enforces @hapi/capitalize-modules', async ({ expect }) => {
            const output = await lintFile('fixtures/hapi-capitalize-modules.js');
            const results = output[0];

            expect(results.errorCount).toBe(0);
            expect(results.warningCount).toBe(1);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('@hapi(capitalize-modules)');
            expect(msg.severity).toBe(1);
            expect(msg.message).toBe('Imported module variable name not capitalized.');
            expect(msg.line).toBe(4);
            expect(msg.column).toBe(8);
        });

        it('enforces @hapi/no-arrowception', async ({ expect }) => {
            const output = await lintFile('fixtures/no-arrowception.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('@hapi(no-arrowception)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Arrow function implicitly creates arrow function.');
            expect(msg.line).toBe(2);
            expect(msg.column).toBe(13);
        });

        it('enforces no-shadow rule', async ({ expect }) => {
            const output = await lintFile('fixtures/no-shadow.js');
            const results = output[0];

            expect(results.errorCount).toBe(0);
            expect(results.warningCount).toBe(1);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint(no-shadow)');
            expect(msg.severity).toBe(1);
            expect(msg.message).toBe("'res' is already declared in the upper scope.");
            expect(msg.line).toBe(27);
            expect(msg.column).toBe(33);
        });

        it('enforces one-var rule', async ({ expect }) => {
            const output = await lintFile('fixtures/one-var.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint-js(one-var)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe("Split 'let' declarations into multiple statements.");
            expect(msg.line).toBe(5);
            expect(msg.column).toBe(1);
        });

        it('enforces no-undef rule', async ({ expect }) => {
            const output = await lintFile('fixtures/no-undef.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint(no-undef)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe("'bar' is not defined.");
            expect(msg.line).toBe(5);
            expect(msg.column).toBe(17);
        });

        it('enforces no-unused-vars', async ({ expect }) => {
            const output = await lintFile('fixtures/no-unused-vars.js');
            const results = output[0];

            expect(results.errorCount).toBe(0);
            expect(results.warningCount).toBe(1);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint(no-unused-vars)');
            expect(msg.severity).toBe(1);
            expect(msg.message).toMatch(/Variable 'internals2' is declared but never used\./);
            expect(msg.line).toBe(2);
            expect(msg.column).toBe(7);
        });

        it('enforces prefer-const', async ({ expect }) => {
            const output = await lintFile('fixtures/prefer-const.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint(prefer-const)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('`foo` is never reassigned.');
            expect(msg.line).toBe(3);
            expect(msg.column).toBe(5);
        });

        it('enforces @hapi/no-var', async ({ expect }) => {
            const output = await lintFile('fixtures/no-var.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('@hapi(no-var)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Unexpected var, use let or const instead.');
            expect(msg.line).toBe(3);
            expect(msg.column).toBe(1);
        });

        it('enforces object-shorthand', async ({ expect }) => {
            const output = await lintFile('fixtures/object-shorthand.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint-js(object-shorthand)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Expected property shorthand.');
            expect(msg.line).toBe(9);
            expect(msg.column).toBe(5);
        });

        it('enforces prefer-arrow-callback', async ({ expect }) => {
            const output = await lintFile('fixtures/prefer-arrow-callback.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint-js(prefer-arrow-callback)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Unexpected function expression.');
            expect(msg.line).toBe(21);
            expect(msg.column).toBe(8);
        });

        it('enforces no-constant-condition rule', async ({ expect }) => {
            const output = await lintFile('fixtures/no-constant-condition.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint(no-constant-condition)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Unexpected constant condition');
            expect(msg.line).toBe(1);
            expect(msg.column).toBe(5);
        });

        it('enforces no-unsafe-finally rule', async ({ expect }) => {
            const output = await lintFile('fixtures/no-unsafe-finally.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint(no-unsafe-finally)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Unsafe `finally` block.');
            expect(msg.line).toBe(11);
            expect(msg.column).toBe(9);
        });

        it('enforces no-useless-computed-key rule', async ({ expect }) => {
            const output = await lintFile('fixtures/no-useless-computed-key.js');
            const results = output[0];

            expect(results.errorCount).toBe(5);
            expect(results.warningCount).toBe(0);

            let msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint(no-useless-computed-key)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe("Unnecessarily computed property `'0'` found.");
            expect(msg.line).toBe(1);
            expect(msg.column).toBe(21);

            msg = results.messages[1];

            expect(msg.ruleId).toBe('eslint(no-useless-computed-key)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe("Unnecessarily computed property `'0+1,234'` found.");
            expect(msg.line).toBe(2);
            expect(msg.column).toBe(21);

            msg = results.messages[2];

            expect(msg.ruleId).toBe('eslint(no-useless-computed-key)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Unnecessarily computed property `0` found.');
            expect(msg.line).toBe(3);
            expect(msg.column).toBe(21);

            msg = results.messages[3];

            expect(msg.ruleId).toBe('eslint(no-useless-computed-key)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe("Unnecessarily computed property `'x'` found.");
            expect(msg.line).toBe(4);
            expect(msg.column).toBe(21);

            msg = results.messages[4];

            expect(msg.ruleId).toBe('eslint(no-useless-computed-key)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe("Unnecessarily computed property `'x'` found.");
            expect(msg.line).toBe(5);
            expect(msg.column).toBe(21);
        });

        it('enforces handle-callback-err rule', async ({ expect }) => {
            const output = await lintFile('fixtures/handle-callback-err.js');
            const results = output[0];

            expect(results.errorCount).toBe(2);
            expect(results.warningCount).toBe(0);

            let msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint-plugin-node(handle-callback-err)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Expected error to be handled.');
            expect(msg.line).toBe(5);
            expect(msg.column).toBe(27);

            msg = results.messages[1];

            expect(msg.ruleId).toBe('eslint-plugin-node(handle-callback-err)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe('Expected error to be handled.');
            expect(msg.line).toBe(7);
            expect(msg.column).toBe(33);
        });

        it('enforces no-dupe-keys rule', async ({ expect }) => {
            const output = await lintFile('fixtures/no-dupe-keys.js');
            const results = output[0];

            expect(results.errorCount).toBe(1);
            expect(results.warningCount).toBe(0);

            const msg = results.messages[0];

            expect(msg.ruleId).toBe('eslint(no-dupe-keys)');
            expect(msg.severity).toBe(2);
            expect(msg.message).toBe("Duplicate key 'a'");
            expect(msg.line).toBe(4);
            expect(msg.column).toBe(5);
        });

        it('uses the node environment', async ({ expect }) => {
            const output = await lintFile('fixtures/node-env.js');
            const results = output[0];

            expect(results.errorCount).toBe(0);
            expect(results.warningCount).toBe(0);
            expect(results.messages).toEqual([]);
        });

        it('does not enforce the camelcase lint rule', async ({ expect }) => {
            const output = await lintFile('fixtures/camelcase.js');
            const results = output[0];

            expect(results.errorCount).toBe(0);
            expect(results.warningCount).toBe(0);
            expect(results.messages).toEqual([]);
        });
    });

    describe('oxfmt', () => {
        const configPath = Path.join(import.meta.dirname, './oxfmt.test.config.ts');
        const fixturesDir = Path.join(import.meta.dirname, './fixtures');

        const formatFile = (file) => {
            const filePath = Path.join(fixturesDir, file);
            const command = `./node_modules/.bin/oxfmt -c ${configPath} --stdin-filepath ${filePath}`;

            try {
                const output = execSync(command, {
                    encoding: 'utf8',
                    input: Fs.readFileSync(filePath, 'utf8'),
                    stdio: ['pipe', 'pipe', 'ignore'],
                });
                return output;
            } catch (err) {
                console.error(err.stderr);
                throw err;
            }
        };

        it.for([
            'indent.js',
            'indent-switch-case.js',
            'semi.js',
            'no-extra-semi.js',
            'space-before-function-paren.js',
            'arrow-parens.js',
            'arrow-spacing.js',
            'space-before-blocks.js',
        ])('formats %s correctly', (fileName, { expect }) => {
            const output = formatFile(fileName);
            expect(output).toMatchSnapshot();
        });
    });
});
