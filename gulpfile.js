var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  util = require('gulp-util'),
  importer = require('node-sass-globbing'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleancss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  log = util.log;

var sass_config = {
  style: 'expanded',
  importer: importer,
  includePaths: [
    'node_modules/breakpoint-sass/stylesheets/',
    'node_modules/compass-mixins/lib/'
  ]
};

gulp.task('default', function() {
  // do nothing
});

gulp.task('sass', function() {
  log('Generate CSS files ' + (new Date()).toString());
  gulp.src('wp-content/themes/pk-blog/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass(sass_config))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9']}))
    .pipe(gulp.dest('wp-content/themes/pk-blog/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleancss())
    .pipe(gulp.dest('wp-content/themes/pk-blog/css'));
});

gulp.task('watch:sass', function() {
  log('Watching scss files for modifications');
  gulp.watch('wp-content/themes/pk-blog/sass/**/*.scss', ['sass']);
});
