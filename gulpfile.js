// global require
var gulp = require('gulp'),
	path = require('path'),
	pug = require('gulp-pug'),
	data = require('gulp-data');

gulp.task('pug', function () {
	return gulp.src('./app/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('./dist'));
})