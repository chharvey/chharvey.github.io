/**
  * A proposition represents a mathematical statement.
  */
function Proposition(string) {
  this.name = string || '()';
  // this.toString = function () { return this.name; }
}
Proposition.prototype.toString = function () { return this.name; }

/**
  * The Negation of a proposition is a unary operator on that proposition's value.
  * @extends   Proposition
  * @param `p` the Proposition to negate
  */
function Negation(p) {
  Proposition.call(this, '!' + '(' + p.name + ')');
}
Util.extend(Negation, Proposition);


/**
  * A Disjunction is a binary operator on two propositions.
  * @extends   Proposition
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function Disjunction(p, q) {
  Proposition.call(this, '(' + p.name + ') || (' + q.name + ')');
}
Util.extend(Disjunction, Proposition);


/**
  * A JointDenial is defined as the negation of a disjunction `!(a || b)`,
  * but it can also be thought of as a conjunction of two negations `!a && !b`.
  * @extends   Negation
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function JointDenial(p, q) {
  Negation.call(this, new Disjunction(p, q));
}
Util.extend(JointDenial, Negation);


/**
  * An AlternativeDenial is defined as the disjunction of two negations `!a || !b`,
  * but it can also be thought of as a negation of a conjunction `!(a && b)`.
  * @extends   Disjunction
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function AlternativeDenial(p, q) {
  Disjunction.call(this, new Negation(p), new Negation(q));
}
Util.extend(AlternativeDenial, Disjunction);


/**
  * A Conjunction is defined as the negation of an alternative denial `!(!a || !b)`,
  * but it can also be written as `a && b`.
  * @extends   Negation
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function Conjunction(p, q) {
  Negation.call(this, new AlternativeDenial(p, q));
  this.toString = function () { return '(' + p.toString() + ') && (' + q.toString() + ')'; }
}
Util.extend(Conjunction, Negation);


/**
  * An Implication is defined as the disjunction `!a || b`,
  * but it can also be written as `a => b`.
  * @extends   Disjunction
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function Implication(p, q) {
  Disjunction.call(this, new Negation(p), q);
  this.toString = function () { return '(' + p.toString() + ') => (' + q.toString() + ')'; }
}
Util.extend(Implication, Disjunction);
/**
  * A Converse is defined as the implication `q => p`,
  * An Inverse is defined as the implication `!p => !q`
  * A Contrapositive is defined as the implication `!q => !p`,
  * or as the Inverse of the converse, or as the converse of the inverse
  * @extends   Implication
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function Converse(p, q) {
  Implication.call(this, q, p);
}
function Inverse(p, q)  {
  Implication.call(this, new Negation(p), new Negation(q));
}
function Contrapositive(p, q)  {
  Implication.call(this, new Negation(q), new Negation(p));
}
Util.extend(Converse, Implication);
Util.extend(Inverse, Implication);
Util.extend(Contrapositive, Implication);


/**
  * A Nonimplication is defined as the negation of an implication `!(a -> b)`,
  * but it can also be written as `a =/> b`.
  * @extends   Negation
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function Nonimplication(p, q) {
  Negation.call(this, new Implication(p, q));
  this.toString = function () { return '(' + p.toString() + ') =/> (' + q.toString() + ')'; }
}
Util.extend(Nonimplication, Negation);


/**
  * An Equivalence is defined as the conjunction of two implications `(a -> b) && (b -> a)`,
  * but it can also be written as `a <-> b`.
  * Also known as a biconditional.
  * @extends   Conjunction
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function Equivalence(p, q) {
  Conjunction.call(this, new Implication(p, q), new Implication(q, p));
  // Conjunction.call(this, new Implication(p, q), new Converse(p, q));
  this.toString = function () { return '(' + p.toString() + ') <==> (' + q.toString() + ')'; }
}
Util.extend(Equivalence, Conjunction);


/**
  * An ExclusiveDisjunction is defined as the negation of an equivalence `!(a <==> b)`,
  * but it can also be written as `a <=/=> b`.
  * Also known as a non-equivalence.
  * @extends   Negation
  * @param `p` the first  Proposition
  * @param `q` the second Proposition
  */
function ExclusiveDisjunction(p, q) {
  Negation.call(this, new Equivalence(p, q));
  this.toString = function () { return '(' + p.toString() + ') <=/=> (' + q.toString() + ')'; }
}
Util.extend(ExclusiveDisjunction, Negation);


/**
  * A Tautology is defined as the disjunction `a || !a`,
  * but it can also be written as `⊤`.
  * @extends   Disjunction
  * @param `p` the Proposition
  */
function Tautology(p) {
  Disjunction.call(this, p, new Negation(p));
  this.toString = function () { return '⊤'; }
}
Util.extend(Tautology, Disjunction);


/**
  * A Contradiction is defined as the conjunction `a && !a`,
  * but it can also be written as `⊥`.
  * @extends   Conjunction
  * @param `p` the Proposition
  */
function Contradiction(p) {
  Conjunction.call(this, p, new Negation(p));
  this.toString = function () { return '⊥'; }
}
Util.extend(Contradiction, Conjunction);
