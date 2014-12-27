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
  return Set.prototype.includes.call(this)
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
  // The power set of `x` is a pair if `x` is a singleton or if `x` is empty.
  // If so, this pair contains the empty set and `x`.
  // @return `true` if x is a singleton or is empty, and this set contains x and the empty set
  var p = this.containsEmpty() && this.contains(x); // a fact about all power sets
  var e = x.isSingleton() || x.isEmpty();
  return p && e;
}

Pair.prototype.isInductive = function () {
  return false; // No Pair objects are inductive.
}

Pair.prototype.isCardinal = function () {}
Pair.prototype.isOrdinal = function () {}

Pair.prototype.cardinality = function () {}
Pair.prototype.ordinality = function () {}

Pair.prototype.isEquinumerousTo = function (x) {
  return this.cardinality().equals(set.cardinality());
}
Pair.prototype.isOrderIsomorphicWith = function (x) {
  return this.ordinality().equals(set.ordinality());
}
