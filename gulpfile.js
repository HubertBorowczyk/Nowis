var gulp          = require('gulp');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('autoprefixer');
var postcss       = require('gulp-postcss');
var browserSync   = require('browser-sync').create();
var spritesmith   = require('gulp.spritesmith');
var bourbon       = require("node-bourbon").includePaths;

gulp.task('scss', function () {
	return gulp.src('scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			errorLogToConsole: true,
			includePaths: bourbon
		}))
		.pipe(postcss([autoprefixer({
			browsers: ['last 2 versions', 'safari 8']
		})]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});
// Static server
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('watch', function () {
	gulp.watch('scss/**/*.scss', ['scss']);
	browserSync.reload();
});

gulp.task('default', ['watch', 'scss', 'browser-sync'], function (){

});

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('images/sprites'));
});
