/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  var config = {
    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },
    paths: {
      // paths serve as alias
      'npm:': 'https://unpkg.com/',
      'tether': 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.js'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      'ng-lightning/ng-lightning': '__NG_LIGHTHNING_URL__',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                       'npm:rxjs',
      'typescript':                 'npm:typescript@2.0.2/lib/typescript.js',

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      'ng-lightning': {
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  };

  System.config(config);

})(this);
