// Webpack config for development
require('babel-polyfill')
const HappyPack = require('happypack')
const path = require('path')
const webpack = require('webpack')

const host = (process.env.HOST || 'localhost')
const port = parseInt(process.env.PORT, 10) || 3001
const projectRootPath = path.resolve(__dirname, '../');
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

const isVendorModule = (module) => {
  // returns true for everything in node_modules
  return module.context && module.context.indexOf('node_modules') !== -1;
}

const plugins = [
  new HappyPack({
    verbose: false,
    loaders: [
      'babel-loader'
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

const classFormat = '[path]_[local]'

const stylesLoader = [
  `css-loader?modules&importLoaders=1&localIdentName=${classFormat}`,
  'stylus-loader'
];

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'react-hot-loader/patch',
      './src/theme/optimize.js',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.json', '.js', '.jsx', '.styl'],
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          'happypack/loader',
        ],
      },
      {
        test: /\.styl$/,
        use: ['style-loader'].concat(stylesLoader),
      },
      {
        test: /\.(jpg|png|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10,
            name: 'images/[hash].[ext]',
          },
        },
      },
    ]
  },

  plugins
}
