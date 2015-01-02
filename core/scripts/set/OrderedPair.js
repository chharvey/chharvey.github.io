/**
  * Given two Sets, there exists a Set that owns exactly them both.
  * The order of these elements is not relevant, that is,
  * `(new OrderedPair(a,b)).equals(new OrderedPair(b,a)) === true`
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

OrderedPair.prototype.includes = function (x) {
  return x.isEmpty() // every set includes the empty set
         || x.isSingletonOf(this.element1)
         || x.isSingletonOf(this.element2)
         || x.equals(this);
}

OrderedPair.prototype.toString = function () {
  return '( ' + this.abscissa + ',  ' + this.ordinate + ' )';
}


OrderedPair.prototype.ownsEmpty = function () {
  return false;
}
