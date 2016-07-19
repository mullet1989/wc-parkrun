const gulp = require('gulp'),
  del = require('del'),
  typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  tscConfig = require('./tsconfig.json'),
  source = require('vinyl-source-stream'),
  webpack = require('gulp-webpack');


gulp.task('webpack', function() {
  return gulp.src('client/app/main.js')
    .pipe(webpack({
      entry: {
        app: './client/app/main.js',
        vendor: './client/app/vendor.js',
      },
      output: {
        filename: 'bundle.js',
      },
      resolve: {
        extensions: ['', '.ts', '.js']
      },
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.ts/,
          loaders: ['ts-loader'],
          exclude: /node_modules/
        }]
      }
    }))
    .pipe(gulp.dest('client/app-bundle'));
});

// clean the contents of the distribution directory
gulp.task('clean', function() {
  return del('client/app/**/*.js');
});

gulp.task('minify-css', function() {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist'));
});

// TypeScript compile
gulp.task('compile', ['clean'], function() {
  return gulp
    .src('client/app/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('client/app'));
});



gulp.task('build', ['compile']);
gulp.task('default', ['build']);