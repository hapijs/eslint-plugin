'use strict';

const Fs = require('fs');
const Path = require('path');

const Code = require('@hapi/code');
const ESLint = require('eslint');
const Lab = require('@hapi/lab');

const CommonTestCases = require('./common');
const HapiPlugin = require('../../lib');


const internals = {};


const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;


Code.settings.truncateMessages = false;


internals.lintFile = async function (file) {

    const cli = new ESLint.ESLint({
        overrideConfigFile: true,
        baseConfig: [...HapiPlugin.configs.module]
    });

    const data = await Fs.promises.readFile(Path.join(__dirname, file), 'utf8');
    return await cli.lintText(data);
};

describe('internal config', () => {

    CommonTestCases(expect, it, internals.lintFile);

    it('parses private class fields', async () => {

        const output = await internals.lintFile('fixtures/private-class-field.js');
        const results = output[0];

        expect(results.errorCount).to.equal(0);
        expect(results.warningCount).to.equal(0);

        expect(results.messages).to.be.empty();
    });
});
