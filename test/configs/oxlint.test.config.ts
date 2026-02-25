import { defineConfig } from 'oxlint';

import HapiRecommended from '../../src/configs/recommended.js';

export default defineConfig({
    extends: [HapiRecommended],
    env: {
        ...HapiRecommended.env,
    },
});
