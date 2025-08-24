'use strict';

const CapitalizeModules = require('./rules/capitalize-modules');
const ForLoop = require('./rules/for-loop');
const NoArrowception = require('./rules/no-arrowception');
const NoVar = require('./rules/no-var');
const Recommended = require('./configs/recommended');
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

// Lazy load 'module' config to allow other configs to work when @babel/eslint-parser is not available

Object.defineProperty(internals.plugin.configs, 'module', {
    configurable: true,
    enumerable: true,
    get() {

        const Module = require('./configs/module');
        const value = Module(internals.plugin);

        Object.defineProperty(this, 'module', {
            configurable: true,
            enumerable: true,
            value
        });

        return value;
    }
});

module.exports = internals.plugin;
