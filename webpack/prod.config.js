require('babel-polyfill');
require('../server.babel')
// Webpack config for creating the production bundle.
const path = require('path')
const HappyPack = require('happypack')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const strip = require('strip-loader')
const projectRootPath = path.resolve(__dirname, '../')
const assetsPath = path.resolve(projectRootPath, './static/dist')

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

const classFormat = '[path]_[local]'

const stylesLoader = [
  `css-loader?modules&importLoaders=1&minimize=true&localIdentName=${classFormat}`,
  'stylus-loader'
]

module.exports = {
  // devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './src/theme/optimize.js',
      './src/client.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel-loader'] },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [].concat(stylesLoader).join('!'),
        }),
      },
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
      'node_modules',
    ],
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    // Seperate vendor code into a seperate file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3,
      children: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.ProgressPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: 'dist/[name]-[hash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    webpackIsomorphicToolsPlugin
  ]
}
