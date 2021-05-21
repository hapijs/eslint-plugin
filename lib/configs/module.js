'use strict';

module.exports = {
    parser: '@babel/eslint-parser',
    extends: 'plugin:@hapi/recommended',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'script',
        requireConfigFile: false
    }
};
