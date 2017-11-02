const gulp         = require('gulp')
const pug          = require('gulp-pug')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('pug:home', function () {
  gulp.src('./index.jade')
    .pipe(pug({
      basedir: './',
      locals: {
        Home: require('./_models/Home.class.js'),
      },
    }))
    .pipe(gulp.dest('./'))
  return gulp.src('./home/{about,copyright,cover-letter,math,edu,music,swim,web}.jade')
    .pipe(pug({
      basedir: './',
      locals: {
        Home: require('./_models/Home.class.js'),
      },
    }))
    .pipe(gulp.dest('./home/'))
})

gulp.task('pug:resume', function () {
  return gulp.src('resume/resume.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Element: require('extrajs-dom').Element,
        resume: new (require('./resume/class/Resume.class.js'))(require('./resume/resume.json')),
      },
    }))
    .pipe(gulp.dest('./resume/'))
})

gulp.task('pug:all', ['pug:home','pug:resume'])

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

gulp.task('build:home', ['pug:home'])
gulp.task('build:resume', ['pug:resume', 'lessc:resume'])

gulp.task('build', ['pug:all', 'lessc:all'])
