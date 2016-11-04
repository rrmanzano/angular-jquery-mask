var gulp = require('gulp');
var clean = require('gulp-clean');
var minify = require('gulp-minify');

gulp.task('clean', function() {
	return gulp.src(['dist/*.map', 'dist/*.min.js', 'demo/js/jquery.mask.angular*.js'], {read: false})
			   .pipe(clean());
});

gulp.task('minify', ['clean'], function() {
	return gulp.src('dist/*.js')
			    .pipe(minify({
			        ext:{
			            min:'.min.js'
			        }
			    }))
		    	.pipe(gulp.dest('dist'));
});

gulp.task('copy-to-demo', ['minify'], function() {
	return gulp.src('dist/*.js')
			   .pipe(gulp.dest('demo/js'));
});

gulp.task('default', ['copy-to-demo']);

// # Install gulp globally
//		$ npm install --global gulp-cli
//
// # Install gulp in your project devDependencies
//		$ npm install --save-dev gulp
//
// # Run gulp
//		$ gulp