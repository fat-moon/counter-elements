var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass');


gulp.task('styles', function(){
  gulp.src(['scss/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(postcss([ autoprefixer('last 2 versions') ]))
    .pipe(gulp.dest('css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css/'))
});


gulp.task('default', function(){
  return gulp.watch("scss/**/*.scss", gulp.series('styles'));
});