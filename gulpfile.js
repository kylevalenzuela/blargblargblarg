// Include gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
sass = require('gulp-sass'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
iconfont = require('gulp-iconfont'),
minifycss = require('gulp-minify-css'),
notify = require('gulp-notify'),
cache = require('gulp-cache');




// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('minify-css', function() {
  gulp.src('css/*.css')
    .pipe(minifycss({keepBreaks:false}))
    .pipe(gulp.dest('./'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// SVG to iconfont
gulp.task('iconfont', function(){
  gulp.src(['icons/*.svg'])
    .pipe(iconfont({
      fontName: 'icons', // required
      appendCodepoints: true // recommended option
     }))
      .on('codepoints', function(codepoints, options) {
        // CSS templating, e.g.
        console.log(codepoints, options);
      })
    .pipe(gulp.dest('fonts/'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('svg/*.svg', ['Iconfont']);
    gulp.watch('css/*.css', ['minify-css']);

});

// Compresses image
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('imges'))
    .pipe(notify({ message: 'Images task complete' }));
});





// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'iconfont', 'minify-css', 'watch']);


