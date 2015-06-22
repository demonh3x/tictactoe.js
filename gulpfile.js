var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('test', function() {
  return gulp
    .src(['vendor/*.js', 'src/*.js', 'spec/*.js'])
    .pipe(jasmine({
      abortOnFail: true,
      integration: true
    }));
});

gulp.task('default', ['test']);
