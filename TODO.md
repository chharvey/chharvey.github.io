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

### /home/folio/ pages ###
- class drop-downs shouldn't be summary elements, just because the behavior is something ideal. Use divs and JavaScript to emulate the drop-down/expando behavior.
- re-write all index pages for higher-ed courses.


### /resume/ ###
- fix print.css!

### /higher-ed/ ###
#### MATH 4626 limits project ####
- convert all php files to html files
- conform to site-wide styles
- convert all math into LaTeX
#### MATH 4644 technology lessons ####
- conform to site-wide styles
- relocate all lessons to `/secondary-ed/`




- - -
- - -


# TODO for logic theory #
dfn of logical equivalence: p equiv q if and only if ...? p iff q is a T?



###Law of Contraposition
(p then q); equiv (-q then -p) ? is axiom?
		
###Law of Excluded Middle: p or -p equiv T
proof:
p or -p		given
-p then -p	dfn of 'or'
p then p	law of contraposition
T			dfn of T


###Double negation elimination
(--p) = p




##proofs involving implications



###Implication Identity
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

###Proof by Contradiction
(p then C); therefore -p
proof1
	p then C
	-p or C		dfn of or
	-p			Disjunction Identity


#proofs involving disjunctions








###Implication Zero
(p then T); therefore T
proof:
(p then T) then T
(-p or T) then T
-(-p or T) or T
(p or C) or T
p or T
T




(p then T) equiv T
proof:
(p then T)
-p or T
T


(C then p); therefore T

###hypothetical syllogism
(p then q) and (q then r); therefore (p then r)
-((p then q) then -(q then r))

###modus ponens:
p, (p then q); therefore q

###Deny the Consequent
(p then q), (-q); therefore (-p); ? axiom ?









 what is this one? -p, q; therefore -p or q  therefore (p then q)


#The Disjunction
##associativity
p or (q or r) equiv (p or q) or r

##commutativity
(p or q) equiv (q or p)
	proof:
	p or q
	-p then q, by dfn of conjunction
	-q then p, by contraposition
	q or p, by dfn of conjunction
	done
	
	proof by them of logical equivalence
	(p or q) iff (q or p)
	-p then q iff (q or p)
	-q then p iff (q or p)
	(q or p) iff (q or p)
	T
	done	
	

##Disjunction Introduction
p therefore (p or q), by ?
q therefore (p or q) , by ? commutativity of `or` ?

##Disjunction Identity
p or C equiv p
new way:



if p is true, then true or false is true, which is p
if p is false, then false or false is false, which is p

##Disjunction Zero
p or T equiv T
new way:
-p then T; dfn of 'or'




##Disjunctive Syllogism
(p or q) and -p; therefore q






#The Conjunction
##definition
(p and q) defined by -(p then -q)

##associativity

#commutativity
(p and q) equiv (q and p)
	proof using equivalences:
	p and q; given
	-(p then -q); by dfn conjunction
	-(q then -p); by rule of contraposition
	q and p; by dfn conjunction
	done

##Conjunction Identity
p and T = p

##Conjunction Zero
p and C = C

##Conjunction Elimination
(p and q); therefore p
	
	proof using defn of implication:
	(p and q) then p
	-(p then -q) then p
	
	
	p then p
	T

	proof using disjunction:
	(p and q) then p
	-(p and q) or p
	(-p or -q) or p
	(-q or -p) or p
	-q or (-p or p)
	-q or T
	T

	proof using conjunction:
	(p and q) then p
	-(p and q) or p
	-((p and q) and -p)
	-((q and p) and -p)
	-(q and (p and -p))
	-(q and C)
	-C
	T




(p and q); therefore q; use commutativity of conjunction



###Biconditional introduction
(p then q) and (q then p) therefore (p iff q), by definition of 'iff'


# TODO for set theory #

topic: set theory
(prove using “=” relation) for all x in S, if there exists a y such that x = y, then y is in S.

topic: metric spaces
definition: delta-neighborhood: Given a metric M, and a distance delta, and an element x in M, the delta-neighborhood of x, V, is the set of all t in M such that d(x,t) < delta.
Definition of “density”: a metric M is “dense” if and only if for every x in M, and for every distance delta, there exists a t in M such that t is in the delta-neighborhood of x.
Another definition of density: Given a metric M, M is dense if and only if for every two elements x and y in M, there exists another element t such that x <= t <= y. Is this equivalent to the first definition?
reconcile definitions of “neighborhood” (of a metric space M)
1. a set V is a neighborhood around x iff it contains the set of all points t in M such that d(x,t) < delta, given some distance delta.
2. a set V is a neighborhood of x iff there exists an ‘open set’ S of x such that S is a subset of V, where “open set” is defined as:
A set U is “open” iff for every point y in U, there exists a set {z in U : d(y,z) < epsilon} for some real number epsilon
Attempt:
Given a metric space M, given a point x in M and a real-valued distance delta, a set V is a “delta-neighborhood” around x iff V is the set of all t in M such that d(x,t) < delta.
Given a metric space M, a point x in M, and a real distance delta, a delta-neighborhood around x exists. WFF: (forall R)({R is the set of real numbers})(forall M)({m is a metric space})(forall x in M)(forall delta in R) (exists V)(forall t)(t in V iff (t in M implies {d(x,t) < delta})) Proof: subset axiom schema replacing (s in M implies {d(x,s) < delta}) with P(s).
A set U is “open” iff for every point y in U, U contains some delta-neighborhood of y.


# xProof todo #
- decide where  model and isAxiom attributes go
- ProofTypes
