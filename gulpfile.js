var gulp = require('gulp'),
	connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
	connect.server({
		root: 'production',
		livereload: true
	});
});
gulp.task('sass', function(){
	return sass('development/styles/',{require: ['susy','breakpoint','modular-scale','compass'],style: 'compressed'})
		.pipe(gulp.dest('production/css'))
		.pipe(connect.reload())
});

gulp.task('jade', function() {
	gulp.src(['development/templates/**/*.jade','!development/templates/**/_*.jade'])
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('production'))
		.pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(['development/templates/**/*.jade','development/styles/**/*.sass','development/styles/**/*.scss'], ['jade','sass']);
});

 
gulp.task('autoprefixer', function () {
    return gulp.src('production/css/screen.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('production/css/'));
});

gulp.task('default', ['jade'])
