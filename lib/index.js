'use strict';

const CapitalizeModules = require('@hapi/rule-capitalize-modules');
const ForLoop = require('@hapi/rule-for-loop');
const NoArrowception = require('@hapi/rule-no-arrowception');
const NoVar = require('@hapi/rule-no-var');
const ScopeStart = require('@hapi/rule-scope-start');


const internals = {};


module.exports = {
    rules: {
        '@hapi/rule-capitalize-modules': CapitalizeModules,
        '@hapi/rule-for-loop': ForLoop,
        '@hapi/rule-no-const': NoVar,
        '@hapi/rule-scope-start': ScopeStart,
        '@hapi/rule-no-arrowception': NoArrowception
    }
};
