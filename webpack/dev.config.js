// Webpack config for development
require('babel-polyfill')
const HappyPack = require('happypack')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const babelLoaderQuery = require('./babelLoaderQuery')

var host = (process.env.HOST || 'localhost')
var port = parseInt(process.env.PORT, 10) || 3001

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

const isVendorModule = (module) => {
  // returns true for everything in node_modules
  return module.context && module.context.indexOf('node_modules') !== -1;
}

const plugins = [
  new HappyPack({
    verbose: false,
    loaders: [
      'react-hot-loader/webpack',
      `babel-loader?${JSON.stringify(babelLoaderQuery())}`
    ]
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.IgnorePlugin(/webpack-stats\.json$/),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEVTOOLS__: true
  }),
  // Seperate vendor code into a seperate file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: isVendorModule
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: "[file].map",
    exclude: [/vendor(.*?)\.js$/, /manifest(.*?)\.js$/]
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  webpackIsomorphicToolsPlugin.development()
]

const stylesLoader = [
  `css-loader?modules&importLoaders=1&localIdentName=[path]_[local]`,
  'stylus-loader'
];

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'react-hot-loader/patch',
      './src/theme/optimize.js',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.styl$/, exclude: /node_modules/, use: ['style-loader'].concat(stylesLoader) },
      { test: /\.less$/, exclude: /node_modules/, use: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!less-loader?outputStyle=expanded&sourceMap' },
      { test: /\.scss$/, exclude: /node_modules/, use: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap' },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "raw-loader" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
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
  },
  plugins
}
