ESLint plugin containing hapi style guide rules and config. To use in your project, add
[`@hapi/eslint-plugin-hapi`](https://github.com/hapijs/eslint-plugin-hapi) to your `package.json`, then in your ESLint configuration add:

```
{
  "extends": "plugin:@hapi/hapi/recommended"
}
```

## Rules

This plugin includes the following ESLint rules:

### capitalize-modules

[`@hapi/rule-capitalize-modules`](https://www.npmjs.com/package/@hapi/rule-capitalize-modules) - Enforces capitalization of imported module variables.

### for-loop

[`@hapi/rule-for-loop`](https://www.npmjs.com/package/@hapi/rule-for-loop) - Enforces `for` loop iterator variable rules and restricts loop nesting depth.

### no-var

[`@hapi/rule-no-var`](https://www.npmjs.com/package/@hapi/rule-no-var) - Enforces the usage of var declarations only in try-catch scope.

### scope-start

[`@hapi/rule-scope-start`](https://www.npmjs.com/package/@hapi/rule-scope-start) - Enforces a new line at the beginning of function scope.

### no-arrowception
        
[`@hapi/rule-no-arrowception`](https://www.npmjs.com/package/@hapi/rule-no-arrowception) - Prevents arrow functions that implicitly create additional arrow functions.

## Config

| Rule | Option |
|------|--------|
| **'@hapi/hapi/capitalize-modules'** | ['warn', 'global-scope-only'] |
| **'@hapi/hapi/for-loop'** | ['warn', { maxDepth: 3, startIterator: 'i' }] |
| **'@hapi/hapi/no-var'** | 'error' |
| **'@hapi/hapi/scope-start'** | 'warn' |
| **'@hapi/hapi/no-arrowception'** | 'error' |
| **'camelcase'** | 'off' |
| **'consistent-return'** | 'off' |
| **'vars-on-top'** | 'off' |
| **'new-cap'** | 'off |
| **'no-console'** | 'off' |
| **'no-constant-condition'** | 'error' |
| **'no-empty'** | 'off' |
| **'no-native-reassign'** | 'off' |
| **'no-underscore-dangle'** | 'off' |
| **'no-undef'** | ['error', { typeof: false }] |
| **'no-process-exit'** | 'off' |
| **'no-unused-expressions'** | 'off' |
| **'no-regex-spaces'** | 'off' |
| **'no-catch-shadow'** | 'off' |
| **'no-lonely-if'** | 'off' |
| **'brace-style'** | ['warn', 'stroustrup'] |
| **'no-shadow'** | ['warn', { allow: ['err', 'done'] }] |
| **'no-unused-vars'** | ['warn', { vars: 'all', varsIgnorePattern: '^internals$', args: 'none' }] |
| **'one-var'** | ['error', 'never'] |
| **'handle-callback-err'** | ['error', '^(e\|err\|error)$'] |
| **'array-bracket-spacing'** | 'warn' |
| **'dot-notation'** | 'warn' |
| **'eol-last'** | 'warn' |
| **'no-trailing-spaces'** | 'warn' |
| **'no-eq-null'** | 'warn' |
| **'no-extend-native'** | 'warn' |
| **'no-redeclare'** | 'warn' |
| **'no-loop-func'** | 'warn' |
| **'yoda'** | ['warn', 'never'] |
| **'sort-vars'** | 'warn' |
| **'arrow-parens'** | ['error', 'always'] |
| **'arrow-spacing'** | ['error', { before: true, after: true }] |
| **'quotes'** | ['error', 'single', { allowTemplateLiterals: true }] |
| **'consistent-this'** | ['error', 'self'] |
| **'new-parens'** | 'error' |
| **'no-array-constructor'** | 'error' |
| **'no-confusing-arrow'** | 'error' |
| **'no-new-object'** | 'error' |
| **'no-spaced-func'** | 'error' |
| **'no-mixed-spaces-and-tabs'** | 'error' | 
| **'key-spacing'** | 'error' |
| **'keyword-spacing'** | ['error', { before: true, after: true }] |
| **'semi'** | ['error', 'always'] |
| **'semi-spacing'** | ['error', { before: false, after: true }] |
| **'space-before-blocks'** | 'error' |
| **'space-infix-ops'** | 'error' |
| **'space-unary-ops'** | ['warn', { words: true, nonwords: false }] |
| **'strict'** | ['error', 'global'] |
| **'eqeqeq'** | 'error' |
| **'curly'** | ['error', 'all'] |
| **'no-eval'** | 'error' |
| **'no-else-return'** | 'error' |
| **'no-return-assign'** | 'error' |
| **'no-new-wrappers'** | 'error' |
| **'comma-dangle'** | ['error', 'never'] |
| **'no-sparse-arrays'** | 'error' |
| **'no-ex-assign'** | 'error' |
| **'prefer-arrow-callback'** | 'error' |
| **'prefer-const'** | ['error', { destructuring: 'all' }] |
| **'indent'** | ['error', 4, { SwitchCase: 1 }] |
| **'space-before-function-paren'** | ['error', { anonymous: 'always', named: 'never' }] |
| **'func-style'** | ['error', 'expression'] |
| **'object-curly-spacing'** | ['error', 'always'] |
| **'object-shorthand'** | ['error', 'properties'] |
| **'no-unsafe-finally'** | 'error' |
| **'no-useless-computed-key'** | 'error' |
| **'require-await'** | 'error' |
| **'constructor-super'** | 'error' |
| **'no-buffer-constructor'** | 'error' |
| **'no-mixed-requires'** | 'error' |
| **'no-new-require'** | 'error' |
| **'no-caller'** | 'error' |
| **'no-const-assign'** | 'error' |
| **'no-dupe-class-members'** | 'error' |
| **'no-class-assign'** | 'warn' |
| **'no-new-symbol'** | 'error |
| **'no-this-before-super'** | 'error' |
| **'prefer-rest-params'** | 'error' |
| **'prefer-spread'** | 'error' |
| **'no-useless-call'** | 'error' |
| **'rest-spread-spacing'** | ['error', 'never'] |
| **'no-extra-semi'** | 'error' |
| **'no-dupe-keys'** | 'error' |
| **'padding-line-between-statements'** | [<br>'error', <br>{ blankLine: 'always', prev: 'directive', next: '\*' }, <br>{ blankLine: 'any', prev: 'directive', next: 'directive' }, <br>{ blankLine: 'always', prev: 'cjs-import', next: '\*' }, <br>{ blankLine: 'any', prev: 'cjs-import', next: 'cjs-import' }, <br>{ blankLine: 'always', prev: 'cjs-export', next: '\*' }, <br>{ blankLine: 'always', prev: 'multiline-block-like', next: '\*' }, <br>{ blankLine: 'always', prev: 'class', next: '\*' }<br>] |
