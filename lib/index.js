'use strict';

const CapitalizeModules = require('@hapi/rule-capitalize-modules');
const ForLoop = require('@hapi/rule-for-loop');
const NoArrowception = require('@hapi/rule-no-arrowception');
const NoVar = require('@hapi/rule-no-var');
const ScopeStart = require('@hapi/rule-scope-start');

const ConfigRecommended = require('./config-recommended');


const internals = {};


module.exports = {
    configs: {
        recommended: ConfigRecommended
    },
    rules: {
        'capitalize-modules': CapitalizeModules,
        'for-loop': ForLoop,
        'no-var': NoVar,
        'scope-start': ScopeStart,
        'no-arrowception': NoArrowception
    }
};
