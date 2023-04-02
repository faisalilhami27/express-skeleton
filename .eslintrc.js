module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    radix: 'off',
    'no-shadow': 'off',
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-plusplus': 'off',
    'no-promise-executor-return': 'off',
  },
};
