/**
  * Given two Sets, there exists a Set that owns exactly them both.
  * The order of these elements is not relevant, that is,
  * `(new Pair(a,b)).equals(new Pair(b,a)) === true`
  * @extends   Set
  * @param `a` one element in this set
  * @param `b` another element in this set
  */
function Pair(a, b) {
  Set.call(this, a, b);
  this.element1 = a || new EmptySet();
  this.element2 = b || this.element1;
}
Util.extend(Pair, Set);

Pair.prototype.owns = function (x) {
  return x.equals(this.element1) || x.equals(this.element2); // A pair owns exactly its elements.
}

Pair.prototype.includes = function (x) {
  return x.isEmpty() // every set includes the empty set
         || x.isSingletonOf(this.element1)
         || x.isSingletonOf(this.element2)
         || x.equals(this);
}

Pair.prototype.toString = function () {
  var s = "{ " + this.element1;
  if (!this.isSingleton()) {
    s += ",  " + this.element2;
  }
  s += " }";
  return s; // `{ element1, element2 }`
}


Pair.prototype.isEmpty = function () {
  return false; // A Pair is always nonempty.
}

Pair.prototype.ownsEmpty = function () {
  // overrides Set.prototype.ownsEmpty() {return this.owns(new EmptySet());}
  return this.element1.isEmpty() || this.element2.isEmpty();
}

Pair.prototype.isSingleton = function () {
  return this.element1.equals(this.element2); // `true` if this Pair's elements are equal
}

Pair.prototype.isPair = function () {
  return true; // All Pair objects are pairs.
}
Pair.prototype.isPairOf = function (x, y) {
  return this.owns(x) && this.owns(y);
}

Pair.prototype.isPowerSetOf = function (x) {
  // The power set P(x) of any set x owns the empty set, x itself, and possibly more elements.
  // If x is empty, then P(x) is exacly the set that owns x, which makes it a singleton, which is a pair.
  // If x is a singleton, then P(x) owns the empty set and x, and nothing else, which makes it a pair.
  // If x owns more than 1 element, then P(x) will own more than 2 elements, so it will not be a pair.
  var p = this.ownsEmpty() && this.owns(x); // a fact about all power sets
  var e = x.isSingleton() || x.isEmpty();
  return p && e;
  // PowerSet.prototype.isPowerSetOf.call(this, x)
}

Pair.prototype.isInductive = function () {
  return false; // No Pair objects are inductive.
}

Pair.prototype.isCardinal = function () {}
Pair.prototype.isOrdinal = function () {}

Pair.prototype.cardinality = function () {}
Pair.prototype.ordinality = function () {}

Pair.prototype.isEquinumerousTo = function (x) {
  return this.cardinality().equals(x.cardinality());
}
Pair.prototype.isOrderIsomorphicWith = function (x) {
  return this.ordinality().equals(x.ordinality());
}
