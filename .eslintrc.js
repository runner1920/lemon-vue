module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multiple-empty-lines': [1, { max: 2 }], // 空行最多不能超过2行
    'max-len': [0, { code: 150, tabWidth: 2 }],
    'no-plusplus': 'off',
    'guard-for-in': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'no-unused-expressions': 'off',
    'vue/no-use-v-if-with-v-for': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
