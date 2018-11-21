var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var plugins = require('gulp-load-plugins')();
var print = require('gulp-print').default;

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
  ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
    './node_modules/@fortawesome/**/*',
  ])
    .pipe(gulp.dest('./vendor'))

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
    './node_modules/jquery.easing/*.js'
  ])
    .pipe(gulp.dest('./vendor/jquery-easing'))

  // js-cookie
  gulp.src([
    './node_modules/js-cookie/src/js.cookie.js'
  ])
    .pipe(gulp.dest('./vendor/js-cookie'))

});

// Set the banner content for JavaScript and CSS
var banner = ['/*!\n',
  ' * Lazar Davidovic - Resume - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2018-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' */\n',
  '\n'
].join('');

// Compile SCSS
gulp.task('css:compile', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
  return gulp.src([
    './css/*.css',
    '!./css/*.min.css'
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// AIO CSS task
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function () {
  return gulp.src([
    './js/*.js',
    '!./js/*.min.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// AIO JavaScript task
gulp.task('js', ['js:minify']);

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Social icons adblock guard
gulp.task('glyph', function () {
  return gulp.src('fontello-config.json')
    .pipe(plugins.fontello())
    .pipe(print())
    .pipe(gulp.dest('glyphs'))
});

// Default task
gulp.task('default', ['css', 'js', 'vendor', 'glyph', 'dist']);

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync'], function () {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});

// Create website with required files - distribution
gulp.task('dist', function () {

  // Main index
  gulp.src([
    './index.html',
  ])
    .pipe(gulp.dest('./docs'))

  // Sections
  gulp.src([
    './sections/**/*',
  ])
    .pipe(gulp.dest('./docs/sections'))

  // Images
  gulp.src([
    './img/**/*',
  ])
    .pipe(gulp.dest('./docs/img'))

  // Main favicon
  gulp.src([
    './favicons.ico',
  ])
    .pipe(gulp.dest('./docs'))

  // Favicons
  gulp.src([
    './favicons/**/*',
  ])
    .pipe(gulp.dest('./docs/favicons'))

  // CSS
  gulp.src([
    './css/**/*',
  ])
    .pipe(gulp.dest('./docs/css'))

  // JavaScript
  gulp.src([
    './js/**/*',
  ])
    .pipe(gulp.dest('./docs/js'))

  // Vendor plugins
  gulp.src([
    './vendor/**/*',
  ])
    .pipe(gulp.dest('./docs/vendor'))

  // Glyphs
  gulp.src([
    './glyphs/**/*',
  ])
    .pipe(gulp.dest('./docs/glyphs'))

});
