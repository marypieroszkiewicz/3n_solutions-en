const gulp = require('gulp');
const sass = require('gulp-sass');
const gplumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

var errorHandler = function () {
    return gplumber(function (error) {
        console.log(error.message);
    })
};

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(errorHandler())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
});

gulp.task('watch', function () {
    return gulp.watch('scss/**/*.scss', gulp.series('sass'))
});

gulp.task('default', gulp.parallel('sass', 'watch'));