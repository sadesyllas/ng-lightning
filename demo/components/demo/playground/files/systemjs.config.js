/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  var ngVer = '@2.0.0-rc.5'; // lock in the angular package version; do not let it float to current!
  var formsVer = '@0.3.0'; // lock forms version

  //map tells the System loader where to look for things
  var map = {
    'app':                        'app',

    '@angular':                   'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
    '@angular/forms':             'https://npmcdn.com/@angular/forms' + formsVer,
    'rxjs':                       'https://npmcdn.com/rxjs@5.0.0-beta.6',
    'ts':                         'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
    'typescript':                 'https://npmcdn.com/typescript@1.9.0-dev.20160409/lib/typescript.js',
 };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs':                       { defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages
  ngPackageNames.concat(['forms']).forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };

    // Individual files (~300 requests):
    //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    meta: {
      'typescript': {
        'exports': 'ts'
      }
    },
    map: map,
    paths: {
      'tether': 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.js'
    },
    packages: packages
  };

  System.config(config);

})(this);
