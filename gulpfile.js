// global require
"use strict";

//variable task
var gulp = require('gulp'),
	path = require('path'),
	pug = require('gulp-pug'),
	data = require('gulp-data'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer');


//Directories paths
var paths = {
	public: './public/',
	data: './app/_data/',
	sass: './app/scss/',
	css: './public/css/'
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

//sass task
gulp.task('sass', function(){
	return gulp.src(paths.sass + 'style.scss')
		.pipe(sass({
			includePaths: [paths.sass],
			outputStyle: 'compressed'
		}))
		.on('error', sass.logError)
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		}))
		.pipe(gulp.dest(paths.css));
})
