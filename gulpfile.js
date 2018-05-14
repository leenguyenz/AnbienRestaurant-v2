// global require
"use strict";

//variable task
var gulp = require('gulp'),
	path = require('path'),
	pug = require('gulp-pug'),
	data = require('gulp-data');

//Directories path
var path = {
	dist: './dist/',
	data: './app/_data'
}

gulp.task('pug', function () {
	return gulp.src('./app/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('./dist'));
})
