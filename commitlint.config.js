// https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional
module.exports = {
  extends: ['@commitlint/config-conventional'],
  'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'refactor', 'test', 'chore', 'ci']],
};
