TO DO
========

## Site-wide to-do list ##
- 2013-12-14 add dates to new TODO items; completely delete when completed

### semantics ###
- don't rely on `title` attributes for any element (mobile browsers)
- `rel` attributes on `link` and `a` elements, see [http://dev.w3.org/html5/spec/links.html#linkTypes](http://dev.w3.org/html5/spec/links.html#linkTypes)
- breadcrumbs! three choices:
	- "owns": `&ni;` or `\220b`
	- "superset": `&supe;` or `\2287`
	- "slash":/ or "bar": |
- Add any boolean `hidden` attribute to all elements not ready for publishing
- **only in formal documents**: Change all possessive and contraction apostrophe characters `'` to right single quotes `&rsquo;`. Leave the apostrophes alone in regular pages. The typographical precision is not worth the effort.
- 2013-12-14 see which `b.ref`s you can change to `cite`s (titles of works)

### styles ###
- Change all 'includes' to 'extends' with the new less.js v1.4
- to each 'subsite' `.less` stylesheet:
	- 2013-12-14 get rid of regular import of `all.less`
	- add the following to import less references without importing selectors:
		- `@import (reference) 'grid.less';`
		- `@import (reference) 'typo.less';`
		- `@import (reference) 'mods.less';`
- FIND A FUCKING LESS COMPILER!
- upgrade to **v1.5.0**!!!!!

### scripts ###
- 2013-12-14 investigate the use of templates (`<template>`)


## specific projects ##
### /index.html ###
- make popping text on index page fade in and out easier

### /site-design/typo.html ###
- inline elements: highlighting
- quotation-scheme examples
- code scheme

### /resume/ ###
- fix print.css!

### /home/folio/ pages ###
- class drop-downs shouldn't be summary elements, just because the behavior is something ideal. Use divs and JavaScript to emulate the drop-down/expando behavior.
- re-write all index pages for higher-ed courses.

### /higher-ed/ ###
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

#### Math7/ ####
- on all course overview, unit overviews, and lessons: include breadcrumbs!
- create `pacingguide.html`

#### syllabus.html ####
- display `dl`s like two-column tables
- last page: use `form`s for student and parent input

#### Math7/integers/ ####
- upload `ints-add-hw.html`
- add number lines to HW 1.3
- create `ints-sub-lesson.html`
- move subtraction notes from `ints-add-lesson.html` to `ints-sub-lesson.html`
- move link to `ints-sub-quiz.html` from `ints-add-lesson.html` to `ints-sub-lesson.html`
- create `ints-sub-hw.html`
- create `ints-multdiv-hw.html` (with chips, number lines, (and blocks))
- create SBG 7.3 versions (integer operations)
- move formative feedback questions at the end of `ooo-lesson.html` to `ooo-prequiz.html`
- create `fieldprops-lesson.html`
- `test.html`
	- add images from Unit 1 Test (on Drive)
	- remove verbal mathematics and add to `../equations-inequalities/test.html`

#### Math7/equations-inequalities/ ####
- create `verbals-lesson.html`
- fix and convert SBG 7.13a versions (verbal math)
- create `eqns-onestep-lesson.html`
- move links to `eqns-onestep-prequiz.html` and `eqns-onestep-quiz.html` from `eqns-twostep-lesson.html` to `eqns-onestep-lesson.html`
- fix `eqns-twostep-lesson.html`
- fix `eqns-word-lesson.html`
- update `ineq-writegraph-lesson.html`
- update `ineq-solve-lesson.html`
- add **Inequalities Part 3** from Pages on GDrive to `ineq-solve-lesson.html`
- add material from `ModifiedLessonWriteup.pdf` on GDrive to `ineq-writegraph-lesson.html` and `ineq-solve-lesson.html`
- SBG 7.15 v1
	- fix list-style-type for #3-5
	- #6-7 change directions to "Solve each inequality, then graph it on the number line provided."
- `test.html`
	- add verbal mathematics
	- more on one-step equations
	- less on two-step equations
	- add inequalities
	- (in 2013, gave test along with SBG 7.15)

#### Math7/functions/ ####
- convert **Modified Lesson #2: Relations** from GDrive
- convert **Modeling Sequences** from Pages on GDrive

#### Math7/proportions/ ####
- convert `SIOPLessonPlan.docx` from GDrive
- fix `test.html`

#### Math7/geometry/ ####
- fix `test.html`

#### Math7/prob-stats/ ####
- fix `test.html`


### /reals/ ###
#### TODO for logic theory ####
**Implication Identity**
(T then p); equiv p
proof using 'deduction', conjunction, disjunction
	T then p				given
	C or p					dfn of 'or'
	p						Disjunction Identity
proof using 'deduction', implication
	T then p				given
	(p then p) then p		defn of 'T'
	(-p or p) then p		defn of 'or'
	-(-p or p) or p			defn of 'or'
	(p and -p) or p 		demorgan's laws
	(p or p) and (-p or p)	distributive1
	p and T					law of excluded middle
	p						Conjunction Identity
proof using '(A equiv B) if and only if (A iff B equiv T)'
	T then p iff p
	(p then p) then p iff p			defn of 'T'
	(-p or p) then p iff p			defn of 'or'
	-(-p or p) or p iff p			defn of 'or'
	(p and -p) or p iff p 			demorgan's laws
	(p or p) and (-p or p) iff p	distributive1
	p and T iff p					law of excluded middle
	p iff p							Conjunction Identity
	(p then p) & (p then p)			dfn of 'iff'
	p then p						Conjunction Elimination
	T								dfn of T
$P \lxor \lnot P \equiv \top$

#### TODO for set theory ####

##### topic: set theory #####
(prove using “=” relation) for all x in S, if there exists a y such that x = y, then y is in S.

##### topic: metric spaces #####
definition: delta-neighborhood: Given a metric M, and a distance delta, and an element x in M, the delta-neighborhood of x, V, is the set of all t in M such that d(x,t) < delta.

Definition of “density”: a metric M is “dense” if and only if for every x in M, and for every distance delta, there exists a t in M such that t is in the delta-neighborhood of x.

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

