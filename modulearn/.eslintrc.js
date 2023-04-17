module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'svelte3',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
	"import/resolver": {
      "node": {
		  "paths": ["../node_modules"]
      }
    },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 0,
        'import/no-duplicates': 0,
        'import/no-mutable-exports': 0,
        'no-restricted-syntax': 0,
        'arrow-parens': 0,
        'import/no-extraneous-dependencies': 0,
        'import/prefer-default-export': 0,
        quotes: 0,
      },
    },
  ],
  rules: {
    semi: 0,
  },
};
