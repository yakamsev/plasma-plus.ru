var gulp = require('gulp'),
	requireDir = require('require-dir'); // Для хранения тасков в директории
	connect = require('gulp-connect'), // Сервер прямо из папки с проектом
	livereload = require('gulp-refresh'), // Обновление страницы в реальном времени
	prefix = require('gulp-autoprefixer'), // Префиксы css автоматом
	concat = require('gulp-concat'), // Объединение файлов
	less = require('gulp-less'), // Обработка less файлов
	del = require('del'); // Библиотека для удаления файлов

requireDir('gulp-tasks');

// sever start
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// less - to css
gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/css'));
});


// css - concat, prefixes, moving, reloading
gulp.task('css', function() {
	gulp.src('app/css/*.css')
	.pipe(concat('main.css'))
	.pipe(prefix({
		browsers: ['last 2 versions', '>5%'],
	}))
	.pipe(gulp.dest('app/styles'))
	.pipe(connect.reload());
});

// html - just reload on changes
gulp.task('html', function() {
	gulp.src('app/*.html')
	.pipe(connect.reload());
});

// watch everything
gulp.task('watch', function() {
	gulp.watch('app/less/*.less', ['less']);
	gulp.watch('app/css/*.css', ['css']);
	gulp.watch('app/index.html', ['html']);
});

// Чистим директорию dist (clean)
gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

// build project
gulp.task('build', ['clean'], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/styles/*',
        ])
    .pipe(gulp.dest('dist/styles'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'))

	var buildJs = gulp.src('app/js/**/*') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildImages = gulp.src('app/images/**/*') // Берем все изображения из app
    .pipe(gulp.dest('dist/images')); // Выгружаем на продакшен

});

// default
gulp.task('default', ['connect', 'less', 'css', 'html', 'watch']);