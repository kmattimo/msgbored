var gulp = require('gulp'),
    browserSync    = require('browser-sync'),
    plumber = require('gulp-plumber'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
    notifier = require('node-notifier'),
    nodemon = require('gulp-nodemon'),
    autoprefixer = require('gulp-autoprefixer');
    
/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
    'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
    'sass': './public/scss/**/*.scss',
    'css': './public/css/',
    'assets': ['./public/scripts/**/*.js','./public/views/**/*.html', './templates/**/*.hbs'],
	'js':['./public/scripts/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
};

var hostname = 'localhost';
var browserSyncDelay = 3000;

var onError = function (err, cb) {
    util.log(util.colors.red(err));

    notifier.notify({
      'title': 'Failed',
      'message': String(err)
    });
    if (typeof this.emit === 'function') this.emit('end');
};

gulp.task('sass', function() {
    gulp.src(paths.sass)
            .pipe(plumber({errorHandler: onError}))
            .pipe(sass())
            .pipe(autoprefixer('last 2 versions', 'ie 8'))
            .pipe(gulp.dest(paths.css))
            .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function() {

    gulp.start('sass');
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.assets).on('change', browserSync.reload);
  
    gulp.start('browserSync');

});


gulp.task('browserSync', function() {
  browserSync.init({
       proxy: hostname
   });
});

gulp.task('default', ['start:server', 'watch']);


gulp.task('start:server', function(){
	nodemon({
		script: 'keystone.js',
		ext: 'js',
		ignore: ['node_modules/', 'public/', 'gulpfile.js']
	}).on('restart', function(){
		// Using setTimeout to reload browsersync after keystone server has connected to database 
		setTimeout(function(){
			browserSync.reload();
		}, browserSyncDelay);
	});
});