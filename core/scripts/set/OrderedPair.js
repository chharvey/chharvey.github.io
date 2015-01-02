/**
  * An OrderedPair is a set that encodes the order of its two coordinates.
  * An ordered pair is written (a,b), where a and b are the coordinates.
  *
  * The order of these coordinates is relevant, that is,
  * `(new OrderedPair(a,b)).equals(new OrderedPair(b,a)) === false` UNLESS
  * `a.equals(b)`.
  *
  * An OrderedPair is similar to a {@see Tuple} with 2 components (a 2-tuple),
  * however they are structurally different from a set-theoretic approach:
  * The ordered pair (a,b) does not have the same elements as the 2-tuple ‹a,b›
  * and thus they are not equal.
  *
  * `new OrderedPair(a,b)` is defined as `new Pair(new Singleton(a), new Pair(a,b))`
  * @extends   Pair
  * @param `a` the first coordinate (abscissa)
  * @param `b` the second coordinate (ordinate)
  */
function OrderedPair(a, b) {
  this.abscissa = a || new EmptySet();
  this.ordinate = b || new Singleton(this.abscissa);
  Pair.call(this, new Singleton(this.abscissa), new Pair(this.abscissa, this.ordinate));
}
Util.extend(OrderedPair, Pair);

OrderedPair.prototype.owns = function (x) {
  return this.element1.equals(x) || this.element2.equals(x);
}

OrderedPair.prototype.equals = function (x) {
  return this.abscissa.equals(x.abscissa) && this.ordinate.equals(x.ordinate);
}

OrderedPair.prototype.toString = function () {
  return '( ' + this.abscissa + ',  ' + this.ordinate + ' )';
}


OrderedPair.prototype.ownsEmpty = function () {
  return false;
}
