var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    gulp.src(['app/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});

gulp.task('css', function() {
    gulp.src(['app/**/*.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('html', function() {
    gulp.src(['app/**/*.html'])
        .pipe(gulp.dest('dist'))
});

gulp.task('manifest', function() {
    gulp.src(['app/manifest.json'])
        .pipe(gulp.dest('dist'))
});

gulp.task('icons', function() {
    gulp.src(['app/icons/**'])
        .pipe(gulp.dest('dist/icons'))
});


gulp.task('default', function() {

    gulp.run('scripts', 'css', 'html', 'manifest', 'icons');

    gulp.watch('app/**/*.js', function(event) {
        gulp.run('scripts');
    });

    gulp.watch('app/**/*.css', function(event) {
        gulp.run('css');
    });

    gulp.watch('app/**/*.html', function(event) {
        gulp.run('html');
    });

    gulp.watch('app/**/manifest.json', function(event) {
        gulp.run('manifest');
    });

    gulp.watch('app/icons/**', function(event) {
        gulp.run('icons');
    })
});