var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-ruby-sass'),
	jade = require('gulp-jade'),
	preprocess = require('gulp-preprocess'),
	autoprefixer = require('gulp-autoprefixer'),
	gulpif = require('gulp-if'),
	minimist = require('minimist'),
	config = require('./config');

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};
var options = minimist(process.argv.slice(2), knownOptions);


gulp.task('connect', function() {
	connect.server({
		root: 'production',
		livereload: true
	});
});

//-----------------------//
//		   SASS
//-----------------------//

function prodSassConfig(){return config.sass.sassConfigProd}
function devSassConfig() {return config.sass.sassConfigDev}

gulp.task('sass', function(){	
	sass(config.sass.src,
		gulpif(
			//if
			options.env === 'production',
				prodSassConfig(),
			//else
				devSassConfig()
			)
		)
		.pipe(gulp.dest(config.sass.dest))
		.pipe(connect.reload())
});


//-----------------------//
//		   JADE
//-----------------------//

gulp.task('jade', function() {
	gulp.src(['development/templates/**/*.jade','!development/templates/**/_*.jade'])
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('production'))
		.pipe(connect.reload())
});

//-----------------------//
//		   WATCH
//-----------------------//

gulp.task('watch', function() {
    gulp.watch(['development/templates/**/*.jade','development/styles/**/*.sass','development/styles/**/*.scss'], ['jade','sass']);
});

//-----------------------//
//		AUTOPREFIXER
//-----------------------//
 
gulp.task('autoprefixer', function () {
    return gulp.src('production/css/screen.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('production/css/'));
});


//-----------------------------//
gulp.task('default', ['sass'])
