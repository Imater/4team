const path = require('path')

const root = path.join(__dirname, './src')

/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependenies */
const result = webpack => ({
  parser: 'stylus',
  plugins: [
    require('postcss-import')({
      addDependencyTo: webpack,
      path: `${root}/styles`
    }),
    require('postcss-custom-properties')({
      warnings: false
    }),
    require('postcss-color-function'),
    require('postcss-for'),
    require('postcss-nested'),
    require('autoprefixer')({
      remove: false
    }),
    require('postcss-autoreset')({
      rulesMatcher: ({ selector, parent: { name, type } }) => (
        !/(_|:|\[|>|\+)/.test(selector) && type !== 'atrule' && name !== 'keyframes'
      ),
      reset: {
        all: 'initial',
        fontFamily: '"Roboto", sans-serif'
      }
    }),
    require('postcss-initial')
  ]
})

module.exports = result
