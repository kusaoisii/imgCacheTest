module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/standard'
	],
	rules: {
		'indent': [
			'error',
			'tab'
		],
		'no-tabs': 0,
		'linebreak-style': [
			'error',
			'unix'
		],
		'comma-dangle': [
			'error',
			'never'
		],
		'semi': [
			'error',
			'never',
			{
				'beforeStatementContinuationChars': 'never'
			}
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
}
