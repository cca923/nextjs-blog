module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-redeclare': 0,
    'no-shadow': ['off'],
    camelcase: 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 0,
    'import/named': 0,
    'react/no-unused-prop-types': 0,
    'react/require-default-props': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/no-array-index-key': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    semi: ['error', 'never'],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'max-len': ['error', { code: 120 }],
    'global-require': 0,
    'no-console': 0,
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'res', 'ctx', 'e', 'accumulator'],
      },
    ],
    'sort-imports': 'off',
    'import/order': 'off',
  },
}
