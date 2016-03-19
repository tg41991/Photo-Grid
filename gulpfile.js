var gulp = require('gulp');
var uglify= require('gulp-uglify');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var jscs= require('gulp-jscs');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require ('gulp-autoprefixer');

gulp.task('sass', function() {
  gulp.src('scss/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({
       browsers: ['last 2 versions']
    }))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('uglify', function() {
  gulp.src('./main.js')
        .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['./main.js'], ['uglify']);
  gulp.watch(['./scss/*.scss'], ['sass']);
  gulp.watch(['./build/main.js', './build/css/style.min.css','index.html']).on('change', browserSync.reload);
});

gulp.task('default', ['uglify', 'sass', 'watch']);
