TO DO
========

## Site-wide to-do list ##
### semantics ###
- don't rely on `title` attributes for any element (mobile browsers)
- `rel` attributes on `link` and `a` elements, see [http://dev.w3.org/html5/spec/links.html#linkTypes](http://dev.w3.org/html5/spec/links.html#linkTypes)
- breadcrumbs! three choices:
- - "owns": `&ni;` or `\220b`
- - "superset": `&supe;` or `\2287`
- - "slash":/ or "bar": |
- Add any boolean `hidden` attribute to all elements not ready for publishing
- **only in formal documents**: Change all possessive and contraction apostrophe characters `'` to right single quotes `&rsquo;`. Leave the apostrophes alone in regular pages. The typographical precision is not worth the effort.

### styles ###
- Change all 'includes' to 'extends' with the new less.js v1.4
- FIND A FUCKING LESS COMPILER!

### scripts ###



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

#### Math7/wholenumbers-integers/ ####
- upload `ints-add-hw.html`
- add number lines to HW 1.3
- create `ints-sub-lesson.html`
- move subtraction notes from `ints-add-lesson.html` to `ints-sub-lesson.html`
- create `ints-sub-hw.html`
- create `ints-multdiv-hw.html` (with chips, number lines, (and blocks))
- create SBG 7.3 versions (integer operations)
- create `fieldprops-lesson.html`
- convert Unit 1 Test to `wholenumbersintegers-test.html`

#### Math7/equations-inequalities/ ####
- create `verbals-lesson.html`
- fix and convert SBG 7.13a versions (verbal math)
- fix `eqns-twostep-lesson.html`
- update `ineq-writegraph-lesson.html`
- create `ineq-solve-lesson.html`
- convert **Inequalities Part 3** from Pages on GDrive to `ineq-solve-lesson.html`
- create SBG 7.15 versions (inequalities)


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

