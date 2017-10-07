import postcss from 'postcss';

/* eslint-disable no-param-reassign */
module.exports = postcss.plugin('postcss-focus-ring', () => (root) => {
  root.walkRules((rule) => {
    rule.selector = rule.selector.replace(':focus-ring', ':global(.focus-ring)');
  });
});
