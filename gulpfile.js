let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer')
    ;

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
  ])
  .pipe(concat('_libs.scss'))
  .pipe(gulp.dest('app/scss'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('css', 
'scss', 'browser-sync', 'watch'));
