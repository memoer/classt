module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'scripts', 'migration'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // ! function return type 필수
    '@typescript-eslint/explicit-function-return-type': ['error'],
    // ! any type 사용 불가 -> 대신, unkown type을 사용할 것
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
