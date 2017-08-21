var webpack = require('webpack');

module.exports = function (config) {
  const conf = {

    browsers: ['Chrome'],

    singleRun: !!process.env.CI,

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      instrumenterOptions: {
        istanbul: {
          includeAllSources: true
        }
      },
      reporters: [
        { type: 'lcovonly', subdir: '.' },
        { type: 'html', subdir: '.' },
        { type: 'json', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    plugins: [
      'karma-webpack',
      'karma-chai',
      'karma-sinon',
      'karma-mocha',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-sourcemap-loader'
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: { limit: 10240 } },
          { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
          { test: /\.json$/, loader: 'json' },
          { test: /\.theme\.css$/, loader: 'raw-loader' },
          { test: /\.less$/, loader: 'style!css!less' },
          { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
          {
            test: /\.styl$/,
            exclude: /node_modules/,
            loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!stylus?outputStyle=expanded&sourceMap'
          }
        ]
      },
      resolve: {
        modules: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          },
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }

  };

  if (process.env.TRAVIS) {
    conf.browsers = ['ChromeTravis'];
  }

  config.set(conf);
};
