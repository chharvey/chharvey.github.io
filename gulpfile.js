const fs = require('fs')
const path = require('path')
const util = require('util')

const gulp         = require('gulp')
const pug          = require('gulp-pug')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')

const { requireJSON } = require('@chharvey/requirejson')
const xjs = require('extrajs-dom')
const resume = require('@chharvey/resume')
const xAward = require('@chharvey/resume/dist/tpl/x-award.tpl.js').default


gulp.task('pug:landing', function () {
  return gulp.src('./index.jade')
    .pipe(pug({
      basedir: './',
      locals: {
        Home: require('./_models/Home.class.js'),
      },
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('pug:home', function () {
  return gulp.src('./home/{about,copyright,cover-letter,math,edu,music,swim,web}.jade')
    .pipe(pug({
      basedir: './',
      locals: {
        Home: require('./_models/Home.class.js'),
      },
    }))
    .pipe(gulp.dest('./home/'))
})

gulp.task('pug:resume', async function () {
	const DATA = requireJSON('./resume/resume.jsonld')
	const OPTS = {
		scripts: [
			`<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML,https://chharvey.github.io/chhlib/mathjax-localconfig.js"></script>`,
		],
		basedir: 'https://cdn.jsdelivr.net/npm/@chharvey/resume@2.0.0/',
	}
	let xdocument = new xjs.Document(await resume(await DATA, OPTS))

	let first_award = xdocument.node.querySelector('#prof-dev > dl > dd:nth-of-type(1)')
	// let first_award = xdocument.querySelector('#prof-dev > dl > dd:nth-of-type(1)') // TODO extrajs-dom^5.1
	if (first_award !== null) {
		// first_award.after(xAward.process({ // TODO extrajs-dom^5.1
		new xjs.Element(first_award).after(xAward.process({
			dates: '<time>2011</time>&ndash;<time>2014</time>',
			text : `
				<span itemscope="" itemtype="http://schema.org/EducationalOrganization">
					<abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name"><span class="c-Acro__First">V</span>CTM</abbr>
					Conferences, annually statewide (<time datetime="PT40H">10 hr each</time>)
				</span>
			`,
		}))
	}
	let contents = xdocument.innerHTML()
	return util.promisify(fs.writeFile)(path.resolve(__dirname, './resume/resume.html'), contents, 'utf8')
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

gulp.task('pug:all', ['pug:landing','pug:home','pug:resume','pug:blog'])

gulp.task('lessc:landing', function () {
  return gulp.src('./home/css/src/landing.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./home/css/'))
})

gulp.task('lessc:home', function () {
  return gulp.src('./home/css/src/home.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./home/css/'))
})

gulp.task('lessc:blog', function () {
})

gulp.task('lessc:all', ['lessc:landing','lessc:home','lessc:blog'])

gulp.task('build:landing', ['pug:landing','lessc:landing'])
gulp.task('build:home'   , ['pug:home'   ,'lessc:home'   ])
gulp.task('build:resume' , ['pug:resume'  ])
gulp.task('build:blog'   , ['pug:blog'   ,'lessc:blog'   ])

gulp.task('build:all', ['build:landing','build:home','build:resume','build:blog'])
gulp.task('build', ['pug:all', 'lessc:all'])
