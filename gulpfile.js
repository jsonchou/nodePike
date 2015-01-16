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
del = require('del');

gulp.task('styles', function () {
    return gulp.src('public/stylesheets/_src/*.css')
    .pipe(minifyCSS({ keepBreaks: false }))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'Styles task complete' }));
});

//concat to base
gulp.task('util', function () {
    return gulp.src(['public/libs/jquery-2.1.3.min.js', 'public/libs/jquery.cookie.min.js'])
    .pipe(concat('base.js'))
    .pipe(gulp.dest('public/libs/'))
    .pipe(notify({ message: 'Util concat task complete' }));
});

//jshint
gulp.task('jshint', function () {
    return gulp.src(['public/javascripts/libs/_util.js', 'public/javascripts/_src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'Jshint task complete' }));
});

//concat & uglify to middle-core.js
gulp.task('coreMiddle', function () {
    return gulp.src(['public/javascripts/libs/_util.js', 'public/javascripts/_src/common.js'])
    .pipe(uglify())//压缩
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(concat('core.js'))//合并
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(notify({ message: 'corejs concat task complete' }));
});

//combine to core.js
gulp.task('coreDist', function () {
    return gulp.src(['public/libs/base.js', 'public/javascripts/core.js'])
    .pipe(concat('core.js'))//合并
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(notify({ message: 'Scripts uglify task complete' }));
});

//uglify
gulp.task('scripts', function () {
    return gulp.src('public/javascripts/_src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(notify({ message: 'Scripts uglify task complete' }));
});

gulp.task('build', function () {
    gulp.start('styles', 'util', 'jshint', 'coreMiddle', 'coreDist', 'scripts');
});


