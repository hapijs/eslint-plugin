'use strict';

const CapitalizeModules = require('./rules/capitalize-modules');
const ForLoop = require('./rules/for-loop');
const NoArrowception = require('./rules/no-arrowception');
const NoVar = require('./rules/no-var');
const Recommended = require('./configs/recommended');
const Module = require('./configs/module');
const ScopeStart = require('./rules/scope-start');


const internals = {
    plugin: {
        configs: {},
        rules: {
            'capitalize-modules': CapitalizeModules,
            'for-loop': ForLoop,
            'no-var': NoVar,
            'scope-start': ScopeStart,
            'no-arrowception': NoArrowception
        }
    }
};

internals.plugin.configs.recommended = Recommended(internals.plugin);
internals.plugin.configs.module = Module(internals.plugin);

module.exports = internals.plugin;
