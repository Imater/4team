const path = require('path')
const projectRootPath = path.resolve(__dirname, '../');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../webpack/webpack-isomorphic-tools'))
const classFormat = '[path]_[local]'
const stylesLoader = [
  `css-loader?modules&importLoaders=1&minimize=true&localIdentName=${classFormat}`,
  'stylus-loader'
];
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            }
          }
        ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.styl$/,
        use: ['style-loader'].concat(stylesLoader),
      },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "raw-loader" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    // TODO eslint-plugin-resole-webpack not support webpack@2 `resolve.modules` path
    // https://github.com/benmosher/eslint-plugin-import/pull/319
    // Waiting for merge this PR or webpack-2 resolver will be implemented as plugin
    // modulesDirectories: [
    //   'node_modules'
    // ],
    extensions: ['/', '*', '.json', '.js', '.jsx']
  }
}
