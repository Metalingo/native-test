module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		es6: true,
	},
	parserOptions: {
		ecmaFeatures: {
			modules: true,
		},
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['react', 'simple-import-sort', 'unused-imports'],
	rules: {
		'react/jsx-uses-vars': 'error',
		'react/jsx-uses-react': 'error',
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'ignore',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		camelcase: ['warn', { ignoreDestructuring: true }],
		'unused-imports/no-unused-imports-ts': ['error'],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['dotenv'],
					[`^(${require('module').builtinModules.join('|')})(/|$)`],
					// Packages. `react` related packages come first.
					['^@?\\w'],
					// Internal packages.
					['^(@app)(/.*|$)'],
					['^(@assets)(/.*|$)'],
					// Side effect imports.
					['^\\u0000'],
					// Parent imports. Put `..` last.
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					// Other relative imports. Put same-folder imports and `.` last.
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				],
			},
		],
		'simple-import-sort/exports': 'error',
		'linebreak-style': ['error', 'unix'],
	},
}
