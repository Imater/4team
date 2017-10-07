const loaderUtils = require('loader-utils')

module.exports = function classnamesLoader(source, map) {
  this.callback(null, source, map);
};

module.exports.pitch = function pitch(remainingRequest) {
  this.cacheable();

  const cnames = loaderUtils.stringifyRequest(this, `!${require.resolve('classnames/bind')}`);
  const styles = loaderUtils.stringifyRequest(this, `!!${remainingRequest}`);

  return `
    var styles = require(${styles})
    var classnames = require(${cnames}).bind(styles)

    var fn = function() {
      return classnames.apply(null, arguments)
    }

    // Allow using this as an ES6 module
    fn.default = fn

    // Allow access to the raw style map
    fn.styles = styles

    module.exports = fn

    if (module.hot) {
      module.hot.accept(${styles}, function() {
        fn.styles = styles = require(${styles})
        classnames = require(${cnames}).bind(styles)
      })
    }
  `
}