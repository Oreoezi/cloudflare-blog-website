import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			"no-undef": 'off',
			// Use tabs instead of spaces
			"indent": ["error", "tab"],
			// Enforce camelCase for everything except constants
			"camelcase": ["error", { "properties": "always", "ignoreDestructuring": false, "ignoreImports": false, "ignoreGlobals": false, "allow": ["^UPPER_CASE$"] }],
			// Enforce uppercase for constants
			"@typescript-eslint/naming-convention": [
				"error",
				{
					"selector": "variable",
					"format": ["camelCase", "UPPER_CASE"],
					"leadingUnderscore": "allow",
					"trailingUnderscore": "allow",
					"filter": {
						"regex": "^[A-Z_]+$",
						"match": false
					}
				},
				{
					"selector": "typeLike",
					"format": ["PascalCase"]
				},
				{
					"selector": "enumMember",
					"format": ["PascalCase", "UPPER_CASE"]
				}
			]
		}
	},
	{
		files: [
			'**/*.svelte',
			'**/*.svelte.ts',
			'**/*.svelte.js'
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
