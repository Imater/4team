/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs')
const path = require('path')

function pathExists(componentPath) {
  return fs.existsSync(path.resolve(process.cwd(), componentPath))
}

function componentExists(comp) {
  return pathExists(`./src/components/atoms/${comp}`) || pathExists(`./components/molecules/${comp}`)
}

module.exports = componentExists
