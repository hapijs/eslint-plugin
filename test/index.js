'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Plugin = require('..');


const internals = {};


const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;


Code.settings.truncateMessages = false;


describe('ESLint Plugin', () => {

    it('exposes all expected rules', () => {

        expect(Plugin.rules).to.exist();
        expect(Plugin.rules).to.be.an.object();

        const rules = Object.keys(Plugin.rules);

        expect(rules.length).to.equal(5);
        expect(rules.includes('@hapi/rule-capitalize-modules')).to.be.true();
        expect(rules.includes('@hapi/rule-for-loop')).to.be.true();
        expect(rules.includes('@hapi/rule-no-const')).to.be.true();
        expect(rules.includes('@hapi/rule-scope-start')).to.be.true();
        expect(rules.includes('@hapi/rule-no-arrowception')).to.be.true();
    });
});
