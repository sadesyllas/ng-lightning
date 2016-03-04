module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
        // For travis
        'node_modules/es6-shim/es6-shim.js',
        // paths loaded by Karma
        {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false},
        {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: false},
        {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: false},
        {pattern: 'node_modules/angular2/bundles/angular2.js', included: true, watched: true},
        {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true},
        {pattern: 'karma-shim.js', included: true, watched: true},

        // paths loaded via module imports
        {pattern: 'temp/**/*.js', included: false, watched: true},

        // paths to support debugging with source maps in dev tools
        {pattern: 'src/**/*.ts', included: false, watched: false},
        {pattern: 'temp/**/*.js.map', included: false, watched: false},

        // fixtures
        {pattern: 'test/fixtures/**', watched: false, included: false, served: true},
    ],

    proxies: {
      '/assets/icons/utility-sprite/svg/symbols.svg': '/base/test/fixtures/fake.svg',
    },

    preprocessors: {'temp/**/*.js': ['sourcemap']},

    reporters: process.env.TRAVIS ? ['dots'] : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.TRAVIS ? ['Chrome_travis_ci', 'Firefox'] : ['Chrome'],
    singleRun: false,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
  });
};
