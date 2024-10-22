'use strict';

const Fs = require('fs');
const Path = require('path');

const Code = require('@hapi/code');
const ESLint = require('eslint');
const Lab = require('@hapi/lab');

const HapiPlugin = require('../..');
const CommonTestCases = require('./common');

const internals = {};


const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;


Code.settings.truncateMessages = false;


internals.lintFile = async function (file) {

    const cli = new ESLint.ESLint({
        overrideConfigFile: true,
        baseConfig: [...HapiPlugin.configs.recommended]
    });

    const data = await Fs.promises.readFile(Path.join(__dirname, file), 'utf8');
    return await cli.lintText(data);
};


describe('recommended config', () => {

    CommonTestCases(expect, it, internals.lintFile);

    it('doesn\'t parse private class fields', async () => {

        const output = await internals.lintFile('fixtures/private-class-field.js');
        const results = output[0];

        expect(results.errorCount).to.equal(1);
        expect(results.warningCount).to.equal(0);

        const msg = results.messages[0];
        expect(msg.ruleId).to.be.null();
        expect(msg.severity).to.equal(2);
        expect(msg.message).to.equal('Parsing error: Unexpected character \'#\'');

        expect(msg.line).to.equal(4);
        expect(msg.column).to.equal(5);
    });
});
