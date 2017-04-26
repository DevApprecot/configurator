const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');

gulp.task('styles', () => {
    gulp.src('src/assets/styles/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/styles/css'))
})

//Watch task
gulp.task('default', () => {
    gulp.watch('src/assets/styles/sass/**/*.scss', ['styles']);
})