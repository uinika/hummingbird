const Gulp = require("gulp"),
      Nodemon = require('gulp-nodemon'),
      Less = require('gulp-less'),
      Concat = require('gulp-concat'),
      UglifyJS = require('gulp-uglify'),
      MinifyCSS = require('gulp-clean-css'),
      Rename = require('gulp-rename'),
      Sourcemap = require('gulp-sourcemaps'),
      Replace = require('gulp-replace'),
      HtmlMin = require('gulp-htmlmin'),
      Delete = require('del');
/** gulp */
Gulp.task('default', () => {
  const lessSource = './artifact/partials/**/*.less';
  const lessTarget = './artifact';
  const less = () => {
    Gulp.src(lessSource)
      .pipe(Concat('bundle.css'))
      .pipe(Less())
      .pipe(Gulp.dest(lessTarget));
  };
  less();
  Nodemon({
    script: './mock/server.js',
    execMap: {js: 'node --harmony'},
    env: {'NODE_ENV': 'development'}
  });
  Gulp.watch([lessSource], () => {
    less();
  });
});

/** gulp build */
Gulp.task('build', () => {
  // HTML
  Gulp.src(['./artifact/partials/**/*.html'])
    .pipe(HtmlMin({collapseWhitespace: true}))
    .pipe(Gulp.dest('./release/partials'));
  // Update index.html
  Gulp.src(['./artifact/index.html'])
    .pipe(Replace(/<!-- CSS Bundle -->/g, "<link href='styles/app.min.css' rel='stylesheet'/>"))
    .pipe(Replace(/<!-- JavaScript Bundle -->/g, "<script src='scripts/app.min.js'></script>"))
    .pipe(Gulp.dest('./release'));
  // Library
  Gulp.src(['./artifact/libraries/**/*'])
    .pipe(Gulp.dest('./release/libraries'));
  // JavaScript
  Gulp.src(['./artifact/partials/**/*.js', './artifact/app.js'])
    .pipe(Sourcemap.init())
    .pipe(Concat('app.js'))
    .pipe(Gulp.dest('./release'))
    .pipe(UglifyJS())
    .pipe(Rename({suffix: '.min'}))
    .pipe(Sourcemap.write('./'))
    .pipe(Gulp.dest('./release'));
  // Image & Fonts
  Gulp.src(['./artifact/assets/**/*'])
    .pipe(Gulp.dest('./release/assets'));
  // CSS
  Gulp.src('./artifact/partials/**/*.less')
    .pipe(Concat('bundle.css'))
    .pipe(Less())
    .pipe(Gulp.dest('./release'));
});
/** gulp clean */
Gulp.task('clean', () => {
  Delete(['./release/**/*']);
});
