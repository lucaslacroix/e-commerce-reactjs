module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      'airbnb',
      'prettier',
      'prettier/react'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'prettier'
    ],
    rules: {
        'no-console': 'off',
        'react/state-in-constructor': ['off', 'never'],
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.jsx', '.js']}
        ],
        'import/prefer-default-export': 'off',
        'react/static-property-placement': 'off',
        'camelcase': 'off',
        'react/require-default-props': 'off',
        'no-throw-literal': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'no-param-reassign': 'off'
    },
  };
