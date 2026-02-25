import { defineConfig } from 'oxfmt';

export default defineConfig({
    singleQuote: true,
    tabWidth: 4,
    printWidth: 120,
    jsdoc: {},
    sortImports: {
        groups: [
            'builtin',
            'external',
            ['internal', 'parent', 'sibling', 'index'],
            'type-builtin',
            'type-external',
            ['type-internal', 'type-parent', 'type-sibling', 'type-index'],
        ],
    },
    sortPackageJson: true,
});
