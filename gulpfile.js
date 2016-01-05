/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

'use strict';

// Load plugins

/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

'use strict';

var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var del = require('del');

gulp.task('scripts', function () {
    return browserify({entries: './src/scripts/app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('static/js'));
});

// Styles
gulp.task('styles', function() {
  return sass('src/styles/main.sass', { style: 'expanded' })
    .pipe(gulp.dest('static/css'))
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(gulp.dest('static/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Clean
gulp.task('clean', function() {
    //   return del(['dist/styles', 'dist/scripts', 'dist/images']);
  return del(['static/css/main.*', 'static/js']);
});

// Default task
gulp.task('default', ['clean'], function() {
    //   gulp.start('styles', 'scripts', 'images');
  gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
//   gulp.watch('src/images/**/*', ['images']);

});