const fs = require('fs')
const path = require('path')

const babelrc = fs.readFileSync(path.join(__dirname, '../.babelrc'), 'utf-8')
let babelrcObject = {}

module.exports = function getBabelLoaderQuery() {
  try {
    babelrcObject = JSON.parse(babelrc)
  } catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.') // eslint-disable-line no-console
    console.error(err) // eslint-disable-line no-console
  }

  babelrcObject.presets[1] = ['es2015', {
    loose: true,
    modules: false,
  }]

  return babelrcObject;
}
