// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.config({
  baseURL: '/base',
  map: {
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    'temp': 'temp'
  },
  packages: {
    'temp': {defaultExtension: 'js'},
    '@angular/core': {main: 'index.js', defaultExtension: 'js'},
    '@angular/compiler': {main: 'index.js', defaultExtension: 'js'},
    '@angular/common': {main: 'index.js', defaultExtension: 'js'},
    '@angular/forms': {main: 'index.js', defaultExtension: 'js'},
    '@angular/platform-browser': {main: 'index.js', defaultExtension: 'js'},
    '@angular/platform-browser-dynamic': {main: 'index.js', defaultExtension: 'js'},
    'rxjs': {defaultExtension: 'js'},
  },
  paths: {
    'tether': 'node_modules/tether/dist/js/tether.min.js'
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
