import postcss from 'postcss';

export default postcss.plugin('postcss-reverse-props', () =>
  css => css.walkRules((rule) => {
    if (rule.selector.indexOf(':container') === -1) {
      return;
    }

    /* eslint-disable no-param-reassign */
    rule.selector = rule.selector.split(',').map((selectorString) => {
      const selector = selectorString.split(':container');

      return selector[0] + selector[1].slice(1, -1).split(' ').reduce((acc, item) => {
        if (item === '>') {
          return `${acc}_gt`;
        }

        if (item === '<') {
          return `${acc}_lt`;
        }

        return `${acc}_${item.replace('px', '')}`;
      }, '');
    }).join(',');
  }),
);
