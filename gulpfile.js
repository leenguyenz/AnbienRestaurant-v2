// global require
"use strict";

//variable task
var gulp = require('gulp'),
	path = require('path'),
	pug = require('gulp-pug'),
	data = require('gulp-data'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	clean = require('gulp-clean');


//Directories paths
var paths = {
	public: './public/',
	data: './app/_data/',
	sass: './app/scss/',
	css: './public/css/',
	originLib: './app/lib/**/*.*',
	lib: './public/lib',
	originJS: './app/js/**/*.*',
	js: './public/js',
	originImages: './app/images/**/*.*',
	images: './public/images',
	originFonts: './app/fonts/**/*.*',
	fonts: './public/fonts'
}

/**
 * Compile .pug files and pass in data from json file
 * matching file name. index.pug - index.pug.json
 */
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

/**
 * Recompile .pug files and live reload the browser
 */
 gulp.task('rebuild', ['pug'], function() {
 	browserSync.reload();
})

/**
 * Wait for pug and sass tasks, then launch the browser-sync Server
 */
 gulp.task('browser-sync', ['lib', 'sass', 'pug', 'images', 'js', 'fonts'], function (){
 	browserSync({
 		server: {
 			baseDir: paths.public
 		},
 		notify: false
 	});
 });
/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
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
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// task to images clean
gulp.task('images-clean', function(){
	return gulp.src([paths.images], {read:false})
	.pipe(clean());
});

gulp.task('images', ['images-clean'], function () {
	return gulp.src(paths.originImages)
	.pipe(gulp.dest(paths.images))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// task to JS clean
gulp.task('js-clean', function(){
	return gulp.src([paths.js], {read:false})
	.pipe(clean());
});

gulp.task('js', ['js-clean'], function () {
	return gulp.src(paths.originJS)
	.pipe(gulp.dest(paths.js))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// task to Lib clean
gulp.task('lib-clean', function(){
	return gulp.src([paths.lib], {read:false})
	.pipe(clean());
});

gulp.task('lib', ['lib-clean'], function () {
	return gulp.src(paths.originLib)
	.pipe(gulp.dest(paths.lib))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// task to Fonts clean
gulp.task('fonts-clean', function(){
	return gulp.src([paths.fonts], {read:false})
	.pipe(clean());
});

gulp.task('fonts', ['fonts-clean'], function () {
	return gulp.src(paths.originFonts)
	.pipe(gulp.dest(paths.fonts))
	.pipe(browserSync.reload({
		stream: true
	}));
});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
 gulp.task('watch', function () {
 	gulp.watch(paths.sass + '**/*.scss', ['sass']);
 	gulp.watch('./app/**/*.pug', ['rebuild']);
 });

 // Build task compile sass and pug.
 gulp.task('build', ['clean', 'sass', 'pug', 'images', 'js']);

 /**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
 gulp.task('default', ['browser-sync', 'watch']);