import { execSync } from 'child_process';
import Path from 'path';

import { describe, it, expect } from 'vitest';

const internals = {};

internals.formatFile = function (configPath, filePath) {
    const command = `./node_modules/.bin/oxfmt -c ${configPath} --stdin-filepath ${filePath}`;

    try {
        const output = execSync(`cat ${filePath} | ${command}`, {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'ignore'],
        });
        return output;
    } catch (err) {
        console.error(err.stderr);
        throw err;
    }
};

describe('oxfmt config', () => {
    const configPath = Path.join(import.meta.dirname, './oxfmt.test.config.ts');
    const fixturesDir = Path.join(import.meta.dirname, './fixtures');

    const testFormatting = (fileName) => {
        it(`formats ${fileName} correctly`, () => {
            const filePath = Path.join(fixturesDir, fileName);
            const output = internals.formatFile(configPath, filePath);
            expect(output).toMatchSnapshot();
        });
    };

    testFormatting('indent.js');
    testFormatting('indent-switch-case.js');
    testFormatting('semi.js');
    testFormatting('no-extra-semi.js');
    testFormatting('space-before-function-paren.js');
    testFormatting('arrow-parens.js');
    testFormatting('arrow-spacing.js');
    testFormatting('space-before-blocks.js');
});
