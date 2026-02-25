import CapitalizeModules from './rules/capitalize-modules.js';
import ForLoop from './rules/for-loop.js';
import NoArrowception from './rules/no-arrowception.js';
import NoVar from './rules/no-var.js';
import ScopeStart from './rules/scope-start.js';

export default {
    meta: {
        name: '@hapi',
    },
    rules: {
        'capitalize-modules': CapitalizeModules,
        'for-loop': ForLoop,
        'no-var': NoVar,
        'scope-start': ScopeStart,
        'no-arrowception': NoArrowception,
    },
};
