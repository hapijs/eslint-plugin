import { describe, it, expect } from 'vitest';

import Plugin from '..';

describe('ESLint Plugin', () => {
    it('exposes all expected rules', () => {
        expect(Plugin.rules).toBeDefined();
        expect(Plugin.rules).toBeTypeOf('object');

        const rules = Object.keys(Plugin.rules);

        expect(rules.length).toBe(5);
        expect(rules.includes('capitalize-modules')).toBe(true);
        expect(rules.includes('for-loop')).toBe(true);
        expect(rules.includes('no-var')).toBe(true);
        expect(rules.includes('scope-start')).toBe(true);
        expect(rules.includes('no-arrowception')).toBe(true);
    });
});
