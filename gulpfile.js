// global require
"use strict";

//variable task
var gulp = require('gulp'),
	path = require('path'),
	pug = require('gulp-pug'),
	data = require('gulp-data');

//Directories paths
var paths = {
	public: './public/',
	data: './app/_data/'
}

// Pug task
gulp.task('pug', function () {
	return gulp.src('./app/*.pug')
		.pipe(data(function (file){
			return require(paths.data + path.basename(file.path) + '.json');
		}))
		.pipe(pug())
		.on('error', function (err) {
			process.stderr.write(err.message + '\n');
			this.emit('end');
		})
		.pipe(gulp.dest(paths.public));
})
