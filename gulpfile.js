var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var coffee = require('gulp-coffee');
var watch = require('gulp-watch');
var haml = require('gulp-ruby-haml');
var plumber = require('gulp-plumber');
var dest = require("gulp-dest");
var cache = require('gulp-cached');

var paths = {
  sass: ['./scss/**/*.scss'],
  coffee: [ './coffee/**/*.coffee'],
  haml: ['./haml/templates/*.haml'],
  haml_index: ['./haml/index.haml']
};

gulp.task('default', ['watch', 'haml','coffee', 'haml_index']);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(plumber(function (error) {
      gutil.log(error.message);
      this.emit('end');
    }))
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee)
    .pipe(cache('coffee'))
    .pipe(plumber())
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(dest("./www/js"))
    .pipe(gulp.dest('.'))
    .on('end', done);
})

gulp.task('haml', function(done) {
  gulp.src(paths.haml)
    .pipe(cache('haml'))
    .pipe(plumber())
    .pipe(haml())
    .pipe(dest("./www/templates/"))
    .pipe(gulp.dest('.'))
    .on('end', done);
});

gulp.task('haml_index', function(done) {
  gulp.src(paths.haml_index)
    .pipe(cache('haml_index'))
    .pipe(plumber())
    .pipe(haml())
    .pipe(dest("./www/"))
    .pipe(gulp.dest('.'))
    .on('end', done);
})

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.haml, ['haml']);
  gulp.watch(paths.haml_index, ['haml_index']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
