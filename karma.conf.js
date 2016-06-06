const isTravis = process.env.TRAVIS;
const isSaucelabs = process.argv.indexOf('--saucelabs') !== -1 || (isTravis && process.env.TRAVIS_PULL_REQUEST === 'false');

if (isSaucelabs && !process.env.SAUCE_USERNAME) {
  try {
    const credentials = require('./saucelabs.json');
    process.env.SAUCE_USERNAME = credentials.username;
    process.env.SAUCE_ACCESS_KEY = credentials.accessKey;
  } catch (err) {
    console.log('Please, create a valid "saucelabs.json" with your credentials.');
    process.exit(1);
  }
}

module.exports = function(config) {
  const cfg = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
        // Polyfills
        {pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false},
        {pattern: 'node_modules/reflect-metadata/Reflect.js', included: true, watched: false},

        // Intl pollyfill
        'https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en',

        // Typescript helpers polyfill
        {pattern: 'node_modules/ts-helpers/index.js', included: true, watched: false},

        // System.js for module loading
        {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: false},
        {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false},

        // Zone.js
        {pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false},
        {pattern: 'node_modules/zone.js/dist/jasmine-patch.js', included: true, watched: false},
        {pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false},
        {pattern: 'node_modules/zone.js/dist/fake-async-test.js', included: true, watched: false},

        // RxJS
        {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
        {pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false},

        // Angular
        {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
        {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},

        // Other libraries
        {pattern: 'node_modules/tether/dist/js/tether.min.js', included: true, watched: false},
        {pattern: 'karma-shim.js', included: true, watched: true},

        // Our built application code
        {pattern: 'temp/**/*.js', included: false, watched: true},

        // paths to support debugging with source maps in dev tools
        {pattern: 'src/**/*.ts', included: false, watched: false},
        {pattern: 'temp/**/*.js.map', included: false, watched: false},

        // fixtures
        {pattern: 'test/fixtures/**', watched: false, included: false, served: true},
    ],

    proxies: {
      // Avoid 404 warnings for images during testing
      '/assets/icons/utility-sprite/svg/symbols.svg': '/base/test/fixtures/fake',
      '/mypath/utility-sprite/svg/symbols.svg': '/base/test/fixtures/fake',
      '/mypath/standard-sprite/svg/symbols.svg': '/base/test/fixtures/fake',
      '/mypath/custom-sprite/svg/symbols.svg': '/base/test/fixtures/fake',
      '/image1.jpg': '/base/test/fixtures/fake',

      '/tether': '/base/node_modules/tether/dist/js/tether.min.js'
    },

    preprocessors: {
      'temp/**/*.js': ['sourcemap'],
      'temp/src/**/!(*spec|*mock).js': ['coverage'],
    },

    coverageReporter: {
      dir: 'coverage/',
      reporters: [{type: 'text-summary'}, {type: 'html'}],
    },

    reporters: isTravis ? ['dots'] : ['progress', 'coverage'],
    port: isTravis ? 9876 : 23011,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [isTravis ? 'Firefox' : 'Chrome'],
    singleRun: false,
  };

  if (isSaucelabs) {
    cfg.customLaunchers =  require('./test/browser-providers');
    cfg.browsers = Object.keys(cfg.customLaunchers);
    cfg.reporters.push('saucelabs');
    cfg.sauceLabs = {
      tunnelIdentifier: isTravis ? process.env.TRAVIS_JOB_NUMBER : 'ng-lightning',
      connectOptions: {
        logfile: './saucelabs.log',
      },
    };
    cfg.captureTimeout = 120000;
    cfg.browserNoActivityTimeout = 120000;
  }

  config.set(cfg);
};
