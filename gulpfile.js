const gulp         = require('gulp')
const pug          = require('gulp-pug')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('pug:resume', function () {
  return gulp.src('resume/resume.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Element: require('extrajs-dom').Element,
        Resume: require('./resume/_models/Resume.class.js'),
      },
    }))
    .pipe(gulp.dest('./resume/'))
})

gulp.task('pug:all', ['pug:resume'])

gulp.task('lessc:resume', function () {
  return gulp.src('resume/css/src/resume.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./resume/css/'))
})

gulp.task('lessc:all', ['lessc:resume'])

gulp.task('build:resume', ['pug:resume', 'lessc:resume'])

gulp.task('build', ['pug:all', 'lessc:all'])
