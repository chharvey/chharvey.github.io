TO DO
========

Specs for this TODO:

- [ ] 2014-03-30 every list must go under a heading and every heading must be followed by exactly one list, unless that heading is followed by subheading(s) that are followed by list(s).
- [ ] 2014-03-06 every list item must begin with a hyphen, `-`, the character that denotes an `<li>` in Markdown. Then follow this with the string ` [ ] `, which denotes an empty checkbox. Follow this with the date in the format `YYYY-MM-DD`, which is the date the item is added. (Starting on 2013-12-14. list items before that date will not have dates added. See Git repo history for more info.)
- [ ] 2014-03-06 add list items to the bottom of each list, so that the list stays in chronological order (starting as of today).
- [x] 2014-03-06 when list items are complete, *do not* delete the list item or wrap it with the `<del>` tag. Instead, replace the space in the checkbox with a lower-case `x` to indicate the item has been completed. (Starting as of today; see Git repo history for items deleted before today.)

## Site-wide to-do list ##

### semantics ###
- 2014-02-18 use `title` attribute on all `a` elements to describe the **Title of the linked document**
	- 2014-03-08 unless the text content in the link is already the title.
- 2014-03-02 see which `<b>` tags you can remove; which ones do you REALLY need?
	- 2013-12-14 see which `b.ref`s you can change to `cite`s (titles of works) and `a`s (links to documents, sections, etc.)
- 2014-03-01 use `<small>` for labels---they really are disclamers/caveats/etc.
- 2014-03-06 change all apostrophes (`'`) to right single quotes `&rsquo;` on the following pages... (Leave the apostrophes alone in regular pages. The typographical precision is not worth the effort.)
	- 'portal' pages (`/home/edu.html`, `/home/math.html`, etc.)
	- **formal** documents such as articles or blog posts (maybe in `/docs/`?)
- 2014-03-30 instead of using classes (`span.hsub`, etc.) for QUASI-ELEMENTS, use the `data-*` attribute. For example, `<span data-qe="subh">`. Then style these with `span[data-qe="subh"]`. The selector is equally as specific as `span.subh` but may be less efficient; though this is a minor cost to pay for semantic benefit.
- 2014-04-01 separate pure-style classes (e.g. `.list-basic`, `.dl-table-sml`, `.table-list`, etc.) from semantic classes (e.g. `.dl-ordered`, `.hsub`, `.postal`, etc.). Maybe use the HTML `data-*` attribute?

#### metadata and micro-semantics (very low priority) ###
- `rel` attributes on `link` and `a` elements, see [http://dev.w3.org/html5/spec/links.html#linkTypes]()
	- 2014-03-03 `next`: current doc is part of a series, and that the `a`, for example in breadcrumbs, links to the next document in the series. May be used with `sibling`
	- 2014-03-03 `prev`: current doc is part of a series, and that the `a`, for example in breadcrumbs, links to the previous document in the series. May be used with `sibling`
	- 2014-03-03 `top`: links to the "logical top level" document. implies `ancestor`
	- 2014-03-03 `parent`: links to the "logical parent" of this page
	- 2014-03-03 `ancestor`: links to the "logical parent" of this page, or the "logical parent" of an `ancestor` of this page (recursively defined)
	- 2014-03-03 `child`: links to a "logical child" of this page
	- 2014-03-03 `descendent`: links to a "logical child" of this page, or a "logical child" of a `descendent` of this page (recursively defined)
	- 2014-03-03 `sibling`: links to a page that has the same "logical parent" as this page
	- 2014-03-03 `external`: the linked page is not part of the same site
- 2013-03-03 choose between:
	- microformats (special `class`es)
	- microdata (`itemscope` and `itemprop`, via [schema.org]())
- 2013-03-03 ARIA roles

### styles ###
- 2014-02-24 remove all "scoped" Less and make use of "namespaces"
	- in `reals.less` lines 120–149, and 157–183
	- in `secondary-ed.less` lines 154–234

### scripts ###
- 2013-12-14 investigate the use of templates (`<template>`)
- 2014-03-01 move table row-counting functionality (`all.js:39`) from JS to CSS with counters
- 2014-03-01 use JS to change the line-height of blockquotes to 1.5 times the usual amount (currently (2014-03-01), from 1.2 to 1.8), and then adjust margin-bottom to keep vertical rhythm.

## specific projects ##

### /index.html ###
- make popping text on index page fade in and out easier

### /home/ ###

#### resume.html ####
- 2014-03-26 remove `!important` from `.res-spacetime {font-size}` and `.res-spacetime {color}` and somehow fix quasi-element `span.hsub`.
- 2014-03-26 add web-dev exp

### /site-design/ ###
#### phi.html ####
- FIX IT. the whole thing.

#### grid.html ####
- 2014-01-21 finish last section (Phi demonstration)
- 2014-03-05 add Gutter section below all Grid stuff

#### typo.html ####
- inline elements: highlighting
- 2014-02-16 do labels/tooltips/whatever hint: [http://kushagragour.in/lab/hint/]()
- code scheme

##### punct.html (under typography) #####
- 2014-02-24 line break violations:
	- right after a preposition (to, for, with, over, by, etc.)
	- after a small word (2- or 3-letter words)
	- in the middle of a highlighted phrase 3 words or fewer (em, strong, i, b, etc.)

### /higher-ed/ ###
- re-write all index pages for higher-ed courses.

#### EDCI 5724/ ####
- add cohort project lesson plan (`SIOPLessonPlan.docx`), presentation, and other items to folder

#### MATH 4626 limits project ####
- convert all php files to html files
- conform to site-wide styles
- convert all math into LaTeX

#### MATH 4644 technology lessons ####
- conform to site-wide styles
- relocate all lessons to `/secondary-ed/`

### /secondary-ed/ ###
- **find a way to write SVG images!**
- 2014-01-12 clean up `@group assessments` in `secondary-ed.less`

#### Math7/ ####
- on all course overview, unit overviews, and lessons: include breadcrumbs!
- 2014-03-04 fix Assessment styles

#### Math7/index.html ####

#### Math7/syllabus.html ####
- 2014-01-15 fix `dl`s to look like: 'dt — dd — dd'
- last page: use `form`s for student and parent input

#### Math7/standards/ ####
- create TEST 7.3 versions (integer operations)
- fix and convert TEST 7.13a versions (verbal math)
- add problems requiring identifying properties to solve equations on SBG 7.16 (to both versions)

#### Math7/integers/ ####
- upload `ints-add-hw.html`
- add number lines to HW 1.3
- create `ints-sub-lesson.html`
- move subtraction notes from `ints-add-lesson.html` to `ints-sub-lesson.html`
- move link to `ints-sub-quiz.html` from `ints-add-lesson.html` to `ints-sub-lesson.html`
- create `ints-sub-hw.html`
- create `ints-multdiv-hw.html` (with chips, number lines, (and blocks))
- move formative feedback questions at the end of `ooo-lesson.html` to `ooo-prequiz.html`
- create `fieldprops-lesson.html`
- Test 1
	- add images from Unit 1 Test (on Drive)
	- remove verbal mathematics and add to **Test 2**

#### Math7/equations-inequalities/ ####
- create `verbals-lesson.html`
- create `eqns-onestep-lesson.html`
- move links to `eqns-onestep-prequiz.html` and `eqns-onestep-quiz.html` from `eqns-twostep-lesson.html` to `eqns-onestep-lesson.html`
- fix `eqns-twostep-lesson.html`
- fix `eqns-word-lesson.html`
- update `ineq-writegraph-lesson.html`
- update `ineq-solve-lesson.html`
- add **Inequalities Part 3** from Pages on GDrive to `ineq-solve-lesson.html`
- add material from `ModifiedLessonWriteup.pdf` on GDrive to `ineq-writegraph-lesson.html` and `ineq-solve-lesson.html`
- Test 2
	- add verbal mathematics
	- more on one-step equations
	- less on two-step equations
	- add inequalities
	- (in 2013, gave test along with SBG 7.15)

#### Math7/functions/ ####
- convert **Modified Lesson #2: Relations** from GDrive
- convert Quiz 3.5 from GDrive to `distinguishing-quiz.html`

#### Math7/proportions/ ####
- convert `SIOPLessonPlan.docx` from GDrive

#### Math7/geometry/ ####

#### Math7/prob-stats/ ####


### /reals/ ###
#### TODO for set theory ####

##### topic: set theory #####
(prove using “=” relation) for all x in S, if there exists a y such that x = y, then y is in S.

##### topic: metric spaces #####
definition: delta-neighborhood: Given a metric M, and a distance delta, and an element x in M, the delta-neighborhood of x, V, is the set of all t in M such that d(x,t) < delta.

Definition of "density": a metric M is "dense" if and only if for every x in M, and for every distance delta, there exists a t in M such that t is in the delta-neighborhood of x.

Another definition of density: Given a metric M, M is dense if and only if for every two elements x and y in M, there exists another element t such that x <= t <= y. Is this equivalent to the first definition?

reconcile definitions of “neighborhood” (of a metric space M)
1. a set V is a neighborhood around x iff it contains the set of all points t in M such that d(x,t) < delta, given some distance delta.
2. a set V is a neighborhood of x iff there exists an ‘open set’ S of x such that S is a subset of V, where “open set” is defined as:
	A set U is "open" iff for every point y in U, there exists a set {z in U : d(y,z) < epsilon} for some real number epsilon

Attempt:

Given a metric space M, given a point x in M and a real-valued distance delta, a set V is a “delta-neighborhood” around x iff V is the set of all t in M such that d(x,t) < delta.

Given a metric space M, a point x in M, and a real distance delta, a delta-neighborhood around x exists. WFF: (forall R)({R is the set of real numbers})(forall M)({m is a metric space})(forall x in M)(forall delta in R) (exists V)(forall t)(t in V iff (t in M implies {d(x,t) < delta})) Proof: subset axiom schema replacing (s in M implies {d(x,s) < delta}) with P(s).

A set U is “open” iff for every point y in U, U contains some delta-neighborhood of y.


### /xProof/ ###
- decide where  model and isAxiom attributes go
- ProofTypes

