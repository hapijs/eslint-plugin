'use strict';

const CapitalizeModules = require('@hapi/rule-capitalize-modules');
const ForLoop = require('@hapi/rule-for-loop');
const NoArrowception = require('@hapi/rule-no-arrowception');
const NoVar = require('@hapi/rule-no-var');
const ScopeStart = require('@hapi/rule-scope-start');


const internals = {};


module.exports = {
    rules: {
        'hapi-capitalize-modules': CapitalizeModules,
        'hapi-for-loop': ForLoop,
        'hapi-no-var': NoVar,
        'hapi-scope-start': ScopeStart,
        'hapi-no-arrowception': NoArrowception
    }
};
