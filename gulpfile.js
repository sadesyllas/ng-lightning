var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var BUILD = tsProject.options.outDir;

var PATHS = {
  src: ['src/**/*.ts','!src/**/*.spec.ts'],
  spec: ['src/**/*.ts'],
  temp: 'temp/',
};

gulp.task('clean', function() {
  return require('del')(BUILD);
});

gulp.task('lint:ts', function() {
  var tslint = require('gulp-tslint');

  return gulp.src( PATHS.spec )
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      summarizeFailureOutput: true,
    }));
});

gulp.task('build:ts', ['lint:ts'], function() {
  var replace = require('gulp-replace');
  var merge = require('merge2');

  var tsResult = gulp.src( PATHS.src, {base: 'src'} )
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(replace(/^\/{3}.*$/gm, '')).pipe(gulp.dest(BUILD)),
    tsResult.js.pipe(gulp.dest(BUILD))
  ]);
});

gulp.task('build', function(done) {
  runSequence('clean',
              'build:ts',
              done);
});

gulp.task('build:watch', function() {
  gulp.watch([ PATHS.src ], ['build:ts']);
});

gulp.task('default', ['build']);
