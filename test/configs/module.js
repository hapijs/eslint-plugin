'use strict';

const Fs = require('fs');
const Path = require('path');

const Code = require('@hapi/code');
const ESLint = require('eslint');
const Lab = require('@hapi/lab');

const CommonTestCases = require('./common');


const internals = {};


const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;


Code.settings.truncateMessages = false;


internals.lintFile = function (file) {

    const cli = new ESLint.CLIEngine({
        useEslintrc: false,
        baseConfig: { extends: 'plugin:@hapi/module' }
    });

    const data = Fs.readFileSync(Path.join(__dirname, file), 'utf8');
    return cli.executeOnText(data);
};

describe('internal config', () => {

    CommonTestCases(expect, it, internals.lintFile);

    it('parses private class fields', () => {

        const output = internals.lintFile('fixtures/private-class-field.js');
        const results = output.results[0];

        expect(output.errorCount).to.equal(0);
        expect(output.warningCount).to.equal(0);
        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(0);

        expect(results.messages).to.be.empty();
    });
});
