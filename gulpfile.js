'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
/* const babel = require('gulp-babel');
const browserify = require('gulp-browserify'); */


const jsrc = ['index.js','push-notification.js'];
const jsdest = './public/js';
const jsFolder = './resourse/js/';




const browserInit = () =>{
  browserSync.init({
    server: {
      baseDir: './public'
    },
    port: 8080,
/*    https: {
      key: "./ssl/server.key",
      cert: "./ssl/server.crt"
  }*/
  });
};

const browserReload = () => {
  browserSync.reload();
};


gulp.task('js6', gulp.series(function(done){
  jsrc.map(function (entry){
    return browserify({
      entries: [ jsFolder + entry]
    })
    .transform( babelify, {presets: ['@babel/env']} )
    .bundle()
    .pipe( source( entry ))
    .pipe(rename({ extname: '.js' }))
    .pipe(buffer())
    .pipe( sourcemaps.init({ loadMaps: true }) )
    //.pipe( uglify())
    .pipe( sourcemaps.write('./'))
    .pipe(gulp.dest(jsdest))
    
  });
  done();
}));


gulp.task('sw', () => {
  return gulp.src('./resourse/js/sw.js')
  .pipe(gulp.dest('./public/'))
});


/* gulp.task('sass', () =>{
    return gulp.src('./resourse/sass/styles.scss')
      .pipe(sass({
        includePaths: ['./node_modules'],
      }))
      .on('error', sass.logError)
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./public/css'))
      .pipe(browserSync.stream())
  }); */

const watchFiles = () =>{
  gulp.watch('./public/**/*.html', gulp.series(browserReload));
  //gulp.watch('./resourse/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./resourse/js/**/*.js', gulp.series('js6','sw',browserReload));
 // gulp.watch('./public/sw.js', gulp.series(browserReload));
}

exports.start = gulp.parallel(watchFiles,browserInit);
