var gulp = require('gulp')
var pug = require('gulp-pug')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('pug:resume', function () {
  return gulp.src('resume/resume.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        City: require('./resume/_models/City.class.js'),
        Skill: require('./resume/_models/Skill.class.js'),
        Position: require('./resume/_models/Position.class.js'),
        Award: require('./resume/_models/Award.class.js'),
        Degree: require('./resume/_models/Degree.class.js'),
        ProDev: require('./resume/_models/ProDev.class.js'),
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
