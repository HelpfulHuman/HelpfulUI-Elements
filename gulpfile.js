var gulp = require('gulp');
var del = require('del');
var browsersync = require('browser-sync');
var plugins = require('gulp-load-plugins')();

/**
 * WATCH
 * Automatically run tasks on file change.
 */
gulp.task('watch', ['build'], function () {
  gulp.watch('./**/*.styl', ['styles']).on('change', browsersync.reload);
  gulp.watch('./index.html', []).on('change', browsersync.reload);
});

/**
 * TEST
 * Runs all assertion tests for each of the render cases.
 */
gulp.task('test', function () {
  return gulp
    .src('test/runner.js', {read: false})
    .pipe(plugins.mocha({
      reporter: 'spec',
      ignoreLeaks: true,
      growl: true
    }));
});

/**
 * TDD
 * Run tests upon relevant file changes.
 */
gulp.task('tdd', function () {
  gulp.watch(['./helpful-ui/**/*', './test/cases/**/*'], ['test']);
});

/**
 * SERVER
 * Start a browser sync server for the project.
 */
gulp.task('serve', ['watch'], function () {
  browsersync.init({
    server: {
      baseDir: './'
    }
  });
});

/**
 * DEFAULT TASK
 */
gulp.task('default', ['watch']);
