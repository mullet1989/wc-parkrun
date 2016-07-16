const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('client/app/**/*.js');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src('client/app/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('client/app'));
});

gulp.task('build', ['compile']);
gulp.task('default', ['build']);