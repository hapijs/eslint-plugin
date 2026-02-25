## Configurations

This plugin exposes two configurations for [oxlint](https://oxc.rs/docs/guide/usage/linter/oxlint.html):

- `@hapi/oxc-plugin/recommended`
- `@hapi/oxc-plugin/oxfmt`

### `@hapi/recommended`

The oxlint configuration containing hapi style guide rules and config. To use in your project, add
[`@hapi/oxc-plugin`](https://github.com/hapijs/oxc-plugin) to your `package.json`, then in your `oxlint.config.ts` add:

```ts
import { defineConfig } from 'oxlint';
import DefaultOxlintConfig from '@hapi/oxc-plugin/oxlint';

export default defineConfig({
  extends: [DefaultOxlintConfig],
  env: {
    ...DefaultOxlintConfig.env,
  },
});
```

### `@hapi/oxfmt`

The [oxfmt](https://oxc.rs/docs/guide/usage/formatter/oxfmt.html) configuration containing hapi style guide formatting rules. To use in your project, add
[`@hapi/oxc-plugin`](https://github.com/hapijs/oxc-plugin) to your `package.json`, then in your `oxfmt.config.ts` add:

```ts
import { defineConfig } from 'oxfmt'
import DefaultOxfmtConfig from '@hapi/oxc-plugin/oxfmt'

export default defineConfig({
  ...DefaultOxfmtConfig,
});
```

## Rules

This plugin includes the following Oxlint rules:

### capitalize-modules

Enforces capitalization of imported module variables.

#### `global-scope-only`

If the string `'global-scope-only'` is passed as the first option to this rule,
then it will only be enforced on assignments in the module's top level scope.

### for-loop

Enforces `for` loop iterator variable rules and restricts loop nesting depth.

This rule enforces the following:

- Restrict iterator variable names. `for` loop iterator variables should be named `i`. Nested loops should use the variables `j`, `k`, and so on.
- Restrict loop nesting. You can restrict the maximum nesting of `for` loops. By default, this limit is three.
- Prevent postfix increment and decrement operators. The hapi style guide does not allow postfix increment and decrement operators in `for` loop updates. The prefix version of these operators should be used instead.
- Single variable declaration in initialization section. A single `var i = 0;` is allowed in the initialization section. This only applies to variable declarations, not assignments to existing variables. This means that `for (i = 0, j = 0)` is allowed if `i` and `j` are existing variables. Variable declarations involving destructuring are not allowed.

#### Rule options

This rule can be configured by providing a single options object. The object supports the following keys.

##### `maxDepth`

A number representing the maximum allowed nesting of `for` loops. Defaults to three.

##### `startIterator`

The first variable iterator name to use. This defaults to `'i'`.

### no-var

Enforces the usage of var declarations only in try-catch scope.

### scope-start

Enforces a new line at the beginning of function scope.

*Note: This rule is currently disabled in the recommended configuration due to a conflict with oxfmt.*

### no-arrowception

Prevents arrow functions that implicitly create additional arrow functions.

This rule prevents the pattern () => () => () => ...;.

Functions can still be returned by arrow functions whose bodies use curly braces and an explicit return.

This rule does not accept any configuration options.
