const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const pkg = require('../package.json');

module.exports = {
  entry: path.resolve(__dirname, 'app.ts'),
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts',  '.js'],
    alias: {
      src: path.resolve(__dirname, '../src'),
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
  noParse: [ /.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/ ],
  plugins: [
    new webpack.DefinePlugin({
      __NOW__: JSON.stringify(+new Date()),
      __VERSION__: JSON.stringify(pkg.version),
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../node_modules/@salesforce-ux/design-system/assets'), to: 'assets' },
      { from: path.resolve(__dirname, '../node_modules/prismjs/themes/prism-okaidia.css'), to: 'assets/prismjs' },
    ]),
    new BrowserSyncPlugin({
      host: '0.0.0.0',
      port: 1111,
      open: false,
      server: {
        baseDir: [path.resolve(__dirname)]
      },
      reloadDelay: 500,
    })
  ],
};
