var Util = require('../Util.js');
var Pair = require('./Pair.js');

/**
  * An OrderedPair is a set that encodes the order of its two coordinates.
  * An ordered pair is written (a, b), where a and b are the coordinates.
  *
  * The order of these coordinates is relevant, that is,
  * `(new OrderedPair(a,b)).equals(new OrderedPair(b,a)) === false` UNLESS
  * `a.equals(b)`.
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

OrderedPair.prototype.equals = function equals(x) {
  return this.abscissa.equals(x.abscissa) && this.ordinate.equals(x.ordinate);
  // fix this, it's wrong. there may be a set that is an ordered pair that is not an instance of
  // the OrderedPair class
}

OrderedPair.prototype.toString = function toString() {
  return '( ' + this.abscissa + ',  ' + this.ordinate + ' )';
}


OrderedPair.prototype.ownsEmpty = function ownsEmpty() {
  return false;
}

module.exports = OrderedPair;
