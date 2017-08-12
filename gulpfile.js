/**
 * gulp modules
 */
const gulp = require('gulp');
const buble = require('gulp-buble');
const rollup = require('gulp-rollup');
const stylus = require('gulp-stylus');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

/**
 * browser Sync
 */
const browserSync = require('browser-sync');
const reload = browserSync.reload;


/**
 * Scripts task
 */
gulp.task('scripts', () => {
    gulp.src('./src/js/**/*.js')
        .pipe(plumber())
        .pipe(rollup({
            rollup: require('rollup'),
            entry: './src/js/script.js',
            format: 'umd',
            moduleName: 'Builder'
        }))
        .pipe(buble())
        .pipe(rename({
            basename: "builder",
            suffix: "",
            extname: ".js"
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({ stream: true }));
});

/**
 * Styles task
 */
gulp.task('styles', () => {
    gulp.src('./src/stylus/app.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(rename({
            basename: "builder",
            suffix: "",
            extname: ".css"
        }))
        .pipe(autoprefixer('last 5 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({ stream: true }));
});


/**
 * Browser-sync task
 */
gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: "builder.dev/index.html"
    });
});

/**
 * Watch task
 */
gulp.task('watch', () => {
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/stylus/**/*.styl', ['styles']);
    gulp.watch('./**/*.html', () => {
        gulp.src('./**/*.html').pipe(reload({ stream: true }));
    });
});

/**
 * Default task
 */
gulp.task('default', ['styles', 'scripts', 'browser-sync', 'watch']);
