import postcss from 'postcss';

export default postcss.plugin('postcss-focus-within', () =>
  css => css.walkRules((rule) => {
    /* eslint-disable no-param-reassign */
    rule.selector = rule.selector.replace(':focus-within', ':global(.ally-focus-within)');
  }),
);
