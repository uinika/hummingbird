const Gulp = require("gulp"),
      Nodemon = require('gulp-nodemon'),
      Less = require('gulp-less'),
      Concat = require('gulp-concat'),
      UglifyJS = require('gulp-uglify'),
      MinifyCSS = require('gulp-clean-css'),
      Rename = require('gulp-rename'),
      Sourcemap = require('gulp-sourcemaps'),
      Replace = require('gulp-replace'),
      Delete = require('del');
// gulp
Gulp.task('default', function() {
  less();
  Nodemon({
    script: './server/app.js',
    execMap: {js: 'node --harmony'},
    env: {'NODE_ENV': 'development'}
  });
  Gulp.watch(['./client/styles/less/**/*.*'], function(){
    less();
  });
  function less(){
    Gulp.src('./client/styles/less/app.less')
      .pipe(Less())
      .pipe(Gulp.dest('./client/styles/'));
  };
});
// gulp build
Gulp.task('build', function(){
  /* HTML */
  Gulp.src(['./client/**/*.html'])
    .pipe(Gulp.dest('./build'));
  Gulp.src(['./client/views/*'])
    .pipe(Gulp.dest('./build/views'));
  /* Library */
  Gulp.src(['./client/libraries/**/*'])
    .pipe(Gulp.dest('./build/libraries'));
  /* JavaScript */
  Gulp.src('./client/scripts/**/*.js')
    .pipe(Sourcemap.init())
    .pipe(Concat('app.js'))
    .pipe(Gulp.dest('./build/scripts'))
    .pipe(UglifyJS())
    .pipe(Rename({suffix: '.min'}))
    .pipe(Sourcemap.write('./'))
    .pipe(Gulp.dest('./build/scripts'));
  /* Image */
  Gulp.src(['./client/styles/images/**/*'])
    .pipe(Gulp.dest('./build/styles/images'));
  /* CSS */
  Gulp.src('./client/styles/less/app.less')
    .pipe(Less())
    .pipe(Gulp.dest('./build/styles'))
    .pipe(MinifyCSS({compatibility: 'ie8'}))
    .pipe(Rename({suffix: '.min'}))
    .pipe(Gulp.dest('./build/styles'));
});
// gulp clean
Gulp.task('clean', function() {
  Delete(['./build/**/*']);
});
