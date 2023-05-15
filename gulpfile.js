import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import clean from 'gulp-clean';
import imagemin from 'gulp-imagemin';
import bs from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import jsminify from 'gulp-minify';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';


const sass = gulpSass(dartSass);
const browserSync = bs.create();

const cleanDist = () => {
    return gulp.src('.src/*.html')
    .pipe(clean())
    .pipe(gulp.dest('./dist'))
};

const html = () => {
    return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
};

const scss = () => {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'))
}

const js = () => {
    return gulp.src('./src/js/*.js')
    .pipe(rename('scripts.min.js'))
    .pipe(jsminify())
    .pipe(gulp.dest('./dist/js'))
};

const imgMin = () => {
    return gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}

const dev = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch("./src/**/*", gulp.series(cleanDist, gulp.parallel(html, scss, js), (next) => {
        browserSync.reload();
        next();
    }))
};

gulp.task('build', gulp.series(cleanDist, gulp.parallel(html, js, scss, imgMin)));
gulp.task('dev', gulp.series('build', dev));