const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {                             /* сервер  */
            baseDir: "src"
        }
    });
});


gulp.task('scss', function() {
    return gulp.src('src/sass/**/*.+(scss||sass)')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});


gulp.task('html', function() {
    return gulp.src('src/*.html')                   /*  отслеживаем изменения в html */
        .pipe(browserSync.stream());
});


gulp.task('script', function() {
    return gulp.src('src/js/*.js')                /*  отслеживаем изменения в js */
        .pipe(browserSync.stream());
});


gulp.task('css', function() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',                          /*  загружаем библиотеки css */
        'node_modules/slick-carousel/slick/slick.css', 
        'node_modules/animate.css/animate.css'                     
        // 'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('src/sass'))
        .pipe(browserSync.stream());
}); 


gulp.task('clean', async function() {
    del.sync('dist');                     /* чистим папку dist перед командой сборки build */
});


gulp.task('export', async function() {
    const buildHtml = gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));

    const buildCss = gulp.src('src/css/**/*.css')             /* собираем всё кроме картинок в папку dist */
        .pipe(gulp.dest('dist/css'));                                       

    const buildJs = gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    const buildFonts = gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});


gulp.task('build', gulp.series('clean', 'export'));              /* запускаем clean а потом build вместе */



gulp.task('js', function() {
    return gulp.src([  
        'node_modules/jquery/dist/jquery.js',                                          /* добавляем библиотеки js */
        'node_modules/slick-carousel/slick/slick.js'  
                           
        // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});                                                               

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.+(scss||sass)', gulp.parallel('scss'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch('src/js/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('html', 'css', 'scss', 'js', 'script', 'browser-sync', 'watch'));