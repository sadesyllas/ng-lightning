const webpack = require('webpack');
const path = require('path');
const dateFormat = require('dateformat');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const pkg = require('../package.json');

/**
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;

const isProduction = ENV === 'demo:build';

const config = {
  cache: false,
  entry: path.resolve(__dirname, 'main.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts',  '.js'],
    alias: {
      'ng-lightning': path.resolve(__dirname, '../temp/inline'),
      'bundle.umd.js': path.resolve(__dirname, '../dist/bundles/ng-lightning.umd.js'),
    }
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts'] },
      { test: /\.jade$/, loaders: ['jade'] },
      { test: /\.html$/, loaders: ['raw'] },
      { test: /\.md$/, loader: 'html?minimize=false!markdown' },
    ]
  },
  ts: {
    transpileOnly : true,
    compilerOptions: {
      declaration: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: '!!jade!' + path.resolve(__dirname, 'index.jade'),
      baseHref: isProduction ? '/ng-lightning/' : '/',
    }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify({
        now: dateFormat(new Date(), 'dd mmm yyyy'),
        version: pkg.version,
        production: isProduction,
        pkg,
      }),
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../node_modules/@salesforce-ux/design-system/assets'), to: 'assets' },
      { from: path.resolve(__dirname, '../node_modules/prismjs/themes/prism-okaidia.css'), to: 'assets/prismjs' },
      { from: path.resolve(__dirname, 'img'), to: 'img' },
      { from: path.resolve(__dirname, 'index.css') },
    ]),
    new BrowserSyncPlugin({
      host: '0.0.0.0',
      port: 1111,
      open: false,
      server: {
        baseDir: [path.resolve(__dirname, 'dist')]
      },
      reloadDelay: 100,
      reloadDebounce: 300,
    })
  ],
};

if (isProduction) {
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(true),

    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Dedupe modules in the output
    new webpack.optimize.DedupePlugin(),

    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
