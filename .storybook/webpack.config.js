const path = require('path')
const projectRootPath = path.resolve(__dirname, '../');
const classNamesLoader = path.resolve(projectRootPath, './webpack/classnames-loader.js')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../webpack/webpack-isomorphic-tools'))
const stylesLoader = [
  `css-loader?modules&importLoaders=1&localIdentName=[path]_[local]`,
  'stylus-loader'
];
module.exports = {
  plugins:  [
    webpackIsomorphicToolsPlugin.development()
  ],
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
      { test: /\.styl$/, exclude: /node_modules/, use: ['style-loader'].concat(stylesLoader) },
      {
        test: /\.sss$/,
        use: [classNamesLoader, 'style-loader'].concat(stylesLoader),
      },
      { test: /\.less$/, exclude: /node_modules/, use: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!less-loader?outputStyle=expanded&sourceMap' },
      { test: /\.scss$/, exclude: /node_modules/, use: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap' },
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
