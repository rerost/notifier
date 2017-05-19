var webpack = require('webpack')
var JsonpTemplatePlugin = webpack.JsonpTemplatePlugin
var FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin')
var NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin')
var ExternalsPlugin = webpack.ExternalsPlugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var opt = {
  filename: 'app/build/app.js',
  libraryTarget: 'commonjs2',
  publicPath: 'http://localhost:8080/assets/'
}

var config = {
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ["transform-react-jsx"]
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]--[local]--[hash:base64:8]',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]--[local]--[hash:base64:8]!sass-loader',
        ],
        exclude: /node_modules/,
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './app/client/container/main_container.js'
  ],
  output: opt,
  resolve: {
    extensions: ['.js', '.jsx', 'css'],
    mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NoErrorsPlugin(),
    new ExternalsPlugin('commonjs', [
      'app',
      'auto-updater',
      'browser-window',
      'content-tracing',
      'dialog',
      'global-shortcut',
      'ipc',
      'menu',
      'menu-item',
      'power-monitor',
      'protocol',
      'tray',
      'remote',
      'web-frame',
      'clipboard',
      'crash-reporter',
      'screen',
      'shell'
    ]),
    new NodeTargetPlugin()
  ],
  externals: [
    'electron'
    // 'socket.io-client',
    // 'md5',
    // 'superagent',
    // 'superagent-promise',
    // 'lodash',
    // 'markdown-it',
    // 'moment'
  ]
}

config.target = function renderer (compiler) {
  compiler.apply(
    new JsonpTemplatePlugin(opt),
    new FunctionModulePlugin(opt)
  )
}

module.exports = config
