'use strict';

const BabelParser = require('@babel/eslint-parser');

module.exports = function (plugin) {

    return [
        ...plugin.configs.recommended,
        {
            languageOptions: {
                parser: BabelParser,
                parserOptions: {
                    requireConfigFile: false
                },
                ecmaVersion: 2020,
                sourceType: 'script'
            }
        }
    ];
};
