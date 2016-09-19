var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var lazypipe = require('lazypipe');
var jade = require('jade');
var inlineTemplates = require('gulp-inline-ng2-template');
var cache = require('gulp-cached');
var argv = require('yargs')
            .boolean('failOnError').default('failOnError', false) // tslint
            .argv;
var bundle = require('./scripts/bundle');

var BUILD = tsProject.options.outDir;

var PATHS = {
  src: ['src/**/*.ts','!src/**/*.spec.ts'],
  templates: ['src/**/*.jade'],
  spec: ['src/**/*.ts', 'test/util/*.ts'],
  typings: 'typings/index.d.ts',
  temp: 'temp/',
};

var inlineTemplatesTask = lazypipe()
  .pipe(inlineTemplates, {
    base: '/src',
    useRelativePaths: true,
    templateProcessor: function(filepath, ext, file, cb) {
      const rendered = jade.render(file, {
        doctype: 'html',
        filename: filepath,
      });
      cb(null, rendered);
    },
    templateExtension: '.jade',
  });

gulp.task('clean', function() {
  return require('del')(BUILD);
});

gulp.task('lint:ts', function lint_ts_impl() {
  var tslint = require('gulp-tslint');

  return gulp.src( PATHS.spec )
    .pipe(cache('lint:ts'))
    .pipe(tslint({
      formatter: 'prose',
    }))
    .pipe(tslint.report({
      emitError: argv.failOnError,
      summarizeFailureOutput: true,
    }));
});

gulp.task('build:ts', gulp.series('lint:ts', function build_ts_impl() {
  var merge = require('merge2');

  var tsResult = gulp.src(PATHS.src.concat(PATHS.typings), {base: 'src'})
    .pipe(inlineTemplatesTask())
    .pipe(ts(tsProject));

  return merge([tsResult.dts, tsResult.js])
    .pipe(cache('build:ts'))
    .pipe(gulp.dest(BUILD));
}));

gulp.task('bundle', function() {
  return bundle({});
});

gulp.task('bundle:min', function() {
  return bundle({minify: true, sourceMaps: true});
});

gulp.task('build', gulp.series('clean', 'build:ts', gulp.parallel('bundle', 'bundle:min')));

gulp.task('build:watch', function() {
  gulp.watch([ PATHS.src, PATHS.templates ], gulp.series('build:ts', 'bundle'));
});

function startKarmaServer(isTddMode, done) {
  var config = {configFile: __dirname + '/karma.conf.js', singleRun: !isTddMode, autoWatch: isTddMode};
  if (argv.logLevel) config.logLevel = argv.logLevel;

  var karmaServer = require('karma').Server;
  var server = new karmaServer(config, done);
  server.start();

  return server;
}

gulp.task('test:clean', function() {
  return require('del')(PATHS.temp);
});

gulp.task('test:build', function() {
  var sourcemaps = require('gulp-sourcemaps');

  var tsResult = gulp.src(PATHS.spec.concat(PATHS.typings))
    .pipe(sourcemaps.init())
    .pipe(inlineTemplatesTask())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(cache('test:build'))
    .pipe(gulp.dest(PATHS.temp));
});

gulp.task('test:clean-build', gulp.series('test:clean', 'test:build'));

gulp.task('test', gulp.series('test:clean-build', function test_impl(done) {
  startKarmaServer(false, done);
}));

gulp.task('tdd', gulp.series('test:clean-build', function tdd_impl(done) {
  startKarmaServer(true, function(err) {
    done(err);
    process.exit(1);
  }).on('browser_register', function(browser) {
    gulp.watch([PATHS.spec, PATHS.templates], gulp.series('test:build'));
  });
}));

gulp.task('prepublish', gulp.series('build', function prepublish_impl() {
  return gulp.src(['package.json', '*.md', 'LICENSE'])
    .pipe(gulp.dest(BUILD));
}));

gulp.task('typings:clean', function() {
  return require('del')('typings');
});

gulp.task('default', gulp.series('build'));
