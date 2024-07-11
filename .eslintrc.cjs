/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  "rules": {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ],
    'generator-star-spacing': [0],
    'consistent-return': [0],
    'dot-notation': [1],
    'react/forbid-prop-types': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.ts', '.tsx'] }],
    'global-require': [1],
    'import/prefer-default-export': [0],
    'react/jsx-no-bind': [0],
    'react/prop-types': [0],
    'react/prefer-stateless-function': [0],
    'react/destructuring-assignment': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/no-access-state-in-setstate': [0],
    'prettier/prettier': 0,
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-else-return': [0],
    'no-restricted-syntax': [0],
    'import/no-extraneous-dependencies': [0],
    'no-use-before-define': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'no-nested-ternary': [0],
    'arrow-body-style': [0],
    'import/extensions': [0],
    'no-bitwise': [0],
    'no-cond-assign': [0],
    'import/no-unresolved': [0],
    'object-curly-newline': [0],
    'function-paren-newline': [0],
    'no-restricted-globals': [0],
    'require-yield': [1],
    'linebreak-style': [0],
    'class-methods-use-this': [0],
    'no-plusplus': [0],
    'react/sort-comp': [0],
    'no-trailing-spaces': [2],
    semi: [2],
    'no-unused-vars': [2],
    'no-multi-spaces': [2],
    'key-spacing': [2],
    'no-underscore-dangle': [0],
    'comma-spacing': [2],
    'import/no-useless-path-segments': [0],
    'no-debugger': [1],
    curly: [1],
    'react/no-this-in-sfc': [0],
  }
};
module.exports = config;