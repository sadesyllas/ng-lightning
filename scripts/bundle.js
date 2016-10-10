const path    = require('path');
const fs      = require('fs');
const q       = require('q');
const Builder = require('systemjs-builder');
const name    = require('../package.json').name;

const builder = new Builder();
const config = {
  baseURL: '.',
  transpiler: 'typescript',
  typescriptOptions: {
    module: 'cjs'
  },
  map: {
    'typescript': 'node_modules/typescript/lib/typescript',
    '@angular': 'node_modules/@angular',
    'rxjs': 'node_modules/rxjs',
  },
  paths: {
    'temp/es5/*': 'temp/es5/*.js',
  },
  meta: {
    'node_modules/@angular/*': { build: false },
    'node_modules/rxjs/*': { build: false },
    'tether': { build: false },
  },
};

builder.config(config);

function bundle() {
  const exportFile = 'dist/bundles/' + name + '.umd.js';
  return builder.buildStatic('temp/es5/' + name, exportFile, {format: 'umd'});
}

module.exports = bundle;
