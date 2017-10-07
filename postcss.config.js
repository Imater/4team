/* eslint-disable global-require,import/no-extraneous-dependencies */
const path = require('path')

const root = path.join(__dirname, './src')
const result = webpack => ({
  parser: 'sugarss',
  plugins: [
    require('postcss-import')({
      addDependencyTo: webpack,
      path: `${root}/styles`
    }),
    require('./webpack/postcss/container-query'),
    require('./webpack/postcss/focus-within'),
    require('./webpack/postcss/focus-ring'),
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
