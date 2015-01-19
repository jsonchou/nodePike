var gulp = require('gulp'),
minifyCSS = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
rimraf = require('gulp-rimraf');

//Styles
gulp.task('styles', function () {
    return gulp.src(['public/stylesheets/_src/**/*.css'])
    .pipe(minifyCSS({ keepBreaks: false }))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'Styles task complete' }));
});

//uglify
gulp.task('scripts', function () {
    return gulp.src(['public/libs/_util.js', 'public/javascripts/_src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(notify({ message: 'uglify task complete' }));
});

//concat & uglify to middle-core.js
gulp.task('combine', function () {
    return gulp.src(['public/libs/jquery-2.1.3.min.js', 'public/libs/jquery.cookie.min.js', 'public/libs/_util.js', 'public/javascripts/_src/common.js'])
    .pipe(uglify({
        preserveComments: 'some'
    }))//压缩
    .pipe(concat('core.js'))//合并
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(notify({ message: 'core-scripts task complete' }));
});

//clean
gulp.task('clean', function (cb) {
    return gulp.src(['public/javascripts/_util.js', 'public/javascripts/common.js'])
    .pipe(rimraf())
    .pipe(notify({ message: 'clean task complete' }));
});

//异步
gulp.task('build', ['styles', 'scripts', 'combine'], function () {
    gulp.start('clean');
});


