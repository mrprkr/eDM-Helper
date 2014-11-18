var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var bower = require('gulp-bower');
var browserSync = require('browser-sync');
var streamqueue = require('streamqueue');


gulp.task('home', function () {
    gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./app/'));
});

gulp.task('imagemove', ['home'], function () {
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./app/assets/images/'));
});


gulp.task('templates', ['imagemove'], function () {
    return streamqueue({ objectMode: true },
        gulp.src('./src/html/*.html')
        )
        .pipe(templateCache('./temp/templateCache.js', { module: 'templatescache', standalone: true }))
        .pipe(gulp.dest('./src/js/'));
});

gulp.task('scripts', ['templates'], function () {
    return streamqueue({ objectMode: true },

        gulp.src('./src/js/app.js'),
        gulp.src('./src/js/temp/templateCache.js')
    )
        .pipe(gulp.dest('./app/assets/js/'));
});


gulp.task('build', ['scripts'], function () {
    gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest('./app/assets/js/lib/'))
});

gulp.task('watch', function () {
    gulp.watch(
        ['./src/html/*.html', './src/js/*.js', './src/css/*.css','./bower_components'],
        ['build']
    )
});

gulp.task('sync', function () {
    var files = [
        'app/*.html',
        'app/assets/js/*.js',
        'app/assets/css/*.css'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('default', ['build', 'bower', 'watch', 'sync']);


// gulp.task('images', ['scripts'], function () {
//     return gulp.src('./src/images/*/**')
//         .pipe(imagemin({
//             progressive: false,
//             svgoPlugins: [
//                 {removeViewBox: false}
//             ],
//             use: [pngcrush()]
//         }))
//         .pipe(gulp.dest('./app/assets/images/'));
// });