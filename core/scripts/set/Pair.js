/**
  * Given two Sets, there exists a Set that owns exactly them both.
  * The order of these elements is not relevant, that is,
  * `(new Pair(a,b)).equals(new Pair(b,a)) === true`
  * @extends   Set
  * @param `a` one element in this set
  * @param `b` another element in this set
  */
function Pair(a, b) {
  this.element1 = a || new EmptySet();
  this.element2 = b || this.element1;
  Set.call(this, this.element1, this.element2);
}
Util.extend(Pair, Set);

Pair.prototype.owns = function (x) {
  return this.element1.equals(x) || this.element2.equals(x);
}

Pair.prototype.includes = function (x) {
  return x.isEmpty() // every set includes the empty set
         || x.isSingletonOf(this.element1)
         || x.isSingletonOf(this.element2)
         || x.equals(this); // WARNING: CYCLICAL DEFINITIONS
}

Pair.prototype.equals = function (x) {
  boolean sameObject = (this === x); // convenience statement: equal Objects are equal sets (but not vice versa)
  boolean bothEmpty = this.isEmpty() && x.isEmpty(); // convenience statement: all empty sets are equal
  boolean includeEachOther = this.includes(x) && x.includes(this); // definition of set equality
  return sameObject || bothEmpty || includeEachOther;
}

Pair.prototype.toString = function () {
  var s = '{ ' + this.element1;
  if (!this.isSingleton()) s += ',  ' + this.element2;
  s += ' }';
  return s; // `{ element1,  element2 }`
}


Pair.prototype.isEmpty = function () {
  return false;
}

Pair.prototype.ownsEmpty = function () {
  // overrides Set.prototype.ownsEmpty() {return this.owns(new EmptySet());}
  return this.element1.isEmpty() || this.element2.isEmpty();
}

Pair.prototype.isSingleton = function () {
  return this.element1.equals(this.element2);
}

Pair.prototype.isPair = function () {
  return true;
}
Pair.prototype.isPairOf = function (x, y) {
  return this.owns(x) && this.owns(y);
}

Pair.prototype.isPowerSetOf = function (x) {
  // The power set P(x) of any set x owns the empty set, x itself, and possibly more elements.
  // If x is empty, then P(x) is exacly the set that owns x, which makes it a singleton, which is a pair.
  // If x is a singleton, then P(x) owns the empty set and x, and nothing else, which makes it a non-singleton pair.
  // If x owns more than 1 element, then P(x) will own more than 2 elements, so it will not be a pair.
  var p = this.ownsEmpty() && this.owns(x); // a fact about all power sets
  var e = x.isSingleton() || x.isEmpty();
  return p && e;
  // PowerSet.prototype.isPowerSetOf.call(this, x)
}

Pair.prototype.isInductive = function () {
  return false;
}
