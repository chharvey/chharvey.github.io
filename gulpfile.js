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

gulp.task('pug:blog', function () {
  return gulp.src('blog/{classical-music,headings,layout,lists,math-moodle,page-relationships,semantic-punctuation,sort,workflow-git}.jade')
    .pipe(pug({
      basedir: './',
      locals: {
        Page    : require('sitepage').Page,
        BlogPost: require('still-alive').BlogPost,
        Home    : require('./_models/Home.class.js'),
        entities: require('./blog/_models/entities.json'),
      },
    }))
    .pipe(gulp.dest('./blog/'))
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

gulp.task('pug:all', ['pug:home','pug:blog','pug:resume'])

gulp.task('lessc:landing', function () {
  return gulp.src('./home/styles/landing.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./home/styles/'))
})

gulp.task('lessc:resume', function () {
  return gulp.src('resume/css/src/resume.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./resume/css/'))
})

gulp.task('lessc:all', ['lessc:landing','lessc:resume'])

gulp.task('build:home', ['pug:home','lessc:landing'])
gulp.task('build:blog', ['pug:blog'])
gulp.task('build:resume', ['pug:resume', 'lessc:resume'])

gulp.task('build', ['pug:all', 'lessc:all'])
