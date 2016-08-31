// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.config({
  baseURL: '/base',
  paths: {
    'npm:': 'node_modules/',
    'tether': 'node_modules/tether/dist/js/tether.min.js'
  },
  map: {
    'rxjs': 'npm:rxjs',
    'temp': 'temp',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

    // angular testing umd bundles
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
  },
  packages: {
    'temp': {defaultExtension: 'js'},
    'rxjs': {defaultExtension: 'js'},
  },
});

Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing'),
    System.import('/base/temp/test/util/helpers.js'),
    System.import('/base/temp/test/util/matchers.js'),
    System.import('https://npmcdn.com/classlist.js'),
    System.import('https://npmcdn.com/svg4everybody')
      .then(function(){
        svg4everybody();
      })
  ])
  .then(function(providers) {
    var coreTesting = providers[0];
    var browserTesting = providers[1];

    coreTesting.TestBed.initTestEnvironment(browserTesting.BrowserDynamicTestingModule, browserTesting.platformBrowserDynamicTesting());
  })
  .then(function() {
    return Promise.all(resolveTestFiles());
  })
  .then(__karma__.start, __karma__.error);

function onlySpecFiles(path) {
  return /\.spec\.js$/.test(path);
}

function resolveTestFiles() {
  return Object.keys(window.__karma__.files)
    .filter(onlySpecFiles)
    .map(function(moduleName) {
      return System.import(moduleName);
    });
}
