import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import nodePlugin from 'eslint-plugin-n'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			parser: tseslint.parser,
			globals: globals.node
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			import: importPlugin,
			n: nodePlugin,
			prettier: prettierPlugin
		},
		settings: {
			'import/resolver': {
				node: true,
				typescript: true
			}
		},
		rules: {
			// Prettier formatting rules
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					semi: false,
					printWidth: 120,
					trailingComma: 'none',
					endOfLine: 'auto',
					useTabs: true,
					tabWidth: 1
				}
			],

			// Code style rules (from your previous config)
			'no-console': 'warn',
			'consistent-return': 'off',
			'func-names': 'off',
			'object-shorthand': 'off',
			'no-process-exit': 'off',
			'no-return-await': 'off',
			'no-underscore-dangle': 'off',
			'class-methods-use-this': 'off',
			'prefer-destructuring': ['error', { object: true, array: false }],
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: 'err|req|res|next|val' }],
			'no-param-reassign': 'off'
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	prettier
]
