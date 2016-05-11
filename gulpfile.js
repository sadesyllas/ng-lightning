var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var tsBuildProject = ts.createProject('tsconfig.json', { noEmitHelpers: false });
var lazypipe = require('lazypipe');
var jade = require('jade');
var inlineTemplates = require('gulp-inline-ng2-template');
var cache = require('gulp-cached');
var argv = require('yargs').argv;
var bundle = require('./scripts/bundle');

var BUILD = tsProject.options.outDir;

var PATHS = {
  src: ['src/**/*.ts','!src/**/*.spec.ts'],
  templates: ['src/**/*.jade'],
  spec: ['src/**/*.ts', 'test/helpers.ts'],
  temp: 'temp/',
};

var inlineTemplatesTask = lazypipe()
  .pipe(inlineTemplates, {
    base: '/src',
    useRelativePaths: true,
    templateProcessor: function(path, file) {
      return jade.render(file, {doctype: 'html'});
    },
    templateExtension: '.jade',
  });

gulp.task('clean', function() {
  return require('del')(BUILD);
});

gulp.task('lint:ts', function() {
  var tslint = require('gulp-tslint');

  return gulp.src( PATHS.spec )
    .pipe(cache('lint:ts'))
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      summarizeFailureOutput: true,
    }));
});

gulp.task('build:ts', ['lint:ts'], function() {
  var replace = require('gulp-replace');
  var merge = require('merge2');

  var tsResult = gulp.src(PATHS.src, {base: 'src'})
    .pipe(inlineTemplatesTask())
    .pipe(ts(tsBuildProject));

  return merge([
    tsResult.dts.pipe(replace(/^\/{3}.*$/gm, '')),
    tsResult.js
  ]).pipe(gulp.dest(BUILD));
});

gulp.task('bundle', function() {
  return bundle({mangle: false});
});

gulp.task('bundle:min', function() {
  return bundle({minify: true, sourceMaps: true, mangle: false});
});

gulp.task('build', function(done) {
  runSequence('clean', 'build:ts', ['bundle', 'bundle:min'], done);
});

gulp.task('build:continuous', function(done) {
  runSequence('build:ts', 'bundle', done);
});

gulp.task('build:watch', function() {
  gulp.watch([ PATHS.src, PATHS.templates ], ['build:continuous']);
});

function startKarmaServer(isTddMode, done) {
  var config = {configFile: __dirname + '/karma.conf.js', singleRun: !isTddMode, autoWatch: isTddMode};
  if (argv.logLevel) config.logLevel = argv.logLevel;

  var karmaServer = require('karma').Server;
  new karmaServer(config, done).start();
}

gulp.task('test:clean', function() {
  return require('del')(PATHS.temp);
});

gulp.task('test:build', function() {
  var sourcemaps = require('gulp-sourcemaps');

  var tsResult = gulp.src(PATHS.spec)
    .pipe(sourcemaps.init())
    .pipe(inlineTemplatesTask())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(cache('test:build'))
    .pipe(gulp.dest(PATHS.temp));
});

gulp.task('test:clean-build', function(done) {
  runSequence('test:clean', 'test:build', done);
});

gulp.task('test', ['test:clean-build'], function(done) {
  startKarmaServer(false, done)
});

gulp.task('tdd', ['test:clean-build'], function(done) {
  startKarmaServer(true, function(err) {
    done(err);
    process.exit(1);
  });

  gulp.watch([PATHS.spec, PATHS.templates], ['test:build']);
});

gulp.task('prepublish', ['build'], function(done) {
  return gulp.src(['package.json', '*.md', 'LICENSE'])
    .pipe(gulp.dest(BUILD));
});

gulp.task('default', ['build']);
