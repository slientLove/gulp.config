const gulp = require('gulp');
const gulpLess = require('gulp-less');
const babel = require('gulp-babel');
const gulpRename = require('gulp-rename');
const pump = require('pump');
const connect = require('gulp-connect');
const gulpOpen = require('gulp-open');

//less 转 css任务
gulp.task('less', function(){
	gulp.src('../styles/less/**/*.less')
    .pipe(gulpLess())
    .pipe(gulp.dest('../styles/css/'))
    .pipe(connect.reload())
});

//es6 转 es5
gulp.task('es526', function(){
  pump([
    gulp.src('../scripts/es6/**/*.js'),
    babel(),
    gulpRename({suffix: '.es5'}),
    gulp.dest('../scripts/es5/'),
    connect.reload()
  ])
});

// html 变化监控
gulp.task('html', function () {
  gulp.src('../../pages/*.html')
    .pipe(connect.reload())
});

// 开启本地服务
gulp.task('serve',function () {
  connect.server({
    root: '../../pages/',
    livereload: true,
    port: 5127
  });
  gulpOpen('http://localhost:5127');
});

// watch
gulp.task('watchRes',function(){
  gulp.watch('../scripts/es6/*.js',['es526']);
  gulp.watch('../styles/less/*.less',['less']);
  gulp.watch('../../pages/*.html', ['html']);
})
gulp.task('start', ['serve','less', 'es526', 'watchRes']);
