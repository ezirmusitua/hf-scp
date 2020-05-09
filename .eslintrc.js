module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
    'prettier',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'require-jsdoc': 'off',
    // 'quotes': ['error', 'double'],
    // 'object-curly-spacing': 'off',
    // 'space-before-function-paren': 'off',
  },
};
