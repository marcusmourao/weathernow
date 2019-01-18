module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: [ 'error', 2 ],
    'space-in-parens': [ 'error', 'never' ],
    'template-curly-spacing': [ 'error', 'never' ],
    'array-bracket-spacing': [ 'error', 'never' ],
    'object-curly-spacing': [ 'error', 'never' ],
    'computed-property-spacing': [ 'error', 'never' ],
    'no-multiple-empty-lines': [ 'error', { max: 2, maxEOF: 1, maxBOF: 0 } ],
    'eol-last': [ 'error', 'always' ],
    'no-trailing-spaces': [ 'error', { skipBlankLines: false, ignoreComments: false }],
    quotes: [ 'error', 'single', 'avoid-escape' ],
    'vue/html-quotes': [ 'error', 'double' ],

    'prefer-const': [ 'error', {
      destructuring: 'all',
      ignoreReadBeforeAssign: false
    }],
    'no-var': 'error',

    complexity: [ 1, 5 ],

    'vue/v-bind-style': [ 'error', 'shorthand' ],
    'vue/v-on-style': [ 'error', 'shorthand' ],
    'vue/no-duplicate-attributes': 'error',
    'vue/attribute-hyphenation': [0, 'always'],
    'vue/name-property-casing': ['error', 'kebab-case'],
  }
}
