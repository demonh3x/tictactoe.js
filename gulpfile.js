var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');

gulp.task('test', function() {
  return gulp
    .src(['vendor/**/*.js', 'src/**/*.js', 'spec/**/*.js'])
    .pipe(jasmine({
      abortOnFail: true,
      integration: true
    }));
});

gulp.task('compile', function() {
  return gulp
    .src(['vendor/**/*.js', 'src/**/*.js'])
    .pipe(concat('tictactoe.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['test']);

gulp.task('ci', ['test']);
