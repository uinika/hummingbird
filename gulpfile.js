const Gulp = require("gulp"),
      Nodemon = require('gulp-nodemon'),
      Less = require('gulp-less'),
      Concat = require('gulp-concat'),
      UglifyJS = require('gulp-uglify'),
      MinifyCSS = require('gulp-clean-css'),
      MinHtml = require('gulp-htmlmin'),
      Replace = require('gulp-replace'),
      Delete = require('del');

/** gulp */
Gulp.task('default', () => {
  const source = './artifact/partials/';
  const target = './artifact/bundles';
  const concatStyles = () => {
    Gulp.src(source + '**/*.less')
      .pipe(Concat('styles.css'))
      .pipe(Less())
      .pipe(Gulp.dest(target));
  };
  const concatScripts = () => {
    Gulp.src([source + 'app.js', source + '**/*.js'])
      .pipe(Concat('scripts.js'))
      .pipe(Gulp.dest(target));
  };
  concatStyles();
  concatScripts();
  Nodemon({
    script: './mock/server.js',
    execMap: {js: 'node --harmony'},
    env: {'NODE_ENV': 'development'}
  });
  Gulp.watch([source + '**/*.less'. source + 'app.js', source + '**/*.js'], () => {
    concatStyles();
    concatScripts();
  });
});

/** gulp build */
Gulp.task('build', () => {
  const releaseSource = './artifact/';
  const releaseTarget = './release';
  // HTML
  Gulp.src([releaseSource + 'partials/**/*.html'])
    .pipe(MinHtml({collapseWhitespace: true}))
    .pipe(Gulp.dest(releaseTarget + '/partials'));
  // Library
  Gulp.src([releaseSource + 'libraries/**/*'])
    .pipe(Gulp.dest(releaseTarget + '/libraries'));
  // JavaScript
  Gulp.src([releaseSource + 'partials/**/*.js', releaseSource + 'app.js'])
    .pipe(Concat('app.js'))
    .pipe(UglifyJS())
    .pipe(Gulp.dest(releaseTarget))
  // Image & Fonts
  Gulp.src([releaseSource + 'assets/**/*'])
    .pipe(Gulp.dest('./release/assets'));
  // CSS
  Gulp.src([releaseSource + 'partials/**/*.less'])
    .pipe(Concat('bundle.css'))
    .pipe(Less())
    .pipe(MinifyCSS({compatibility: 'ie8'}))
    .pipe(Gulp.dest(releaseTarget));
  // Update index.html
  Gulp.src([releaseSource + 'index.html'])
    .pipe(Replace(/<!--Start-->[\s\S]* <!--End-->/g, "<script src='app.js'></script>"))
    .pipe(Gulp.dest(releaseTarget));
});

/** gulp clean */
Gulp.task('clean', () => {
  Delete(['./release/**/*']);
});
