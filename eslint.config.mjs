// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([...nextVitals, ...nextTs, {
  name: "promarket/a11y-overrides",
  rules: {
    // Stricter rules for accessibility beyond next.js defaults
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/no-noninteractive-element-interactions": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/label-has-associated-control": "error",
    "jsx-a11y/no-autofocus": "warn",
    "jsx-a11y/no-redundant-roles": "error",
    "jsx-a11y/tabindex-no-positive": "error",
    "jsx-a11y/iframe-has-title": "error",
    "jsx-a11y/mouse-events-have-key-events": "error",
    "jsx-a11y/no-static-element-interactions": "error",
    // Upgrade some warnings to errors
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/role-supports-aria-props": "error",
  },
  settings: {
    "jsx-a11y": {
      components: {
        Link: "a",
        Button: "button",
        Dialog: "div",
      },
    },
  },
}, // Override default ignores of eslint-config-next.
globalIgnores([
  // Default ignores of eslint-config-next:
  ".next/**",
  "out/**",
  "build/**",
  "next-env.d.ts",
  "public/**",
  "scripts/**",
]), ...storybook.configs["flat/recommended"]]);

export default eslintConfig;
